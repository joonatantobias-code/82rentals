import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "82Rentals · Vesijetin vuokraus Helsingissä";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "linear-gradient(135deg, #0A3D62 0%, #1B6FA8 55%, #6EC6FF 100%)",
          color: "white",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: "30px",
            fontWeight: 700,
            letterSpacing: "0.02em",
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              background: "#1DD3B0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0A3D62",
              fontSize: "22px",
              fontWeight: 800,
            }}
          >
            82
          </div>
          82Rentals
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              padding: "10px 22px",
              borderRadius: "999px",
              background: "rgba(29, 211, 176, 0.18)",
              border: "1px solid rgba(29, 211, 176, 0.6)",
              color: "#1DD3B0",
              fontSize: "22px",
              fontWeight: 600,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            Vesijetin vuokraus · Helsinki
          </div>
          <div
            style={{
              fontSize: "84px",
              fontWeight: 800,
              lineHeight: 1.05,
              maxWidth: "1000px",
              letterSpacing: "-0.02em",
            }}
          >
            Vesijetin vuokraus, toimitus suoraan rantaan.
          </div>
          <div
            style={{
              fontSize: "30px",
              opacity: 0.9,
              fontWeight: 500,
              maxWidth: "950px",
            }}
          >
            Avajaistarjous: 1h 119 €, 2h 189 €, 3h 249 €. Polttoaine aina hintaan.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "24px",
            fontWeight: 600,
            opacity: 0.9,
          }}
        >
          <div>82rentals.com</div>
          <div style={{ display: "flex", gap: "32px" }}>
            <div>Polttoaine mukana</div>
            <div>·</div>
            <div>Vakuutus mukana</div>
            <div>·</div>
            <div>Liivit mukana</div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
