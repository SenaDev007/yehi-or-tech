import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales & Confidentialité | YEHI OR Tech",
  description:
    "Mentions légales, politique de confidentialité et conformité APDP. YEHI OR Tech, Parakou, Bénin.",
};

export default function MentionsPage() {
  return (
    <div className="min-h-screen bg-white pt-[70px]">
      <section className="bg-navy px-4 py-12 md:py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-syne text-3xl font-bold text-white md:text-4xl">
            Mentions légales & Politique de confidentialité
          </h1>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="max-w-none space-y-12 text-gray">
          <section id="mentions">
            <h2 className="font-syne text-xl font-semibold text-navy">Mentions légales</h2>
            <p className="mt-2">
              <strong>Éditeur du site :</strong> YEHI OR Tech — Bèyarou, Parakou, Bénin.
            </p>
            <p className="mt-2">
              <strong>Fondateur :</strong> AKPOVI TOHOU Sènakpon Dawes.
            </p>
            <p className="mt-2">
              <strong>Co-fondateur :</strong> AKPOVI Tchognon Stevens.
            </p>
            <p className="mt-2">
              <strong>Contact :</strong> +229 01 41 36 08 03 — contact@yehiortech.com
            </p>
            <p className="mt-4">
              Le site www.yehiortech.com est la propriété de YEHI OR Tech. Toute reproduction ou utilisation non autorisée des contenus peut constituer une contrefaçon.
            </p>
          </section>

          <section id="confidentialite">
            <h2 className="font-syne text-xl font-semibold text-navy">
              Politique de confidentialité
            </h2>
            <p className="mt-2">
              YEHI OR Tech s&apos;engage à protéger vos données personnelles. Les informations collectées via les formulaires (contact, devis, newsletter, candidature) sont utilisées uniquement pour traiter votre demande et vous recontacter.
            </p>
            <p className="mt-2">
              <strong>Données collectées :</strong> nom, prénom, email, téléphone, message et autres champs des formulaires.
            </p>
            <p className="mt-2">
              <strong>Durée de conservation :</strong> 6 mois maximum après le dernier échange, sauf obligation légale ou consentement explicite.
            </p>
            <p className="mt-2">
              <strong>Vos droits :</strong> accès, rectification, suppression de vos données. Contact : contact@yehiortech.com.
            </p>
            <p className="mt-2">
              <strong>Cookies :</strong> le site utilise des cookies pour le bon fonctionnement et l&apos;analyse de trafic (Umami, sans cookies tiers). Vous pouvez accepter ou refuser via le bandeau affiché à votre première visite.
            </p>
          </section>

          <section id="apdp">
            <h2 className="font-syne text-xl font-semibold text-navy">
              Conformité APDP
            </h2>
            <p className="mt-2">
              Conformément à la loi béninoise sur la protection des données à caractère personnel, YEHI OR Tech s&apos;engage à déclarer son traitement des données auprès de l&apos;Autorité de protection des données personnelles (APDP) avant mise en ligne et à respecter les principes de licéité, loyauté et minimisation des données.
            </p>
          </section>

          <section>
            <h2 className="font-syne text-xl font-semibold text-navy">
              Crédits
            </h2>
            <p className="mt-2">
              © {new Date().getFullYear()} YEHI OR Tech. Tous droits réservés.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
