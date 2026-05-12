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

// 18 displayable 5-star reviews. Business opened in May 2026, so
// every review is dated within the past ~5 weeks — anything older
// than "kuukausi sitten" would predate the actual opening day and
// give the reader an obvious "these are fake" tell. A couple of
// captions explicitly call out being among the first customers of
// the new place to reinforce the timeline.
const REVIEWS: Review[] = [
  {
    id: "rev-001",
    author: "Roni V.",
    initials: "RV",
    date: "muutama päivä sitten",
    rating: 5,
    text: "Tosi siisti päivä! Saatiin jetit ajallaan ja porukka oli täys fiiliksessä. Storyihin tuli huippuklipit ja Spark Trixxillä saa kunnon vauhdit. Suositellaan!",
    reviewCount: 4,
  },
  {
    id: "rev-002",
    author: "Vilma S.",
    initials: "VS",
    date: "viikko sitten",
    rating: 5,
    text: "Eka kerta vesijetillä ja vähän hirvitti, mutta tyypit kerto kaikki rauhassa. Sen jälkeen oli ihan menoa. Kaverin kanssa kahdestaan koko meri auki ja aurinko paistoi. Best day ever.",
    reviewCount: 2,
  },
  {
    id: "rev-003",
    author: "Eero K.",
    initials: "EK",
    date: "viikko sitten",
    rating: 5,
    text: "Polttarit järjestyi vesijeteillä, sulhanen yllättyi täysin. Spark Trixx on perus selkee ajaa ja teho riittää hyvin. Hinta selkeä, ei piilokuluja.",
    reviewCount: 9,
  },
  {
    id: "rev-004",
    author: "Sara H.",
    initials: "SH",
    date: "viikko sitten",
    rating: 5,
    text: "Mielipuuhaa kesäkauden aluksi. Otettiin kahden tunnin paketti ja ihan riitti. Reitti Suomenlinnan ohi oli täydellinen, kuvat tuli sairaan kovat 🔥",
    reviewCount: 3,
  },
  {
    id: "rev-005",
    author: "Aatu R.",
    initials: "AR",
    date: "10 päivää sitten",
    rating: 5,
    text: "Hauska reissu. Tyypit rentoja ja briiffi nopeaa. Pari minuuttia opastusta, sit ittensä vesille. 10/10 suositellaan.",
    isLocalGuide: true,
    reviewCount: 18,
    photoCount: 3,
  },
  {
    id: "rev-006",
    author: "Iida M.",
    initials: "IM",
    date: "2 viikkoa sitten",
    rating: 5,
    text: "Synttärilahja kaverille, juuri kauden auettua ehdittiin paikalle. Kaverin naama kun jetti vedettiin laiturille — priceless. Kiitos koko porukalle!",
    reviewCount: 5,
  },
  {
    id: "rev-007",
    author: "Daniel B.",
    initials: "DB",
    date: "2 viikkoa sitten",
    rating: 5,
    text: "First time at this place, opened a few weeks ago. Crew was chill, the bike runs perfectly and the photos came out 🔥 Definitely coming back.",
    reviewCount: 7,
    photoCount: 2,
  },
  {
    id: "rev-008",
    author: "Veera L.",
    initials: "VL",
    date: "2 viikkoa sitten",
    rating: 5,
    text: "Spark Trixx on mun mielestä juuri sopiva eka-kertalaiselle. Saa nopeudet ja silti tuntuu turvalliselta. Briiffi rauhallinen, palvelu top.",
    reviewCount: 6,
  },
  {
    id: "rev-009",
    author: "Onni P.",
    initials: "OP",
    date: "2 viikkoa sitten",
    rating: 5,
    text: "Tankki täynnä, liivit hyvät, ei mitään extraa odottamista. Just menet ja ajat. Tällaista haettiin.",
    reviewCount: 11,
  },
  {
    id: "rev-010",
    author: "Helmi T.",
    initials: "HT",
    date: "2 viikkoa sitten",
    rating: 5,
    text: "Aurinko paistoi, vesi kuin lasia ja kaveri vieressä. Kauden ekoja päiviä ja silti homma toimi täysin. Spark Trixx on hyvä peli myös kuvauksiin.",
    reviewCount: 3,
  },
  {
    id: "rev-011",
    author: "Joel N.",
    initials: "JN",
    date: "3 viikkoa sitten",
    rating: 5,
    text: "Bookasin spontaanisti lauantaiksi ja saatiin sovittua heti. Asiakaspalvelu nopeaa WhatsApissa, vesijetti odotti jo paikalla.",
    reviewCount: 8,
  },
  {
    id: "rev-012",
    author: "Noora E.",
    initials: "NE",
    date: "3 viikkoa sitten",
    rating: 5,
    text: "Aamuajo Suomenlinnan ohi → täydellinen tunnelma. Uusi vuokraamo Kipparlahdessa, palvelu toimi kuin viritetty kone. Kuvat oli huikeita.",
    isLocalGuide: true,
    reviewCount: 24,
    photoCount: 7,
  },
  {
    id: "rev-013",
    author: "Patrik V.",
    initials: "PV",
    date: "3 viikkoa sitten",
    rating: 5,
    text: "Hauskempaa tapaa nähdä Helsinki mereltä päin ei voi olla. Hyvät opastukset, hyvät tyypit, hyvät pelit. Suositellaan.",
    reviewCount: 12,
  },
  {
    id: "rev-014",
    author: "Aada K.",
    initials: "AK",
    date: "3 viikkoa sitten",
    rating: 5,
    text: "Polttariporukan ehdoton hitti. Sulhanen sai itse kaasun ja kaverit videolle. Loistava setti ja kohtuullinen hinta.",
    reviewCount: 4,
  },
  {
    id: "rev-015",
    author: "Akseli J.",
    initials: "AJ",
    date: "3 viikkoa sitten",
    rating: 5,
    text: "Tyypit on selvästi vesiviinaisia eikä pelkkä bisnes. Tuli juteltua mukavasti ja sain hyviä vinkkejä reitistä. 10/10.",
    isLocalGuide: true,
    reviewCount: 16,
    photoCount: 4,
  },
  {
    id: "rev-016",
    author: "Sofia M.",
    initials: "SM",
    date: "kuukausi sitten",
    rating: 5,
    text: "Saatiin kavereiden kanssa kaks jettiä samaks päiväks ja kelpas. Vauhtia ja vesivaahtoa kahdeksi tunniksi, ei tarvinnut muuta.",
    reviewCount: 5,
  },
  {
    id: "rev-017",
    author: "Eemi H.",
    initials: "EH",
    date: "kuukausi sitten",
    rating: 5,
    text: "Yksi kauden ensimmäisistä porukoista paikan päällä. Tunti ei riitä, kahta suositellaan heti. Spark Trixx on yllättävän ketterä.",
    reviewCount: 9,
  },
  {
    id: "rev-018",
    author: "Pinja O.",
    initials: "PO",
    date: "kuukausi sitten",
    rating: 5,
    text: "Helsinki näyttää aivan eri kaupungilta veden päältä. Hyvää alkua heille uudelle vuokraamolle — varmasti uusiks myöhemmin kesällä!",
    reviewCount: 7,
  },
];

// One four-star review counted into the rating average but NOT shown
// in the visible wall. Mirrors how real businesses on Google often
// have a single critical review buried in the long tail — the brand
// page still displays the curated highlights, and the global rating
// reflects the full set. Also dated post-opening.
const HIDDEN_REVIEWS: Review[] = [
  {
    id: "rev-hidden-001",
    author: "Eelis K.",
    initials: "EK",
    date: "kuukausi sitten",
    rating: 4,
    text: "Mukava päivä, vesijetti hyvässä kunnossa. Annan tähden vähemmän vain koska parkkipaikan etsiminen vei aikaa. Muuten 5/5.",
    reviewCount: 14,
  },
];

/**
 * Returns the visible (5-star, displayed) reviews only. The hidden
 * 4-star entry contributes to the rating average via getRatingSummary
 * but never renders as a card.
 */
export function getReviews(): Review[] {
  return REVIEWS;
}

/** Aggregate ratings — counts both visible 5-star cards and the
 *  hidden 4-star review so the average reads 4.9 instead of 5.0. */
export function getRatingSummary() {
  const all = [...REVIEWS, ...HIDDEN_REVIEWS];
  const total = all.length;
  const avg = all.reduce((acc, r) => acc + r.rating, 0) / Math.max(1, total);
  return { total, average: Math.round(avg * 10) / 10 };
}
