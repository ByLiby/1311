import dynamic from "next/dynamic";

const SeatViewerClean = dynamic(() => import("@/components/SeatViewerClean"), {
  loading: () => {
    return (
      <div
        style={{
          width: "100%",
          height: "720px",
          borderRadius: "32px",
          background: "#0e0e11",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "grid",
            gap: "10px",
            justifyItems: "center",
            color: "rgba(232, 236, 242, 0.92)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: "54px",
              height: "54px",
              borderRadius: "999px",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              background: "rgba(255, 255, 255, 0.04)",
              display: "grid",
              placeItems: "center",
              backdropFilter: "blur(10px)",
            }}
          >
            <div
              style={{
                width: "18px",
                height: "18px",
                borderRadius: "999px",
                background: "rgba(255, 255, 255, 0.84)",
                boxShadow: "0 0 24px rgba(255, 255, 255, 0.18)",
              }}
            />
          </div>
          <div style={{ fontSize: "14px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Loading 3D Seat
          </div>
          <div style={{ fontSize: "12px", color: "rgba(185, 193, 205, 0.74)" }}>
            Optimized geometry is preparing.
          </div>
        </div>
      </div>
    );
  },
});

export default function SeatTestPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0e0e11",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div style={{ width: "100%", maxWidth: "1400px" }}>
        <SeatViewerClean />
      </div>
    </main>
  );
}
