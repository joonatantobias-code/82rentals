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
      hoursFull: "Koko päivä (8h)",
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
        "Yksi elämä, yksi kesä. Vuokraa Spark Trixx, jätä laituri taakse ja varmista että tästä päivästä puhutaan vielä ensi talvenakin. Me toimitamme.",
      cta: "Varaa nyt",
      bullet1: "Maksuton toimitus Helsingissä",
      bullet2: "Ei ajokorttivaatimusta",
      bullet3: "Täysin vakuutettu",
      offerEyebrow: "2h tarjous",
      offerProduct: "Sea-Doo Spark Trixx",
      offerPrice: "199 € / 2h",
      offerTick1: "Toimitus haluamaasi rantaan",
      offerTick2: "1–2 hengelle, pelastusliivit mukana",
      offerTick3: "Lyhyt opastus, ja menoksi",
      offerCta: "Tarkista saatavuus",
    },
    trust: {
      rating: "Arvio 4,9 / 5",
      delivery: "Maksuton toimitus Helsingissä",
      fuel: "Polttoaine sisältyy",
      lifeJackets: "Pelastusliivit mukana",
      insured: "Täysin vakuutettu",
    },
    howItWorks: {
      eyebrow: "Näin se toimii",
      title: "Selauksesta vesille neljässä helpossa askeleessa.",
      subtitle: "Me hoidamme logistiikan. Sinä hoidat kaasukahvan.",
      step1Title: "Valitse aika",
      step1Text:
        "Päivä, kesto ja vesijettien määrä. Maksat verkossa, valmista 60 sekunnissa.",
      step2Title: "Me toimitamme",
      step2Text:
        "Tuomme Sea-Doon mihin tahansa rantaan tai laituriin Helsingissä valitsemaasi aikaan.",
      step3Title: "Aja minne tahansa",
      step3Text:
        "Lyhyt opastus, tankki täynnä, pelastusliivit valmiina. Saaristo on sinun.",
      step4Title: "Helppo palautus",
      step4Text:
        "Me haemme vesijetin pois. Ei perävaunuja, ei parkkihuolia, vain muistoja.",
    },
    socialFeed: {
      eyebrow: "Me somessa",
      titleA: "Seuraa",
      titleHighlight: "meitä",
      titleB: "",
      subtitle:
        "Asiakkaiden parhaat hetket, temput ja saariston kulttiset paikat. Seuraa ennen kuin missaat sen kesän, josta kaikki puhuu.",
      reels: [
        { caption: "Aamuajo Suomenlinnan ohi", likes: "12,4k" },
        { caption: "Kun kaveri pyytää selfietä", likes: "3,1k" },
        { caption: "Hernesaaresta Kaivopuistoon", likes: "8,7k" },
        { caption: "Spark Trixx tempuilla", likes: "5,9k" },
        { caption: "Lauttasaaresta Vallisaareen", likes: "21,2k" },
        { caption: "Auringonlasku saaristossa", likes: "4,3k" },
        { caption: "Kaverit ja 90 hv", likes: "9,5k" },
        { caption: "Ensimmäinen ajo", likes: "2,8k" },
        { caption: "Synttärilahja kaverille", likes: "15,1k" },
        { caption: "Päivä joka jää muistiin", likes: "6,2k" },
      ],
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
        "82Rentals on kolmen helsinkiläisen kaverin perustama yritys. Pidämme Spark Trixxin huippukunnossa, vastaamme heti ja saavumme aina sovittuun aikaan. Olemme itse vesillä joka viikko, joten kalustomme on aina kuin omasta tallista.",
      stat1: "Tyytyväistä ajajaa",
      stat2: "Keskiarvosana",
      stat3: "Toimitus Helsinkiin",
      stat4: "Varaus valmis",
    },
    cta: {
      eyebrow: "Valmiina lähtemään",
      defaultTitle: "Valmiina vesille?",
      defaultSubtitle:
        "Varaa Sea-Doo Spark Trixx 60 sekunnissa, toimitamme sen sinulle minne tahansa Helsingissä.",
    },
    footer: {
      tagline:
        "Helsinkiläinen vesijettivuokraus. Tuomme Sea-Doo Spark Trixxin laiturillesi.",
      pages: "Sivut",
      contact: "Yhteystiedot",
      faqLink: "Usein kysytyt",
      varaaLink: "Varaa",
      rights: "Kaikki oikeudet pidätetään.",
      city: "Helsinki, Suomi",
    },
    pricing: {
      tiers: [
        {
          name: "Pikamenoa",
          duration: "1 tunti",
          description: "Täydellinen ensikosketus saaristoon.",
          features: [
            "1 vesijetti, 2 hengelle",
            "Maksuton toimitus Helsingissä",
            "Pelastusliivit",
            "Lyhyt turvaopastus",
          ],
        },
        {
          name: "Suosikkikesto",
          duration: "2 tuntia",
          description: "Riittävän pitkä kunnon seikkailuun.",
          features: [
            "1 vesijetti, 2 hengelle",
            "Maksuton toimitus Helsingissä",
            "Pelastusliivit",
            "Reittisuositukset",
            "Ammattilaisvinkit tempuille",
          ],
        },
        {
          name: "Puoli päivää",
          duration: "4 tuntia",
          description: "Suomenlinna, Vallisaari ja saunatauko väliin.",
          features: [
            "1 vesijetti, 2 hengelle",
            "Maksuton toimitus Helsingissä",
            "Pelastusliivit",
            "Räätälöity reittisuunnittelu",
            "Etusija säävaraukseen",
          ],
        },
        {
          name: "Koko päivä",
          duration: "8 tuntia",
          description: "Aamusta iltaan vesillä, oma kapteenisi vain sinä.",
          features: [
            "1 vesijetti, 2 hengelle",
            "Maksuton toimitus Helsingissä",
            "Pelastusliivit",
            "Räätälöity reittisuunnittelu",
            "Etusija säävaraukseen",
          ],
        },
      ],
      mostPopular: "Suosituin",
      bookSuffix: "Varaa",
      fuelLine: "+ bensa {amount} € (30 € / tunti)",
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
        "Valitse päivä, kesto ja paikka, me hoidamme toimituksen, polttoaineen, liivit ja vakuutuksen.",
      stepLabels: [
        "Vesijetit ja kesto",
        "Päivä ja aloitusaika",
        "Tiedot ja toimitus",
        "Tarkista ja vahvista",
      ],
      stepHeader: "Varaus · vaihe {n}/4",
      qtyTitle: "Kuinka monta vesijettiä?",
      qty1People: "1–2 henkilölle",
      qty2People: "2–4 henkilölle",
      qtyHelper:
        "Yhdelle vesijetille mahtuu 1–2 henkilöä. Voit ottaa myös kaksi vesijettiä, jos haluatte ajaa kaksin omillanne. Kalustossa maksimissaan 2 vesijettiä.",
      durationTitle: "Kuinka pitkä ajo?",
      fuelLine: "+ bensa {amount} €",
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
      pickupTitle: "Mihin tuomme vesijetin?",
      pickupOrChoose: "Tai valitse pikavalinnoista",
      pickupConfirm: "Toimituspaikka:",
      fullName: "Koko nimi",
      additionalInfo: "Lisätietoja (valinnainen)",
      additionalPlaceholder: "Esim. tarkka osoite tai erityistoiveet",
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
      checkLabel: "Tarkista",
      summaryEyebrow: "Varauksesi",
      summaryProduct: "Sea-Doo Spark Trixx",
      summaryDuration: "Kesto",
      summaryDate: "Päivämäärä",
      summarySlot: "Aloitusaika",
      summaryQty: "Vesijetit",
      summaryQtyValue: "{n}× (2 hengelle)",
      summaryPickup: "Toimitus",
      summaryRent: "Vuokra",
      summaryFuel: "Bensa ({rate} € / h)",
      summaryDelivery: "Toimitus Helsingissä",
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
        fullday: "Koko päivä (8h)",
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
        productEyebrow: "Kone",
        productTitle: "Sea-Doo Spark Trixx 2up.",
        productBody:
          "Sea-Doon leikkisin vesijetti. Suunniteltu ajajille, jotka haluavat oikeasti tuntea veden, nopea, ketterä ja järjettömän hauska. Yhden ajon jälkeen ymmärrät, miksi pää kääntyy joka laiturilla.",
        productCta: "Varaa tämä vesijetti",
        features: [
          {
            title: "Kevyt ja leikkisä",
            text: "90 hv Rotax, alle 200 kg runko. Nopea, ketterä ja tehty heitettäväksi.",
          },
          {
            title: "Tehty tempuille",
            text: "Säädettävät ohjaustanko ja jalkapohjat, kaarra, pomppi ja spinnaa kuin proffa.",
          },
          {
            title: "2 hengen vesijetti",
            text: "Ota mukaan kaveri, kumppani tai eeppisin Instagram tarinasi.",
          },
          {
            title: "Täysin vakuutettu",
            text: "Kattava vakuutus ja pelastusliivit sisältyvät jokaiseen vuokraan.",
          },
        ],
        anatomyEyebrow: "Tutustu jettiin",
        anatomyTitle: "Mistä Spark Trixx koostuu.",
        anatomyBody: "Tärkeimmät ominaisuudet kerralla. Käyttöönotto vie minuutteja.",
        hotspots: [
          {
            title: "Säädettävä ohjaustanko",
            text: "Riser tuo ajoasennon ylös ja helpottaa temppuilua.",
          },
          {
            title: "Sininen Trixx istuin",
            text: "Mukava 2up istuin, mahtuu kaveri tai kumppani.",
          },
          {
            title: "90 hv Rotax",
            text: "Sähköinen iBR jarru ja peruutus, kiihdytys tuntuu heti.",
          },
          {
            title: "Kevyt runko",
            text: "Alle 200 kg kuivapaino tekee jetistä leikkisän.",
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
        heroTitle: "Selkeä, kaikki sisältyy.",
        heroDesc:
          "Toimitus, pelastusliivit ja vakuutus kuuluvat aina hintaan. Bensaveloitus 30 € jokaiselta tunnilta.",
        ctaTitle: "Lukitse hintasi nyt.",
        ctaSubtitle:
          "Hinnat ovat kiinteät, varaa heti, niin saat parhaat ajat itsellesi.",
      },
      meista: {
        title: "Meistä",
        eyebrow: "Meistä",
        heroTitle: "Helsinkiläinen kaveriporukka, joka rakastaa vesillä oloa.",
        heroDesc:
          "Aloitimme 82Rentalsin koska halusimme tehdä Helsingin saaristosta lähemmäksi. Toimitamme vesijetit suoraan sinne missä olet.",
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
            q: "Minne tarkalleen toimitatte?",
            a: "Mihin tahansa Helsingin rannikkoalueelle. Hotellin laiturille, mökille, rannalle tai venesatamaan. Toimitus sisältyy hintaan.",
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
          "Valitse päivä, kesto ja paikka, me hoidamme toimituksen, polttoaineen, liivit ja vakuutuksen.",
        reassurances: [
          {
            title: "Maksuton peruutus",
            text: "24 h ennen varauksen alkua kuluitta.",
          },
          {
            title: "Toimitus mukana",
            text: "Helsingin alueella aina hintaan kuuluen.",
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
      hoursFull: "Full day (8h)",
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
        "One life, one summer. Rent the Spark Trixx, leave the dock behind and turn this day into the story you'll still tell next winter. We deliver.",
      cta: "Book now",
      bullet1: "Free delivery in Helsinki",
      bullet2: "No license required",
      bullet3: "Fully insured",
      offerEyebrow: "2h deal",
      offerProduct: "Sea-Doo Spark Trixx",
      offerPrice: "€199 / 2h",
      offerTick1: "Delivered to your shore",
      offerTick2: "For 1–2 people, life jackets included",
      offerTick3: "Quick briefing, and you're off",
      offerCta: "Check availability",
    },
    trust: {
      rating: "Rated 4.9 / 5",
      delivery: "Free delivery in Helsinki",
      fuel: "Fuel included",
      lifeJackets: "Life jackets included",
      insured: "Fully insured",
    },
    howItWorks: {
      eyebrow: "How it works",
      title: "From scroll to splash in four easy steps.",
      subtitle: "We handle the logistics. You handle the throttle.",
      step1Title: "Pick a time",
      step1Text:
        "Choose date, duration and number of jet skis. Pay online, done in 60 seconds.",
      step2Title: "We deliver",
      step2Text:
        "We bring the Sea-Doo to any shore or dock in Helsinki at your chosen time.",
      step3Title: "Ride anywhere",
      step3Text:
        "Quick briefing, full tank, life jackets ready. The archipelago is yours.",
      step4Title: "Easy return",
      step4Text:
        "We pick the jet ski up. No trailers, no parking headaches, just memories.",
    },
    socialFeed: {
      eyebrow: "We're on social",
      titleA: "Follow",
      titleHighlight: "us",
      titleB: "",
      subtitle:
        "Customers' best moments, tricks and the cult corners of the archipelago. Follow before you miss the summer everyone's talking about.",
      reels: [
        { caption: "Morning ride past Suomenlinna", likes: "12.4k" },
        { caption: "When the friend asks for a selfie", likes: "3.1k" },
        { caption: "Hernesaari to Kaivopuisto", likes: "8.7k" },
        { caption: "Spark Trixx tricks", likes: "5.9k" },
        { caption: "Lauttasaari to Vallisaari", likes: "21.2k" },
        { caption: "Sunset in the archipelago", likes: "4.3k" },
        { caption: "Friends and 90 hp", likes: "9.5k" },
        { caption: "First ride", likes: "2.8k" },
        { caption: "Birthday surprise for a friend", likes: "15.1k" },
        { caption: "A day that sticks with you", likes: "6.2k" },
      ],
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
        "82Rentals is run by three Helsinki-based friends. We keep the Spark Trixx in top shape, reply right away and arrive exactly when we said we would. We're on the water every week ourselves, so the kit is always like our own.",
      stat1: "Happy riders",
      stat2: "Average rating",
      stat3: "Helsinki delivery",
      stat4: "Booking time",
    },
    cta: {
      eyebrow: "Ready to roll",
      defaultTitle: "Ready to hit the water?",
      defaultSubtitle:
        "Book the Sea-Doo Spark Trixx in 60 seconds, we deliver it anywhere in Helsinki.",
    },
    footer: {
      tagline:
        "Helsinki-based jet ski rental. We bring the Sea-Doo Spark Trixx straight to your dock.",
      pages: "Pages",
      contact: "Contact",
      faqLink: "FAQ",
      varaaLink: "Book",
      rights: "All rights reserved.",
      city: "Helsinki, Finland",
    },
    pricing: {
      tiers: [
        {
          name: "Quick blast",
          duration: "1 hour",
          description: "The perfect first taste of the archipelago.",
          features: [
            "1 jet ski, fits 2 people",
            "Free delivery in Helsinki",
            "Life jackets",
            "Quick safety briefing",
          ],
        },
        {
          name: "Sweet spot",
          duration: "2 hours",
          description: "Long enough for a real adventure.",
          features: [
            "1 jet ski, fits 2 people",
            "Free delivery in Helsinki",
            "Life jackets",
            "Route suggestions",
            "Pro tips for tricks",
          ],
        },
        {
          name: "Half day",
          duration: "4 hours",
          description: "Suomenlinna, Vallisaari and a sauna stop in between.",
          features: [
            "1 jet ski, fits 2 people",
            "Free delivery in Helsinki",
            "Life jackets",
            "Custom route planning",
            "Priority on weather rebooking",
          ],
        },
        {
          name: "Full day",
          duration: "8 hours",
          description: "Sunrise to sunset on the water, your own captain.",
          features: [
            "1 jet ski, fits 2 people",
            "Free delivery in Helsinki",
            "Life jackets",
            "Custom route planning",
            "Priority on weather rebooking",
          ],
        },
      ],
      mostPopular: "Most popular",
      bookSuffix: "Book",
      fuelLine: "+ fuel €{amount} (€30 / hour)",
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
        "Pick the date, duration and place, we handle delivery, fuel, life jackets and insurance.",
      stepLabels: [
        "Jet skis & duration",
        "Date & start time",
        "Details & delivery",
        "Review & confirm",
      ],
      stepHeader: "Booking · step {n}/4",
      qtyTitle: "How many jet skis?",
      qty1People: "For 1–2 people",
      qty2People: "For 2–4 people",
      qtyHelper:
        "One jet ski fits 1–2 people. You can also take two jet skis if you'd rather ride solo each. Maximum two jet skis per booking.",
      durationTitle: "How long do you want to ride?",
      fuelLine: "+ fuel €{amount}",
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
      pickupTitle: "Where do we deliver the jet ski?",
      pickupOrChoose: "Or pick a popular spot",
      pickupConfirm: "Delivery to:",
      fullName: "Full name",
      additionalInfo: "Additional info (optional)",
      additionalPlaceholder: "E.g. exact address or special requests",
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
      checkLabel: "Review",
      summaryEyebrow: "Your booking",
      summaryProduct: "Sea-Doo Spark Trixx",
      summaryDuration: "Duration",
      summaryDate: "Date",
      summarySlot: "Start time",
      summaryQty: "Jet skis",
      summaryQtyValue: "{n}× (fits 2 people)",
      summaryPickup: "Delivery",
      summaryRent: "Rental",
      summaryFuel: "Fuel (€{rate} / h)",
      summaryDelivery: "Helsinki delivery",
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
        fullday: "Full day (8h)",
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
        productEyebrow: "The machine",
        productTitle: "Sea-Doo Spark Trixx 2up.",
        productBody:
          "Sea-Doo's most playful jet ski. Built for riders who really want to feel the water — fast, agile and ridiculously fun. One ride and you'll see why heads turn at every dock.",
        productCta: "Book this jet ski",
        features: [
          {
            title: "Light & playful",
            text: "90 hp Rotax under 200 kg. Quick, agile and built to be tossed around.",
          },
          {
            title: "Tuned for tricks",
            text: "Adjustable bars and footwells, carve, bunny-hop and spin like a pro.",
          },
          {
            title: "2-up jet ski",
            text: "Bring a friend, partner or your most epic Instagram story.",
          },
          {
            title: "Fully insured",
            text: "Comprehensive insurance and life jackets included with every rental.",
          },
        ],
        anatomyEyebrow: "Get to know it",
        anatomyTitle: "What makes a Spark Trixx.",
        anatomyBody: "All the key parts at a glance. Onboarding takes minutes.",
        hotspots: [
          {
            title: "Adjustable handlebar",
            text: "Riser lifts your stance and makes tricks easier.",
          },
          {
            title: "Blue Trixx seat",
            text: "Comfy 2-up seat, fits a friend or partner.",
          },
          {
            title: "90 hp Rotax",
            text: "Electric iBR brake and reverse, the bite is instant.",
          },
          {
            title: "Light hull",
            text: "Under 200 kg dry weight makes it playful and quick.",
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
        heroTitle: "Clear pricing, everything included.",
        heroDesc:
          "Delivery, life jackets and insurance always included in the price. Fuel adds €30 per hour.",
        ctaTitle: "Lock in your price now.",
        ctaSubtitle:
          "Prices are fixed, book today and grab the slots that suit you best.",
      },
      meista: {
        title: "About us",
        eyebrow: "About us",
        heroTitle: "A Helsinki crew that loves being on the water.",
        heroDesc:
          "We started 82Rentals to bring the Helsinki archipelago closer to everyone. We deliver the jet skis straight to where you are.",
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
            q: "Where exactly do you deliver?",
            a: "Anywhere along the Helsinki coast. Hotel docks, summer cottages, beaches or marinas. Delivery is included in the price.",
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
          "Pick a date, duration and place, we handle delivery, fuel, life jackets and insurance.",
        reassurances: [
          {
            title: "Free cancellation",
            text: "Cancel up to 24 hours before for free.",
          },
          {
            title: "Delivery included",
            text: "Always included within Helsinki.",
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
