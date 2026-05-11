"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PICKUP } from "@/lib/pickup";
import PickupInfo from "./PickupInfo";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar as CalendarIcon,
  Clock,
  Hourglass,
  Users,
  CheckCircle2,
  Loader2,
  ArrowRight,
  ArrowLeft,
  Phone,
  Mail,
  User as UserIcon,
  MapPin,
  Info,
  Sparkles,
} from "lucide-react";
import {
  DURATIONS,
  MAX_QUANTITY,
  type Duration,
  calculatePrice,
  BASE_PRICES,
} from "@/lib/pricing";
import { useLocale, useT } from "@/components/LocaleProvider";


type Slot = string; // "HH:00"
type T = ReturnType<typeof useT>;

const ALL_SLOTS: Slot[] = [
  "09:00", "10:00", "11:00", "12:00", "13:00", "14:00",
  "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00",
];
const OPEN_HOUR = 9;
const CLOSE_HOUR = 22;

const DEFAULT_PICKUP = PICKUP.name;

// Public boat ramps and marinas across the Helsinki capital region
// the user can pick when choosing delivery instead of picking the jet
// ski up at Kipparlahti. Each entry carries a postal address so we
// can show it under the dropdown after a selection (and link to
// Google/Apple Maps from there). Place names stay Finnish in both
// locales — they don't translate.
type DeliveryRamp = { name: string; address: string | null };

const DELIVERY_RAMPS: DeliveryRamp[] = [
  {
    name: "Lauttasaaren venesatama, Helsinki",
    address: "Vattuniemenkatu 18, 00210 Helsinki",
  },
  {
    name: "Hernesaaren venesatama, Helsinki",
    address: "Hernesaarenranta 1, 00150 Helsinki",
  },
  {
    name: "Hietalahden venesatama, Helsinki",
    address: "Hietalahdenranta 5, 00180 Helsinki",
  },
  {
    name: "Pohjoisrannan ramppi, Helsinki",
    address: "Pohjoisranta 4, 00170 Helsinki",
  },
  {
    name: "Marjaniemen ranta, Helsinki",
    address: "Marjaniementie 35, 00930 Helsinki",
  },
  {
    name: "Vuosaaren venesatama, Helsinki",
    address: "Vuosaaren satamakatu 5, 00980 Helsinki",
  },
  {
    name: "Tammisalon ramppi, Helsinki",
    address: "Sahaajankatu 1, 00880 Helsinki",
  },
  {
    name: "Otaniemen venesatama, Espoo",
    address: "Otarannantie 1, 02150 Espoo",
  },
  {
    name: "Suomenojan venesatama, Espoo",
    address: "Suomenojanranta 5, 02270 Espoo",
  },
  {
    name: "Haukilahden venesatama, Espoo",
    address: "Hauenkalliontie 1, 02170 Espoo",
  },
  {
    name: "Espoonlahden venesatama, Espoo",
    address: "Soukanlahdentie 5, 02360 Espoo",
  },
  {
    name: "Soukan venesatama, Espoo",
    address: "Soukantie 8, 02360 Espoo",
  },
  {
    name: "Kivenlahden venesatama, Espoo",
    address: "Kivenlahdenkatu 5, 02320 Espoo",
  },
  {
    name: "Muu paikka pääkaupunkiseudulla",
    address: null,
  },
];

type DayAvailability = {
  date: string;
  fleetSize: number;
  slots: Record<string, number>;
};

type Status = "idle" | "submitting" | "success" | "error";
type Step = 1 | 2 | 3 | 4;

function fmtShortDate(iso: string, t: T) {
  const d = new Date(iso + "T00:00:00");
  return `${t.booking.monthDays[d.getDay()]} ${d.getDate()}.${d.getMonth() + 1}.`;
}
function fmtLongDate(iso: string, t: T, locale: string) {
  const d = new Date(iso + "T00:00:00");
  if (locale === "en") {
    return `${t.booking.monthDays[d.getDay()]} ${d.getDate()} ${t.booking.monthsShort[d.getMonth()]}`;
  }
  return `${t.booking.monthDays[d.getDay()]} ${d.getDate()}. ${t.booking.monthsShort[d.getMonth()]}kuuta`;
}

function startsForDuration(hours: number): Slot[] {
  const lastStart = CLOSE_HOUR - hours;
  return ALL_SLOTS.filter((s) => {
    const h = parseInt(s.split(":")[0], 10);
    return h >= OPEN_HOUR && h <= lastStart;
  });
}

function durationLabel(d: Duration, t: T) {
  return t.booking.durationLabels[d];
}

export default function BookingModule() {
  const t = useT();
  const { locale } = useLocale();
  const searchParams = useSearchParams();

  const [step, setStep] = useState<Step>(1);
  const [maxStepReached, setMaxStepReached] = useState<Step>(1);
  const [availability, setAvailability] = useState<DayAvailability[] | null>(null);
  const [loadingAvail, setLoadingAvail] = useState(true);

  const initialDuration = useMemo(() => {
    const d = searchParams?.get("duration");
    return d && DURATIONS.some((x) => x.value === d) ? (d as Duration) : null;
  }, [searchParams]);

  const [duration, setDuration] = useState<Duration | null>(initialDuration);
  const [date, setDate] = useState<string | null>(null);
  const [slot, setSlot] = useState<Slot | null>(null);
  const [quantity, setQuantity] = useState(1);
  // Pickup is now driven by a mode toggle: "default" (drop the jet
  // off at Kipparlahti for the customer) or "delivery" (we deliver to
  // a chosen ramp elsewhere in the capital region). The legacy
  // `pickup` string is computed from these so the rest of the
  // booking flow (review row, summary, submission payload) stays
  // unchanged.
  const [pickupMode, setPickupMode] = useState<"default" | "delivery">("default");
  const [pickupRamp, setPickupRamp] = useState("");
  const [pickupRampNotes, setPickupRampNotes] = useState("");
  const pickup = useMemo(() => {
    if (pickupMode === "default") return DEFAULT_PICKUP;
    if (!pickupRamp) return "Toimitus muualle";
    return `Toimitus: ${pickupRamp}${
      pickupRampNotes.trim() ? " — " + pickupRampNotes.trim() : ""
    }`;
  }, [pickupMode, pickupRamp, pickupRampNotes]);
  const [notes, setNotes] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);

  function goTo(next: Step) {
    setStep(next);
    if (next > maxStepReached) setMaxStepReached(next);
    requestAnimationFrame(() => {
      const el = cardRef.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - 88;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    });
  }

  useEffect(() => {
    if (step !== 2 || availability !== null) return;
    let cancelled = false;
    async function load() {
      setLoadingAvail(true);
      try {
        const res = await fetch("/api/availability?days=60");
        const data = await res.json();
        if (!cancelled && data.ok) {
          setAvailability(data.days);
          const first = (data.days as DayAvailability[]).find((d) =>
            ALL_SLOTS.some((s) => (d.slots[s] ?? MAX_QUANTITY) > 0)
          );
          if (first && !date) setDate(first.date);
        }
      } finally {
        if (!cancelled) setLoadingAvail(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [step, availability, date]);

  const selectedDay = useMemo(
    () => availability?.find((d) => d.date === date) ?? null,
    [availability, date]
  );

  const durHours =
    duration ? DURATIONS.find((d) => d.value === duration)!.hours : 0;
  const validStarts = useMemo(
    () => (durHours > 0 ? startsForDuration(durHours) : []),
    [durHours]
  );

  const price = useMemo(
    () =>
      duration
        ? calculatePrice(duration, quantity)
        : { base: 0, delivery: 0, subtotal: 0, total: 0, hours: 0 },
    [duration, quantity]
  );

  const slotCapacity =
    slot && selectedDay ? (selectedDay.slots[slot] ?? MAX_QUANTITY) : MAX_QUANTITY;

  useEffect(() => {
    if (quantity > slotCapacity) setQuantity(Math.max(1, slotCapacity));
  }, [slotCapacity, quantity]);

  useEffect(() => {
    if (slot && !validStarts.includes(slot)) setSlot(null);
  }, [validStarts, slot]);

  function canGoStep3() {
    return Boolean(date && slot && (slotCapacity ?? 0) > 0);
  }
  function canGoStep4() {
    if (!name.trim() || !phone.trim() || !email.trim()) return false;
    if (pickupMode === "delivery") {
      if (!pickupRamp.trim()) return false;
      // "Muu paikka pääkaupunkiseudulla" has no fixed address — that
      // option is reserved for phone/email co-ordination, not the
      // self-serve form. Block step 4 to push the user to call us.
      const ramp = DELIVERY_RAMPS.find((r) => r.name === pickupRamp);
      if (!ramp || !ramp.address) return false;
    }
    return true;
  }

  async function handleSubmit() {
    setStatus("submitting");
    setErrorMsg(null);
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date, slot, duration, quantity, name, phone, email, pickup, notes,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok)
        throw new Error(data.error || "Booking failed");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  // After a successful submit the step 4 review block is replaced by
  // the shorter SuccessView. The document gets shorter, leaving the
  // browser parked at a scroll position that now sits below the new
  // content — the page appears to "jump down". Scroll the booking
  // card back to the top of the viewport so the customer lands on
  // the success message instead of in empty space.
  useEffect(() => {
    if (status !== "success") return;
    requestAnimationFrame(() => {
      const el = cardRef.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - 88;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    });
  }, [status]);

  return (
    <section
      id="book"
      className="relative z-20 px-4 sm:px-6 md:px-8 py-10 md:py-16"
    >
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto card overflow-hidden border-2 border-brand-primary/30 scroll-mt-24"
      >
        {status !== "success" && (
          <MobileSummary
            duration={duration}
            date={date}
            slot={slot}
            quantity={quantity}
            total={price.total}
            t={t}
          />
        )}

        <div className="grid lg:grid-cols-[1.5fr_1fr]">
          <div className="p-5 sm:p-7 lg:p-9">
            <Header
              step={step}
              maxStepReached={maxStepReached}
              onJump={goTo}
              t={t}
            />

            {status === "success" ? (
              <SuccessView
                t={t}
                locale={locale}
                onReset={() => {
                  setStatus("idle");
                  setStep(1);
                  setMaxStepReached(1);
                  setDuration(null);
                  setDate(null);
                  setSlot(null);
                  setQuantity(1);
                  setName("");
                  setPhone("");
                  setEmail("");
                  setPickupMode("default");
                  setPickupRamp("");
                  setPickupRampNotes("");
                  setNotes("");
                }}
                date={date!}
                slot={slot!}
                duration={duration!}
                quantity={quantity}
                pickup={pickup}
                total={price.total}
              />
            ) : (
              <div className="mt-2">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <StepWrapper key="s1">
                      <Field
                        icon={<Users size={16} />}
                        label={t.booking.qtyTitle}
                      >
                        <div className="grid grid-cols-2 gap-3">
                          {[1, 2].map((n) => {
                            const active = quantity === n;
                            return (
                              <button
                                type="button"
                                key={n}
                                onClick={() => setQuantity(n)}
                                className={`relative p-4 sm:p-5 rounded-2xl border-2 transition-all flex flex-col items-center text-center ${
                                  active
                                    ? "border-brand-secondary bg-brand-secondary text-white"
                                    : "border-brand-primary/30 bg-white text-brand-secondary hover:border-brand-primary"
                                }`}
                              >
                                {active && (
                                  <span className="absolute top-3 right-3">
                                    <CheckCircle2 size={18} className="text-brand-primary" />
                                  </span>
                                )}
                                <span className="font-display text-3xl sm:text-4xl font-extrabold leading-none">
                                  {n}
                                </span>
                                <span
                                  className={`text-[11px] mt-2 ${
                                    active ? "text-white/70" : "text-brand-secondary/55"
                                  }`}
                                >
                                  {n === 1 ? t.booking.qty1People : t.booking.qty2People}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                        <p className="mt-2 inline-flex items-start gap-1.5 text-xs text-brand-secondary/70">
                          <Info size={12} className="text-brand-primary-600 mt-0.5 shrink-0" />
                          <span>{t.booking.qtyHelper}</span>
                        </p>
                      </Field>

                      <Field
                        icon={<Hourglass size={16} />}
                        label={t.booking.durationTitle}
                        required
                      >
                        <div className="grid grid-cols-2 gap-3">
                          {DURATIONS.map((d) => {
                            const active = duration === d.value;
                            return (
                              <button
                                type="button"
                                key={d.value}
                                onClick={() => setDuration(d.value)}
                                className={`relative text-left p-4 sm:p-5 rounded-2xl border-2 transition-all ${
                                  active
                                    ? "border-brand-secondary bg-brand-secondary text-white"
                                    : "border-brand-primary/30 bg-white text-brand-secondary hover:border-brand-primary"
                                }`}
                              >
                                {active && (
                                  <span className="absolute top-3 right-3">
                                    <CheckCircle2 size={18} className="text-brand-primary" />
                                  </span>
                                )}
                                <div className="font-display text-xl sm:text-2xl font-extrabold">
                                  {durationLabel(d.value, t)}
                                </div>
                                <div className="font-display text-2xl sm:text-3xl font-extrabold mt-2">
                                  {BASE_PRICES[d.value]} €
                                </div>
                                <div
                                  className={`text-xs mt-1 ${
                                    active ? "text-white/70" : "text-brand-secondary/60"
                                  }`}
                                >
                                  {t.booking.includedLine}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </Field>

                      <ContactNote
                        title={t.booking.contactCustomTitle}
                        body={t.booking.contactCustomBody}
                      />

                      <NextRow
                        rightLabel={t.common.continue}
                        rightDisabled={!duration}
                        onRight={() => goTo(2)}
                        t={t}
                      />
                    </StepWrapper>
                  )}

                  {step === 2 && (
                    <StepWrapper key="s2">
                      <SectionLabel
                        icon={<CalendarIcon size={18} />}
                        text={t.booking.pickDay}
                        small={t.booking.pickDayHelper}
                      />
                      {loadingAvail ? (
                        <CalendarSkeleton />
                      ) : (
                        <MonthCalendar
                          days={availability ?? []}
                          validStarts={validStarts}
                          selected={date}
                          onPick={(d) => {
                            setDate(d);
                            setSlot(null);
                          }}
                          t={t}
                        />
                      )}

                      {date && (
                        <div className="mt-1">
                          <SectionLabel
                            icon={<Clock size={18} />}
                            text={t.booking.startTimeTitle.replace(
                              "{date}",
                              fmtLongDate(date, t, locale)
                            )}
                            small={t.booking.hours
                              .replace("{open}", String(OPEN_HOUR))
                              .replace("{close}", String(CLOSE_HOUR))}
                          />
                          <SlotGrid
                            day={selectedDay}
                            validStarts={validStarts}
                            selected={slot}
                            onPick={setSlot}
                            t={t}
                          />
                        </div>
                      )}

                      <ContactNote
                        title={t.booking.contactTitle}
                        body={t.booking.contactBody}
                      />

                      <NextRow
                        onLeft={() => goTo(1)}
                        rightLabel={
                          duration
                            ? `${t.common.continue} · ${price.total} €`
                            : t.common.continue
                        }
                        rightDisabled={!canGoStep3()}
                        onRight={() => goTo(3)}
                        t={t}
                      />
                    </StepWrapper>
                  )}

                  {step === 3 && (
                    <StepWrapper key="s3">
                      <Field
                        icon={<MapPin size={16} />}
                        label={t.booking.pickupTitle}
                      >
                        {/* Pickup-vs-delivery toggle. Same active /
                            inactive treatment as the quantity and
                            duration buttons in step 1, so the booking
                            flow's choice tiles all read as one family. */}
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          {(
                            [
                              {
                                mode: "default" as const,
                                label: t.booking.pickupModeDefault,
                                hint: t.booking.pickupModeDefaultHint,
                              },
                              {
                                mode: "delivery" as const,
                                label: t.booking.pickupModeDelivery,
                                hint: t.booking.pickupModeDeliveryHint,
                              },
                            ]
                          ).map((opt) => {
                            const active = pickupMode === opt.mode;
                            return (
                              <button
                                type="button"
                                key={opt.mode}
                                onClick={() => setPickupMode(opt.mode)}
                                className={`relative text-left p-4 rounded-2xl border-2 transition-all ${
                                  active
                                    ? "border-brand-secondary bg-brand-secondary text-white"
                                    : "border-brand-primary/30 bg-white text-brand-secondary hover:border-brand-primary"
                                }`}
                              >
                                {active && (
                                  <span className="absolute top-3 right-3">
                                    <CheckCircle2
                                      size={18}
                                      className="text-brand-primary"
                                    />
                                  </span>
                                )}
                                <div className="font-display font-extrabold text-base sm:text-lg leading-tight pr-6">
                                  {opt.label}
                                </div>
                                <div
                                  className={`text-xs mt-1 ${
                                    active
                                      ? "text-white/70"
                                      : "text-brand-secondary/60"
                                  }`}
                                >
                                  {opt.hint}
                                </div>
                              </button>
                            );
                          })}
                        </div>

                        {pickupMode === "default" ? (
                          <PickupInfo
                            withContact={false}
                            description={t.booking.pickupDefaultBody}
                          />
                        ) : (
                          <div className="rounded-2xl border-2 border-brand-primary/30 bg-white p-4 sm:p-5 space-y-4">
                            <div>
                              <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-secondary/70">
                                <span>{t.booking.deliveryRampLabel}</span>
                                <span
                                  className="text-brand-primary-600 normal-case tracking-normal"
                                  aria-hidden
                                >
                                  *
                                </span>
                              </span>
                              <select
                                value={pickupRamp}
                                onChange={(e) =>
                                  setPickupRamp(e.target.value)
                                }
                                className="booking-input mt-2"
                              >
                                <option value="">
                                  {t.booking.deliveryRampPlaceholder}
                                </option>
                                {DELIVERY_RAMPS.map((r) => (
                                  <option key={r.name} value={r.name}>
                                    {r.name}
                                  </option>
                                ))}
                              </select>
                            </div>

                            {(() => {
                              const ramp = DELIVERY_RAMPS.find(
                                (r) => r.name === pickupRamp,
                              );
                              if (!ramp) return null;
                              if (ramp.address) {
                                const mapsQuery = encodeURIComponent(
                                  ramp.address,
                                );
                                return (
                                  <div className="rounded-xl bg-brand-primary-50 border-2 border-brand-primary/40 p-4">
                                    <div className="flex items-start gap-2.5">
                                      <MapPin
                                        size={18}
                                        className="text-brand-primary-600 mt-0.5 shrink-0"
                                      />
                                      <div className="min-w-0">
                                        <div className="text-[11px] font-bold uppercase tracking-wider text-brand-secondary/70">
                                          {t.booking.deliveryAddressLabel}
                                        </div>
                                        <div className="font-display font-extrabold text-brand-secondary mt-0.5">
                                          {ramp.address}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="mt-3 flex flex-wrap gap-2">
                                      <a
                                        href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 rounded-xl bg-brand-secondary text-white px-3 h-10 text-sm font-semibold transition-all hover:bg-white hover:text-brand-secondary hover:ring-2 hover:ring-brand-primary"
                                      >
                                        <MapPin size={14} /> Avaa Google Maps
                                      </a>
                                      <a
                                        href={`https://maps.apple.com/?q=${mapsQuery}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 rounded-xl bg-brand-secondary text-white px-3 h-10 text-sm font-semibold transition-all hover:bg-white hover:text-brand-secondary hover:ring-2 hover:ring-brand-primary"
                                      >
                                        <MapPin size={14} /> Avaa Apple Maps
                                      </a>
                                    </div>
                                  </div>
                                );
                              }
                              // "Muu paikka" path — no fixed address, so the
                              // self-serve form can't take this. Surface
                              // phone + email so the user contacts us
                              // directly. canGoStep4() also blocks the next
                              // button while this card is visible.
                              return (
                                <div className="rounded-xl bg-brand-secondary text-white p-4 sm:p-5 relative overflow-hidden">
                                  <div className="absolute inset-0 pattern-grid opacity-25 pointer-events-none" />
                                  <div className="relative">
                                    <div className="font-display font-extrabold text-lg">
                                      {t.booking.deliveryOtherTitle}
                                    </div>
                                    <p className="text-sm text-white/85 mt-1.5 leading-relaxed">
                                      {t.booking.deliveryOtherBody}
                                    </p>
                                    <div className="mt-3 flex flex-wrap gap-2">
                                      <a
                                        href="tel:+358401866664"
                                        className="inline-flex items-center gap-2 rounded-xl bg-brand-primary text-brand-secondary px-3 h-10 text-sm font-semibold transition-all hover:bg-white hover:ring-2 hover:ring-brand-primary"
                                      >
                                        <Phone size={14} /> +358 40 186 6664
                                      </a>
                                      <a
                                        href="mailto:82rentals.info@gmail.com"
                                        className="inline-flex items-center gap-2 rounded-xl bg-brand-primary text-brand-secondary px-3 h-10 text-sm font-semibold transition-all hover:bg-white hover:ring-2 hover:ring-brand-primary"
                                      >
                                        <Mail size={14} /> 82rentals.info@gmail.com
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              );
                            })()}

                            <div>
                              <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-secondary/70">
                                <span>{t.booking.deliveryNotesLabel}</span>
                                <span className="text-brand-secondary/45 normal-case tracking-normal font-medium">
                                  (valinnainen)
                                </span>
                              </span>
                              <textarea
                                value={pickupRampNotes}
                                onChange={(e) =>
                                  setPickupRampNotes(e.target.value)
                                }
                                rows={4}
                                placeholder={
                                  t.booking.deliveryNotesPlaceholder
                                }
                                className="booking-input booking-textarea mt-2"
                              />
                              <p className="mt-2 inline-flex items-start gap-1.5 text-xs text-brand-secondary/70">
                                <Info
                                  size={12}
                                  className="text-brand-primary-600 mt-0.5 shrink-0"
                                />
                                <span>{t.booking.deliveryNotesHint}</span>
                              </p>
                            </div>
                          </div>
                        )}
                      </Field>

                      <Field
                        icon={<UserIcon size={16} />}
                        label={t.booking.fullName}
                        required
                      >
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder={t.booking.fullNamePlaceholder}
                          className="booking-input"
                          autoComplete="name"
                        />
                      </Field>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <Field
                          icon={<Phone size={16} />}
                          label={t.common.phone}
                          required
                        >
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder={t.booking.phonePlaceholder}
                            className="booking-input"
                            autoComplete="tel"
                            inputMode="tel"
                          />
                        </Field>
                        <Field
                          icon={<Mail size={16} />}
                          label={t.common.email}
                          required
                        >
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={t.booking.emailPlaceholder}
                            className="booking-input"
                            autoComplete="email"
                            inputMode="email"
                          />
                        </Field>
                      </div>

                      <Field label={t.booking.additionalInfo} optional>
                        <textarea
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          rows={4}
                          placeholder={t.booking.additionalPlaceholder}
                          className="booking-input booking-textarea"
                        />
                      </Field>

                      <NextRow
                        onLeft={() => goTo(2)}
                        rightLabel={
                          duration
                            ? `${t.booking.checkLabel} · ${price.total} €`
                            : t.booking.reviewTitle
                        }
                        rightDisabled={!canGoStep4()}
                        onRight={() => goTo(4)}
                        t={t}
                      />
                    </StepWrapper>
                  )}

                  {step === 4 && (
                    <StepWrapper key="s4">
                      <Field icon={<Sparkles size={16} />} label={t.booking.reviewTitle}>
                        <div className="rounded-2xl border-2 border-brand-primary/30 bg-white divide-y divide-brand-primary/15">
                          <ReviewRow label={t.booking.reviewLabels.day} value={fmtShortDate(date!, t)} onEdit={() => goTo(2)} editLabel={t.booking.edit} />
                          <ReviewRow label={t.booking.reviewLabels.time} value={slot!} onEdit={() => goTo(2)} editLabel={t.booking.edit} />
                          <ReviewRow
                            label={t.booking.reviewLabels.duration}
                            value={duration ? durationLabel(duration, t) : ""}
                            onEdit={() => goTo(1)}
                            editLabel={t.booking.edit}
                          />
                          <ReviewRow
                            label={t.booking.reviewLabels.quantity}
                            value={t.booking.summaryQtyValue.replace("{n}", String(quantity))}
                            onEdit={() => goTo(3)}
                            editLabel={t.booking.edit}
                          />
                          <ReviewRow label={t.booking.reviewLabels.pickup} value={pickup} onEdit={() => goTo(3)} editLabel={t.booking.edit} />
                          <ReviewRow label={t.booking.reviewLabels.name} value={name} onEdit={() => goTo(3)} editLabel={t.booking.edit} />
                          <ReviewRow label={t.booking.reviewLabels.phone} value={phone} onEdit={() => goTo(3)} editLabel={t.booking.edit} />
                          <ReviewRow label={t.booking.reviewLabels.email} value={email} onEdit={() => goTo(3)} editLabel={t.booking.edit} />
                          {notes && <ReviewRow label={t.booking.reviewLabels.notes} value={notes} onEdit={() => goTo(3)} editLabel={t.booking.edit} />}
                        </div>
                      </Field>

                      <div className="rounded-2xl bg-brand-primary-50 p-5 flex items-start gap-3">
                        <Info size={18} className="text-brand-secondary shrink-0 mt-0.5" />
                        <p className="text-sm text-brand-secondary/85 leading-relaxed">
                          {t.booking.reviewLegal}
                        </p>
                      </div>

                      <label className="flex items-start gap-3 rounded-2xl border-2 border-brand-primary/40 bg-white p-4 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={acceptTerms}
                          onChange={(e) => setAcceptTerms(e.target.checked)}
                          className="h-5 w-5 mt-0.5 shrink-0 accent-brand-secondary"
                        />
                        <span className="text-sm text-brand-secondary/85 leading-relaxed">
                          {t.booking.acceptTermsBefore}{" "}
                          <a
                            href="/sopimusehdot"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-bold text-brand-secondary underline decoration-brand-primary decoration-2 underline-offset-4 hover:text-brand-primary-700"
                          >
                            {t.booking.acceptTermsLink} ↗
                          </a>
                          {t.booking.acceptTermsAfter}
                        </span>
                      </label>

                      {errorMsg && (
                        <p className="text-sm text-red-700 bg-red-50 rounded-xl p-3 border border-red-100">
                          {errorMsg}
                        </p>
                      )}

                      <NextRow
                        onLeft={() => goTo(3)}
                        rightLabel={
                          status === "submitting"
                            ? t.booking.submitting
                            : `${t.booking.submit} · ${price.total} €`
                        }
                        rightLoading={status === "submitting"}
                        rightDisabled={status === "submitting" || !acceptTerms}
                        onRight={handleSubmit}
                        t={t}
                      />
                    </StepWrapper>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          <aside className="hidden lg:block bg-brand-secondary text-white p-7 lg:p-9 relative overflow-hidden">
            <div className="absolute inset-0 pattern-grid opacity-30 pointer-events-none" />
            <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-brand-primary/22 blur-3xl pointer-events-none" />
            <span
              aria-hidden
              className="num82-outline-dark absolute -right-1 -bottom-3 font-display font-extrabold text-[6rem] leading-none select-none pointer-events-none tracking-tight"
            >
              82
            </span>

            <div className="relative">
              <p className="text-xs uppercase tracking-[0.18em] text-brand-primary font-bold">
                {t.booking.summaryEyebrow}
              </p>
              <h3 className="font-display text-2xl font-bold mt-1">
                {t.booking.summaryProduct}
              </h3>

              <dl className="mt-6 space-y-3 text-sm">
                <SumRow
                  label={t.booking.summaryDuration}
                  value={duration ? durationLabel(duration, t) : "—"}
                />
                <SumRow
                  label={t.booking.summaryDate}
                  value={date ? fmtShortDate(date, t) : "—"}
                />
                <SumRow label={t.booking.summarySlot} value={slot ?? "—"} />
                <SumRow
                  label={t.booking.summaryQty}
                  value={t.booking.summaryQtyValue.replace("{n}", String(quantity))}
                />
                <SumRow label={t.booking.summaryPickup} value={pickup || "—"} />
              </dl>

              <div className="my-6 h-px bg-white/20" />

              <dl className="space-y-2 text-sm">
                <SumRow
                  label={t.booking.summaryRent}
                  value={duration ? `${price.base} €` : "—"}
                  muted
                />
                <SumRow
                  label={t.booking.summaryFuelIncluded}
                  value={t.booking.summaryDeliveryValue}
                  muted
                />
                <SumRow
                  label={t.booking.summaryDelivery}
                  value={t.booking.summaryDeliveryValue}
                  muted
                />
                <SumRow
                  label={t.booking.summaryBriefing}
                  value={t.booking.summaryDeliveryValue}
                  muted
                />
              </dl>

              <div className="mt-6 flex items-end justify-between">
                <span className="text-sm uppercase tracking-wider text-white/70">
                  {t.booking.summaryTotal}
                </span>
                <span className="font-display text-4xl font-extrabold text-brand-primary">
                  {duration ? `${price.total} €` : "—"}
                </span>
              </div>
            </div>
          </aside>
        </div>
      </motion.div>

      <style jsx>{`
        :global(.booking-input) {
          width: 100%;
          height: 3rem;
          padding: 0 0.875rem;
          border-radius: 0.75rem;
          border: 2px solid rgba(110, 198, 255, 0.3);
          background: white;
          color: #0a3d62;
          font-weight: 500;
          font-size: 16px;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        :global(.booking-input:focus) {
          border-color: #0a3d62;
          box-shadow: 0 0 0 3px rgba(110, 198, 255, 0.25);
        }
        :global(.booking-textarea) {
          height: auto;
          padding: 0.95rem 0.875rem 0.75rem;
          resize: none;
          line-height: 1.45;
        }
      `}</style>
    </section>
  );
}

/* ----- shared sub-components ----- */

function MobileSummary({
  duration,
  date,
  slot,
  quantity,
  total,
  t,
}: {
  duration: Duration | null;
  date: string | null;
  slot: string | null;
  quantity: number;
  total: number;
  t: T;
}) {
  if (!duration && !date) return null;
  const durLabel = duration ? durationLabel(duration, t) : null;
  return (
    <div className="lg:hidden bg-brand-secondary text-white px-5 sm:px-7 py-3 flex items-center justify-between gap-3 border-b border-white/10">
      <div className="text-xs sm:text-sm flex flex-wrap gap-x-3 gap-y-1 min-w-0">
        {durLabel && <span className="text-brand-primary font-bold">{durLabel}</span>}
        {date && <span className="text-white/85">{fmtShortDate(date, t)}</span>}
        {slot && <span className="text-white/85">{slot}</span>}
        <span className="text-white/85">{quantity}×</span>
      </div>
      <span className="font-display text-xl font-extrabold text-brand-primary tabular-nums shrink-0">
        {total > 0 ? `${total} €` : "—"}
      </span>
    </div>
  );
}

function Header({
  step,
  maxStepReached,
  onJump,
  t,
}: {
  step: Step;
  maxStepReached: Step;
  onJump: (s: Step) => void;
  t: T;
}) {
  const headerLabel = t.booking.stepHeader.replace("{n}", String(step));
  const stepLabel = t.booking.stepLabels[step - 1];
  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
      <div>
        <span className="section-eyebrow !mb-1">{headerLabel}</span>
        <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-brand-secondary leading-tight">
          {stepLabel}
        </h2>
      </div>
      <Stepper current={step} maxStepReached={maxStepReached} onJump={onJump} t={t} />
    </div>
  );
}

function Stepper({
  current,
  maxStepReached,
  onJump,
  t,
}: {
  current: Step;
  maxStepReached: Step;
  onJump: (s: Step) => void;
  t: T;
}) {
  return (
    <div className="flex items-center gap-1.5 text-xs font-medium shrink-0">
      {[1, 2, 3, 4].map((n) => {
        const isCurrent = current === n;
        const isPast = current > n || maxStepReached >= n;
        const clickable = isPast && !isCurrent;
        return (
          <button
            type="button"
            key={n}
            onClick={() => clickable && onJump(n as Step)}
            disabled={!clickable}
            className={`h-8 w-8 rounded-full grid place-items-center font-bold transition-colors ${
              isCurrent
                ? "bg-brand-secondary text-white"
                : isPast
                ? "bg-brand-primary text-brand-secondary hover:bg-brand-primary-600"
                : "bg-brand-primary-50 text-brand-secondary/50 cursor-not-allowed"
            }`}
            aria-label={t.booking.stepLabels[n - 1]}
            aria-current={isCurrent ? "step" : undefined}
          >
            {current > n ? <CheckCircle2 size={14} /> : n}
          </button>
        );
      })}
    </div>
  );
}

function StepWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
      className="space-y-5 sm:space-y-6"
    >
      {children}
    </motion.div>
  );
}

function NextRow({
  onLeft,
  onRight,
  rightLabel,
  rightDisabled,
  rightLoading,
  t,
}: {
  onLeft?: () => void;
  onRight: () => void;
  rightLabel: string;
  rightDisabled?: boolean;
  rightLoading?: boolean;
  t: T;
}) {
  return (
    <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
      {onLeft && (
        <button
          type="button"
          onClick={onLeft}
          className="btn-outline sm:flex-1 justify-center !min-h-[52px]"
        >
          <ArrowLeft size={16} />
          {t.common.back}
        </button>
      )}
      <button
        type="button"
        onClick={onRight}
        disabled={rightDisabled}
        className="btn-primary sm:flex-[2] !py-4 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {rightLoading ? (
          <Loader2 size={18} className="animate-spin" />
        ) : (
          <>
            {rightLabel}
            <ArrowRight size={18} />
          </>
        )}
      </button>
    </div>
  );
}

function SectionLabel({
  icon,
  text,
  small,
}: {
  icon?: React.ReactNode;
  text: string;
  small?: string;
}) {
  return (
    <div className="flex items-end justify-between gap-3 mb-3">
      <div className="flex items-center gap-2">
        {icon && <span className="text-brand-primary-600">{icon}</span>}
        <span className="font-display text-base sm:text-lg font-bold text-brand-secondary">
          {text}
        </span>
      </div>
      {small && (
        <span className="text-[11px] text-brand-secondary/55 hidden sm:inline">
          {small}
        </span>
      )}
    </div>
  );
}

function ContactNote({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl bg-brand-primary-50 border-2 border-brand-primary/30 p-4 sm:p-5">
      <div className="flex items-start gap-3">
        <span className="h-10 w-10 shrink-0 rounded-xl bg-brand-primary text-brand-secondary grid place-items-center">
          <Phone size={18} />
        </span>
        <div className="flex-1 min-w-0">
          <h4 className="font-display font-bold text-brand-secondary text-sm sm:text-base">
            {title}
          </h4>
          <p className="text-xs sm:text-sm text-brand-secondary/75 mt-1 leading-relaxed">
            {body}
          </p>
          <div className="flex flex-col sm:flex-row gap-2 mt-3">
            <a
              href="tel:+358401866664"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-secondary text-white text-sm font-semibold px-4 py-2.5 transition-all hover:bg-white hover:text-brand-secondary hover:ring-2 hover:ring-brand-primary"
            >
              <Phone size={14} />
              +358 40 186 6664
            </a>
            <a
              href="mailto:82rentals.info@gmail.com"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-secondary text-white text-sm font-semibold px-4 py-2.5 transition-all hover:bg-white hover:text-brand-secondary hover:ring-2 hover:ring-brand-primary"
            >
              <Mail size={14} />
              82rentals.info@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Calendar utilities */

type GridDay = {
  iso: string;
  day: number;
  outside: boolean;
  isPast: boolean;
};

// Local-date → "YYYY-MM-DD" without going through .toISOString(),
// which converts to UTC and shifts the date by one for any browser
// east of Greenwich. The whole calendar grid keys off these
// strings, so a Helsinki-local 16.5. was previously being looked up
// against "2026-05-15" availability data → opening day showed as
// fully closed and the rest of the row was off by one.
function toLocalIso(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function buildMonthGrid(year: number, month: number): GridDay[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const first = new Date(year, month, 1);
  const startDay = (first.getDay() + 6) % 7;
  const days: GridDay[] = [];

  for (let i = startDay - 1; i >= 0; i--) {
    const d = new Date(year, month, -i);
    days.push({
      iso: toLocalIso(d),
      day: d.getDate(),
      outside: true,
      isPast: d < today,
    });
  }
  const lastOfMonth = new Date(year, month + 1, 0).getDate();
  for (let i = 1; i <= lastOfMonth; i++) {
    const d = new Date(year, month, i);
    days.push({
      iso: toLocalIso(d),
      day: i,
      outside: false,
      isPast: d < today,
    });
  }
  while (days.length % 7 !== 0) {
    const last = days[days.length - 1];
    const lastDate = new Date(last.iso + "T00:00:00");
    const next = new Date(lastDate);
    next.setDate(next.getDate() + 1);
    days.push({
      iso: toLocalIso(next),
      day: next.getDate(),
      outside: true,
      isPast: false,
    });
  }
  return days;
}

// Skeleton placeholder for the month calendar while availability is
// loading. Mirrors MonthCalendar's exact layout (header row with prev/
// next buttons + month/year, day-of-week strip, 6×7 day grid) so the
// content slot doesn't shift when the real grid replaces it. Everything
// pulses gently via Tailwind's `animate-pulse` to read as "loading".
function CalendarSkeleton() {
  return (
    <div aria-busy="true" aria-label="Ladataan kalenteria">
      <div className="flex items-center justify-between mb-3">
        <div className="h-10 w-10 rounded-xl bg-brand-primary-50 animate-pulse" />
        <div className="h-5 w-32 rounded bg-brand-primary-50 animate-pulse" />
        <div className="h-10 w-10 rounded-xl bg-brand-primary-50 animate-pulse" />
      </div>
      <div className="grid grid-cols-7 gap-1 sm:gap-1.5 mb-1.5">
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={`h-${i}`}
            className="h-4 rounded bg-brand-primary-50/70 animate-pulse"
            style={{ animationDelay: `${i * 35}ms` }}
          />
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
        {Array.from({ length: 42 }).map((_, i) => (
          <div
            key={`d-${i}`}
            className="aspect-square rounded-lg bg-brand-primary-50 animate-pulse"
            style={{ animationDelay: `${(i % 7) * 40 + Math.floor(i / 7) * 60}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

function MonthCalendar({
  days,
  validStarts,
  selected,
  onPick,
  t,
}: {
  days: DayAvailability[];
  validStarts: Slot[];
  selected: string | null;
  onPick: (d: string) => void;
  t: T;
}) {
  const today = useMemo(() => {
    const x = new Date();
    x.setHours(0, 0, 0, 0);
    return x;
  }, []);

  const earliestIso = useMemo(() => toLocalIso(today), [today]);
  const latestIso = useMemo(() => {
    if (days.length === 0) return null;
    return days[days.length - 1].date;
  }, [days]);

  const initial = selected
    ? new Date(selected + "T00:00:00")
    : today;
  const [view, setView] = useState({
    year: initial.getFullYear(),
    month: initial.getMonth(),
  });

  const grid = useMemo(
    () => buildMonthGrid(view.year, view.month),
    [view]
  );

  const availabilityMap = useMemo(() => {
    const m = new Map<string, DayAvailability>();
    days.forEach((d) => m.set(d.date, d));
    return m;
  }, [days]);

  function shift(delta: number) {
    setView((v) => {
      const d = new Date(v.year, v.month + delta, 1);
      return { year: d.getFullYear(), month: d.getMonth() };
    });
  }

  const firstOfView = new Date(view.year, view.month, 1);
  const todayMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const canPrev = firstOfView > todayMonthStart;

  const lastOfView = new Date(view.year, view.month + 1, 0);
  const canNext = latestIso ? lastOfView < new Date(latestIso + "T00:00:00") : false;

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <button
          type="button"
          onClick={() => canPrev && shift(-1)}
          disabled={!canPrev}
          className="h-10 w-10 rounded-xl border-2 border-brand-primary/30 bg-white text-brand-secondary grid place-items-center disabled:opacity-30 disabled:cursor-not-allowed hover:border-brand-primary transition-colors"
          aria-label="Previous month"
        >
          <ArrowLeft size={18} />
        </button>
        <div className="font-display font-bold text-brand-secondary capitalize">
          {t.booking.months[view.month]} {view.year}
        </div>
        <button
          type="button"
          onClick={() => canNext && shift(1)}
          disabled={!canNext}
          className="h-10 w-10 rounded-xl border-2 border-brand-primary/30 bg-white text-brand-secondary grid place-items-center disabled:opacity-30 disabled:cursor-not-allowed hover:border-brand-primary transition-colors"
          aria-label="Next month"
        >
          <ArrowRight size={18} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 sm:gap-1.5 mb-1.5">
        {t.booking.monthDaysHead.map((d) => (
          <div
            key={d}
            className="text-[10px] sm:text-xs font-bold text-brand-secondary/55 uppercase tracking-wider text-center py-1"
          >
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
        {grid.map((g) => {
          const avail = availabilityMap.get(g.iso);
          const noData = !avail;
          const totalFree = avail
            ? validStarts.reduce((sum, s) => sum + (avail.slots[s] ?? MAX_QUANTITY), 0)
            : 0;
          const fullyBooked = !!avail && totalFree === 0;
          const disabled =
            g.outside || g.isPast || g.iso < earliestIso || noData || fullyBooked;
          const isSelected = selected === g.iso;

          let cls =
            "relative aspect-square rounded-xl text-sm font-semibold transition-all flex flex-col items-center justify-center";
          if (disabled) {
            cls += " text-brand-secondary/30 bg-brand-bg cursor-not-allowed";
          } else if (isSelected) {
            cls += " bg-brand-secondary text-white shadow-soft";
          } else {
            cls +=
              " bg-white border border-brand-primary/30 text-brand-secondary hover:border-brand-primary hover:bg-brand-primary-50 cursor-pointer";
          }

          return (
            <button
              type="button"
              key={g.iso + (g.outside ? "-o" : "")}
              onClick={() => !disabled && onPick(g.iso)}
              disabled={disabled}
              className={cls}
              aria-pressed={isSelected}
            >
              <span className={g.outside ? "opacity-40" : ""}>{g.day}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SlotGrid({
  day,
  validStarts,
  selected,
  onPick,
  t,
}: {
  day: DayAvailability | null;
  validStarts: Slot[];
  selected: Slot | null;
  onPick: (s: Slot) => void;
  t: T;
}) {
  if (!day) return null;
  // Filter out fully-booked slots entirely so the customer never sees
  // a "Varattu" tile — taken hours just don't appear in the picker.
  const available = validStarts.filter(
    (s) => (day.slots[s] ?? MAX_QUANTITY) > 0,
  );
  if (validStarts.length === 0 || available.length === 0) {
    return (
      <p className="text-sm text-brand-secondary/70">
        {t.booking.contactBody}
      </p>
    );
  }
  return (
    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-2.5">
      {available.map((s) => {
        const free = day.slots[s] ?? MAX_QUANTITY;
        const isSelected = selected === s;
        return (
          <button
            type="button"
            key={s}
            onClick={() => onPick(s)}
            className={`px-2 py-3 rounded-xl border-2 transition-all flex flex-col items-center min-h-[64px] ${
              isSelected
                ? "border-brand-secondary bg-brand-secondary text-white shadow-soft"
                : "border-brand-primary/30 bg-white text-brand-secondary hover:border-brand-primary"
            }`}
          >
            <span className="font-display text-lg font-bold leading-none">
              {s}
            </span>
            <span className="text-[10px] mt-1.5 uppercase tracking-wider">
              {free === 1
                ? t.booking.slotFreeOne
                : t.booking.slotFreeMany.replace("{n}", String(free))}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function Field({
  icon,
  label,
  children,
  required,
  optional,
}: {
  icon?: React.ReactNode;
  label: string;
  children: React.ReactNode;
  required?: boolean;
  optional?: boolean;
}) {
  // Outer wrapper is a <div>, NOT a <label>, on purpose. When this
  // component held a <label>, nesting another <label> inside (the
  // delivery panel renders inner <label>s for its select / textarea)
  // produced invalid HTML and the browser's "click anywhere on the
  // label activates the first labelable child" heuristic was
  // bouncing the focus to the first <button> in the outer Field
  // (the pickup mode toggle), which silently flipped pickupMode
  // back to "default" whenever the user clicked into the textarea.
  return (
    <div className="block">
      <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-secondary/70 mb-2">
        {icon && <span className="text-brand-primary-600">{icon}</span>}
        <span>{label}</span>
        {required && (
          <span
            className="text-brand-primary-600 normal-case tracking-normal"
            aria-hidden
          >
            *
          </span>
        )}
        {optional && (
          <span className="text-brand-secondary/45 normal-case tracking-normal font-medium">
            (valinnainen)
          </span>
        )}
      </span>
      {children}
    </div>
  );
}

function SumRow({
  label,
  value,
  muted,
}: {
  label: string;
  value: string;
  muted?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className={muted ? "text-white/60" : "text-white/85"}>{label}</dt>
      <dd className="font-semibold text-white text-right truncate max-w-[60%]">
        {value}
      </dd>
    </div>
  );
}

function ReviewRow({
  label,
  value,
  onEdit,
  editLabel,
}: {
  label: string;
  value: string;
  onEdit: () => void;
  editLabel: string;
}) {
  // Mobile: stack the label above the value so a long value
  // (delivery address, free-form notes) gets the full row width
  // and wraps cleanly, instead of fighting for 2/3 of a narrow
  // viewport. Tablet/desktop keeps the original side-by-side
  // layout because the row is plenty wide.
  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-3 px-4 py-3 text-sm">
      <span className="text-brand-secondary/60 uppercase tracking-wider text-[11px] font-bold sm:w-1/3 sm:shrink-0 sm:pt-0.5">
        {label}
      </span>
      <div className="flex items-start justify-between gap-3 sm:flex-1 sm:min-w-0">
        <span className="text-brand-secondary font-semibold flex-1 min-w-0 break-words">
          {value}
        </span>
        <button
          type="button"
          onClick={onEdit}
          className="text-xs font-semibold text-brand-primary-600 hover:text-brand-secondary shrink-0 pt-0.5"
        >
          {editLabel}
        </button>
      </div>
    </div>
  );
}

function SuccessView({
  onReset,
  date,
  slot,
  duration,
  quantity,
  pickup,
  total,
  t,
  locale,
}: {
  onReset: () => void;
  date: string;
  slot: string;
  duration: Duration;
  quantity: number;
  pickup: string;
  total: number;
  t: T;
  locale: string;
}) {
  const body = t.booking.successBody
    .replace("{qty}", String(quantity))
    .replace("{date}", fmtShortDate(date, t))
    .replace("{slot}", slot)
    .replace("{duration}", durationLabel(duration, t))
    .replace("{pickup}", pickup);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-6"
    >
      <div className="mx-auto h-16 w-16 rounded-full bg-brand-primary grid place-items-center">
        <CheckCircle2 size={36} className="text-brand-secondary" />
      </div>
      <h3 className="font-display text-2xl font-bold text-brand-secondary mt-4">
        {t.booking.successTitle}
      </h3>
      <p className="text-brand-secondary/70 mt-2 text-sm max-w-md mx-auto">
        {body}
      </p>
      <p className="text-xs text-brand-secondary/60 mt-3">
        {t.booking.successConfirm}
      </p>
      <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary text-brand-secondary text-sm font-bold">
        {t.booking.successTotal} {total} €
      </div>
      <div className="mt-6">
        <button onClick={onReset} className="btn-ghost">
          {t.booking.successAgain}
        </button>
      </div>
    </motion.div>
  );
}
