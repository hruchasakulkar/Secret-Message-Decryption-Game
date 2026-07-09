import Terminal from "./pages/terminal";

export default function App() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px"
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1100px",
          height: "90vh",
          background: "#0d1117",
          border: "1px solid #2d333b",
          borderRadius: "18px",
          overflow: "hidden",
          boxShadow: "0 0 80px rgba(0,255,120,.15)"
        }}
      >
        <div
          style={{
            height: 48,
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "0 18px",
            background: "#161b22",
            borderBottom: "1px solid #30363d"
          }}
        >
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#febc2e" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840" }} />

          <span
            style={{
              marginLeft: 20,
              color: "#8b949e",
              fontSize: 14
            }}
          >
            cipher-terminal
          </span>
        </div>

        <Terminal />
      </div>
    </div>
  );
}