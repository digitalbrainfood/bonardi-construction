import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Bonardi Construction — General Contracting in Queens, NY";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          backgroundColor: "#0055A5",
          padding: "80px",
          position: "relative",
        }}
      >
        {/* Top-right decorative element */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "400px",
            height: "400px",
            background:
              "radial-gradient(circle at top right, rgba(255,255,255,0.08) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              backgroundColor: "#FBB62E",
              color: "#000",
              fontSize: "16px",
              fontWeight: 700,
              padding: "8px 20px",
              borderRadius: "6px",
              letterSpacing: "0.1em",
              display: "flex",
            }}
          >
            30+ YEARS OF EXCELLENCE
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: "72px",
            fontWeight: 700,
            color: "#FFFFFF",
            lineHeight: 1.1,
            marginBottom: "16px",
            display: "flex",
          }}
        >
          Bonardi Construction
        </div>

        {/* Yellow accent line */}
        <div
          style={{
            width: "120px",
            height: "6px",
            backgroundColor: "#FBB62E",
            borderRadius: "3px",
            marginBottom: "24px",
            display: "flex",
          }}
        />

        {/* Subtitle */}
        <div
          style={{
            fontSize: "28px",
            color: "rgba(255,255,255,0.85)",
            fontWeight: 400,
            display: "flex",
          }}
        >
          General Contracting — Queens, NY
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            right: "0",
            height: "8px",
            backgroundColor: "#FBB62E",
            display: "flex",
          }}
        />

        {/* Bottom-left info */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "80px",
            display: "flex",
            gap: "32px",
            alignItems: "center",
          }}
        >
          <div
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: "16px",
              display: "flex",
            }}
          >
            718.762.3400
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: "16px",
              display: "flex",
            }}
          >
            |
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: "16px",
              display: "flex",
            }}
          >
            bonardiconst.com
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: "16px",
              display: "flex",
            }}
          >
            |
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: "16px",
              display: "flex",
            }}
          >
            NYC Licensed #1274180
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
