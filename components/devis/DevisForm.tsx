"use client";

/**
 * Formulaire devis multi-étapes — 3 étapes, barre de progression, confirmation animée.
 * CDC v1.4
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const STEPS = 3;

export interface DevisFormProps {
  services: { slug: string; nom: string }[];
  prefillServices?: string[];
  prefillNiveau?: string;
}

export default function DevisForm({
  services,
  prefillServices = [],
  prefillNiveau,
}: DevisFormProps) {
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState<Set<string>>(
    new Set(prefillServices)
  );
  const [niveau, setNiveau] = useState(prefillNiveau ?? "Standard");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [delai, setDelai] = useState("");
  const [simulation, setSimulation] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [entreprise, setEntreprise] = useState("");
  const [ville, setVille] = useState("");
  const [consentement, setConsentement] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const toggleService = (slug: string) => {
    setSelectedServices((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  const handleSubmit = async () => {
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/devis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom,
          prenom,
          email,
          telephone,
          entreprise: entreprise || undefined,
          ville: ville || undefined,
          pays: "Bénin",
          services: Array.from(selectedServices),
          niveau,
          description,
          budget: budget || undefined,
          delai: delai || undefined,
          simulation: simulation || undefined,
          source: "site",
          consentement,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMsg(data.error ?? "Une erreur est survenue.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Erreur de connexion.");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl border border-success/30 bg-success-lt p-8 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success text-white"
        >
          <CheckCircle className="h-10 w-10" />
        </motion.div>
        <h2 className="mt-6 font-syne text-xl font-semibold text-navy">
          Demande envoyée
        </h2>
        <p className="mt-2 text-gray">
          Merci {prenom}. Nous vous enverrons votre devis personnalisé sous 24h à l&apos;adresse {email}.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="rounded-2xl border border-blue-lt bg-white p-6 shadow-sm md:p-8">
      <ProgressBar step={step} total={STEPS} />

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="mt-8"
          >
            <h3 className="font-syne font-semibold text-navy">Étape 1 — Services souhaités</h3>
            <p className="mt-1 text-sm text-gray">Sélectionnez un ou plusieurs services.</p>
            <ul className="mt-4 space-y-2">
              {services.map((s) => (
                <label
                  key={s.slug}
                  className="flex cursor-pointer items-center gap-3 rounded-lg border border-blue-lt p-3 hover:bg-blue-xl/20"
                >
                  <input
                    type="checkbox"
                    checked={selectedServices.has(s.slug)}
                    onChange={() => toggleService(s.slug)}
                    className="h-4 w-4 rounded border-gray-300 text-gold"
                  />
                  <span className="font-medium text-navy">{s.nom}</span>
                </label>
              ))}
            </ul>
            <Button
              variant="primary"
              className="mt-6 shadow-gold-cta"
              onClick={() => setStep(2)}
              disabled={selectedServices.size === 0}
            >
              Continuer
            </Button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="mt-8"
          >
            <h3 className="font-syne font-semibold text-navy">Étape 2 — Détails du projet</h3>
            <p className="mt-1 text-sm text-gray">Décrivez votre besoin et vos contraintes.</p>
            <div className="mt-4 space-y-4">
              <div>
                <label className="mb-1.5 block font-syne text-sm font-medium uppercase tracking-wide text-black">
                  Description du projet *
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={4}
                  className="w-full rounded-lg border border-blue-lt bg-white px-4 py-3 focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/20"
                  placeholder="Décrivez votre projet, vos objectifs..."
                />
              </div>
              <Input
                label="Budget indicatif (FCFA)"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="Ex: 100 000 - 200 000"
              />
              <Input
                label="Délai souhaité"
                value={delai}
                onChange={(e) => setDelai(e.target.value)}
                placeholder="Ex: 2 semaines, 1 mois"
              />
              <div className="flex gap-2">
                {["Essentiel", "Standard", "Premium"].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setNiveau(n)}
                    className={`rounded-lg px-4 py-2 font-syne text-sm font-medium transition ${
                      niveau === n ? "bg-gold text-black" : "bg-blue-xl/50 text-navy hover:bg-blue-lt"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-6 flex gap-4">
              <Button variant="ghost" onClick={() => setStep(1)}>Retour</Button>
              <Button
                variant="primary"
                className="shadow-gold-cta"
                onClick={() => setStep(3)}
                disabled={!description.trim()}
              >
                Continuer
              </Button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="mt-8"
          >
            <h3 className="font-syne font-semibold text-navy">Étape 3 — Vos coordonnées</h3>
            <p className="mt-1 text-sm text-gray">Pour vous envoyer le devis.</p>
            <div className="mt-4 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="Nom *" value={nom} onChange={(e) => setNom(e.target.value)} required />
                <Input label="Prénom *" value={prenom} onChange={(e) => setPrenom(e.target.value)} required />
              </div>
              <Input label="Email *" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <Input label="Téléphone *" type="tel" value={telephone} onChange={(e) => setTelephone(e.target.value)} required />
              <Input label="Entreprise" value={entreprise} onChange={(e) => setEntreprise(e.target.value)} />
              <Input label="Ville" value={ville} onChange={(e) => setVille(e.target.value)} />
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={consentement}
                  onChange={(e) => setConsentement(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-gold"
                />
                <span className="text-sm text-gray">
                  J&apos;accepte que mes données soient traitées pour l&apos;établissement de mon devis et la relation commerciale. Conformité APDP — voir{" "}
                  <a href="/mentions#confidentialite" className="text-blue underline">Mentions légales</a>.
                </span>
              </label>
            </div>
            {errorMsg && <p className="mt-2 text-sm text-error">{errorMsg}</p>}
            <div className="mt-6 flex gap-4">
              <Button variant="ghost" onClick={() => setStep(2)}>Retour</Button>
              <Button
                variant="primary"
                className="shadow-gold-cta"
                onClick={handleSubmit}
                disabled={!nom || !prenom || !email || !telephone || !consentement || status === "loading"}
              >
                {status === "loading" ? "Envoi…" : "Envoyer ma demande"}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
