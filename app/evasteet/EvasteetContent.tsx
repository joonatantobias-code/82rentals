"use client";

import PageHero from "@/components/PageHero";
import { useLocale } from "@/components/LocaleProvider";

/**
 * 82Rentals — Evästekäytäntö / Cookie Policy.
 * Sisältö rinnakkaistuu sisarbrändin (SunRental) cookie policyyn,
 * ja b82_ref / b82_alennus -evästeet liittyvät samoihin
 * flyer-attribuutiomekanismeihin.
 */
export default function EvasteetContent() {
  const { locale } = useLocale();
  return locale === "en" ? <EnglishContent /> : <FinnishContent />;
}

function FinnishContent() {
  return (
    <>
      <PageHero
        eyebrow="Evästeet"
        title="Evästekäytäntö"
        description="Verkkosivustomme käyttää evästeitä toimiakseen, muistaakseen valintasi ja mitatakseen markkinoinnin tehokkuutta. Tällä sivulla kerromme tarkasti mitä evästeitä käytämme ja mihin."
        crumbs={[{ label: "Evästeet" }]}
      />
      <section className="section">
        <article className="card-soft p-6 lg:p-10 max-w-3xl mx-auto prose-content">
          <H2>1. Mikä eväste on?</H2>
          <P>
            Eväste (cookie) on pieni tekstitiedosto, jonka selaimesi
            tallentaa laitteellesi, kun käyt verkkosivustolla. Evästeillä
            voidaan muistaa esimerkiksi kielivalintasi tai
            varauksesi tila yli sivunlatauksen.
          </P>

          <H2>2. Välttämättömät evästeet</H2>
          <P>
            Nämä evästeet ovat tarpeen sivuston perustoiminnoille.
            Niitä ei voi kytkeä pois päältä, eivätkä ne vaadi
            suostumustasi.
          </P>
          <Table
            rows={[
              ["next-auth.session-token", "Kirjautumistila (admin)", "Sessio", "82Rentals"],
              ["NEXT_LOCALE", "Kielivalinta (FI/EN)", "1 vuosi", "82Rentals"],
              [
                "b82_alennus",
                "Avajaisalennuksen aktivointi tab-istunnon ajaksi",
                "Sessio",
                "82Rentals (sessionStorage)",
              ],
            ]}
          />

          <H2>3. Markkinointievästeet (vain suostumuksella)</H2>
          <P>
            Käytämme näitä mittaaksemme markkinoinnin tuloksia.
            Lähetetään palveluntarjoajalle vain, jos olet hyväksynyt
            markkinointievästeet.
          </P>
          <Table
            rows={[
              [
                "_gcl_aw, _gcl_au",
                "Google Ads -konversioseuranta (varauksesi attribuoiminen mainoskampanjaan)",
                "90 päivää",
                "Google LLC",
              ],
            ]}
          />

          <H2>4. Kuinka voit hallita evästeitä</H2>
          <P>
            Voit hallita ja poistaa evästeitä selaimesi asetuksista.
            Suurin osa selaimista sallii välttämättömien evästeiden
            säilymisen ja muiden estämisen.
          </P>
          <UL
            items={[
              "Chrome: Asetukset, Yksityisyys ja suojaus, Evästeet",
              "Safari: Asetukset, Yksityisyys, Hallinnoi sivustotietoja",
              "Firefox: Asetukset, Yksityisyys ja suojaus, Evästeet",
              "Edge: Asetukset, Evästeet ja sivuoikeudet",
            ]}
          />
          <P>
            Huom: jos kytket evästeet pois päältä kokonaan, sivuston
            jotkin toiminnot, kuten kirjautuminen, eivät välttämättä
            toimi oikein.
          </P>

          <H2>5. Lisätietoja tietojen käsittelystä</H2>
          <P>
            Tarkemmat tiedot löydät{" "}
            <a href="/tietosuoja">tietosuojaselosteestamme</a>.
            Kysymyksiä? Lähetä viesti osoitteeseen{" "}
            <a href="mailto:asiakaspalvelu@82rentals.com">
              asiakaspalvelu@82rentals.com
            </a>
            .
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
        eyebrow="Cookies"
        title="Cookie policy"
        description="This site uses cookies to function, remember your choices and measure the effectiveness of our marketing. This page explains which cookies we use and why."
        crumbs={[{ label: "Cookies" }]}
      />
      <section className="section">
        <article className="card-soft p-6 lg:p-10 max-w-3xl mx-auto prose-content">
          <H2>1. What is a cookie?</H2>
          <P>
            A cookie is a small text file that your browser stores on
            your device when you visit a website. Cookies can remember
            things like your language preference or the state of your
            booking across page loads.
          </P>

          <H2>2. Essential cookies</H2>
          <P>
            These are required for the site to work. They can't be
            switched off and don't require your consent.
          </P>
          <Table
            rows={[
              ["next-auth.session-token", "Sign-in state (admin)", "Session", "82Rentals"],
              ["NEXT_LOCALE", "Language preference (FI/EN)", "1 year", "82Rentals"],
              [
                "b82_alennus",
                "Opening-offer activation for the current tab",
                "Session",
                "82Rentals (sessionStorage)",
              ],
            ]}
          />

          <H2>3. Marketing cookies (with consent)</H2>
          <P>
            Used to measure marketing performance. Sent to the provider
            only if you have accepted marketing cookies.
          </P>
          <Table
            rows={[
              [
                "_gcl_aw, _gcl_au",
                "Google Ads conversion tracking (attributing your booking to an ad)",
                "90 days",
                "Google LLC",
              ],
            ]}
          />

          <H2>4. Managing cookies</H2>
          <P>
            You can manage and delete cookies in your browser settings.
            Most browsers let you keep essential cookies and block the
            rest.
          </P>
          <UL
            items={[
              "Chrome: Settings, Privacy and security, Cookies",
              "Safari: Settings, Privacy, Manage Website Data",
              "Firefox: Settings, Privacy & Security, Cookies",
              "Edge: Settings, Cookies and site permissions",
            ]}
          />
          <P>
            Note: if you disable cookies entirely, some functionality
            like sign-in may not work.
          </P>

          <H2>5. More on how we handle data</H2>
          <P>
            See our <a href="/tietosuoja">privacy policy</a> for full
            details. Questions? Email{" "}
            <a href="mailto:asiakaspalvelu@82rentals.com">
              asiakaspalvelu@82rentals.com
            </a>
            .
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

function Table({ rows }: { rows: string[][] }) {
  return (
    <div className="overflow-x-auto mb-6">
      <table className="min-w-full text-sm border-collapse">
        <thead>
          <tr className="text-left text-brand-secondary/70 border-b border-brand-secondary/15">
            <th className="py-2 pr-4 font-bold">Eväste</th>
            <th className="py-2 pr-4 font-bold">Tarkoitus</th>
            <th className="py-2 pr-4 font-bold">Voimassa</th>
            <th className="py-2 font-bold">Lähde</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-brand-secondary/8">
              <td className="py-2 pr-4 font-semibold text-brand-secondary">
                <code className="text-xs bg-brand-bg px-1.5 py-0.5 rounded">
                  {row[0]}
                </code>
              </td>
              <td className="py-2 pr-4 text-brand-secondary/85">{row[1]}</td>
              <td className="py-2 pr-4 text-brand-secondary/85 whitespace-nowrap">
                {row[2]}
              </td>
              <td className="py-2 text-brand-secondary/85">{row[3]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
