"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Loader2,
  CheckCircle2,
  Mail,
  Phone,
  User as UserIcon,
  MessageSquare,
} from "lucide-react";

const TOPICS = [
  "Yleinen kysymys",
  "Varauksen muutos",
  "Ryhmävaraus tai tapahtuma",
  "Yhteistyö tai media",
];

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [topic, setTopic] = useState(TOPICS[0]);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, topic, message }),
      });
      if (!res.ok) throw new Error("Lähetys epäonnistui");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Jokin meni vikaan");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-8 sm:p-12 text-center"
      >
        <div className="mx-auto h-16 w-16 rounded-full bg-brand-primary grid place-items-center">
          <CheckCircle2 size={36} className="text-brand-secondary" />
        </div>
        <h3 className="font-display text-2xl sm:text-3xl font-bold text-brand-secondary mt-5">
          Viestisi on perillä.
        </h3>
        <p className="text-brand-secondary/70 mt-3 max-w-md mx-auto">
          Vastaamme yleensä saman päivän aikana. Jos asia on kiireinen, soita
          suoraan numeroon +358 40 186 6664.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setName("");
            setEmail("");
            setPhone("");
            setMessage("");
            setTopic(TOPICS[0]);
          }}
          className="btn-ghost mt-6"
        >
          Lähetä uusi viesti
        </button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="card p-6 sm:p-8 md:p-10 space-y-5"
    >
      <div>
        <span className="section-eyebrow !mb-1">Yhteydenotto</span>
        <h3 className="font-display text-2xl sm:text-3xl font-bold text-brand-secondary leading-tight">
          Laita viestiä, vastaamme yleensä saman päivän aikana.
        </h3>
      </div>

      <Field icon={<UserIcon size={16} />} label="Nimi">
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Matti Meikäläinen"
          className="contact-input"
        />
      </Field>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field icon={<Mail size={16} />} label="Sähköposti">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="sinä@esimerkki.fi"
            className="contact-input"
          />
        </Field>
        <Field icon={<Phone size={16} />} label="Puhelin">
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+358 ..."
            className="contact-input"
          />
        </Field>
      </div>

      <Field label="Aihe">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {TOPICS.map((t) => (
            <button
              type="button"
              key={t}
              onClick={() => setTopic(t)}
              className={`px-3 py-2.5 rounded-xl border-2 text-xs sm:text-sm font-semibold transition-all min-h-[48px] text-left ${
                topic === t
                  ? "border-brand-secondary bg-brand-secondary text-white"
                  : "border-brand-primary/30 bg-white text-brand-secondary hover:border-brand-primary"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </Field>

      <Field icon={<MessageSquare size={16} />} label="Viesti">
        <textarea
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          placeholder="Kerro lyhyesti asiasi..."
          className="contact-input !h-auto py-3 resize-none"
        />
      </Field>

      {errorMsg && (
        <p className="text-sm text-red-700 bg-red-50 rounded-xl p-3 border border-red-100">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-primary w-full disabled:opacity-70"
      >
        {status === "submitting" ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Lähetetään
          </>
        ) : (
          <>
            Lähetä viesti
            <Send size={16} />
          </>
        )}
      </button>

      <style jsx>{`
        :global(.contact-input) {
          width: 100%;
          height: 3rem;
          padding: 0 0.875rem;
          border-radius: 0.75rem;
          border: 2px solid rgba(110, 198, 255, 0.3);
          background: white;
          color: #0a3d62;
          font-weight: 500;
          font-size: 1rem;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        :global(.contact-input:focus) {
          border-color: #0a3d62;
          box-shadow: 0 0 0 3px rgba(110, 198, 255, 0.25);
        }
      `}</style>
    </form>
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
