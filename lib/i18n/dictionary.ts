// Single source of truth for every user-facing string. The Finnish dictionary
// is the master shape; the English one must match it key-for-key. Adding a
// new string means adding it to both `fi` and `en` blocks.

export const dictionary = {
  fi: {
    common: {
      bookNow: "Varaa nyt",
      bookShort: "Varaa",
      back: "Takaisin",
      continue: "Jatka",
      backToTop: "Ylös",
      readMore: "Lue lisää",
      contact: "Ota yhteyttä",
      email: "Sähköposti",
      phone: "Puhelin",
      tiktok: "TikTok",
      instagram: "Instagram",
      location: "Sijainti",
      season: "Kausi",
      etusivu: "Etusivu",
      open: "Avaa valikko",
      perJet: "/ vesijetti",
      currency: "€",
      hours1: "1 tunti",
      hours2: "2 tuntia",
      hoursHalf: "Puoli päivää (4h)",
      langLabel: "Kieli",
    },
    nav: {
      vesijetti: "Vesijettimme",
      hinnasto: "Hinnasto",
      meista: "Meistä",
      ukk: "UKK",
      yhteystiedot: "Yhteystiedot",
    },
    hero: {
      location: "Helsinki, Suomi",
      ratingLabel: "4,9 / 5",
      title1: "Koe kesän",
      titleHighlight: "paras päivä",
      title2: "vesillä.",
      subhead:
        "Nauti lyhyestä kesästä aallonharjalla 82 km/h vauhdissa. Polttoaine, pelastusliivit ja opastus kuuluvat hintaan. Sinä hoidat vain hymyn, joka pysyy kasvoilla pitkään ajon jälkeenkin.",
      cta: "Varaa nyt",
      bullet1: "Aloitus Herttoniemen Kipparlahden satamasta",
      bullet2: "Ei ajokorttivaatimusta",
      bullet3: "Ensikertalaisystävällinen",
      offerEyebrow: "2h tarjous",
      offerProduct: "Sea-Doo Spark Trixx 2UP",
      offerPrice: "279 € / 2h",
      offerTick1: "Aloitus Herttoniemen Kipparlahden satamasta",
      offerTick2: "1-2 hengelle, pelastusliivit ja polttoaine kuuluvat hintaan",
      offerTick3: "Lyhyt opastus ja eikun vain menoksi",
      offerCta: "Tarkista saatavuus",
    },
    trust: {
      noLicense: "Ei ajokorttivaatimusta",
      fuel: "Polttoaine sisältyy hintaan",
      lifeJackets: "Pelastusliivit mukana",
      rating: "Google arvostelut 4,9 / 5",
      departure: "Lähtö Herttoniemen Kipparlahden satamasta",
    },
    howItWorks: {
      eyebrow: "Näin se toimii",
      title: "Selauksesta vesille neljässä helpossa askeleessa.",
      subtitle: "Me hoidamme logistiikan. Sinä hoidat kaasukahvan.",
      step1Title: "Valitse aika",
      step1Text:
        "Päivä, kesto ja vesijettien määrä. Maksat verkossa, valmista 60 sekunnissa.",
      step2Title: "Saavu Herttoniemeen",
      step2Text:
        "Lähtöpaikka on Herttoniemen satama. Tarvittaessa voimme sopia toimituksen muualle lisämaksusta.",
      step3Title: "Aja minne tahansa",
      step3Text:
        "Lyhyt opastus, tankki täynnä, pelastusliivit valmiina. Saaristo on sinun.",
      step4Title: "Helppo palautus",
      step4Text:
        "Me haemme vesijetin pois. Ei perävaunuja, ei parkkihuolia, vain muistoja.",
    },
    socialFeed: {
      eyebrow: "Live feed",
      titleA: "Me",
      titleHighlight: "somessa",
      titleB: ".",
      subtitle:
        "Älä missaa kesän kuumimpia arvontoja, vinkkejä ja päivityksiä seuraamalla meitä someissa. Pysy aina aallon harjalla!",
    },
    reviews: {
      eyebrow: "Arvostelut",
      title: "Asiakkaat kertovat.",
      total: "Yhteensä 47 Google arvostelua",
      readGoogle: "Lue Googlessa",
      items: [
        {
          author: "Mikko T.",
          initials: "MT",
          date: "Heinäkuu 2025",
          text: "Toimitus pelasi täydellisesti. Saimme Spark Trixxin suoraan mökin laiturille ja loppupäivä meni kuin siivillä. Suosittelen.",
        },
        {
          author: "Anna K.",
          initials: "AK",
          date: "Elokuu 2025",
          text: "Helpoin varauskokemus. Tunti meni nopeasti, joten varasin saman tien lisää. Asiakaspalvelu rentoa ja ammattimaista.",
        },
        {
          author: "Petra L.",
          initials: "PL",
          date: "Heinäkuu 2025",
          text: "Loistava synttärilahja kaverille. Kaverit yllättyivät täysin kun jetti tuotiin paikan päälle. Varmasti tulemme uudestaan.",
        },
        {
          author: "Joonas R.",
          initials: "JR",
          date: "Kesäkuu 2025",
          text: "Spark Trixx on hauska peli. Lyhyt opastus riitti täysin, hommat sujui muuten ihan itsestään. Vakuutus ja liivit oli ok kunnossa.",
        },
      ],
    },
    lifestyle: {
      eyebrow: "Tutustu meihin",
      titleA: "Nuori porukka, johon voit",
      titleHighlight: "luottaa",
      titleB: ".",
      subtitle:
        "82Rentals Oy on kolmen helsinkiläisen kaverin perustama yritys. Pidämme laitteistomme huippukunnossa, vastaamme nopeasti ja hoidamme aina asiat sovitusti. Olemme itse vesillä viikoittain ja huollamme kalustoa säännöllisesti, jotta vesijetit ovat aina priimakunnossa.",
      stat1: "Tyytyväistä asiakasta",
      stat2: "Keskiarvosana",
      stat3: "Huolletut vesijetit",
      stat4: "Varaus valmis",
    },
    cta: {
      eyebrow: "Valmiina lähtemään",
      defaultTitle: "Valmiina vesille?",
      defaultSubtitle:
        "Varaa Sea-Doo Spark Trixx 2up 60 sekunnissa. Lähtö Herttoniemen Kipparlahden venesatamasta.",
    },
    footer: {
      tagline: "Paikallisten perustama vesijettivuokraamo Helsingistä.",
      pages: "Sivut",
      contact: "Yhteystiedot",
      faqLink: "Usein kysytyt",
      varaaLink: "Varaa",
      termsLink: "Sopimusehdot",
      rights: "Kaikki oikeudet pidätetään.",
      city: "Helsinki, Suomi",
    },
    pricing: {
      tiers: [
        {
          name: "Pyrähdys",
          duration: "1 tunti",
          description: "Helppo ja nopea irtiotto.",
          features: [
            "Polttoaine sisältyy",
            "1 vesijetti, 1 tai 2 hengelle",
            "Nouto Herttoniemen satamasta",
            "Pelastusliivit ja vakuutus",
          ],
          tag: "Nopea kokemus",
          cta: "Varaa nopeasti",
        },
        {
          name: "Kesän klassikko",
          duration: "2 tuntia",
          description: "Täydellinen aika nauttia kunnolla. Ei kiirettä, ei stressiä.",
          features: [
            "Polttoaine sisältyy",
            "1 vesijetti, 1 tai 2 hengelle",
            "Nouto Herttoniemen satamasta",
            "Reittisuositukset",
            "Ammattilaisvinkit tempuille",
          ],
          tag: "Suosituin valinta",
          cta: "Varaa suosituin",
        },
        {
          name: "Saaristopäivä",
          duration: "4 tuntia",
          description: "Eniten vapautta vesillä ja paras hinta tunnille.",
          features: [
            "Polttoaine sisältyy",
            "1 vesijetti, 1 tai 2 hengelle",
            "Nouto Herttoniemen satamasta",
            "Räätälöity reittisuunnittelu",
            "Etusija säävaraukseen",
          ],
          tag: "Paras arvo",
          cta: "Valitse paras arvo",
        },
      ],
      mostPopular: "Suosituin valinta",
      bookSuffix: "Varaa",
      allInclusiveTitle: "Kaikki sisältyy hintaan",
      allInclusiveBody:
        "Meillä et maksa polttoaineesta erikseen, kaikki sisältyy hintaan. Tiedät aina etukäteen mitä maksat.",
      twoUpTitle: "Yhdellä vesijetillä matkustaa kaksi",
      twoUpBody:
        "Sinä ja kaveri, kumppani tai sisarus, samalla pelillä. Ei tarvitse varata kahta jos olette kaksin.",
      customTitle: "Eri pituiset paketit ja ryhmävaraukset",
      customBody:
        "Räätälöimme paketin pidemmistä ajoista, polttariporukoista ja tapahtumista. Soita tai laita sähköpostia.",
    },
    booking: {
      sectionTitle: "Varaa vesijetti 60 sekunnissa.",
      sectionSubtitle:
        "Valitse päivä ja kesto. Polttoaine, liivit ja vakuutus aina hintaan. Nouto Herttoniemen satamasta.",
      stepLabels: [
        "Vesijetit ja kesto",
        "Päivä ja aloitusaika",
        "Tiedot ja toimitus",
        "Tarkista ja vahvista",
      ],
      stepHeader: "Varaus · vaihe {n}/4",
      qtyTitle: "Kuinka monta vesijettiä?",
      qty1People: "1 tai 2 henkilölle",
      qty2People: "Jopa 4 henkilölle",
      qtyHelper:
        "Yhdelle vesijetille mahtuu 1 tai 2 henkilöä. Voit ottaa myös kaksi vesijettiä, jos haluatte ajaa kaksin omillanne. Kalustossa maksimissaan 2 vesijettiä.",
      durationTitle: "Kuinka pitkä ajo?",
      includedLine: "Polttoaine sisältyy",
      pickDay: "Valitse päivä",
      pickDayHelper: "Selaa kuukausia nuolista",
      startTimeTitle: "Aloitusaika · {date}",
      hours: "Aukioloajat klo {open}–{close}",
      slotFull: "Varattu",
      slotFreeMany: "{n} vapaata",
      slotFreeOne: "1 vapaa",
      contactTitle: "Haluatko muun ajan?",
      contactBody:
        "Aukioloajan ulkopuoliset ajot, aikaiset aamut tai myöhäiset illat sopimuksen mukaan. Soita tai laita sähköpostia, järjestämme.",
      contactCustomTitle: "Tarvitsetko eri pituisen paketin?",
      contactCustomBody:
        "Räätälöimme polttariporukoille, tapahtumiin ja pidempiin ajoihin. Soita tai laita sähköpostia, vastaamme heti.",
      pickupTitle: "Mistä noudat vesijetin?",
      pickupDefaultBody: "Tarkka paikka on Kipparlahden venekerho Herttoniemessä. Sisältyy hintaan, helppo löytää kartalta.",
      pickupOtherTitle: "Tarvitsetko toimituksen muualle?",
      pickupOtherBody: "Onnistuu lisämaksusta sopimuksen mukaan. Soita tai laita sähköpostia ennen varausta, niin sovitaan paikka ja hinta.",
      pickupOrChoose: "Tai valitse pikavalinnoista",
      pickupConfirm: "Toimituspaikka:",
      fullName: "Koko nimi",
      fullNamePlaceholder: "Esim. Matti Meikäläinen",
      phonePlaceholder: "+358 40 123 4567",
      emailPlaceholder: "etunimi.sukunimi@gmail.com",
      additionalInfo: "Lisätietoja ja toiveet",
      additionalPlaceholder: "Esim. lapsia mukana, synttärilahja, soita ennen toimitusta…",
      additionalHint: "Kirjoita tähän kysymyksesi, erityistoiveet tai mikä tahansa mitä meidän on hyvä tietää. Vastaamme aina ennen vahvistusta.",
      reviewTitle: "Tarkista yhteenveto",
      reviewLabels: {
        day: "Päivä",
        time: "Kellonaika",
        duration: "Kesto",
        quantity: "Vesijettien määrä",
        pickup: "Toimitus",
        name: "Nimi",
        phone: "Puhelin",
        email: "Sähköposti",
        notes: "Lisätiedot",
      },
      edit: "Muokkaa",
      reviewLegal:
        "Maksuton peruutus 24 tuntia ennen ajoa. Vahvistamme sinulle puhelimitse 30 minuutin sisällä varauksesta. Saa ajaa Suomen vesillä.",
      submit: "Vahvista varaus",
      submitting: "Varataan…",
      acceptTermsBefore: "Olen lukenut ja hyväksyn ",
      acceptTermsLink: "varauksen sopimusehdot",
      acceptTermsAfter: ".",
      termsModalTitle: "Sopimusehdot",
      termsModalAccept: "Hyväksyn ehdot",
      checkLabel: "Tarkista",
      summaryEyebrow: "Varauksesi",
      summaryProduct: "Sea-Doo Spark Trixx",
      summaryDuration: "Kesto",
      summaryDate: "Päivämäärä",
      summarySlot: "Aloitusaika",
      summaryQty: "Vesijetit",
      summaryQtyValue: "{n}× (1 tai 2 hengelle)",
      summaryPickup: "Toimitus",
      summaryRent: "Vuokra",
      summaryFuelIncluded: "Polttoaine sisältyy",
      summaryDelivery: "Nouto Herttoniemestä",
      summaryDeliveryValue: "Sisältyy",
      summaryTotal: "Yhteensä",
      successTitle: "Varaus vastaanotettu!",
      successBody:
        "{qty}× Sea-Doo Spark Trixx · {date} klo {slot}, kesto {duration}. Toimitus paikkaan {pickup}.",
      successConfirm: "Vahvistamme puhelimitse 30 minuutin sisällä.",
      successTotal: "Yhteensä:",
      successAgain: "Tee uusi varaus",
      legend: {
        plenty: "Vapaita",
        few: "Niukasti",
        full: "Täynnä",
      },
      monthDays: ["Su", "Ma", "Ti", "Ke", "To", "Pe", "La"],
      monthDaysHead: ["Ma", "Ti", "Ke", "To", "Pe", "La", "Su"],
      months: [
        "tammikuu",
        "helmikuu",
        "maaliskuu",
        "huhtikuu",
        "toukokuu",
        "kesäkuu",
        "heinäkuu",
        "elokuu",
        "syyskuu",
        "lokakuu",
        "marraskuu",
        "joulukuu",
      ],
      monthsShort: [
        "tammi",
        "helmi",
        "maalis",
        "huhti",
        "touko",
        "kesä",
        "heinä",
        "elo",
        "syys",
        "loka",
        "marras",
        "joulu",
      ],
      durationLabels: {
        "1h": "1 tunti",
        "2h": "2 tuntia",
        halfday: "Puoli päivää (4h)",
      },
    },
    pages: {
      home: {},
      vesijetti: {
        title: "Sea-Doo Spark Trixx 2up",
        eyebrow: "Kalusto",
        heroTitle: "Sea-Doo Spark Trixx 2up.",
        heroDesc:
          "Sea-Doon leikkisin malli. Suunniteltu ajajille, jotka haluavat oikeasti tuntea veden.",
        productEyebrow: "Laitteisto",
        productTitle: "Sea-Doo Spark Trixx 2up.",
        productBody: "Ensikertalaisystävällinen ja turvallinen vesijetti.",
        productCta: "Varaa tämä vesijetti",
        features: [
          {
            title: "Kevyt ja leikkisä",
            text: "82 km/h huippunopeus, alle 200 kg paino. Enemmän hevosvoimia kuin Volkswagen Polossa.",
          },
          {
            title: "Tehty tempuille",
            text: "Säädettävä ohjaustanko ja Trixx-jalkapohjat antavat ajaa pystyssä ja temppuilla helposti.",
          },
          {
            title: "2 hengen vesijetti",
            text: "Mukava 2up istuin, kaveri tai kumppani mahtuu kyytiin.",
          },
          {
            title: "Täysin turvallinen",
            text: "Pelastusliivit, paikannin ja muut turvavarusteet kuuluvat aina hintaan.",
          },
        ],
        anatomyEyebrow: "Tutustu jettiin",
        anatomyTitle: "Mistä Spark Trixx koostuu.",
        anatomyBody: "Tärkeimmät ominaisuudet kerralla. Käyttöönotto vie minuutteja.",
        hotspots: [
          {
            title: "Säädettävä ohjaustanko",
            text: "Riser nostaa ajoasennon pystyyn ja helpottaa hallintaa.",
          },
          {
            title: "2-up Trixx-istuin",
            text: "Mukava istuin kahdelle, ota kaveri tai kumppani kyytiin.",
          },
          {
            title: "Rotax 90 hv + iBR",
            text: "Sähköinen jarru ja peruutus tekevät vauhtiin pääsystä turvallista.",
          },
          {
            title: "Kevyt runko",
            text: "Alle 200 kg kuivapaino tekee jetistä ketterän ja leikkisän.",
          },
        ],
        specsEyebrow: "Tekniset tiedot",
        specsTitle: "Numerot lyhyesti.",
        specs: [
          { k: "Moottori", v: "Rotax 900 ACE" },
          { k: "Teho", v: "90 hv" },
          { k: "Henkilömäärä", v: "2" },
          { k: "Paino", v: "n. 195 kg" },
        ],
        ctaTitle: "Aja sitä, älä vain katso kuvia.",
        ctaSubtitle:
          "Varaa Sea-Doo Spark Trixx ja koe miksi tämä on Sea-Doon leikkisin malli.",
      },
      hinnasto: {
        title: "Hinnasto",
        eyebrow: "Hinnasto",
        heroTitle: "Aja Helsingissä ilman yllätyksiä.",
        heroDesc:
          "Polttoaine, pelastusliivit ja vakuutus aina hintaan. Nouto Herttoniemestä. Tiedät aina etukäteen mitä maksat.",
        ctaTitle: "Lukitse hintasi nyt.",
        ctaSubtitle:
          "Hinnat ovat kiinteät, varaa heti, niin saat parhaat ajat itsellesi.",
      },
      meista: {
        title: "Meistä",
        eyebrow: "Meistä",
        heroTitle: "Helsinkiläinen kaveriporukka, joka rakastaa vesillä oloa.",
        heroDesc:
          "Aloitimme 82Rentalsin koska halusimme tehdä Helsingin saaristosta lähemmäksi. Lähtöpaikka on Herttoniemen satama, loppupäivä on sinun.",
        storyEyebrow: "Tarina",
        storyTitle: "Miksi tämä syntyi.",
        storyBody1:
          "82Rentals lähti liikkeelle yksinkertaisesta turhautumisesta. Helsinki on saariston ympäröimä, mutta vesille pääseminen on aina vaatinut perävaunua, parkkihuolia ja jonotusta vuokraamossa.",
        storyBody2:
          "Halusimme rakentaa palvelun, jossa varaus tehdään minuutissa ja vesijetti on paikan päällä silloin kun sinä haluat. Se onnistui niin hyvin, että nyt me vain tuomme vesijetin sinulle ja sinä keskityt kesän parhaaseen päivään.",
        valueIcons: ["Helppoutta", "Asiakas ensin", "Kalusto kunnossa"],
        values: [
          {
            title: "Helppoutta",
            text: "Varaus, toimitus ja palautus suoraviivaisesti. Sinun ei pidä miettiä logistiikkaa.",
          },
          {
            title: "Asiakas ensin",
            text: "Olemme tavoitettavissa koko ajon ajan. Jokainen palaute päätyy oikeasti meidän pöydälle.",
          },
          {
            title: "Kalusto kunnossa",
            text: "Vesijetit huolletaan jokaisen ajon välissä. Vakuutus ja liivit aina mukana.",
          },
        ],
        foundersEyebrow: "Tiimi",
        foundersTitle: "Kolme tyyppiä, yksi vesijetti.",
        foundersBody:
          "Helsinkiläinen kolmikko, joka uskoo että parhaat kesäpäivät syntyvät vesillä. Perustimme 82Rentalsin tehdäksemme vesijetillä ajamisesta yhtä helppoa kuin pizzan tilaaminen.",
        founders: [
          {
            name: "Patrik Blomvall",
            role: "Perustaja",
            bio: "Helsinkiläinen vesi ja moottoriurheilun harrastaja, joka pyörittää 82Rentalsin operatiivista puolta. Vastaa kalustosta, toimituksista ja siitä, että jokainen ajo lähtee kunnolla käyntiin.",
          },
          {
            name: "Ville Hautamäki",
            role: "Perustaja",
            bio: "Asiakaskokemus ja kasvun suunta ovat Villen vastuulla. Pitää huolen, että varaus sujuu mutkattomasti ja että asiakkaiden palaute kuuluu jokaisessa palvelun yksityiskohdassa.",
          },
          {
            name: "Joonatan Lindholm",
            role: "Perustaja",
            bio: "Brändin ja digitaalisen kokonaisuuden takana. Verkkokokemus, sisältö ja ulkoasu ovat Joonatanin tontilla, jotta sivu näyttää yhtä terävältä kuin itse Spark Trixx vesillä.",
          },
        ],
        ctaTitle: "Tule mukaan vesille.",
        ctaSubtitle:
          "Varaa Sea-Doo Spark Trixx ja koe Helsingin saaristo uudella tavalla.",
      },
      "miten-toimii": {
        title: "Näin se toimii",
        eyebrow: "Prosessi",
        heroTitle: "Näin se toimii.",
        heroDesc:
          "Sinun ei tarvitse omistaa perävaunua, etsiä parkkia tai jonottaa vuokraamossa. Me hoidamme logistiikan, sinä hoidat kaasukahvan.",
        ctaTitle: "Yhdellä klikkauksella vesille.",
        ctaSubtitle:
          "Varaa Sea-Doo Spark Trixx ja saat sen toimitettuna haluamaasi paikkaan.",
      },
      ukk: {
        title: "Usein kysytyt kysymykset",
        eyebrow: "UKK",
        heroTitle: "Hyvät kysymykset, selkeät vastaukset.",
        heroDesc:
          "Jos jotain jäi mietityttämään, tästä löydät vastaukset. Etkö löydä omaasi? Laita viestiä.",
        ctaTitle: "Valmis lähtemään vesille?",
        ctaSubtitle:
          "Varaa Sea-Doo Spark Trixx 60 sekunnissa ja saat sen toimitettuna Helsingissä minne tahansa.",
        sideTitle: "Hyvät kysymykset ansaitsevat selkeät vastaukset.",
        sideBody:
          "Jäikö jotain mietityttämään? Laita viestiä, vastaamme yleensä minuuteissa kauden aikana.",
        sideCta: "Ota yhteyttä →",
        items: [
          {
            q: "Tarvitsenko ajokortin?",
            a: "Et. Sea-Doo Spark Trixx 2up:in ajamiseen Suomessa ei vaadita erillistä vesikulkuneuvokorttia. Alaikäraja on 18 vuotta ja tarvitset voimassa olevan henkilöllisyystodistuksen. Annamme lyhyen turvaopastuksen ennen jokaista ajoa.",
          },
          {
            q: "Onko se turvallista? Entä vakuutus?",
            a: "Kyllä. Kaikkiin vuokriin sisältyy kattava vakuutus, pelastusliivit ja turvallisuusnaru. Käymme jokaisen ajajan kanssa läpi turvallisen ajon ja reittivalinnat, ja olemme tavoitettavissa puhelimitse koko ajon ajan.",
          },
          {
            q: "Mitä jos sää on huono?",
            a: "Turvallisuus ensin. Jos olosuhteet ovat vaaralliset (kova tuuli, myrsky, sankka sumu), siirrämme varauksen ilmaiseksi tai palautamme rahat kokonaan. Kevyt sade ei yleensä ole ongelma.",
          },
          {
            q: "Mikä on peruutusehto?",
            a: "Maksuton peruutus 24 tuntia ennen varauksen alkua. Tämän jälkeen veloitamme 50 %. Säästä johtuvat peruutukset meiltä ovat aina 100 % palautuskelpoisia tai siirrettävissä uuteen aikaan.",
          },
          {
            q: "Mistä noudan vesijetin?",
            a: "Lähtöpaikka on Herttoniemen satama, ja se sisältyy aina hintaan. Jos haluat että tuomme vesijetin muualle Helsingin alueelle, onnistuu se lisämaksusta sopimuksen mukaan. Soita +358 40 186 6664 tai laita sähköpostia, niin järjestetään.",
          },
          {
            q: "Voiko kaksi henkilöä ajaa yhdessä?",
            a: "Kyllä. Spark Trixx on 2up-malli, eli suunniteltu kahdelle ajajalle. Molempien on käytettävä pelastusliivejä (saat ne meiltä).",
          },
        ],
      },
      varaa: {
        title: "Varaa vesijetti",
        eyebrow: "Varaus",
        heroTitle: "Varaa vesijetti 60 sekunnissa.",
        heroDesc:
          "Valitse päivä ja kesto. Polttoaine, liivit ja vakuutus aina hintaan. Nouto Herttoniemen satamasta.",
        reassurances: [
          {
            title: "Maksuton peruutus",
            text: "24 h ennen varauksen alkua kuluitta.",
          },
          {
            title: "Nouto Herttoniemestä",
            text: "Yksi vakiopaikka, helppo löytää. Muusta paikasta sovitaan erikseen.",
          },
          {
            title: "Joustava ajankohta",
            text: "Aamusta iltaan, sinun aikataulullasi.",
          },
          {
            title: "Vahvistus 30 min",
            text: "Otamme yhteyttä puhelimitse heti.",
          },
        ],
      },
      yhteystiedot: {
        title: "Yhteystiedot",
        eyebrow: "Yhteystiedot",
        heroTitle: "Ollaan yhteydessä.",
        heroDesc:
          "Vastaamme yleensä saman päivän aikana. Soita, laita sähköpostia tai DM:ää somessa.",
        phoneHint: "Joka päivä klo 9 alkaen 21 saakka kauden aikana",
        emailHint: "Vastaamme alle 24 tunnissa",
        igHint: "DM toimii myös varauksiin",
        tiktokHint: "Päivitykset ja kaluston esittelyt",
        locationTitle: "Helsinki, Suomi",
        locationBody:
          "Toimimme koko Helsingin rannikkoalueella. Kerro varauksessa haluamasi paikka, saavumme paikalle.",
        seasonTitle: "Toukokuusta syyskuuhun",
        seasonBody:
          "Ajokausi alkaa kun jää lähtee ja kestää syksyyn. Alkukauden ja loppukauden varauksiin voi soveltua erityisehtoja, varmista meiltä.",
      },
    },
    homeHighlights: {
      eyebrow: "Mitä saat",
      titleA: "Kesäsi",
      titleHighlight: "kovin",
      titleB: "investointi.",
      subtitle:
        "Vapaus, vauhti ja ne hetket joita ei voi ostaa muuten kuin tällä tavalla. Tutustu pakettiin tai hyppää suoraan varaukseen.",
      cards: [
        {
          eyebrow: "Kone",
          title: "90 hv adrenaliinia",
          text:
            "Spark Trixx on tehty huomiota varten. Kevyt, ketterä ja täysin ennustamaton.",
          cta: "Lue lisää",
        },
        {
          eyebrow: "Hinnasto",
          title: "Yksi hinta, kaikki mukana",
          text:
            "Toimitus, polttoaine, liivit ja vakuutus aina hintaan. Ei piilokuluja.",
          cta: "Lue lisää",
        },
        {
          eyebrow: "Tiimi",
          title: "Helsinkiläiset tekijät",
          text: "Kolme kaveria, yksi missio: tehdä kesästäsi unohtumaton.",
          cta: "Lue lisää",
        },
      ],
    },
  },
  en: {
    common: {
      bookNow: "Book now",
      bookShort: "Book",
      back: "Back",
      continue: "Continue",
      backToTop: "Top",
      readMore: "Read more",
      contact: "Contact us",
      email: "Email",
      phone: "Phone",
      tiktok: "TikTok",
      instagram: "Instagram",
      location: "Location",
      season: "Season",
      etusivu: "Home",
      open: "Open menu",
      perJet: "/ jet ski",
      currency: "€",
      hours1: "1 hour",
      hours2: "2 hours",
      hoursHalf: "Half day (4h)",
      langLabel: "Language",
    },
    nav: {
      vesijetti: "Our jet ski",
      hinnasto: "Pricing",
      meista: "About",
      ukk: "FAQ",
      yhteystiedot: "Contact",
    },
    hero: {
      location: "Helsinki, Finland",
      ratingLabel: "4.9 / 5",
      title1: "Live the",
      titleHighlight: "best day",
      title2: "of summer on the water.",
      subhead:
        "Make the short summer count at 82 km/h on the wave crest. Fuel, life jackets and a quick briefing are on us. You just bring the smile, the kind that stays put long after the engine quiets down.",
      cta: "Book now",
      bullet1: "Start from Herttoniemi Kipparlahti marina",
      bullet2: "No license required",
      bullet3: "First-timer friendly",
      offerEyebrow: "2h deal",
      offerProduct: "Sea-Doo Spark Trixx 2UP",
      offerPrice: "€279 / 2h",
      offerTick1: "Start from Herttoniemi Kipparlahti marina",
      offerTick2: "Fits 1-2 people, life jackets and fuel included",
      offerTick3: "Quick briefing and you're off",
      offerCta: "Check availability",
    },
    trust: {
      noLicense: "No license required",
      fuel: "Fuel included in price",
      lifeJackets: "Life jackets included",
      rating: "Google reviews 4.9 / 5",
      departure: "Start at Herttoniemi Kipparlahti marina",
    },
    howItWorks: {
      eyebrow: "How it works",
      title: "From scroll to splash in four easy steps.",
      subtitle: "We handle the logistics. You handle the throttle.",
      step1Title: "Pick a time",
      step1Text:
        "Choose date, duration and number of jet skis. Pay online, done in 60 seconds.",
      step2Title: "Come to Herttoniemi",
      step2Text:
        "Pickup is at Herttoniemi marina. Delivery elsewhere is possible by separate arrangement for an extra fee.",
      step3Title: "Ride anywhere",
      step3Text:
        "Quick briefing, full tank, life jackets ready. The archipelago is yours.",
      step4Title: "Easy return",
      step4Text:
        "We pick the jet ski up. No trailers, no parking headaches, just memories.",
    },
    socialFeed: {
      eyebrow: "Live feed",
      titleA: "On",
      titleHighlight: "social",
      titleB: ".",
      subtitle:
        "Don't miss the season's hottest giveaways, tips and updates by following us on social. Stay on the wave crest, always.",
    },
    reviews: {
      eyebrow: "Reviews",
      title: "What customers say.",
      total: "47 Google reviews in total",
      readGoogle: "Read on Google",
      items: [
        {
          author: "Mikko T.",
          initials: "MT",
          date: "July 2025",
          text: "Delivery was flawless. We got the Spark Trixx straight to our cottage dock and the rest of the day flew by. Highly recommend.",
        },
        {
          author: "Anna K.",
          initials: "AK",
          date: "August 2025",
          text: "Easiest booking experience ever. The hour flew by so I booked another on the spot. Service felt relaxed and professional.",
        },
        {
          author: "Petra L.",
          initials: "PL",
          date: "July 2025",
          text: "Perfect birthday gift for a friend. They were stunned when the jet ski showed up at the spot. We'll definitely be back.",
        },
        {
          author: "Joonas R.",
          initials: "JR",
          date: "June 2025",
          text: "Spark Trixx is a blast. Quick briefing was enough, the rest was self-explanatory. Insurance and life jackets all set.",
        },
      ],
    },
    lifestyle: {
      eyebrow: "Get to know us",
      titleA: "Young crew you can",
      titleHighlight: "trust",
      titleB: ".",
      subtitle:
        "82Rentals Oy is run by three Helsinki-based friends. We keep our gear in top shape, reply quickly and handle everything as agreed. We're out on the water every week and service the fleet regularly, so the jet skis are always in prime condition.",
      stat1: "Happy customers",
      stat2: "Average rating",
      stat3: "Serviced jet skis",
      stat4: "Booking time",
    },
    cta: {
      eyebrow: "Ready to roll",
      defaultTitle: "Ready to hit the water?",
      defaultSubtitle:
        "Book the Sea-Doo Spark Trixx 2up in 60 seconds. Departure from the Kipparlahti marina in Herttoniemi.",
    },
    footer: {
      tagline: "Locally founded jet ski rental from Helsinki.",
      pages: "Pages",
      contact: "Contact",
      faqLink: "FAQ",
      varaaLink: "Book",
      termsLink: "Terms of service",
      rights: "All rights reserved.",
      city: "Helsinki, Finland",
    },
    pricing: {
      tiers: [
        {
          name: "The Sprint",
          duration: "1 hour",
          description: "An easy, fast escape on the water.",
          features: [
            "Fuel included",
            "1 jet ski, fits 1 or 2 people",
            "Pickup at Herttoniemi marina",
            "Life jackets and insurance",
          ],
          tag: "Quick ride",
          cta: "Book quick",
        },
        {
          name: "The Classic",
          duration: "2 hours",
          description: "The sweet spot. No rush, no stress.",
          features: [
            "Fuel included",
            "1 jet ski, fits 1 or 2 people",
            "Pickup at Herttoniemi marina",
            "Route suggestions",
            "Pro tips for tricks",
          ],
          tag: "Most popular",
          cta: "Book the favourite",
        },
        {
          name: "Archipelago Day",
          duration: "4 hours",
          description: "Most freedom on the water and the best price per hour.",
          features: [
            "Fuel included",
            "1 jet ski, fits 1 or 2 people",
            "Pickup at Herttoniemi marina",
            "Custom route planning",
            "Priority on weather rebooking",
          ],
          tag: "Best value",
          cta: "Pick best value",
        },
      ],
      mostPopular: "Most popular",
      bookSuffix: "Book",
      allInclusiveTitle: "Everything is included",
      allInclusiveBody:
        "You don't pay for fuel separately, everything is included in the price. You always know exactly what you'll pay.",
      twoUpTitle: "One jet ski fits two",
      twoUpBody:
        "You and a friend, partner or sibling, on the same machine. No need to book two if it's just the two of you.",
      customTitle: "Different lengths and group bookings",
      customBody:
        "We tailor packages for longer rides, bachelor parties and events. Call or email and we'll arrange it.",
    },
    booking: {
      sectionTitle: "Book a jet ski in 60 seconds.",
      sectionSubtitle:
        "Pick the date and duration. Fuel, life jackets and insurance always included. Pickup at Herttoniemi marina.",
      stepLabels: [
        "Jet skis & duration",
        "Date & start time",
        "Details & delivery",
        "Review & confirm",
      ],
      stepHeader: "Booking · step {n}/4",
      qtyTitle: "How many jet skis?",
      qty1People: "For 1 or 2 people",
      qty2People: "Up to 4 people",
      qtyHelper:
        "One jet ski fits 1 or 2 people. You can also take two jet skis if you'd rather ride solo each. Maximum two jet skis per booking.",
      durationTitle: "How long do you want to ride?",
      includedLine: "Fuel included",
      pickDay: "Pick a day",
      pickDayHelper: "Use the arrows to browse months",
      startTimeTitle: "Start time · {date}",
      hours: "Open every day {open}–{close}",
      slotFull: "Booked",
      slotFreeMany: "{n} free",
      slotFreeOne: "1 free",
      contactTitle: "Need a different time?",
      contactBody:
        "Outside opening hours, early mornings or late evenings by arrangement. Call or email and we'll set it up.",
      contactCustomTitle: "Need a different package length?",
      contactCustomBody:
        "We tailor for bachelor parties, events and longer rides. Call or email, we reply right away.",
      pickupTitle: "Where do you pick up the jet ski?",
      pickupDefaultBody: "Exact spot: Kipparlahden venekerho in Herttoniemi. Included in the price, easy to find on the map.",
      pickupOtherTitle: "Need delivery elsewhere?",
      pickupOtherBody: "Possible with an extra fee, by arrangement. Call or email us before booking and we'll agree on the location and the price.",
      pickupOrChoose: "Or pick a popular spot",
      pickupConfirm: "Delivery to:",
      fullName: "Full name",
      fullNamePlaceholder: "E.g. John Doe",
      phonePlaceholder: "+358 40 123 4567",
      emailPlaceholder: "yourname@example.com",
      additionalInfo: "Notes and wishes",
      additionalPlaceholder: "E.g. kids riding, birthday gift, please call before delivery…",
      additionalHint: "Write any questions, special requests or anything we should know. We always reply before confirming.",
      reviewTitle: "Review the summary",
      reviewLabels: {
        day: "Day",
        time: "Time",
        duration: "Duration",
        quantity: "Number of jet skis",
        pickup: "Delivery",
        name: "Name",
        phone: "Phone",
        email: "Email",
        notes: "Notes",
      },
      edit: "Edit",
      reviewLegal:
        "Free cancellation up to 24 hours before. We confirm by phone within 30 minutes of booking. You can ride anywhere in Finnish waters.",
      submit: "Confirm booking",
      submitting: "Booking…",
      acceptTermsBefore: "I have read and accept the ",
      acceptTermsLink: "booking terms",
      acceptTermsAfter: ".",
      termsModalTitle: "Terms of Service",
      termsModalAccept: "Accept terms",
      checkLabel: "Review",
      summaryEyebrow: "Your booking",
      summaryProduct: "Sea-Doo Spark Trixx",
      summaryDuration: "Duration",
      summaryDate: "Date",
      summarySlot: "Start time",
      summaryQty: "Jet skis",
      summaryQtyValue: "{n}× (fits 1 or 2 people)",
      summaryPickup: "Delivery",
      summaryRent: "Rental",
      summaryFuelIncluded: "Fuel included",
      summaryDelivery: "Pickup at Herttoniemi",
      summaryDeliveryValue: "Included",
      summaryTotal: "Total",
      successTitle: "Booking received!",
      successBody:
        "{qty}× Sea-Doo Spark Trixx · {date} at {slot}, duration {duration}. Delivery to {pickup}.",
      successConfirm: "We confirm by phone within 30 minutes.",
      successTotal: "Total:",
      successAgain: "Make another booking",
      legend: {
        plenty: "Plenty",
        few: "Limited",
        full: "Booked",
      },
      monthDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      monthDaysHead: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      monthsShort: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      durationLabels: {
        "1h": "1 hour",
        "2h": "2 hours",
        halfday: "Half day (4h)",
      },
    },
    pages: {
      home: {},
      vesijetti: {
        title: "Sea-Doo Spark Trixx 2up",
        eyebrow: "The machine",
        heroTitle: "Sea-Doo Spark Trixx 2up.",
        heroDesc:
          "Sea-Doo's playful flagship. Built for riders who actually want to feel the water.",
        productEyebrow: "The hardware",
        productTitle: "Sea-Doo Spark Trixx 2up.",
        productBody: "Beginner-friendly and safe to ride.",
        productCta: "Book this jet ski",
        features: [
          {
            title: "Light & playful",
            text: "82 km/h top speed, under 200 kg. More horsepower than a Volkswagen Polo.",
          },
          {
            title: "Tuned for tricks",
            text: "Adjustable handlebars and Trixx footwells let you ride standing up and pull off tricks easily.",
          },
          {
            title: "2-up jet ski",
            text: "Comfy 2-up seat, bring a friend or partner along for the ride.",
          },
          {
            title: "Completely safe",
            text: "Life jackets, a GPS tracker and the rest of the safety gear are always included in the price.",
          },
        ],
        anatomyEyebrow: "Get to know it",
        anatomyTitle: "What makes a Spark Trixx.",
        anatomyBody: "All the key parts at a glance. Onboarding takes minutes.",
        hotspots: [
          {
            title: "Adjustable handlebar",
            text: "The riser lifts your stance and makes the jet easier to control.",
          },
          {
            title: "2-up Trixx seat",
            text: "Comfy seat for two — bring a friend or your partner.",
          },
          {
            title: "Rotax 90 hp + iBR",
            text: "Electric brake and reverse keep getting up to speed safe.",
          },
          {
            title: "Light hull",
            text: "Under 200 kg dry weight makes the jet nimble and playful.",
          },
        ],
        specsEyebrow: "Tech specs",
        specsTitle: "The numbers, briefly.",
        specs: [
          { k: "Engine", v: "Rotax 900 ACE" },
          { k: "Power", v: "90 hp" },
          { k: "Capacity", v: "2 people" },
          { k: "Weight", v: "≈ 195 kg" },
        ],
        ctaTitle: "Ride it. Don't just stare at the photos.",
        ctaSubtitle:
          "Book the Sea-Doo Spark Trixx and find out why it's the most playful Sea-Doo of all.",
      },
      hinnasto: {
        title: "Pricing",
        eyebrow: "Pricing",
        heroTitle: "Ride in Helsinki, no surprises.",
        heroDesc:
          "Fuel, life jackets and insurance always included. Pickup at Herttoniemi. You always know exactly what you'll pay.",
        ctaTitle: "Lock in your price now.",
        ctaSubtitle:
          "Prices are fixed, book today and grab the slots that suit you best.",
      },
      meista: {
        title: "About us",
        eyebrow: "About us",
        heroTitle: "A Helsinki crew that loves being on the water.",
        heroDesc:
          "We started 82Rentals to bring the Helsinki archipelago closer to everyone. Pickup is at Herttoniemi marina, the rest of the day is yours.",
        storyEyebrow: "Story",
        storyTitle: "Why we built this.",
        storyBody1:
          "82Rentals started from a simple frustration. Helsinki sits inside the archipelago, but getting on the water always meant trailers, parking puzzles and queues at the rental shop.",
        storyBody2:
          "We wanted a service where booking takes a minute and the jet ski is right there when you want it. It worked so well that now we just deliver, you focus on the best day of your summer.",
        valueIcons: ["Effortless", "Customer first", "Kit dialled in"],
        values: [
          {
            title: "Effortless",
            text: "Book, get it delivered, hand it back. You don't worry about logistics.",
          },
          {
            title: "Customer first",
            text: "We're reachable throughout your ride. Every piece of feedback lands on our table.",
          },
          {
            title: "Kit dialled in",
            text: "Jet skis are serviced between every ride. Insurance and life jackets always included.",
          },
        ],
        foundersEyebrow: "Team",
        foundersTitle: "Three people, one jet ski.",
        foundersBody:
          "Three Helsinki friends who believe the best summer days happen on water. We started 82Rentals to make jet skiing as easy as ordering pizza.",
        founders: [
          {
            name: "Patrik Blomvall",
            role: "Co-founder",
            bio: "Lifelong watersports and motors guy who runs 82Rentals' operations. Owns the kit, the deliveries and making sure every ride starts smoothly.",
          },
          {
            name: "Ville Hautamäki",
            role: "Co-founder",
            bio: "Customer experience and growth direction sit on Ville's plate. Keeps the booking flow tight and ensures customer feedback shapes every detail of the service.",
          },
          {
            name: "Joonatan Lindholm",
            role: "Co-founder",
            bio: "Behind the brand and digital experience. Web, content and design live with Joonatan so the site looks as sharp as a Spark Trixx on the water.",
          },
        ],
        ctaTitle: "Come hit the water.",
        ctaSubtitle:
          "Book the Sea-Doo Spark Trixx and experience the Helsinki archipelago in a new way.",
      },
      "miten-toimii": {
        title: "How it works",
        eyebrow: "Process",
        heroTitle: "How it works.",
        heroDesc:
          "You don't need a trailer, parking spot or queue. We handle the logistics, you handle the throttle.",
        ctaTitle: "One click and you're on the water.",
        ctaSubtitle:
          "Book the Sea-Doo Spark Trixx and we'll deliver it where you want.",
      },
      ukk: {
        title: "Frequently asked questions",
        eyebrow: "FAQ",
        heroTitle: "Good questions, clear answers.",
        heroDesc:
          "If something's still on your mind, you'll likely find the answer here. Can't see yours? Drop us a message.",
        ctaTitle: "Ready to hit the water?",
        ctaSubtitle:
          "Book the Sea-Doo Spark Trixx in 60 seconds and we'll deliver anywhere in Helsinki.",
        sideTitle: "Good questions deserve clear answers.",
        sideBody:
          "Still wondering about something? Drop us a message, we usually reply within minutes during the season.",
        sideCta: "Contact us →",
        items: [
          {
            q: "Do I need a license?",
            a: "No. Driving the Sea-Doo Spark Trixx 2up in Finland doesn't require a separate watercraft license. Minimum age is 18 and you'll need a valid ID. We give a quick safety briefing before every ride.",
          },
          {
            q: "Is it safe? What about insurance?",
            a: "Yes. Every rental includes comprehensive insurance, life jackets and a kill cord. We walk every rider through safe operation and route choices, and we're available by phone throughout your ride.",
          },
          {
            q: "What if the weather is bad?",
            a: "Safety first. If conditions are unsafe (strong wind, storm, dense fog) we move your booking for free or refund in full. Light rain usually isn't an issue.",
          },
          {
            q: "What's your cancellation policy?",
            a: "Free cancellation up to 24 hours before. After that we charge 50%. Weather-related cancellations from our side are always 100% refundable or rebookable.",
          },
          {
            q: "Where do I pick up the jet ski?",
            a: "Pickup is at Herttoniemi marina, included in the price. If you'd rather have us deliver elsewhere in Helsinki, we can arrange it for an additional fee. Call +358 40 186 6664 or email us and we'll set it up.",
          },
          {
            q: "Can two people ride together?",
            a: "Yes. The Spark Trixx is a 2-up model, designed for two riders. Both must wear life jackets (we provide them).",
          },
        ],
      },
      varaa: {
        title: "Book a jet ski",
        eyebrow: "Booking",
        heroTitle: "Book a jet ski in 60 seconds.",
        heroDesc:
          "Pick a date and duration. Fuel, life jackets and insurance always included. Pickup at Herttoniemi marina.",
        reassurances: [
          {
            title: "Free cancellation",
            text: "Cancel up to 24 hours before for free.",
          },
          {
            title: "Pickup at Herttoniemi",
            text: "One fixed spot, easy to find. Other locations by separate arrangement.",
          },
          {
            title: "Flexible timing",
            text: "Morning to evening, on your schedule.",
          },
          {
            title: "Confirmation 30 min",
            text: "We call you back right away.",
          },
        ],
      },
      yhteystiedot: {
        title: "Contact",
        eyebrow: "Contact",
        heroTitle: "Let's get in touch.",
        heroDesc:
          "We usually reply the same day. Call, email or DM us on social.",
        phoneHint: "Every day 9:00–21:00 during the season",
        emailHint: "We reply within 24 hours",
        igHint: "DMs work for bookings too",
        tiktokHint: "Updates and gear behind the scenes",
        locationTitle: "Helsinki, Finland",
        locationBody:
          "We operate along the entire Helsinki coast. Tell us your spot in the booking, we'll be there.",
        seasonTitle: "May to September",
        seasonBody:
          "Riding season starts when the ice is gone and runs into autumn. Early- and late-season bookings may have special terms — check with us first.",
      },
    },
    homeHighlights: {
      eyebrow: "What you get",
      titleA: "Your summer's",
      titleHighlight: "best",
      titleB: "investment.",
      subtitle:
        "Freedom, speed and the moments you can't buy any other way. Browse the package or jump straight to booking.",
      cards: [
        {
          eyebrow: "Machine",
          title: "90 hp of adrenaline",
          text:
            "Spark Trixx is built to turn heads. Light, agile and totally unpredictable.",
          cta: "Read more",
        },
        {
          eyebrow: "Pricing",
          title: "One price, all in",
          text:
            "Delivery, fuel, life jackets and insurance always included. No hidden fees.",
          cta: "Read more",
        },
        {
          eyebrow: "Team",
          title: "Made in Helsinki",
          text: "Three friends, one mission: make your summer unforgettable.",
          cta: "Read more",
        },
      ],
    },
  },
} as const;

export type Locale = keyof typeof dictionary;
export type Dictionary = (typeof dictionary)[Locale];
