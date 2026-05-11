export type TermsLocale = "fi" | "en";

/**
 * Single source of truth for booking terms. The terms page, the
 * footer link, the booking checkbox modal and the booking
 * confirmation email all read from here. Update once, change
 * everywhere.
 *
 * Each `body` is a string with paragraphs separated by blank lines
 * so it renders the same on the web view and in the printable PDF.
 * Subsections are inlined and prefixed with the dotted number so the
 * structure mirrors a paper contract.
 */
export const TERMS_VERSION = "2.0";
export const TERMS_UPDATED = "2026-05-11";

export const COMPANY = {
  name: "82Rentals Oy",
  businessId: "—", // täydennetään virallinen Y-tunnus
  address: "Kipparlahdenkuja 3, 00810 Helsinki",
  phone: "+358 40 186 6664",
  email: "info@82rentals.com",
  website: "82rentals.com",
};

export type TermsDoc = {
  title: string;
  intro: string;
  sections: { id: string; heading: string; body: string }[];
  appendices: { id: string; heading: string; body: string }[];
  footer: string;
};

export const terms: Record<TermsLocale, TermsDoc> = {
  fi: {
    title: "Vesijetin vuokrasopimuksen ehdot",
    intro:
      `Tämä asiakirja sisältää 82Rentals Oy:n (jäljempänä myös "vuokranantaja") ja vuokrausta hakevan asiakkaan (jäljempänä myös "vuokralainen") välisen vesijetin vuokraussopimuksen ehdot. Varauksen vahvistaminen, takuumaksun maksaminen tai vuokrauskohteen vastaanottaminen merkitsee näiden ehtojen hyväksymistä molempien osapuolten välillä.`,
    sections: [
      {
        id: "1",
        heading: "1. Sopimuksen osapuolet ja kohde",
        body: [
          `1.1. Vuokranantaja on ${COMPANY.name}, Y-tunnus ${COMPANY.businessId}, osoite ${COMPANY.address}. Yhteyspuhelin ${COMPANY.phone} ja sähköposti ${COMPANY.email}.`,
          `1.2. Vuokralainen on luonnollinen henkilö tai oikeushenkilö, joka tekee varauksen 82Rentals Oy:n verkkosivuilla osoitteessa ${COMPANY.website}, puhelimitse tai sähköpostitse ja jonka tiedot kirjataan vuokrasopimukseen.`,
          `1.3. Sopimuksen kohteena on yksilöity vesijetti varusteineen (jäljempänä "laitteisto"). Laitteiston tarkka merkki, malli, rekisteritunnus ja mahdolliset oheisvarusteet kirjataan ennen vuokra-ajan alkua tehtävään luovutustarkastukseen.`,
        ].join("\n\n"),
      },
      {
        id: "2",
        heading: "2. Määritelmät",
        body: [
          `2.1. Vuokranantajalla tarkoitetaan kohdassa 1 yksilöityä yritystä, joka tarjoaa vesijetin vuokrauspalvelua kulloinkin saatavilla olevasta valikoimastaan.`,
          `2.2. Vuokralaisella tarkoitetaan henkilöä tai oikeushenkilöä, joka vuokraa laitteiston omaan käyttöönsä ja vastaa tämän sopimuksen mukaisista velvoitteista.`,
          `2.3. Laitteistolla tarkoitetaan vuokrauksen kohteena olevaa vesijettiä, sen lisävarusteita (pelastusliivit, paikannin, käynnistysavain tms.) sekä mahdollisia kuljetukseen liittyviä apuvälineitä.`,
          `2.4. Vuokrakaudella tarkoitetaan sopimukseen kirjattua aikaväliä, jonka asiakas pitää laitteistoa hallussaan ja jonka aikana käyttöoikeus on voimassa.`,
          `2.5. Vuokrauspaikalla tarkoitetaan paikkaa, jossa laitteisto luovutetaan asiakkaalle ja jonne se palautetaan vuokra-ajan päätyttyä, ellei kirjallisesti toisin sovita.`,
        ].join("\n\n"),
      },
      {
        id: "3",
        heading: "3. Sopimuksen syntyminen ja varauksen vahvistus",
        body: [
          `3.1. Sopimus syntyy, kun vuokralainen tekee varauksen ja saa siitä vuokranantajalta vahvistuksen sähköpostitse. Vahvistettu varaus on sitova molemmin puolin näiden ehtojen mukaisesti.`,
          `3.2. Vuokranantaja toimittaa vahvistuksen yhteydessä yhteenvedon varauksen tiedoista, näistä sopimusehdoista sekä mahdollisesta toimituspaikasta ja -ajasta. Vuokralainen on velvollinen tarkistamaan tiedot ja ilmoittamaan välittömästi mahdollisista virheistä.`,
          `3.3. Mikäli varaus ei ole sitova ilman erikseen perittävää takuumaksua, vuokranantaja ilmoittaa siitä varauksen yhteydessä ja varauksen sitovuus on takuumaksun suorituksen jälkeen.`,
        ].join("\n\n"),
      },
      {
        id: "4",
        heading: "4. Vuokra-aika ja luovutus",
        body: [
          `4.1. Vuokra-aika alkaa luovutusta seuraavasta vuokrasopimukseen kirjatusta ajankohdasta ja päättyy sovittuna ajankohtana. Vuokralainen on velvollinen palauttamaan laitteiston vuokra-ajan päättyessä siihen paikkaan ja sellaisessa kunnossa, kuin se on luovutushetkellä asiakkaalle annettu.`,
          `4.2. Laitteistoa ei luovuteta ennen vuokra-ajan alkua, eikä vuokranantaja ole velvollinen palauttamaan vuokraa tai antamaan hyvitystä, mikäli vuokralainen myöhästyy luovutuksesta omasta syystään.`,
          `4.3. Mikäli vuokralainen palauttaa laitteiston myöhässä yli vuokra-ajan, peritään myöhästymismaksuna 100,00 € alkavalta tunnilta (ALV 25,5 %). Muista kuin vuokra-ajan ylittämisestä johtuvista palautusviiveistä sovitaan tapauskohtaisesti.`,
          `4.4. Vuokranantajalla on oikeus pidättää laitteisto luovuttamatta tai keskeyttää vuokraus, jos asiakas ei täytä luovutushetkellä näitä ehtoja, esimerkiksi puuttuvan henkilöllisyystodistuksen, päihtymyksen tai ikävaatimuksen vastaisen tilanteen johdosta. Tällöin vuokraa ei palauteta.`,
        ].join("\n\n"),
      },
      {
        id: "5",
        heading: "5. Vuokra, ALV ja maksuehdot",
        body: [
          `5.1. Vuokrahinta määräytyy 82Rentals Oy:n verkkosivuilla olevan hinnaston mukaisesti tai osapuolten erikseen sopimalla tavalla. Vuokra sisältää aina arvonlisäveron 25,5 %, ellei muuta kirjallisesti ole sovittu.`,
          `5.2. Vuokrahintaan sisältyy polttoaine vuokra-ajan käyttöön normaalissa virkistyskäytössä, pelastusliivit, paikannin sekä lyhyt perehdytys ennen ajoa. Lisämaksullisia tuotteita ovat muun muassa toimitus muuhun paikkaan kuin Kipparlahden satamaan sekä ylimääräiset polttoainetäydennykset, jotka eivät sisälly normaaliin käyttöön.`,
          `5.3. Maksu suoritetaan paikan päällä ennen vuokra-ajan alkua kortilla tai käteisellä. Yritysasiakkaalle voidaan tarjota laskutusta erikseen sovittavin ehdoin.`,
          `5.4. Mahdolliset lisämaksut, kuten myöhästymismaksu, takuumaksusta kuitattavat vahingot tai polttoaineen lisämaksu, peritään vuokra-ajan päätyttyä joko takuumaksusta vähentäen tai erillisellä laskulla.`,
        ].join("\n\n"),
      },
      {
        id: "6",
        heading: "6. Takuumaksu",
        body: [
          `6.1. Vuokranantaja perii vuokralaiselta varauksen yhteydessä takuumaksun, jonka suuruus on 100,00 € (ALV 0 %). Takuumaksu kattaa mahdolliset vuokrauksesta aiheutuvat pienet vahingot tai puuttumiset, joita ei ole ilmoitettu luovutustarkastuksessa.`,
          `6.2. Takuumaksu palautetaan vuokralaiselle kolmen (3) arkipäivän kuluessa vuokra-ajan päättymisestä tilisiirrolla asiakkaan ilmoittamalle pankkitilille, mikäli laitteisto on palautettu ehtojen mukaisesti eikä sitä ole vahingoitettu.`,
          `6.3. Mikäli laitteistossa on todettavissa vahinkoja, puutteita tai siivousta vaativia jälkiä, takuumaksusta vähennetään aiheutuneet kustannukset kohdan 14 mukaisesti. Takuumaksun ylittävät vahingot peritään asiakkaalta erikseen.`,
        ].join("\n\n"),
      },
      {
        id: "7",
        heading: "7. Vuokralaisen vaatimukset ja ikäraja",
        body: [
          `7.1. Sekä laitteistoa ajavalla henkilöllä että matkustajalla tulee olla vähintään 16 vuoden ikä. Molempien on todistettava henkilöllisyytensä voimassa olevalla kuvallisella henkilöllisyystodistuksella (passi, ajokortti tai poliisin myöntämä henkilökortti).`,
          `7.2. Vuokralainen vastaa siitä, että hänellä on tarvittava terveydentila ja kyky käsitellä laitteistoa turvallisesti. Suomessa Sea-Doo Spark Trixx 2up -tyyppisen vesijetin ajamiseen ei vaadita erillistä vesikulkuneuvokorttia, mutta vuokralainen sitoutuu noudattamaan voimassa olevia vesiliikennelakeja.`,
          `7.3. Laitteistoa saa kuljettaa ainoastaan tämä sopimus kirjattu henkilö. Laitteiston luovuttaminen kolmannelle osapuolelle, vaikka tilapäisestikin, on kielletty ilman vuokranantajan kirjallista lupaa.`,
        ].join("\n\n"),
      },
      {
        id: "8",
        heading: "8. Vuokralaisen velvollisuudet",
        body: [
          `8.1. Vuokralainen on velvollinen tutustumaan vuokranantajan antamaan perehdytykseen ja noudattamaan annettuja ohjeita koko vuokra-ajan.`,
          `8.2. Vuokralainen sitoutuu kohtelemaan laitteistoa huolellisesti, kuten huolellinen huoltaja kohtelisi omaa omaisuuttaan. Tämä koskee sekä ajossa että maissa pysäköitynä olevaa laitteistoa.`,
          `8.3. Mahdollisista käytön aikana havaituista vioista, vaurioista tai poikkeavasta toiminnasta on ilmoitettava vuokranantajalle välittömästi puhelimitse ${COMPANY.phone}. Asiakas ei saa jatkaa ajamista, mikäli jatkaminen aiheuttaisi lisävahinkoa.`,
          `8.4. Laitteisto palautetaan sovittuna ajankohtana siihen paikkaan, jossa se on luovutettu, ja siinä kunnossa, missä se on otettu vastaan. Vuokralainen vastaa kaikista varusteista, jotka luovutushetkellä on kirjattu mukaan annetuiksi (esimerkiksi pelastusliivit, paikannin, käynnistysavain).`,
          `8.5. Mikäli laitteisto ei poikkeuksellisesti ole ehtinyt kerran tankkaamista vuokra-ajan aikana, vuokralainen vastaa polttoaineen täydennyksestä laskutushinnan mukaan vuokra-ajan päättymisen jälkeen. Hinta perustuu vuokra-ajan aikana käytettyyn lisäpolttoaineen määrään ja sen ostohintaan.`,
        ].join("\n\n"),
      },
      {
        id: "9",
        heading: "9. Käyttöalue ja ajorajoitukset",
        body: [
          `9.1. Laitteistoa saa ajaa vain merkityillä ja sallituilla vesialueilla. Veden syvyyden tulee olla vähintään yksi (1) metri. Alueilla, joissa veden syvyys on 1–1,5 metriä, suurin sallittu nopeus on 10 km/h.`,
          `9.2. Vesikasvillisuudessa, ruovikoissa, suojelu- ja kieltoalueilla, satama-alueilla niiden kieltohetkenä sekä rannan välittömässä läheisyydessä (alle 50 metriä rantaviivasta, paitsi merkityllä reitillä) ajaminen on kielletty.`,
          `9.3. Laitteiston käyttäminen toisen vesikulkuneuvon hinaamiseen, hinattavien välineiden vetämiseen tai muiden alusten aaltoja tai jälkivanaa hyppimiseen on kielletty.`,
          `9.4. Laitteistoa ei saa rantauttaa tai paineistaa pohjaan asti. Laiturointi tehdään pinnan tasolla ja asianmukaisesti köydellä kiinnittäen.`,
          `9.5. Vuokralaisen on noudatettava Suomen vesiliikennelain (782/2019) säädöksiä sekä alueellisesti annettuja vesiliikennemerkintöjä, nopeusrajoituksia ja muita viranomaismääräyksiä.`,
        ].join("\n\n"),
      },
      {
        id: "10",
        heading: "10. Turvavarusteet ja turvallisuus",
        body: [
          `10.1. Vuokralainen ja matkustaja sitoutuvat käyttämään hyväksyttyjä, oikein kiinnitettyjä pelastusliivejä koko ajon ajan.`,
          `10.2. Pelastusliivien tulee olla asianmukaisesti soljitettuina, eikä niitä saa avata ajon aikana. Kuljettajalla on oikeus tarvittaessa keskeyttää ajo, mikäli matkustajan turvavarusteet eivät ole asianmukaisesti kiinni.`,
          `10.3. Mikäli laitteisto kaatuu, käännetään tai vajoaa, vuokralaisen tulee toimia perehdytyksessä annettujen ohjeiden mukaisesti omaisuuden ja henkilöiden turvaamiseksi.`,
          `10.4. Hätätilanteissa, joissa on vaara henkilön hengelle, terveydelle tai ympäristölle, on välittömästi soitettava yleiseen hätänumeroon 112 sekä ilmoitettava tilanteesta vuokranantajalle.`,
          `10.5. Laitteisto on varustettu GPS-paikantimella, jonka avulla vuokranantaja voi tarvittaessa seurata laitteen sijaintia ja toimittaa sijaintitiedon viranomaisille esimerkiksi varkaus- tai onnettomuustilanteessa.`,
        ].join("\n\n"),
      },
      {
        id: "11",
        heading: "11. Päihteet",
        body: [
          `11.1. Laitteiston ajaminen alkoholin, huumaavien aineiden, lääkkeiden tai muun ajokykyä alentavan tekijän vaikutuksen alaisena on ehdottomasti kielletty. Sama kielto koskee myös matkustajaa siltä osin kuin hänen tilansa voi vaarantaa turvallisuutta.`,
          `11.2. Mikäli vuokranantaja epäilee vuokralaisen tai matkustajan olevan päihteiden vaikutuksen alaisena luovutus- tai vuokra-aikana, vuokranantajalla on oikeus keskeyttää tai estää vuokraus. Tässä tilanteessa vuokraa ei palauteta.`,
        ].join("\n\n"),
      },
      {
        id: "12",
        heading: "12. Vakuutus ja omavastuu",
        body: [
          `12.1. Vuokraus sisältää kattavan vakuutuksen, joka kattaa tavanomaisesta käytöstä syntyvät vahingot. Vuokralaisen omavastuu vahinkotilanteessa on 3 000,00 € (kolmetuhatta) per vahinkotapahtuma.`,
          `12.2. Mikäli vahinko on aiheutunut tahallisuudesta, törkeästä huolimattomuudesta, ehtojen vastaisesta ajamisesta, päihtymyksestä tai sopimusalueen ulkopuolella ajamisesta, vakuutus ei kata vahinkoa ja vuokralainen vastaa täysimääräisesti kaikista korjaus- ja uudelleenhankintakustannuksista sekä menetetystä vuokratulosta.`,
          `12.3. Vuokralainen on velvollinen ilmoittamaan kaikista vuokra-ajalla syntyneistä vahingoista ja vaaratilanteista vuokranantajalle välittömästi sekä viranomaisille, jos tapahtuma sitä lain tai vakuutusehdon mukaan edellyttää.`,
        ].join("\n\n"),
      },
      {
        id: "13",
        heading: "13. Vahinkokorvaukset",
        body: [
          `13.1. Mikäli laitteisto tai sen varusteet vahingoittuvat, katoavat tai puuttuvat palautuksessa, vuokralaiselta peritään korvaus kohdassa 13.2 olevan luettelon mukaisesti. Korvaussummat ovat arvonlisäverottomia (ALV 0 %).`,
          `13.2. Vahinkokorvaukset osa- tai esinekohtaisesti:

· Puuttuva tai rikkoutunut pelastusliivi: 120,00 €/kpl
· Puuttuva tai rikkoutunut avain: 120,00 €/kpl
· Vaurioituneet turbiinin kulutusosat: 300,00 €/kpl
· Vaurioitunut turbiini kokonaisuudessaan (vaihto): 1 300,00 €/kpl
· Puuttuva tai rikkoutunut kiinnitysköysi/jousihaka: 20,00 €/kpl
· Puuttuvat tai rikkoutuneet vetorenkaat: 90,00 €/kpl
· Puuttuva tai rikkoutunut vesisuihku: 30,00 €/kpl
· Puuttuva vedenpitävä pussi: 30,00 €/kpl
· Puuttuva lepuuttaja: 100,00 €/kpl
· Puuttuva tai kokonaan rikkoutunut vesijetti: 8 500,00 €/kpl
· Menetetty vuokratulo per päivä laitteiston ollessa korjattavana: 280,00 €/päivä`,
          `13.3. Mikäli vahingot ylittävät kohdassa 12.1 mainitun omavastuun, peritään vain omavastuun määrä. Tahallisesti, törkeällä huolimattomuudella tai ehtojen vastaisella ajolla aiheutettujen vahinkojen osalta peritään vahingon kokonaiskustannus täysimääräisenä.`,
        ].join("\n\n"),
      },
      {
        id: "14",
        heading: "14. Sopimuksen purkaminen",
        body: [
          `14.1. Vuokranantajalla on oikeus purkaa sopimus välittömästi ja keskeyttää vuokraus, mikäli:
· vuokralainen tai matkustaja rikkoo näitä ehtoja olennaisesti,
· vuokralainen tai matkustaja on päihtynyt tai muutoin ajokyvyttömässä tilassa,
· laitteisto vaurioituu tai vuokralainen toimii tavalla, joka aiheuttaa lisävahingon riskiä,
· vuokralainen ei pysty esittämään henkilöllisyystodistusta tai täyttämään muita näiden ehtojen edellyttämiä vaatimuksia.`,
          `14.2. Sopimuksen purkautuessa vuokranantajan toimesta sopimusehtojen rikkomisen seurauksena vuokraa tai takuumaksua ei palauteta, ja vuokralainen vastaa kaikista aiheutuneista vahingoista täysimääräisesti.`,
        ].join("\n\n"),
      },
      {
        id: "15",
        heading: "15. Peruutusehdot ja säävaraus",
        body: [
          `15.1. Asiakas voi peruuttaa varauksensa milloin tahansa olemalla yhteydessä vuokranantajaan puhelimitse tai sähköpostitse. Peruutuksesta perittävä maksu määräytyy seuraavasti:`,
          `15.1.1. Mikäli peruutus tehdään viimeistään 48 tuntia ennen vuokra-ajan alkamista, peruutus on maksuton eikä asiakkaalta peritä mitään.`,
          `15.1.2. Mikäli peruutus tehdään alle 48 tuntia mutta vähintään 24 tuntia ennen vuokra-ajan alkamista, vuokrahinnasta veloitetaan 50 %.`,
          `15.1.3. Mikäli peruutus tehdään alle 24 tuntia ennen vuokra-ajan alkamista tai vuokralainen ei saavu sovittuna ajankohtana paikalle, vuokrahinnasta veloitetaan 100 %.`,
          `15.2. Mikäli sääolosuhteet (kova tuuli, ukkonen, myrsky, sankka sumu tai muu turvallisuutta vaarantava ilmiö) tekevät ajamisesta vaarallista, vuokranantajalla on oikeus siirtää varausta korvauksetta toiseen ajankohtaan tai palauttaa vuokra kokonaisuudessaan. Kevyt sade ei lähtökohtaisesti ole peruutusperuste. Säävaraukseen vetoaminen edellyttää, että vuokranantaja arvioi olosuhteet turvallisuusriskiksi.`,
          `15.3. Vuokranantajalla on oikeus peruuttaa varaus myös teknisten ongelmien, kaluston rikkoutumisen tai muun ennalta arvaamattoman syyn vuoksi. Tällöin asiakkaalle palautetaan jo maksettu vuokra kokonaisuudessaan tai vaihtoehtoisesti varaus siirretään uuteen, asiakkaan kanssa erikseen sovittavaan ajankohtaan.`,
        ].join("\n\n"),
      },
      {
        id: "16",
        heading: "16. Henkilötietojen käsittely",
        body: [
          `16.1. Vuokranantaja käsittelee asiakkaan henkilötietoja Euroopan unionin yleisen tietosuoja-asetuksen (GDPR), Suomen tietosuojalain sekä muiden voimassa olevien tietosuojasäännösten mukaisesti. Käsittelyn yksityiskohdat on kuvattu erillisessä liitteessä (Liite 2: Tietosuojakäytänteet).`,
          `16.2. Henkilötietoja käytetään ensisijaisesti varauksen ja sopimuksen toteuttamiseen, asiakaspalveluun, laskutukseen ja kirjanpitoon sekä mahdolliseen myöhempään markkinointiin niiltä osin, kuin asiakas on tähän erikseen antanut suostumuksensa.`,
          `16.3. Tietoja ei luovuteta kolmansille osapuolille muutoin kuin lain tai viranomaisten määräyksen edellyttämissä tilanteissa, tai osana sopimuksen toteuttamista (esimerkiksi maksupalveluntarjoaja, vakuutusyhtiö viranomaistilanteessa).`,
        ].join("\n\n"),
      },
      {
        id: "17",
        heading: "17. Sovellettava laki ja riitojen ratkaiseminen",
        body: [
          `17.1. Tähän sopimukseen sovelletaan Suomen lakia, lukuun ottamatta sen lainvalintaa koskevia säännöksiä.`,
          `17.2. Mahdolliset sopimusta koskevat riidat pyritään ensisijaisesti ratkaisemaan neuvotellen. Mikäli sovintoon ei päästä, riidat ratkaistaan lopullisesti Helsingin käräjäoikeudessa tai vuokralaisen kotipaikan käräjäoikeudessa, mikäli vuokralainen on kuluttaja.`,
          `17.3. Vuokralaisella, joka on kuluttaja, on oikeus saattaa riita myös kuluttajariitalautakunnan (www.kuluttajariita.fi) ratkaistavaksi. Ennen asian saattamista lautakuntaan vuokralaisen on suositeltavaa olla yhteydessä kuluttajaneuvontaan (www.kkv.fi/kuluttajaneuvonta).`,
        ].join("\n\n"),
      },
      {
        id: "18",
        heading: "18. Liitteet ja sopimuksen voimassaolo",
        body: [
          `18.1. Sopimuksen erottamattomana osana ovat seuraavat liitteet:
· Liite 1: Yleiset sopimusehdot (tämä asiakirja)
· Liite 2: Tietosuojakäytänteet
· Liite 3: Varauksen mukana toimitettu materiaali ja luovutustarkastus`,
          `18.2. Sopimus on laadittu ja allekirjoitettu yhtenä kappaleena sähköisesti. Sähköinen vahvistus (esimerkiksi varauslomakkeen lähetys tai sähköpostissa annettu hyväksyntä) muodostaa sitovan sopimuksen.`,
          `18.3. Sopimus on voimassa varauksen vahvistamisesta vuokra-ajan päättymiseen sekä siitä eteenpäin sellaisten velvoitteiden osalta, jotka luonteensa puolesta jäävät voimaan vuokra-ajan päättymisen jälkeen (esimerkiksi vahinkokorvaukset, takuumaksun palautus, tietosuoja).`,
        ].join("\n\n"),
      },
    ],
    appendices: [
      {
        id: "liite2",
        heading: "Liite 2: Tietosuojakäytänteet",
        body: [
          `Yleistä — Näitä tietosuojakäytänteitä sovelletaan kaikkiin palveluntarjoajan ja asiakkaan välisiin sopimuksiin, ellei kirjallisesti toisin sovita. Asiakas hyväksyy nämä käytänteet tehdessään varauksen tai ostaessaan palvelun.`,
          `Rekisterinpitäjä — ${COMPANY.name}, Y-tunnus ${COMPANY.businessId}, osoite ${COMPANY.address}. Yhteydenotot tietosuoja-asioissa: ${COMPANY.email}.`,
          `Käsiteltävät henkilötiedot — Käsittelemme seuraavia tietoja: etu- ja sukunimi, sähköpostiosoite, puhelinnumero, mahdolliset yritystiedot ja Y-tunnus, varauksen tiedot (päivä, kellonaika, kesto, toimituspaikka, lisätiedot), maksutiedot (kuitti, maksutapa, summa) sekä mahdolliset asiakaspalvelussa annetut lisätiedot.`,
          `Käsittelyn tarkoitus ja peruste — Tietoja käsitellään varauksen toteuttamiseksi (sopimuksen täyttäminen), laskutukseen ja kirjanpitoon (lakisääteinen velvoite), asiakaspalveluun ja yhteydenpitoon, sekä asiakkaan erikseen antaman suostumuksen perusteella mahdolliseen markkinointiin.`,
          `Säilytysaika — Henkilötietoja säilytetään ainoastaan niin kauan kuin se on tarpeellista palvelun toteuttamiseksi, lakisääteisten velvoitteiden täyttämiseksi (esimerkiksi kirjanpitolain 6 v) tai oikeudellisten vaatimusten toteuttamiseksi.`,
          `Tietojen luovuttaminen — Henkilötietoja ei luovuteta lähtökohtaisesti kolmansille osapuolille. Tietojen luovuttaminen voi kuitenkin olla mahdollista lain niin edellyttäessä, viranomaisen pyynnöstä, vakuutusyhtiölle vahinkotilanteessa, kirjanpitäjälle, maksupalveluntarjoajille tai tekniseen ylläpitoon liittyville luotettaville kumppaneille.`,
          `Tietojen siirto EU/ETA-alueen ulkopuolelle — Lähtökohtaisesti tietoja säilytetään EU/ETA-alueella. Mikäli käyttämämme tekniset järjestelmät sijaitsevat alueen ulkopuolella, varmistamme tietosuojan tason riittävyyden EU:n vakiosopimuslausekkeilla tai muilla tietosuojalainsäädännön sallimilla suojatoimilla.`,
          `Tietojen turvaaminen — Tiedot tallennetaan suojattuihin järjestelmiin, joiden pääsy on rajoitettu vain niille henkilöille, joiden työtehtävät edellyttävät tietoihin pääsyä. Manuaalisia aineistoja säilytetään lukitusti.`,
          `Asiakkaan oikeudet — Asiakkaalla on oikeus tarkastaa, mitä henkilötietoja hänestä käsitellään, pyytää virheellisten tietojen korjaamista, pyytää tietojen poistamista (oikeus tulla unohdetuksi), rajoittaa käsittelyä tai vastustaa käsittelyä lain sallimissa rajoissa. Oikeuksiensa toteuttamiseksi asiakas voi ottaa yhteyttä osoitteeseen ${COMPANY.email}. Asiakkaalla on myös oikeus tehdä valitus tietosuojavaltuutetun toimistolle (www.tietosuoja.fi).`,
        ].join("\n\n"),
      },
      {
        id: "liite3",
        heading: "Liite 3: Varauksen mukana toimitettu materiaali",
        body: [
          `Vuokra-ajan alkaessa vuokranantaja luovuttaa asiakkaalle seuraavat varusteet ja materiaalit (ellei erikseen muuta sovita):`,
          `· Sea-Doo Spark Trixx 2up -vesijetti (rekisteritunnus kirjataan luovutustarkastukseen)
· Hyväksytyt pelastusliivit (ajaja + matkustaja)
· Käynnistysavain ja sen turvanaru
· Paikannin (GPS-tracker)
· Lyhyt perehdytys vesijetin käytöstä, turvallisuudesta ja palautuksesta
· Tarvittavat ohjeet ja yhteystiedot mahdollisissa ongelmatilanteissa`,
          `Vuokra-ajan päätyttyä asiakas palauttaa kaikki edellä mainitut varusteet vuokranantajalle. Mikäli jokin varuste puuttuu tai on vaurioitunut, vuokralaiselta peritään kohdan 13 mukainen korvaus.`,
        ].join("\n\n"),
      },
    ],
    footer:
      `Versio ${TERMS_VERSION}, päivitetty ${TERMS_UPDATED}. ${COMPANY.name}, ${COMPANY.address}. ${COMPANY.email} · ${COMPANY.phone}.`,
  },

  /* -------------------------------------------------------------------- */

  en: {
    title: "Jet ski rental terms and conditions",
    intro:
      `This document contains the terms and conditions of the jet ski rental agreement between 82Rentals Oy ("the rental provider") and the customer requesting the rental ("the renter"). Confirming a booking, paying the security deposit or receiving the equipment constitutes acceptance of these terms by both parties.`,
    sections: [
      {
        id: "1",
        heading: "1. Parties and subject of the agreement",
        body: [
          `1.1. The rental provider is ${COMPANY.name}, business ID ${COMPANY.businessId}, address ${COMPANY.address}. Contact phone ${COMPANY.phone} and email ${COMPANY.email}.`,
          `1.2. The renter is the natural person or legal entity who makes a booking on the 82Rentals website (${COMPANY.website}), by phone or by email, and whose details are recorded in the rental agreement.`,
          `1.3. The subject of the agreement is the specified jet ski with its accessories ("the equipment"). The exact make, model, registration number and any accessories are recorded in the handover check carried out before the rental period begins.`,
        ].join("\n\n"),
      },
      {
        id: "2",
        heading: "2. Definitions",
        body: [
          `2.1. The rental provider means the company defined in section 1 that offers jet ski rental services from its current fleet.`,
          `2.2. The renter means the person or legal entity who rents the equipment for their own use and is responsible for the obligations under this agreement.`,
          `2.3. The equipment means the jet ski being rented, its accessories (life jackets, GPS tracker, ignition key, etc.) and any aids related to its transport.`,
          `2.4. The rental period means the time interval recorded in the agreement during which the customer has the equipment in their possession and the right of use is in force.`,
          `2.5. The pickup location means the place where the equipment is handed over to the customer and where it must be returned at the end of the rental period, unless otherwise agreed in writing.`,
        ].join("\n\n"),
      },
      {
        id: "3",
        heading: "3. Formation of the agreement and booking confirmation",
        body: [
          `3.1. The agreement is formed when the renter makes a booking and receives a confirmation from the rental provider by email. A confirmed booking is binding on both parties according to these terms.`,
          `3.2. The rental provider sends, together with the confirmation, a summary of the booking details, these terms and any pickup/delivery information. The renter must check the details and notify the provider of any errors immediately.`,
          `3.3. If a booking is not binding without a separately collected security deposit, the rental provider will inform the renter at the time of booking; the booking becomes binding once the deposit has been paid.`,
        ].join("\n\n"),
      },
      {
        id: "4",
        heading: "4. Rental period and handover",
        body: [
          `4.1. The rental period starts at the time stated in the booking and ends at the agreed time. The renter must return the equipment by the end of the rental period to the location and in the condition in which it was handed over.`,
          `4.2. The equipment is not handed over before the start of the rental period, and the rental provider is not obliged to refund any portion of the price or grant compensation if the renter is late to pick up due to their own reason.`,
          `4.3. If the renter returns the equipment late, a late fee of €100.00 per started hour (VAT 25.5%) is charged. Other delay situations are handled on a case-by-case basis.`,
          `4.4. The rental provider may withhold handover or interrupt the rental if the renter does not meet these terms at handover time, for example due to missing photo ID, intoxication, or failing the age requirement. In such a case the rental fee is not refunded.`,
        ].join("\n\n"),
      },
      {
        id: "5",
        heading: "5. Rental price, VAT and payment terms",
        body: [
          `5.1. The rental price is set by the price list on 82Rentals.com or by separate written agreement. The price always includes Finnish VAT of 25.5%, unless otherwise agreed in writing.`,
          `5.2. The rental price includes fuel for normal recreational use during the rental period, life jackets, the GPS tracker and a short briefing before the ride. Additional services subject to extra fees include delivery to locations other than Kipparlahden satama, as well as extra fuel top-ups outside normal use.`,
          `5.3. Payment is made on-site before the rental period starts, by card or cash. Business customers can be offered invoicing on separately agreed terms.`,
          `5.4. Any additional charges (late fee, damage covered by the deposit, extra fuel) are charged at the end of the rental period either by deducting from the deposit or by separate invoice.`,
        ].join("\n\n"),
      },
      {
        id: "6",
        heading: "6. Security deposit",
        body: [
          `6.1. The rental provider collects a security deposit of €100.00 (VAT 0%) at the time of booking. The deposit covers any minor damages or missing items not noted in the handover check.`,
          `6.2. The deposit is refunded by bank transfer to the account provided by the renter within three (3) business days after the end of the rental period, provided the equipment is returned in line with these terms and undamaged.`,
          `6.3. If the equipment shows damage, missing parts or cleaning required, the corresponding costs are deducted from the deposit per section 13. Damages exceeding the deposit are invoiced separately.`,
        ].join("\n\n"),
      },
      {
        id: "7",
        heading: "7. Renter requirements and age limit",
        body: [
          `7.1. Both the person operating the equipment and any passenger must be at least 16 years old. Both must present a valid photo ID (passport, driving licence or national ID card).`,
          `7.2. The renter is responsible for being in fit condition and capable of safely operating the equipment. In Finland the Sea-Doo Spark Trixx 2up does not require a separate watercraft licence, but the renter agrees to comply with the applicable Finnish waterway laws.`,
          `7.3. The equipment may only be operated by the person named in the agreement. Transferring the equipment to a third party, even temporarily, is prohibited without the rental provider's written consent.`,
        ].join("\n\n"),
      },
      {
        id: "8",
        heading: "8. Renter's obligations",
        body: [
          `8.1. The renter must follow the instructions given in the safety briefing throughout the rental period.`,
          `8.2. The renter must handle the equipment carefully, as a diligent custodian would handle their own property. This applies both during the ride and when the equipment is moored.`,
          `8.3. Any defects, damages or abnormal behaviour discovered during use must be reported to the rental provider immediately by phone (${COMPANY.phone}). The renter must not continue using the equipment if continued use would cause further damage.`,
          `8.4. The equipment is returned at the agreed time and place, and in the same condition as it was received. The renter is responsible for all accessories listed in the handover check (e.g. life jackets, GPS tracker, ignition key).`,
          `8.5. If the equipment exceptionally requires an additional fuel top-up during the rental period, the renter pays for the extra fuel based on the volume used and its purchase price.`,
        ].join("\n\n"),
      },
      {
        id: "9",
        heading: "9. Operating area and driving restrictions",
        body: [
          `9.1. The equipment may only be operated in marked and permitted waters. The water depth must be at least one (1) metre. In areas where the depth is 1–1.5 metres, the maximum permitted speed is 10 km/h.`,
          `9.2. Driving in vegetation, reeds, restricted or protected areas, harbours when prohibited and in the immediate vicinity of shore (less than 50 metres unless on a marked route) is prohibited.`,
          `9.3. Using the equipment to tow other watercraft, pull towables or to jump the wakes of other vessels is prohibited.`,
          `9.4. The equipment must not be beached or pressed onto the bottom. Mooring is done at the surface and properly secured with rope.`,
          `9.5. The renter must comply with the Finnish Maritime Act (782/2019), local water-traffic markings, speed limits and other authority regulations.`,
        ].join("\n\n"),
      },
      {
        id: "10",
        heading: "10. Safety equipment and safety procedures",
        body: [
          `10.1. The renter and passenger commit to wearing approved, properly fastened life jackets at all times during the ride.`,
          `10.2. Life jackets must be properly buckled, and may not be unfastened during the ride. The operator has the right to interrupt the ride if the passenger's safety gear is not in order.`,
          `10.3. If the equipment tips over, turns or sinks, the renter must act according to the instructions given in the briefing to protect property and people.`,
          `10.4. In emergencies that threaten life, health or the environment, the renter must call the general emergency number 112 immediately and inform the rental provider.`,
          `10.5. The equipment is fitted with a GPS tracker, which allows the rental provider to locate the equipment when needed and to share location data with authorities, for example in case of theft or an accident.`,
        ].join("\n\n"),
      },
      {
        id: "11",
        heading: "11. Substance use",
        body: [
          `11.1. Operating the equipment under the influence of alcohol, drugs, medication or any other factor that impairs driving ability is strictly prohibited. The same prohibition applies to passengers to the extent their condition can compromise safety.`,
          `11.2. If the rental provider suspects the renter or passenger to be under the influence at handover or during the rental period, the provider has the right to interrupt or refuse the rental. In such a case the rental fee is not refunded.`,
        ].join("\n\n"),
      },
      {
        id: "12",
        heading: "12. Insurance and deductible",
        body: [
          `12.1. The rental includes comprehensive insurance that covers damages arising from normal use. The renter's deductible per incident is €3,000.00 (three thousand).`,
          `12.2. If damage is caused by intent, gross negligence, breach of these terms, intoxication, or driving outside the agreed area, the insurance does not cover the damage and the renter is fully liable for all repair or replacement costs and any lost rental income.`,
          `12.3. The renter must report any damage and dangerous situation to the rental provider immediately, and to the authorities where required by law or insurance terms.`,
        ].join("\n\n"),
      },
      {
        id: "13",
        heading: "13. Damage compensation",
        body: [
          `13.1. If the equipment or its accessories are damaged, lost or missing on return, the renter is charged according to the list in section 13.2. The compensation amounts are exclusive of VAT (VAT 0%).`,
          `13.2. Damage compensation per item:

· Missing or broken life jacket: €120.00 each
· Missing or broken key: €120.00 each
· Damaged turbine wear parts: €300.00 each
· Damaged turbine (full replacement): €1,300.00 each
· Missing or broken mooring rope/snap hook: €20.00 each
· Missing or broken towing rings: €90.00 each
· Missing or broken water jet outlet: €30.00 each
· Missing waterproof bag: €30.00 each
· Missing fender: €100.00 each
· Missing or fully damaged jet ski: €8,500.00 each
· Lost rental income per day while the equipment is being repaired: €280.00 per day`,
          `13.3. If the damages exceed the deductible referred to in section 12.1, only the deductible amount is charged. For damages caused by intent, gross negligence or breach of these terms, the full damage cost is charged.`,
        ].join("\n\n"),
      },
      {
        id: "14",
        heading: "14. Termination of the agreement",
        body: [
          `14.1. The rental provider has the right to terminate the agreement and interrupt the rental immediately if:
· the renter or passenger materially breaches these terms,
· the renter or passenger is intoxicated or otherwise unfit to operate the equipment,
· the equipment is damaged or the renter acts in a way that causes further risk,
· the renter fails to present a photo ID or otherwise meet the requirements set in these terms.`,
          `14.2. If the agreement is terminated by the rental provider due to a breach by the renter, the rental fee and the deposit are not refunded, and the renter remains fully liable for any damages caused.`,
        ].join("\n\n"),
      },
      {
        id: "15",
        heading: "15. Cancellation policy and weather",
        body: [
          `15.1. The renter may cancel the booking at any time by contacting the rental provider by phone or email. The cancellation fee is determined as follows:`,
          `15.1.1. If the cancellation is made at least 48 hours before the start of the rental period, the cancellation is free of charge.`,
          `15.1.2. If the cancellation is made less than 48 hours but at least 24 hours before the start of the rental period, 50% of the rental price is charged.`,
          `15.1.3. If the cancellation is made less than 24 hours before the start of the rental period, or the renter does not show up at the agreed time, 100% of the rental price is charged.`,
          `15.2. If weather conditions (strong wind, thunderstorm, storm, dense fog or another safety-threatening phenomenon) make riding unsafe, the rental provider may move the booking to another time at no cost or refund the rental in full. Light rain is not, by default, a reason to cancel. Invoking the weather clause requires the rental provider to assess the conditions as a safety risk.`,
          `15.3. The rental provider also has the right to cancel a booking due to technical problems, equipment failure or another unforeseeable reason. In that case the rental fee is refunded in full or the booking is moved to a new time agreed separately with the renter.`,
        ].join("\n\n"),
      },
      {
        id: "16",
        heading: "16. Personal data",
        body: [
          `16.1. The rental provider processes the customer's personal data in line with the EU General Data Protection Regulation (GDPR), the Finnish Data Protection Act and other applicable data protection rules. Details of the processing are described in a separate appendix (Appendix 2: Data Protection Practices).`,
          `16.2. Personal data is used primarily to fulfil the booking and the agreement, for customer service, invoicing and bookkeeping, and, only with the customer's separate consent, for marketing.`,
          `16.3. Data is not shared with third parties other than as required by law or authority orders, or as part of fulfilling the agreement (e.g. the payment service provider, the insurer in case of an incident).`,
        ].join("\n\n"),
      },
      {
        id: "17",
        heading: "17. Applicable law and dispute resolution",
        body: [
          `17.1. Finnish law applies to this agreement, excluding its conflict-of-laws rules.`,
          `17.2. Any disputes are first settled by negotiation. If no settlement is reached, disputes are resolved by the Helsinki District Court or, where the renter is a consumer, by the district court of the renter's place of residence.`,
          `17.3. Consumer renters may also bring the dispute before the Finnish Consumer Disputes Board (www.kuluttajariita.fi). Before applying to the Board, the consumer is advised to contact the Consumer Advisory Service (www.kkv.fi/kuluttajaneuvonta).`,
        ].join("\n\n"),
      },
      {
        id: "18",
        heading: "18. Appendices and validity of the agreement",
        body: [
          `18.1. The following appendices form an integral part of the agreement:
· Appendix 1: General Terms and Conditions (this document)
· Appendix 2: Data Protection Practices
· Appendix 3: Materials provided with the booking and handover check`,
          `18.2. The agreement is drawn up and signed electronically in one copy. Electronic confirmation (such as submitting the booking form or providing acceptance by email) forms a binding agreement.`,
          `18.3. The agreement is in force from the confirmation of the booking until the end of the rental period, and thereafter for obligations that by their nature remain in force after the end of the rental (e.g. damage compensation, deposit refund, data protection).`,
        ].join("\n\n"),
      },
    ],
    appendices: [
      {
        id: "liite2",
        heading: "Appendix 2: Data Protection Practices",
        body: [
          `General — These data protection practices apply to all agreements between the rental provider and the customer, unless otherwise agreed in writing. The customer accepts these practices by making a booking or purchasing the service.`,
          `Controller — ${COMPANY.name}, business ID ${COMPANY.businessId}, address ${COMPANY.address}. Data protection inquiries: ${COMPANY.email}.`,
          `Personal data processed — We process the following: first and last name, email address, phone number, any company details and business ID, booking details (date, time, duration, pickup location, additional notes), payment details (receipt, payment method, amount) and any additional information given in customer service interactions.`,
          `Purpose and legal basis — Data is processed to fulfil the booking (contract performance), for invoicing and bookkeeping (legal obligation), for customer service and communication, and, with the customer's separate consent, for marketing.`,
          `Retention period — Personal data is retained only as long as is necessary to perform the service, comply with legal obligations (e.g. six-year bookkeeping retention) or fulfil legal claims.`,
          `Disclosure — Personal data is not by default shared with third parties. Data may however be shared where required by law, authority orders, with the insurer in case of an incident, with the bookkeeper, with payment service providers or with trusted partners related to technical maintenance.`,
          `Transfers outside the EU/EEA — Data is by default stored within the EU/EEA. If our technical systems are located outside the area, we secure adequate protection through EU standard contractual clauses or other safeguards permitted by data protection law.`,
          `Information security — Data is stored in secured systems with access restricted to staff whose duties require it. Any paper records are kept in locked storage.`,
          `Customer's rights — The customer may request access to their data, request correction of inaccurate data, request erasure (right to be forgotten), restrict processing or object to processing within the limits of the law. To exercise these rights the customer can contact us at ${COMPANY.email}. The customer also has the right to lodge a complaint with the Office of the Data Protection Ombudsman (www.tietosuoja.fi).`,
        ].join("\n\n"),
      },
      {
        id: "liite3",
        heading: "Appendix 3: Materials provided with the booking",
        body: [
          `At the start of the rental period the rental provider hands over the following items and materials (unless otherwise agreed):`,
          `· Sea-Doo Spark Trixx 2up jet ski (registration number recorded in the handover check)
· Approved life jackets (driver + passenger)
· Ignition key and lanyard
· GPS tracker
· Short briefing covering the use of the jet ski, safety procedures and return
· Necessary instructions and contact details for problem situations`,
          `At the end of the rental period the customer returns all of the above items. If an item is missing or damaged, the renter is charged according to section 13.`,
        ].join("\n\n"),
      },
    ],
    footer:
      `Version ${TERMS_VERSION}, updated ${TERMS_UPDATED}. ${COMPANY.name}, ${COMPANY.address}. ${COMPANY.email} · ${COMPANY.phone}.`,
  },
};
