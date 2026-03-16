import type { Metadata } from "next";
import Link from "next/link";
import CandidatureForm from "@/components/career/CandidatureForm";

export const metadata: Metadata = {
  title: "Déposer une candidature | Carrière | YEHI OR Tech",
  description: "Postulez chez YEHI OR Tech à Parakou. Envoyez votre CV et lettre de motivation.",
};

export default function CandidaterPage() {
  return (
    <div className="min-h-screen bg-white pt-[70px]">
      <section className="bg-navy px-4 py-8 sm:py-12 md:py-16">
        <div className="mx-auto max-w-2xl">
          <Link href="/carriere" className="inline-flex items-center min-h-[44px] text-sm text-gold hover:underline">
            ← Retour aux offres
          </Link>
          <h1 className="mt-3 sm:mt-4 font-syne text-2xl font-bold text-white sm:text-3xl">
            Déposer une candidature
          </h1>
          <p className="mt-2 text-sm sm:text-base text-white/85">
            Remplissez le formulaire ci-dessous. Vous pouvez indiquer un lien vers votre CV et votre lettre de motivation (Google Drive, Dropbox, etc.).
          </p>
        </div>
      </section>
      <div className="mx-auto max-w-2xl px-4 py-8 sm:py-12">
        <div className="rounded-xl border border-blue-lt bg-blue-xl/10 p-4 sm:p-6 md:p-8">
          <CandidatureForm />
        </div>
      </div>
    </div>
  );
}
