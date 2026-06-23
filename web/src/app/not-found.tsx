import Link from "next/link";
import { SITE_URL } from "@/lib/seo";

export default function RootNotFound() {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#05070a",
          color: "#fff",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.75rem", letterSpacing: "0.1em" }}>
            404
          </p>
          <h1 style={{ fontSize: "1.75rem", margin: "0.5rem 0 1rem" }}>Page not found</h1>
          <p style={{ color: "rgba(255,255,255,0.55)", maxWidth: "28rem", margin: "0 auto 1.5rem" }}>
            The page you requested does not exist or has been moved.
          </p>
          <Link
            href={`${SITE_URL}/en`}
            style={{
              display: "inline-block",
              padding: "0.75rem 1.5rem",
              borderRadius: "9999px",
              background: "#00f2ff",
              color: "#05070a",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Go to homepage
          </Link>
        </div>
      </body>
    </html>
  );
}
