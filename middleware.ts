import { NextRequest, NextResponse } from "next/server";

/**
 * Huoltotila-middleware.
 *
 * Pakottaa kaikki julkiset reitit /maintenance-sivulle, jotta
 * ulkopuoliset eivät pääse näkemään sivuston sisältöä. Tiedot,
 * tietokanta ja API jäävät paikalleen — vain selaimella avattavat
 * sivut peitetään.
 *
 * Whitelist:
 *   - /api/* (CRM-yhteydet, ulkoiset webhookit, varauksen POST)
 *   - /_next/* + /favicon.ico + suoraan staattiset tiedostot
 *   - /maintenance (huoltosivu itse)
 *   - /robots.txt + /sitemap.xml (hakukoneiden kohtelu)
 *
 * Esikatselu omistajalle:
 *   Käy kerran osoitteessa  /?preview=82r-preview-2026
 *   → middleware asettaa  site_preview_ok=1  -cookien (30 vrk)
 *     ja jatkossa selain pääsee sivustolle normaalisti tästä
 *     selaimesta. Toinen selain / inkognito ei pääse.
 *
 * Huoltotilan purku:
 *   Poista koko tämä tiedosto (rm middleware.ts) ja deployaa
 *   uudelleen, niin sivusto palautuu välittömästi normaaliin
 *   käyttöön. Esikatselu-cookies eivät jää kummittelemaan
 *   koska normaalitilassa middleware ei niitä lue.
 */
const PREVIEW_TOKEN = "82r-preview-2026";
const PREVIEW_COOKIE = "site_preview_ok";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const path = url.pathname;

  // 1. Esikatselu-token query-parametrissa → asetetaan cookie ja
  //    redirektoidaan tuore-URL takaisin samaan polkuun ilman
  //    paramia, jotta omistajan oma selain ei näytä sitä
  //    osoiterivillä koko ajan.
  if (url.searchParams.get("preview") === PREVIEW_TOKEN) {
    const clean = url.clone();
    clean.searchParams.delete("preview");
    const res = NextResponse.redirect(clean);
    res.cookies.set(PREVIEW_COOKIE, "1", {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
    return res;
  }

  // 2. Whitelistatut polut menevät aina läpi.
  if (
    path.startsWith("/_next") ||
    path.startsWith("/api") ||
    path === "/favicon.ico" ||
    path === "/robots.txt" ||
    path === "/sitemap.xml" ||
    path === "/logo.png" ||
    path === "/logo.jpg" ||
    path === "/logo-transparent.png" ||
    path === "/maintenance"
  ) {
    return NextResponse.next();
  }

  // 3. Omistajan esikatselu-cookie → täysi sivusto näkyy.
  if (req.cookies.get(PREVIEW_COOKIE)?.value === "1") {
    return NextResponse.next();
  }

  // 4. Kaikki muut → rewrite huoltosivulle. URL pysyy
  //    selaimessa entisellään, sisältö vain on huoltosivu.
  const maint = url.clone();
  maint.pathname = "/maintenance";
  maint.search = "";
  return NextResponse.rewrite(maint);
}

export const config = {
  // Matcher jättää ulos kaikki polut joissa on piste (staattiset
  // resurssit: .png, .jpg, .mp4, .css jne.) + _next-resurssit,
  // jotta middleware ei kierrätä niitä huoltosivulle.
  matcher: ["/((?!_next/static|_next/image|.*\\..*).*)"],
};
