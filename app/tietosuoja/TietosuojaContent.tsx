"use client";

import PageHero from "@/components/PageHero";
import { useLocale } from "@/components/LocaleProvider";

/**
 * 82Rentals — Tietosuojaseloste / Privacy Policy.
 * Sisältö on identtinen sisarbrändin (SunRental) selosteen kanssa
 * koska molemmat brändit operoidaan saman Oy:n (Y-tunnus
 * 3624385-6) alla. Yhteystiedot eroavat domain-kohtaisesti.
 */
const COMPANY = {
  name: "82Rentals Oy",
  businessId: "3624385-6",
  city: "Helsinki",
  contactEmail: "asiakaspalvelu@82rentals.com",
  phone: "+358 40 186 6664",
  brand: "82Rentals",
};

export default function TietosuojaContent() {
  const { locale } = useLocale();
  return locale === "en" ? <EnglishContent /> : <FinnishContent />;
}

function FinnishContent() {
  return (
    <>
      <PageHero
        eyebrow="Tietosuoja"
        title="Tietosuojaseloste"
        description="Tämä seloste kertoo miten käsittelemme henkilötietojasi, mihin niitä käytetään ja mitä oikeuksia sinulla on EU:n tietosuoja-asetuksen (GDPR) mukaan. Päivitetty 1.6.2026."
        crumbs={[{ label: "Tietosuoja" }]}
      />
      <section className="section">
        <article className="card-soft p-6 lg:p-10 max-w-3xl mx-auto prose-content">
          <H2>1. Rekisterinpitäjä</H2>
          <P>
            {COMPANY.name} ({COMPANY.brand}-brändi)
            <br />
            Y-tunnus {COMPANY.businessId}
            <br />
            {COMPANY.city}, Suomi
          </P>
          <P>
            Yhteystiedot tietosuojaa koskevissa asioissa:
            <br />
            Sähköposti:{" "}
            <a href={`mailto:${COMPANY.contactEmail}`}>
              {COMPANY.contactEmail}
            </a>
            <br />
            Puhelin: {COMPANY.phone}
          </P>

          <H2>2. Käsiteltävät henkilötiedot</H2>
          <P>
            Käsittelemme seuraavia tietoja silloin, kun teet varauksen
            tai otat meihin yhteyttä:
          </P>
          <UL
            items={[
              "Etu- ja sukunimi",
              "Sähköpostiosoite",
              "Puhelinnumero",
              "Syntymäaika (ikäraja-tarkistus, 16+)",
              "Varauksen tiedot: päivä, aloitusaika, kesto, vesijettien määrä, lähtöpaikka",
              "Maksuun liittyvät tiedot: kuitti, maksutapa, summa, viite",
              "Asiakaspalvelussa antamasi lisätiedot",
              "Markkinointiviestin tilaajalta: sähköpostiosoite ja suostumus",
            ]}
          />

          <H2>3. Käyttötarkoitukset ja oikeusperusteet</H2>
          <P>Käsittelemme tietoja seuraaviin tarkoituksiin:</P>
          <UL
            items={[
              "Varauksen toteuttaminen ja sopimuksen täyttäminen (GDPR 6 art. 1 b)",
              "Laskutus ja kirjanpito (lakisääteinen velvoite, GDPR 6 art. 1 c, Kirjanpitolaki)",
              "Asiakaspalvelu ja yhteydenpito (oikeutettu etu, GDPR 6 art. 1 f)",
              "Markkinointi sähköpostitse (suostumus, GDPR 6 art. 1 a), vain jos olet sen erikseen antanut",
              "Verkkosivuston turvallisuus ja kehitys (oikeutettu etu)",
            ]}
          />

          <H2>4. Tietojen säilytysaika</H2>
          <UL
            items={[
              "Varaus- ja asiakastiedot: 6 vuotta sen tilikauden päättymisestä, jonka aikana varaus tehtiin (Kirjanpitolaki 2:10)",
              "Markkinointisuostumus ja sen yhteydessä kerätty osoite: kunnes peruutat suostumuksen tai 3 vuotta viimeisimmästä yhteydestä",
              "Asiakaspalveluviestit: 2 vuotta, paitsi jos liittyvät reklamaatioon tai vahinkoasiaan",
              "Verkkosivuston tekniset lokit: 90 päivää",
            ]}
          />

          <H2>5. Tietojen vastaanottajat</H2>
          <P>
            Emme myy tai vuokraa tietojasi kolmansille osapuolille.
            Käytämme luotettavia kumppaneita palveluiden toteuttamiseen.
            Tietoja voidaan luovuttaa seuraaville henkilötietojen
            käsittelijöille:
          </P>
          <UL
            items={[
              "Vercel Inc. (verkkosivuston hosting, EU-datacenter)",
              "Neon Inc. (tietokanta, EU-region)",
              "Resend Inc. (varausvahvistus- ja kuittisähköpostit)",
              "Google LLC (Google Ads -konversioseuranta, vain jos olet hyväksynyt markkinointievästeet)",
              "Kirjanpitäjä tai tilitoimisto (laskutus ja kirjanpitovelvoite)",
              "Vakuutusyhtiö (vain vahinkotilanteessa, kun se on tarpeen korvauskäsittelyä varten)",
              "Maksupalveluntarjoaja (korttimaksun toteuttamiseksi)",
              "Viranomaiset, jos laki tai viranomaismääräys sitä vaatii",
            ]}
          />

          <H2>6. Tietojen siirto EU/ETA-alueen ulkopuolelle</H2>
          <P>
            Osa käyttämistämme palveluntarjoajista (esim. Vercel, Resend,
            Google) on yhdysvaltalaisia yhtiöitä. Heille tehtävät siirrot
            tapahtuvat EU:n komission hyväksymien vakiosopimuslausekkeiden
            (SCC) tai EU-US Data Privacy Framework -mekanismin nojalla,
            jotka takaavat tietosuojan tason vastaavuuden GDPR:n kanssa.
          </P>

          <H2>7. Sinun oikeutesi</H2>
          <P>
            Sinulla on rekisteröityneenä seuraavat oikeudet tietoihisi:
          </P>
          <UL
            items={[
              "Oikeus saada pääsy tietoihisi (GDPR 15 art.)",
              "Oikeus oikaista virheelliset tiedot (16 art.)",
              "Oikeus pyytää tietojen poistamista (17 art., huom. kirjanpitoon kuuluvia tietoja ei voida poistaa ennen säilytysajan päättymistä)",
              "Oikeus rajoittaa käsittelyä (18 art.)",
              "Oikeus siirtää tiedot järjestelmästä toiseen (20 art.)",
              "Oikeus vastustaa käsittelyä (21 art.)",
              "Oikeus peruuttaa suostumus milloin tahansa (esim. markkinointi)",
              "Oikeus tehdä valitus valvontaviranomaiselle (tietosuoja.fi)",
            ]}
          />
          <P>
            Voit käyttää oikeuksiasi lähettämällä viestin osoitteeseen{" "}
            <a href={`mailto:${COMPANY.contactEmail}`}>
              {COMPANY.contactEmail}
            </a>
            . Vastaamme pyyntöihin lähtökohtaisesti yhden kuukauden
            kuluessa.
          </P>

          <H2>8. Tietoturva</H2>
          <P>
            Suojaamme tietojasi asianmukaisin teknisin ja organisatorisin
            toimenpitein. Henkilötietoihin pääsy on rajattu vain
            tarvittaviin henkilöihin, tiedonsiirto verkossa tapahtuu
            TLS-salatusti, ja salasanat tallennetaan ainoastaan
            yksisuuntaisesti hashatussa muodossa.
          </P>

          <H2>9. Evästeet</H2>
          <P>
            Käytämme verkkosivustolla välttämättömiä evästeitä
            (kirjautuminen, kielivalinta) sekä valinnaisia
            markkinointi- ja analytiikkaevästeitä. Lisätietoja
            evästeistä löydät{" "}
            <a href="/evasteet">evästekäytännöstämme</a>.
          </P>

          <H2>10. Muutokset tähän selosteeseen</H2>
          <P>
            Voimme päivittää tätä selostetta esimerkiksi
            lainsäädännön tai palveluiden muutoksen vuoksi.
            Merkittävistä muutoksista ilmoitamme verkkosivustolla
            tai sähköpostitse.
          </P>

          <P className="text-sm text-brand-secondary/55 mt-10">
            Versio 1.0, 1.6.2026
          </P>
        </article>
      </section>
    </>
  );
}

function EnglishContent() {
  return (
    <>
      <PageHero
        eyebrow="Privacy"
        title="Privacy policy"
        description="How we handle your personal data, what we use it for, and what rights you have under the EU General Data Protection Regulation (GDPR). Updated 1 June 2026."
        crumbs={[{ label: "Privacy" }]}
      />
      <section className="section">
        <article className="card-soft p-6 lg:p-10 max-w-3xl mx-auto prose-content">
          <H2>1. Data controller</H2>
          <P>
            {COMPANY.name} (operating the {COMPANY.brand} brand)
            <br />
            Business ID {COMPANY.businessId}
            <br />
            {COMPANY.city}, Finland
          </P>
          <P>
            Privacy contact:{" "}
            <a href={`mailto:${COMPANY.contactEmail}`}>
              {COMPANY.contactEmail}
            </a>
            <br />
            Phone: {COMPANY.phone}
          </P>

          <H2>2. Personal data we collect</H2>
          <UL
            items={[
              "First and last name",
              "Email address",
              "Phone number",
              "Date of birth (age verification, 16+)",
              "Booking details: date, start time, duration, number of jet skis, pickup location",
              "Payment-related data: receipt, payment method, amount, reference",
              "Any additional info you provide via customer service",
              "Email address and consent if you subscribe to marketing",
            ]}
          />

          <H2>3. Purposes and legal bases</H2>
          <UL
            items={[
              "Performing your booking and the rental contract (GDPR Art. 6(1)(b))",
              "Invoicing and accounting (legal obligation under the Finnish Accounting Act, Art. 6(1)(c))",
              "Customer service and communication (legitimate interest, Art. 6(1)(f))",
              "Email marketing (consent, Art. 6(1)(a)), only if you have opted in",
              "Site security and improvement (legitimate interest)",
            ]}
          />

          <H2>4. Retention</H2>
          <UL
            items={[
              "Booking and customer records: 6 years from the end of the accounting period in which the booking was made (Finnish Accounting Act 2:10)",
              "Marketing consent and the related address: until you withdraw consent or 3 years from your last engagement",
              "Customer service messages: 2 years, except those related to claims or incidents",
              "Web logs: 90 days",
            ]}
          />

          <H2>5. Recipients</H2>
          <P>
            We do not sell or rent your data. We use trusted partners
            to deliver our service. Data may be shared with the
            following processors:
          </P>
          <UL
            items={[
              "Vercel Inc. (website hosting, EU data centre)",
              "Neon Inc. (database, EU region)",
              "Resend Inc. (transactional booking and receipt emails)",
              "Google LLC (Google Ads conversion tracking, only if you have accepted marketing cookies)",
              "Accountant or accounting firm (invoicing and accounting obligation)",
              "Insurance provider (only in the event of an incident, where required for claims handling)",
              "Card payment processor (to complete card payments)",
              "Authorities, if required by law or official order",
            ]}
          />

          <H2>6. International transfers</H2>
          <P>
            Some of our service providers (e.g. Vercel, Resend, Google)
            are US-based. Transfers to these processors rely on the EU
            Standard Contractual Clauses (SCCs) or the EU-US Data
            Privacy Framework, ensuring an adequate level of protection
            equivalent to GDPR.
          </P>

          <H2>7. Your rights</H2>
          <UL
            items={[
              "Right of access (GDPR Art. 15)",
              "Right to rectification (Art. 16)",
              "Right to erasure (Art. 17, note: accounting records can't be erased before the retention period ends)",
              "Right to restriction of processing (Art. 18)",
              "Right to data portability (Art. 20)",
              "Right to object (Art. 21)",
              "Right to withdraw consent at any time (e.g. marketing)",
              "Right to lodge a complaint with the supervisory authority (tietosuoja.fi)",
            ]}
          />
          <P>
            Use your rights by emailing{" "}
            <a href={`mailto:${COMPANY.contactEmail}`}>
              {COMPANY.contactEmail}
            </a>
            . We respond to requests within one month.
          </P>

          <H2>8. Security</H2>
          <P>
            We protect your data with appropriate technical and
            organisational measures. Access is limited to people who
            need it, network traffic is TLS-encrypted, and passwords
            are stored only as one-way hashes.
          </P>

          <H2>9. Cookies</H2>
          <P>
            We use essential cookies (sign-in, language preference)
            and optional marketing and analytics cookies. More info in
            our <a href="/evasteet">cookie policy</a>.
          </P>

          <H2>10. Changes to this policy</H2>
          <P>
            We may update this policy, for example following changes
            to legislation or to our services. We will inform you of
            material changes on the site or by email.
          </P>

          <P className="text-sm text-brand-secondary/55 mt-10">
            Version 1.0, 1 June 2026
          </P>
        </article>
      </section>
    </>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-xl sm:text-2xl font-bold text-brand-secondary mt-8 mb-3">
      {children}
    </h2>
  );
}

function P({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={`text-brand-secondary/85 leading-relaxed mb-4 ${className}`}>
      {children}
    </p>
  );
}

function UL({ items }: { items: string[] }) {
  return (
    <ul className="text-brand-secondary/85 leading-relaxed list-disc pl-6 space-y-1.5 mb-4">
      {items.map((it, i) => (
        <li key={i}>{it}</li>
      ))}
    </ul>
  );
}
