export type TermsLocale = "fi" | "en";

/**
 * Single source of truth for booking terms. The terms page, the footer
 * link and the booking checkbox modal all read from here. Update once,
 * change everywhere.
 */
export const TERMS_VERSION = "1.0";
export const TERMS_UPDATED = "2026-05-05";

export const terms: Record<TermsLocale, { title: string; sections: { heading: string; body: string }[] }> = {
  fi: {
    title: "Sopimusehdot",
    sections: [
      {
        heading: "1. Yleistä",
        body:
          "Nämä ehdot koskevat 82Rentals Oy:n vesijetin vuokrausta. Varauksen tekemällä asiakas hyväksyy nämä ehdot. Yritys pidättää oikeuden muuttaa ehtoja kirjallisesti.",
      },
      {
        heading: "2. Varaus ja maksu",
        body:
          "Varaus on sitova vahvistuksen jälkeen. Hinnat sisältävät polttoaineen, pelastusliivit ja kattavan vakuutuksen. Maksu suoritetaan ennen ajoa joko paikan päällä (käteinen, kortti, MobilePay) tai laskulla erikseen sopien.",
      },
      {
        heading: "3. Peruutus",
        body:
          "Maksuton peruutus 24 tuntia ennen vuokrauksen alkua. Tämän jälkeen tehdyistä peruutuksista veloitetaan 50 % vuokrahinnasta. Sääperuutuksissa (turvallisuussyy: kova tuuli, myrsky, sankka sumu) varaus siirretään ilmaiseksi tai palautetaan kokonaan.",
      },
      {
        heading: "4. Lähtöpaikka",
        body:
          "Vakiolähtöpaikka on Kipparlahden venekerho, Kipparlahti, Helsinki. Toimitus muualle on mahdollinen lisämaksusta erikseen sopimalla. Asiakas vastaa siitä, että hän on paikalla sovittuun aikaan.",
      },
      {
        heading: "5. Ajaja ja ikäraja",
        body:
          "Vesijetin ajajan on oltava vähintään 18-vuotias ja todistettava henkilöllisyytensä voimassa olevalla kuvallisella henkilötodistuksella. Ajaminen alkoholin tai huumaavien aineiden vaikutuksen alaisena on ehdottomasti kielletty ja johtaa vuokrauksen päättymiseen ilman korvauksia.",
      },
      {
        heading: "6. Vakuutus ja vastuu",
        body:
          "Vuokraan sisältyy kattava vakuutus omavastuulla 1500 €. Asiakas vastaa vahingoista jotka aiheutuvat tahallisuudesta, törkeästä huolimattomuudesta, sääntöjen vastaisesta käytöstä, ehtojen vastaisesta ajamisesta tai varomattomuudesta. Asiakas on velvollinen ilmoittamaan kaikista vahingoista välittömästi.",
      },
      {
        heading: "7. Käyttö",
        body:
          "Vesijettiä ajetaan voimassa olevien Suomen vesiliikenteen säädösten mukaisesti. Ajaminen suojelu- ja kieltoalueilla, satamissa väärään aikaan tai liian lähellä rantaa on kielletty. Asiakas saa lyhyen turvaopastuksen ennen ajoa ja sitoutuu noudattamaan annettuja ohjeita.",
      },
      {
        heading: "8. Henkilötiedot",
        body:
          "Asiakkaan tietoja käsitellään tietosuojalainsäädännön mukaisesti varauksen toteuttamiseksi sekä mahdollista markkinointia varten. Tietoja ei luovuteta kolmansille osapuolille ilman lupaa, paitsi mitä laki edellyttää.",
      },
      {
        heading: "9. Yhteystiedot",
        body:
          "82Rentals Oy. Sähköposti: 82rentals.info@gmail.com. Puhelin: +358 40 186 6664. Kysymyksiin vastataan ensisijaisesti sähköpostitse.",
      },
    ],
  },
  en: {
    title: "Terms of Service",
    sections: [
      {
        heading: "1. General",
        body:
          "These terms apply to all jet ski rentals by 82Rentals Oy. By making a booking, the customer accepts these terms. The company reserves the right to update the terms in writing.",
      },
      {
        heading: "2. Booking and payment",
        body:
          "A booking is binding once confirmed. Prices include fuel, life jackets and comprehensive insurance. Payment is made before the ride either on-site (cash, card, MobilePay) or by separate invoice arrangement.",
      },
      {
        heading: "3. Cancellation",
        body:
          "Free cancellation up to 24 hours before the rental. After that, 50% of the rental fee is charged. Weather-related cancellations for safety reasons (strong wind, storm, dense fog) are rebooked at no cost or fully refunded.",
      },
      {
        heading: "4. Pickup location",
        body:
          "Default pickup is Kipparlahden venekerho, Kipparlahti, Helsinki. Delivery elsewhere is available for an additional fee by separate agreement. The customer is responsible for being on-site at the agreed time.",
      },
      {
        heading: "5. Driver and age limit",
        body:
          "The jet ski driver must be at least 18 years old and present a valid photo ID. Driving under the influence of alcohol or drugs is strictly prohibited and will end the rental immediately without compensation.",
      },
      {
        heading: "6. Insurance and liability",
        body:
          "Rentals include comprehensive insurance with a deductible of €1500. The customer is liable for damage caused by intent, gross negligence, breach of these terms, reckless driving or carelessness. All damage must be reported immediately.",
      },
      {
        heading: "7. Use",
        body:
          "The jet ski must be operated according to Finnish boating regulations. Driving in restricted areas, harbours at the wrong time or too close to shore is prohibited. The customer receives a short safety briefing before the ride and agrees to follow the instructions.",
      },
      {
        heading: "8. Personal data",
        body:
          "Customer data is processed in line with data protection law to fulfil the booking and for occasional marketing. Data is not shared with third parties without consent except where required by law.",
      },
      {
        heading: "9. Contact",
        body:
          "82Rentals Oy. Email: 82rentals.info@gmail.com. Phone: +358 40 186 6664. We answer enquiries primarily by email.",
      },
    ],
  },
};
