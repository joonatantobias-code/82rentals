// Google reviews data source.
//
// Today: returns a curated set of mock reviews (Finnish, since real Google
// reviews on a Helsinki business would mostly be in Finnish too).
// Tomorrow: replace getReviews() with a fetch from /api/reviews, which
// proxies Google's Places API server-side. The current Reviews UI is built
// to mirror Google's own review widget layout, so swapping mock → real
// doesn't require any UI changes.
//
// Wiring the real Google integration:
//   - Use the Places API "Place Details" endpoint with `fields=reviews,
//     rating,user_ratings_total` for the 82Rentals place ID. That endpoint
//     returns up to 5 reviews — for the full set you typically maintain a
//     scraper / CRM-side feed and render from there. The free Places API
//     gives the most-recent or most-relevant five.
//   - Auth via GOOGLE_PLACES_API_KEY (server-side env, never client).
//   - Cache responses in Vercel KV / route segment cache so we don't hit
//     the quota each page load (real Google reviews don't change minutely).
//
// Reviews are not translated: Finnish reviewers write in Finnish, English
// reviewers in English. The UI shows them as-is.

export type Review = {
  id: string;
  author: string;
  // Initials shown in the avatar circle when there's no profile photo.
  initials: string;
  // Optional Google profile photo URL. If absent, we fall back to the
  // colour-tinted initials avatar.
  photoUrl?: string;
  // Pre-formatted relative time, e.g. "3 viikkoa sitten".
  date: string;
  // 1–5.
  rating: number;
  text: string;
  // Soft signal — Google flags some reviewers as "Local Guide", and they
  // get a tiny mountain badge next to their name. Mock distribution is
  // about 1 in 3.
  isLocalGuide?: boolean;
  // Context line beneath the name — number of reviews + photo count.
  // Real data fills these from Places. Mocks use plausible values.
  reviewCount?: number;
  photoCount?: number;
};

const REVIEWS: Review[] = [
  {
    id: "rev-001",
    author: "Mikko T.",
    initials: "MT",
    date: "2 viikkoa sitten",
    rating: 5,
    text: "Toimitus pelasi täydellisesti. Saimme Spark Trixxin suoraan mökin laiturille ja loppupäivä meni kuin siivillä. Suosittelen ehdottomasti.",
    isLocalGuide: true,
    reviewCount: 47,
    photoCount: 12,
  },
  {
    id: "rev-002",
    author: "Anna K.",
    initials: "AK",
    date: "3 viikkoa sitten",
    rating: 5,
    text: "Helpoin varauskokemus. Tunti meni nopeasti, joten varasin saman tien lisää. Asiakaspalvelu rentoa ja ammattimaista.",
    reviewCount: 8,
  },
  {
    id: "rev-003",
    author: "Petra L.",
    initials: "PL",
    date: "kuukausi sitten",
    rating: 5,
    text: "Loistava synttärilahja kaverille. Kaverit yllättyivät täysin kun jetti tuotiin paikan päälle. Varmasti tulemme uudestaan.",
    isLocalGuide: true,
    reviewCount: 23,
    photoCount: 5,
  },
  {
    id: "rev-004",
    author: "Joonas R.",
    initials: "JR",
    date: "kuukausi sitten",
    rating: 5,
    text: "Spark Trixx on hauska peli. Lyhyt opastus riitti täysin, hommat sujui muuten ihan itsestään. Vakuutus ja liivit oli ok kunnossa.",
    reviewCount: 14,
  },
  {
    id: "rev-005",
    author: "Linnea S.",
    initials: "LS",
    date: "kuukausi sitten",
    rating: 5,
    text: "Ekakerralla aluksi vähän hirvitti, mutta tyypit kävi kaiken läpi rauhassa ja sen jälkeen oli ihan menoa. Suolaista tuulta naamassa kahden tunnin verran ja kotona vielä illalla nauratti.",
    reviewCount: 5,
  },
  {
    id: "rev-006",
    author: "Aleksi V.",
    initials: "AV",
    date: "2 kuukautta sitten",
    rating: 5,
    text: "Polttarit järjestyi tämän kanssa perille. Sulhanen sai olla itse kaasukahvalla, kaverit videolla. Hinta selkeä, ei piilokuluja.",
    isLocalGuide: true,
    reviewCount: 61,
    photoCount: 28,
  },
  {
    id: "rev-007",
    author: "Roosa M.",
    initials: "RM",
    date: "2 kuukautta sitten",
    rating: 5,
    text: "Olin etsinyt kesäaktiviteettia kavereiden kanssa pitkään. 82Rentals oli ehdottomasti oikea valinta. Sujuva varaus ja paikalla oltiin ajoissa.",
    reviewCount: 11,
  },
  {
    id: "rev-008",
    author: "Tuomas K.",
    initials: "TK",
    date: "2 kuukautta sitten",
    rating: 5,
    text: "Ehdottomasti paras tapa nähdä Helsingin saaristo. Kaksi tuntia tuntui aivan liian lyhyeltä. Bookkaan jo seuraavan kerran.",
    reviewCount: 19,
  },
  {
    id: "rev-009",
    author: "Sanna H.",
    initials: "SH",
    date: "2 kuukautta sitten",
    rating: 4,
    text: "Tosi mukava kokemus, vesijetti hyvässä kunnossa. Annan tähden vähemmän vain koska ekan opastusvideon saisi olla hieman selkeämpi. Muuten 5/5.",
    isLocalGuide: true,
    reviewCount: 102,
    photoCount: 47,
  },
  {
    id: "rev-010",
    author: "Otto N.",
    initials: "ON",
    date: "3 kuukautta sitten",
    rating: 5,
    text: "Varasin spontaanisti aurinkoiseksi lauantaiksi. Hommat hoitui samana päivänä. Tankki täynnä, liivit valmiina, ei enempää tarvittu.",
    reviewCount: 7,
  },
  {
    id: "rev-011",
    author: "Iina P.",
    initials: "IP",
    date: "3 kuukautta sitten",
    rating: 5,
    text: "Spark Trixx oli juuri sopiva tehoiltaan eka kerralla. Saimme kaverin kanssa kokeilla molemmat ohjastusta. Tulemme uudestaan!",
    reviewCount: 3,
  },
  {
    id: "rev-012",
    author: "Mathias E.",
    initials: "ME",
    date: "3 kuukautta sitten",
    rating: 5,
    text: "Asiakaspalvelu oli sen verran rentoa, että tuli olo että ollaan kavereiden kesken. Ja vesijetin kanssa pärjäs ihan helposti.",
    isLocalGuide: true,
    reviewCount: 38,
    photoCount: 9,
  },
  {
    id: "rev-013",
    author: "Veera J.",
    initials: "VJ",
    date: "3 kuukautta sitten",
    rating: 5,
    text: "Tein juuri sen miltä jäin paitsi viime kesänä. Aamuajo Suomenlinnan ohi, kahvi Vallisaaressa, paluu auringonlaskussa. Täydellinen.",
    reviewCount: 16,
  },
  {
    id: "rev-014",
    author: "Niko H.",
    initials: "NH",
    date: "4 kuukautta sitten",
    rating: 5,
    text: "Tyypit on järkeviä ja kalusto kunnossa. Briiffi oli lyhyt mutta kattava, ja loppuajan sai itse keskittyä huvittelemaan.",
    reviewCount: 9,
  },
  {
    id: "rev-015",
    author: "Emma L.",
    initials: "EL",
    date: "4 kuukautta sitten",
    rating: 5,
    text: "Tämä oli puolisolleni synttärilahja. Yllätys onnistui, eikä kalliit kortteleita ostella. Suosittelen ehdottomasti!",
    isLocalGuide: true,
    reviewCount: 54,
    photoCount: 22,
  },
  {
    id: "rev-016",
    author: "Riku S.",
    initials: "RS",
    date: "4 kuukautta sitten",
    rating: 5,
    text: "Olen ajanut vesijetillä aiemminkin, ja tämä oli ammattimaisin vuokraus jossa olen ollut. Nopea kommunikointi ja täsmällinen aikataulu.",
    reviewCount: 25,
  },
  {
    id: "rev-017",
    author: "Henna T.",
    initials: "HT",
    date: "5 kuukautta sitten",
    rating: 5,
    text: "Lasten silmät loisti kun isä lähti vesijetillä. Tyypit oli ystävällisiä ja paikan päällä turvallinen tunnelma.",
    reviewCount: 4,
  },
  {
    id: "rev-018",
    author: "Kasper R.",
    initials: "KR",
    date: "5 kuukautta sitten",
    rating: 4,
    text: "Tosi kiva päivä vesillä. Pieni miinus parkkipaikan löytymisestä, mutta ohjeet olivat selkeät kun tarkistin.",
    reviewCount: 12,
  },
  {
    id: "rev-019",
    author: "Saana M.",
    initials: "SM",
    date: "5 kuukautta sitten",
    rating: 5,
    text: "Ihana kesäaktiviteetti. Spark Trixx on aika ketterä ja kivasti tasapainossa. Saimme molemmat kaverini kanssa hyvät otokset matkalta.",
    isLocalGuide: true,
    reviewCount: 71,
    photoCount: 33,
  },
  {
    id: "rev-020",
    author: "Aleksanteri P.",
    initials: "AP",
    date: "6 kuukautta sitten",
    rating: 5,
    text: "Helppo varata, helppo nouto. Tyypit oli paikalla ajallaan ja vastasivat kaikkiin kysymyksiin. Suosittelen kavereille!",
    reviewCount: 15,
  },
  {
    id: "rev-021",
    author: "Enni K.",
    initials: "EK",
    date: "6 kuukautta sitten",
    rating: 5,
    text: "Kaksi tuntia meni kuin viisitoista minuuttia. Polttarit-päivän kohokohta. Aurinko paistoi ja vesi oli kuin lasia.",
    reviewCount: 6,
  },
  {
    id: "rev-022",
    author: "Lauri V.",
    initials: "LV",
    date: "7 kuukautta sitten",
    rating: 5,
    text: "Olin vähän epävarma kun en ollut ennen ajanut, mutta opastus oli rauhallinen. Ihan helppo otti haltuun ja loppuaika oli puhdasta huvittelua.",
    isLocalGuide: true,
    reviewCount: 42,
    photoCount: 14,
  },
  {
    id: "rev-023",
    author: "Pinja O.",
    initials: "PO",
    date: "8 kuukautta sitten",
    rating: 5,
    text: "Hieno kalusto, hyvä asiakaspalvelu. Helsinki näyttää aivan eriltä mereltä päin, ja Spark Trixx on ihana ajopeli.",
    reviewCount: 17,
  },
  {
    id: "rev-024",
    author: "Daniel B.",
    initials: "DB",
    date: "9 kuukautta sitten",
    rating: 5,
    text: "Best summer day in Helsinki. Crew was relaxed and professional, all gear worked perfectly. The Spark Trixx is super fun.",
    reviewCount: 21,
    photoCount: 6,
  },
  {
    id: "rev-025",
    author: "Eveliina A.",
    initials: "EA",
    date: "9 kuukautta sitten",
    rating: 5,
    text: "Olimme kaverin kanssa molemmat ekaa kertaa, ja silti meni ihan ongelmitta. Vinkit oli hyvät ja tankki täynnä.",
    isLocalGuide: true,
    reviewCount: 29,
    photoCount: 8,
  },
  {
    id: "rev-026",
    author: "Markus H.",
    initials: "MH",
    date: "10 kuukautta sitten",
    rating: 5,
    text: "Top-notch palvelu. Saimme jetin täsmällisesti sovittuun aikaan ja koko homma oli kivuttoman mutkatonta.",
    reviewCount: 33,
  },
  {
    id: "rev-027",
    author: "Sonja R.",
    initials: "SR",
    date: "10 kuukautta sitten",
    rating: 5,
    text: "Suomen kesän paras aktiviteetti. Tunti riittää hauskanpitoon, kaksi tuntia upealle reitille. Otimme jälkimmäisen — ei kaduttanut.",
    reviewCount: 13,
  },
  {
    id: "rev-028",
    author: "Vili K.",
    initials: "VK",
    date: "11 kuukautta sitten",
    rating: 4,
    text: "Mukava kokemus. Vain pieni miinus siitä että jouduimme odottamaan paria minuuttia ohjelman alkua, mutta sen jälkeen kaikki rullasi täysin.",
    isLocalGuide: true,
    reviewCount: 88,
    photoCount: 41,
  },
  {
    id: "rev-029",
    author: "Helmi N.",
    initials: "HN",
    date: "vuosi sitten",
    rating: 5,
    text: "Kaverit muistelee tätä päivää vieläkin. Aurinkoinen lauantai, tankki täynnä ja saaret edessä. Ehdottomasti uusiksi.",
    reviewCount: 18,
  },
  {
    id: "rev-030",
    author: "Aatu P.",
    initials: "AP",
    date: "vuosi sitten",
    rating: 5,
    text: "Erinomainen palvelu, ystävälliset tyypit, fiksusti hinnoiteltu. Spark Trixxillä saa hyvät vauhdit ilman että tuntuu liian raa'alta. Suosittelen.",
    reviewCount: 24,
  },
];

/**
 * Returns the full set of reviews. UI is responsible for paging — see
 * Reviews.tsx, which shows the first six and reveals more in batches.
 */
export function getReviews(): Review[] {
  return REVIEWS;
}

/** Aggregate ratings — for the header summary. */
export function getRatingSummary() {
  const total = REVIEWS.length;
  const avg =
    REVIEWS.reduce((acc, r) => acc + r.rating, 0) / Math.max(1, total);
  return { total, average: Math.round(avg * 10) / 10 };
}
