"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";

// Leaflet uses `window`, so the picker is loaded client-only.
const MapPicker = dynamic(() => import("./MapPicker"), {
  ssr: false,
  loading: () => (
    <div className="rounded-2xl border-2 border-brand-primary/30 h-[320px] sm:h-[380px] grid place-items-center text-brand-secondary/60 text-sm">
      Ladataan karttaa…
    </div>
  ),
});
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
  FUEL_PER_HOUR_EUR,
  BASE_PRICES,
} from "@/lib/pricing";

type Slot = string; // "HH:00"

const ALL_SLOTS: Slot[] = [
  "10:00", "11:00", "12:00", "13:00", "14:00",
  "15:00", "16:00", "17:00", "18:00", "19:00",
];
const OPEN_HOUR = 10;
const CLOSE_HOUR = 20;

const POPULAR_PICKUPS = [
  "Hernesaari",
  "Lauttasaari",
  "Vuosaari",
  "Hietaniemi",
  "Suomenlinna",
  "Kruunuvuori",
  "Munkkiniemi",
];

type DayAvailability = {
  date: string;
  fleetSize: number;
  slots: Record<string, number>;
};

type Status = "idle" | "submitting" | "success" | "error";
type Step = 1 | 2 | 3 | 4;

const FI_DAYS = ["Su", "Ma", "Ti", "Ke", "To", "Pe", "La"];
const FI_MONTHS = [
  "tammi", "helmi", "maalis", "huhti", "touko", "kesä",
  "heinä", "elo", "syys", "loka", "marras", "joulu",
];

function fmtShortDate(iso: string) {
  const d = new Date(iso + "T00:00:00");
  return `${FI_DAYS[d.getDay()]} ${d.getDate()}.${d.getMonth() + 1}.`;
}
function fmtLongDate(iso: string) {
  const d = new Date(iso + "T00:00:00");
  return `${FI_DAYS[d.getDay()]} ${d.getDate()}. ${FI_MONTHS[d.getMonth()]}kuuta`;
}

function startsForDuration(hours: number): Slot[] {
  const lastStart = CLOSE_HOUR - hours;
  return ALL_SLOTS.filter((s) => {
    const h = parseInt(s.split(":")[0], 10);
    return h >= OPEN_HOUR && h <= lastStart;
  });
}

const STEP_LABELS: Record<Step, string> = {
  1: "Vesijetit ja kesto",
  2: "Päivä ja aloitusaika",
  3: "Tiedot ja toimitus",
  4: "Tarkista ja vahvista",
};

export default function BookingModule() {
  const [step, setStep] = useState<Step>(1);
  const [maxStepReached, setMaxStepReached] = useState<Step>(1);
  const [availability, setAvailability] = useState<DayAvailability[] | null>(null);
  const [loadingAvail, setLoadingAvail] = useState(true);

  const [duration, setDuration] = useState<Duration | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [slot, setSlot] = useState<Slot | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [pickup, setPickup] = useState("");
  const [notes, setNotes] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const cardRef = useRef<HTMLDivElement>(null);

  // Track furthest step reached so the stepper can let users jump back, and
  // scroll the booking card back to the top so the new step is in view.
  function goTo(next: Step) {
    setStep(next);
    if (next > maxStepReached) setMaxStepReached(next);
    // Defer to the next paint so layout (including AnimatePresence exit) is
    // settled before we measure scroll position.
    requestAnimationFrame(() => {
      const el = cardRef.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - 88;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    });
  }

  // Fetch availability lazily once we hit step 2
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
        : { base: 0, fuel: 0, delivery: 0, subtotal: 0, total: 0, hours: 0 },
    [duration, quantity]
  );

  const slotCapacity =
    slot && selectedDay ? (selectedDay.slots[slot] ?? MAX_QUANTITY) : MAX_QUANTITY;

  useEffect(() => {
    if (quantity > slotCapacity) setQuantity(Math.max(1, slotCapacity));
  }, [slotCapacity, quantity]);

  // When duration changes, drop a previously chosen slot if it doesn't fit
  useEffect(() => {
    if (slot && !validStarts.includes(slot)) setSlot(null);
  }, [validStarts, slot]);

  function canGoStep3() {
    return Boolean(date && slot && (slotCapacity ?? 0) > 0);
  }
  function canGoStep4() {
    return Boolean(name.trim() && phone.trim() && email.trim() && pickup.trim());
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
        throw new Error(data.error || "Varauspyyntö epäonnistui");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Jokin meni vikaan");
    }
  }

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
        {/* Mobile-first compact summary appears above the form on small screens */}
        {status !== "success" && (
          <MobileSummary
            duration={duration}
            date={date}
            slot={slot}
            quantity={quantity}
            total={price.total}
          />
        )}

        <div className="grid lg:grid-cols-[1.5fr_1fr]">
          {/* LEFT: stepper */}
          <div className="p-5 sm:p-7 lg:p-9">
            <Header
              step={step}
              maxStepReached={maxStepReached}
              onJump={goTo}
            />

            {status === "success" ? (
              <SuccessView
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
                  setPickup("");
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
                        label="Kuinka monta vesijettiä?"
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
                                  className={`text-xs mt-2 font-semibold uppercase tracking-wider ${
                                    active ? "text-white/80" : "text-brand-secondary/65"
                                  }`}
                                >
                                  {n === 1 ? "vesijetti" : "vesijettiä"}
                                </span>
                                <span
                                  className={`text-[11px] mt-1 ${
                                    active ? "text-white/70" : "text-brand-secondary/55"
                                  }`}
                                >
                                  {n === 1 ? "1–2 henkilölle" : "2–4 henkilölle"}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                        <p className="mt-2 inline-flex items-start gap-1.5 text-xs text-brand-secondary/70">
                          <Info size={12} className="text-brand-primary-600 mt-0.5 shrink-0" />
                          <span>
                            Yhdelle vesijetille mahtuu 1–2 henkilöä. Voit ottaa
                            myös kaksi vesijettiä, jos haluatte ajaa kaksin
                            omillanne. Kalustossa maksimissaan 2 vesijettiä.
                          </span>
                        </p>
                      </Field>

                      <Field icon={<Hourglass size={16} />} label="Kuinka pitkä ajo?">
                        <div className="grid grid-cols-2 gap-3">
                          {DURATIONS.map((d) => {
                            const active = duration === d.value;
                            const fuel = FUEL_PER_HOUR_EUR * d.hours;
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
                                  {d.label}
                                </div>
                                <div className="font-display text-2xl sm:text-3xl font-extrabold mt-2">
                                  {BASE_PRICES[d.value]} €
                                </div>
                                <div
                                  className={`text-xs mt-1 ${
                                    active ? "text-white/70" : "text-brand-secondary/60"
                                  }`}
                                >
                                  + bensa {fuel} €
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </Field>

                      <ContactNote
                        title="Tarvitsetko eri pituisen paketin?"
                        body="Räätälöimme polttariporukoille, tapahtumiin ja pidempiin ajoihin. Soita tai laita sähköpostia, vastaamme heti."
                      />

                      <NextRow
                        rightLabel="Jatka"
                        rightDisabled={!duration}
                        onRight={() => goTo(2)}
                      />
                    </StepWrapper>
                  )}

                  {step === 2 && (
                    <StepWrapper key="s2">
                      <SectionLabel
                        icon={<CalendarIcon size={18} />}
                        text="Valitse päivä"
                        small="Selaa kuukausia nuolista"
                      />
                      {loadingAvail ? (
                        <div className="h-72 rounded-xl bg-brand-primary-50 grid place-items-center text-brand-secondary/60 text-sm">
                          Ladataan vapaita aikoja…
                        </div>
                      ) : (
                        <MonthCalendar
                          days={availability ?? []}
                          validStarts={validStarts}
                          selected={date}
                          onPick={(d) => {
                            setDate(d);
                            setSlot(null);
                          }}
                        />
                      )}

                      {date && (
                        <div className="mt-1">
                          <SectionLabel
                            icon={<Clock size={18} />}
                            text={`Aloitusaika · ${fmtLongDate(date)}`}
                            small={`Aukioloajat klo ${OPEN_HOUR}–${CLOSE_HOUR}`}
                          />
                          <SlotGrid
                            day={selectedDay}
                            validStarts={validStarts}
                            selected={slot}
                            onPick={setSlot}
                          />
                        </div>
                      )}

                      <ContactNote
                        title="Haluatko muun ajan?"
                        body="Aukioloajan ulkopuoliset ajot, aikaiset aamut tai myöhäiset illat sopimuksen mukaan. Soita tai laita sähköpostia, järjestämme."
                      />

                      <NextRow
                        onLeft={() => goTo(1)}
                        rightLabel={duration ? `Jatka · ${price.total} €` : "Jatka"}
                        rightDisabled={!canGoStep3()}
                        onRight={() => goTo(3)}
                      />
                    </StepWrapper>
                  )}

                  {step === 3 && (
                    <StepWrapper key="s3">
                      <Field
                        icon={<MapPin size={16} />}
                        label="Mihin tuomme vesijetin?"
                      >
                        <MapPicker selected={pickup} onPick={setPickup} />
                        <p className="mt-3 text-xs font-bold uppercase tracking-wider text-brand-secondary/55">
                          Tai valitse pikavalinnoista
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {POPULAR_PICKUPS.map((p) => (
                            <button
                              type="button"
                              key={p}
                              onClick={() => setPickup(p)}
                              className={`px-3 py-2 rounded-full text-sm font-semibold border-2 transition-colors min-h-[40px] ${
                                pickup === p
                                  ? "bg-brand-secondary text-white border-brand-secondary"
                                  : "bg-white text-brand-secondary border-brand-primary/30 hover:border-brand-primary"
                              }`}
                            >
                              {p}
                            </button>
                          ))}
                        </div>
                        {pickup && (
                          <div className="mt-3 inline-flex items-center gap-2 rounded-xl bg-brand-primary-50 border border-brand-primary/30 px-3 py-2 text-sm text-brand-secondary">
                            <MapPin
                              size={14}
                              className="text-brand-primary-600 shrink-0"
                            />
                            <span>
                              Toimituspaikka:{" "}
                              <strong>{pickup}</strong>
                            </span>
                          </div>
                        )}
                      </Field>

                      <Field icon={<UserIcon size={16} />} label="Koko nimi">
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Matti Meikäläinen"
                          className="booking-input"
                        />
                      </Field>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <Field icon={<Phone size={16} />} label="Puhelin">
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+358 ..."
                            className="booking-input"
                          />
                        </Field>
                        <Field icon={<Mail size={16} />} label="Sähköposti">
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="sinä@esimerkki.fi"
                            className="booking-input"
                          />
                        </Field>
                      </div>

                      <Field label="Lisätietoja (valinnainen)">
                        <textarea
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          rows={3}
                          placeholder="Esim. tarkka osoite tai erityistoiveet"
                          className="booking-input booking-textarea"
                        />
                      </Field>

                      <NextRow
                        onLeft={() => goTo(2)}
                        rightLabel={duration ? `Tarkista · ${price.total} €` : "Tarkista varaus"}
                        rightDisabled={!canGoStep4()}
                        onRight={() => goTo(4)}
                      />
                    </StepWrapper>
                  )}

                  {step === 4 && (
                    <StepWrapper key="s4">
                      <Field icon={<Sparkles size={16} />} label="Tarkista yhteenveto">
                        <div className="rounded-2xl border-2 border-brand-primary/30 bg-white divide-y divide-brand-primary/15">
                          <ReviewRow label="Päivä" value={fmtShortDate(date!)} onEdit={() => goTo(2)} />
                          <ReviewRow label="Kellonaika" value={slot!} onEdit={() => goTo(2)} />
                          <ReviewRow
                            label="Kesto"
                            value={DURATIONS.find((d) => d.value === duration)?.label || ""}
                            onEdit={() => goTo(1)}
                          />
                          <ReviewRow
                            label="Vesijettien määrä"
                            value={`${quantity}× (2 hengelle / kpl)`}
                            onEdit={() => goTo(3)}
                          />
                          <ReviewRow label="Toimitus" value={pickup} onEdit={() => goTo(3)} />
                          <ReviewRow label="Nimi" value={name} onEdit={() => goTo(3)} />
                          <ReviewRow label="Puhelin" value={phone} onEdit={() => goTo(3)} />
                          <ReviewRow label="Sähköposti" value={email} onEdit={() => goTo(3)} />
                          {notes && <ReviewRow label="Lisätiedot" value={notes} onEdit={() => goTo(3)} />}
                        </div>
                      </Field>

                      <div className="rounded-2xl bg-brand-primary-50 p-5 flex items-start gap-3">
                        <Info size={18} className="text-brand-secondary shrink-0 mt-0.5" />
                        <p className="text-sm text-brand-secondary/85 leading-relaxed">
                          Maksuton peruutus 24 tuntia ennen ajoa. Vahvistamme
                          sinulle puhelimitse 30 minuutin sisällä varauksesta.
                          Saa ajaa Suomen vesillä.
                        </p>
                      </div>

                      {errorMsg && (
                        <p className="text-sm text-red-700 bg-red-50 rounded-xl p-3 border border-red-100">
                          {errorMsg}
                        </p>
                      )}

                      <NextRow
                        onLeft={() => goTo(3)}
                        rightLabel={
                          status === "submitting"
                            ? "Varataan…"
                            : `Vahvista varaus · ${price.total} €`
                        }
                        rightLoading={status === "submitting"}
                        rightDisabled={status === "submitting"}
                        onRight={handleSubmit}
                      />
                    </StepWrapper>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* RIGHT: live summary (desktop only) */}
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
                Varauksesi
              </p>
              <h3 className="font-display text-2xl font-bold mt-1">
                Sea-Doo Spark Trixx
              </h3>

              <dl className="mt-6 space-y-3 text-sm">
                <SumRow label="Kesto" value={duration ? DURATIONS.find((d) => d.value === duration)!.label : "—"} />
                <SumRow label="Päivämäärä" value={date ? fmtShortDate(date) : "—"} />
                <SumRow label="Aloitusaika" value={slot ?? "—"} />
                <SumRow label="Vesijetit" value={`${quantity}× (2 hengelle)`} />
                <SumRow label="Toimitus" value={pickup || "—"} />
              </dl>

              <div className="my-6 h-px bg-white/20" />

              <dl className="space-y-2 text-sm">
                <SumRow label="Vuokra" value={duration ? `${price.base} €` : "—"} muted />
                <SumRow
                  label={`Bensa (${FUEL_PER_HOUR_EUR} € / h)`}
                  value={duration ? `${price.fuel} €` : "—"}
                  muted
                />
                <SumRow label="Toimitus Helsingissä" value="Sisältyy" muted />
              </dl>

              <div className="mt-6 flex items-end justify-between">
                <span className="text-sm uppercase tracking-wider text-white/70">
                  Yhteensä
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
}: {
  duration: Duration | null;
  date: string | null;
  slot: string | null;
  quantity: number;
  total: number;
}) {
  if (!duration && !date) return null;
  const durLabel = duration
    ? DURATIONS.find((d) => d.value === duration)!.label
    : null;
  return (
    <div className="lg:hidden bg-brand-secondary text-white px-5 sm:px-7 py-3 flex items-center justify-between gap-3 border-b border-white/10">
      <div className="text-xs sm:text-sm flex flex-wrap gap-x-3 gap-y-1 min-w-0">
        {durLabel && <span className="text-brand-primary font-bold">{durLabel}</span>}
        {date && <span className="text-white/85">{fmtShortDate(date)}</span>}
        {slot && <span className="text-white/85">klo {slot}</span>}
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
}: {
  step: Step;
  maxStepReached: Step;
  onJump: (s: Step) => void;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
      <div>
        <span className="section-eyebrow !mb-1">Varaus · vaihe {step}/4</span>
        <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-brand-secondary leading-tight">
          {STEP_LABELS[step]}
        </h2>
      </div>
      <Stepper current={step} maxStepReached={maxStepReached} onJump={onJump} />
    </div>
  );
}

function Stepper({
  current,
  maxStepReached,
  onJump,
}: {
  current: Step;
  maxStepReached: Step;
  onJump: (s: Step) => void;
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
            aria-label={`Vaihe ${n}: ${STEP_LABELS[n as Step]}`}
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
}: {
  onLeft?: () => void;
  onRight: () => void;
  rightLabel: string;
  rightDisabled?: boolean;
  rightLoading?: boolean;
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
          Takaisin
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
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-secondary text-white text-sm font-semibold px-4 py-2.5 hover:bg-brand-primary hover:text-brand-secondary transition-colors"
            >
              <Phone size={14} />
              +358 40 186 6664
            </a>
            <a
              href="mailto:82rentals.info@gmail.com"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white border-2 border-brand-primary/30 text-brand-secondary text-sm font-semibold px-4 py-2.5 hover:border-brand-primary transition-colors"
            >
              <Mail size={14} />
              Sähköposti
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Calendar utilities */
const FI_WEEKDAYS_HEAD = ["Ma", "Ti", "Ke", "To", "Pe", "La", "Su"];
const FI_MONTHS_FULL = [
  "tammikuu", "helmikuu", "maaliskuu", "huhtikuu", "toukokuu", "kesäkuu",
  "heinäkuu", "elokuu", "syyskuu", "lokakuu", "marraskuu", "joulukuu",
];

type GridDay = {
  iso: string;
  day: number;
  outside: boolean; // belongs to prev/next month
  isPast: boolean;
};

function buildMonthGrid(year: number, month: number): GridDay[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const first = new Date(year, month, 1);
  // Mon-first weekday index (0..6)
  const startDay = (first.getDay() + 6) % 7;
  const days: GridDay[] = [];

  // Previous month tail
  for (let i = startDay - 1; i >= 0; i--) {
    const d = new Date(year, month, -i);
    days.push({
      iso: d.toISOString().slice(0, 10),
      day: d.getDate(),
      outside: true,
      isPast: d < today,
    });
  }
  // Current month
  const lastOfMonth = new Date(year, month + 1, 0).getDate();
  for (let i = 1; i <= lastOfMonth; i++) {
    const d = new Date(year, month, i);
    days.push({
      iso: d.toISOString().slice(0, 10),
      day: i,
      outside: false,
      isPast: d < today,
    });
  }
  // Next month head, fill until 6 full weeks (42 cells) or 5 if it fits
  while (days.length % 7 !== 0) {
    const last = days[days.length - 1];
    const lastDate = new Date(last.iso + "T00:00:00");
    const next = new Date(lastDate);
    next.setDate(next.getDate() + 1);
    days.push({
      iso: next.toISOString().slice(0, 10),
      day: next.getDate(),
      outside: true,
      isPast: false,
    });
  }
  return days;
}

function MonthCalendar({
  days,
  validStarts,
  selected,
  onPick,
}: {
  days: DayAvailability[];
  validStarts: Slot[];
  selected: string | null;
  onPick: (d: string) => void;
}) {
  const today = useMemo(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  }, []);

  const earliestIso = useMemo(() => today.toISOString().slice(0, 10), [today]);
  const latestIso = useMemo(() => {
    if (days.length === 0) return null;
    return days[days.length - 1].date;
  }, [days]);

  // Initialize the view to the month of the selected date or today
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

  // Disable arrows that go outside the available data window
  const firstOfView = new Date(view.year, view.month, 1);
  const todayMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const canPrev = firstOfView > todayMonthStart;

  const lastOfView = new Date(view.year, view.month + 1, 0);
  const canNext = latestIso ? lastOfView < new Date(latestIso + "T00:00:00") : false;

  return (
    <div>
      {/* Month nav */}
      <div className="flex items-center justify-between mb-3">
        <button
          type="button"
          onClick={() => canPrev && shift(-1)}
          disabled={!canPrev}
          className="h-10 w-10 rounded-xl border-2 border-brand-primary/30 bg-white text-brand-secondary grid place-items-center disabled:opacity-30 disabled:cursor-not-allowed hover:border-brand-primary transition-colors"
          aria-label="Edellinen kuukausi"
        >
          <ArrowLeft size={18} />
        </button>
        <div className="font-display font-bold text-brand-secondary capitalize">
          {FI_MONTHS_FULL[view.month]} {view.year}
        </div>
        <button
          type="button"
          onClick={() => canNext && shift(1)}
          disabled={!canNext}
          className="h-10 w-10 rounded-xl border-2 border-brand-primary/30 bg-white text-brand-secondary grid place-items-center disabled:opacity-30 disabled:cursor-not-allowed hover:border-brand-primary transition-colors"
          aria-label="Seuraava kuukausi"
        >
          <ArrowRight size={18} />
        </button>
      </div>

      {/* Weekday header */}
      <div className="grid grid-cols-7 gap-1 sm:gap-1.5 mb-1.5">
        {FI_WEEKDAYS_HEAD.map((d) => (
          <div
            key={d}
            className="text-[10px] sm:text-xs font-bold text-brand-secondary/55 uppercase tracking-wider text-center py-1"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
        {grid.map((g) => {
          const avail = availabilityMap.get(g.iso);
          const noData = !avail;
          const totalFree = avail
            ? validStarts.reduce((sum, s) => sum + (avail.slots[s] ?? MAX_QUANTITY), 0)
            : 0;
          const fullyBooked = !!avail && totalFree === 0;
          const disabled =
            g.outside ||
            g.isPast ||
            (g.iso < earliestIso) ||
            noData ||
            fullyBooked;
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
              aria-label={`${g.day}. ${FI_MONTHS_FULL[new Date(g.iso + "T00:00:00").getMonth()]}`}
              aria-pressed={isSelected}
            >
              <span className={g.outside ? "opacity-40" : ""}>{g.day}</span>
              {/* Availability dot */}
              {!disabled && !isSelected && (
                <span
                  className={`mt-0.5 h-1 w-1 rounded-full ${
                    totalFree > 1
                      ? "bg-brand-primary"
                      : totalFree === 1
                      ? "bg-brand-primary/50"
                      : "bg-transparent"
                  }`}
                />
              )}
              {fullyBooked && !g.outside && (
                <span className="absolute bottom-0.5 text-[8px] font-bold text-red-500">
                  täynnä
                </span>
              )}
            </button>
          );
        })}
      </div>

      <p className="mt-3 flex items-center gap-3 text-[11px] text-brand-secondary/60">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-brand-primary" /> Vapaita
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-brand-primary/50" /> Niukasti
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-red-400/60" /> Täynnä
        </span>
      </p>
    </div>
  );
}

function SlotGrid({
  day,
  validStarts,
  selected,
  onPick,
}: {
  day: DayAvailability | null;
  validStarts: Slot[];
  selected: Slot | null;
  onPick: (s: Slot) => void;
}) {
  if (!day) return null;
  if (validStarts.length === 0) {
    return (
      <p className="text-sm text-brand-secondary/70">
        Tämä kesto ei mahdu aukioloaikaan, valitse lyhyempi kesto.
      </p>
    );
  }
  return (
    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-2.5">
      {validStarts.map((s) => {
        const free = day.slots[s] ?? MAX_QUANTITY;
        const taken = free === 0;
        const isSelected = selected === s;
        return (
          <button
            type="button"
            key={s}
            onClick={() => !taken && onPick(s)}
            disabled={taken}
            className={`px-2 py-3 rounded-xl border-2 transition-all flex flex-col items-center min-h-[64px] ${
              taken
                ? "border-black/5 bg-brand-bg text-brand-secondary/40 cursor-not-allowed"
                : isSelected
                ? "border-brand-secondary bg-brand-secondary text-white shadow-soft"
                : "border-brand-primary/30 bg-white text-brand-secondary hover:border-brand-primary"
            }`}
          >
            <span className="font-display text-lg font-bold leading-none">
              {s}
            </span>
            <span className="text-[10px] mt-1.5 uppercase tracking-wider">
              {taken ? "Varattu" : `${free} vapaa${free === 1 ? "" : "ta"}`}
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
}: {
  icon?: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-secondary/70 mb-2">
        {icon && <span className="text-brand-primary-600">{icon}</span>}
        {label}
      </span>
      {children}
    </label>
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
}: {
  label: string;
  value: string;
  onEdit: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3 text-sm">
      <span className="text-brand-secondary/60 uppercase tracking-wider text-[11px] font-bold w-1/3 shrink-0">
        {label}
      </span>
      <span className="text-brand-secondary font-semibold flex-1 truncate">
        {value}
      </span>
      <button
        type="button"
        onClick={onEdit}
        className="text-xs font-semibold text-brand-primary-600 hover:text-brand-secondary"
      >
        Muokkaa
      </button>
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
}: {
  onReset: () => void;
  date: string;
  slot: string;
  duration: Duration;
  quantity: number;
  pickup: string;
  total: number;
}) {
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
        Varaus vastaanotettu!
      </h3>
      <p className="text-brand-secondary/70 mt-2 text-sm max-w-md mx-auto">
        {quantity}× Sea-Doo Spark Trixx · <strong>{fmtShortDate(date)}</strong>{" "}
        klo <strong>{slot}</strong>, kesto{" "}
        <strong>{DURATIONS.find((d) => d.value === duration)?.label}</strong>.
        Toimitus paikkaan <strong>{pickup}</strong>.
      </p>
      <p className="text-xs text-brand-secondary/60 mt-3">
        Vahvistamme puhelimitse 30 minuutin sisällä.
      </p>
      <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary text-brand-secondary text-sm font-bold">
        Yhteensä: {total} €
      </div>
      <div className="mt-6">
        <button onClick={onReset} className="btn-ghost">
          Tee uusi varaus
        </button>
      </div>
    </motion.div>
  );
}
