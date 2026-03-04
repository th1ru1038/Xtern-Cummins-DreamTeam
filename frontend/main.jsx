import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;700&display=swap');

:root {
  --bg: #eef3f8;
  --panel: #ffffff;
  --ink: #1d2a38;
  --muted: #647487;
  --line: #d9e2ec;
  --brand: #0f80e8;
  --brand-soft: #d9edff;
  --good: #16a34a;
  --warn: #d08700;
  --danger: #c0352b;
  --elev: 0 18px 50px rgba(21, 51, 87, 0.14);
}

* { box-sizing: border-box; }
body {
  margin: 0;
  font-family: Manrope, sans-serif;
  color: var(--ink);
  background:
    radial-gradient(1300px 600px at -20% -20%, #d3e9ff 0%, rgba(211, 233, 255, 0) 60%),
    radial-gradient(900px 500px at 120% 0%, #d9f7ed 0%, rgba(217, 247, 237, 0) 65%),
    var(--bg);
}
h1, h2, h3, h4 { margin: 0; font-family: "Space Grotesk", sans-serif; }
p { margin: 0; }

.app-shell {
  max-width: 1400px;
  margin: 0 auto;
  padding: 22px;
}

.top {
  display: flex;
  gap: 14px;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 18px;
}

.title { font-size: 24px; }
.subtitle { color: var(--muted); font-size: 14px; }

.role-tabs {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.role-tabs button {
  border: 0;
  background: #dbe7f3;
  color: #2d4460;
  font-weight: 700;
  border-radius: 999px;
  padding: 10px 16px;
  cursor: pointer;
  transition: 0.2s ease;
}

.role-tabs button.active {
  background: var(--brand);
  color: #fff;
  box-shadow: 0 8px 26px rgba(15, 128, 232, 0.36);
}

.panel {
  background: var(--panel);
  border-radius: 24px;
  border: 1px solid #e3ebf4;
  box-shadow: var(--elev);
}

.section { padding: 18px; }
.grid { display: grid; gap: 14px; }

.hero {
  padding: 22px;
  display: grid;
  gap: 14px;
  grid-template-columns: 1fr auto;
  align-items: center;
  transition: 0.25s ease;
}
.hero:hover { transform: translateY(-2px); }

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #bae0ff, #86b6ff);
  font-weight: 800;
}

.status {
  display: flex;
  gap: 10px;
  align-items: center;
  color: var(--muted);
  font-size: 13px;
}

.pulse {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  position: relative;
}

.pulse::after {
  content: "";
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  opacity: 0.35;
  animation: pulse 1.6s infinite;
}

.pulse.good { background: var(--good); }
.pulse.good::after { background: var(--good); }
.pulse.off { background: #94a3b8; }
.pulse.off::after { background: #94a3b8; }

@keyframes pulse {
  0% { transform: scale(0.8); opacity: 0.5; }
  100% { transform: scale(1.8); opacity: 0; }
}

.ai-orb {
  width: 128px;
  height: 128px;
  border-radius: 50%;
  border: none;
  color: #fff;
  font-weight: 800;
  font-size: 15px;
  letter-spacing: 0.2px;
  background: radial-gradient(circle at 30% 20%, #3bc8ff, #0069cf 72%);
  box-shadow: 0 16px 36px rgba(0, 105, 207, 0.4);
  position: relative;
  cursor: pointer;
}

.ai-orb::after {
  content: "";
  position: absolute;
  inset: -12px;
  border-radius: 50%;
  border: 2px solid rgba(0, 105, 207, 0.25);
  opacity: 0;
}

.ai-orb.ripple::after {
  animation: ripple 0.75s ease;
}

@keyframes ripple {
  0% { transform: scale(0.9); opacity: 0.8; }
  100% { transform: scale(1.3); opacity: 0; }
}

.quick-cards {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.stat {
  background: #f5f9ff;
  border-radius: 16px;
  padding: 14px;
  border: 1px solid #dce8f5;
}

.label { font-size: 12px; color: var(--muted); }
.value { font-size: 24px; font-weight: 800; margin-top: 4px; }

.banner {
  border-radius: 14px;
  background: #e7edf4;
  border: 1px solid #d1dae5;
  color: #415466;
  font-weight: 700;
  padding: 10px 14px;
}

.diag-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 14px;
}

.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.fault-card {
  border: 1px solid #dce8f5;
  border-radius: 14px;
  padding: 12px;
  display: grid;
  gap: 6px;
}

.tag {
  border-radius: 999px;
  padding: 5px 10px;
  font-size: 11px;
  font-weight: 800;
}

.tag.med { background: #fff7de; color: #8f6400; }
.tag.high { background: #ffe3e1; color: #9c1e17; }

.recommend {
  background: linear-gradient(180deg, #f9fbff 0%, #f2f8ff 100%);
  border: 1px solid #dce8f5;
  border-radius: 18px;
  padding: 14px;
}

.bar {
  height: 12px;
  border-radius: 999px;
  background: #dfe8f3;
  overflow: hidden;
  margin-top: 8px;
}

.fill {
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, #cb2e2e, #f59e0b, #22c55e);
  transform-origin: left;
  animation: grow 0.9s ease;
}

@keyframes grow {
  from { transform: scaleX(0.1); }
  to { transform: scaleX(1); }
}

.actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 12px;
}

.btn {
  border: 0;
  border-radius: 11px;
  font-weight: 700;
  padding: 10px 14px;
  cursor: pointer;
}
.btn.green { background: #dbf4e5; color: #0f6a39; }
.btn.yellow { background: #fff3d8; color: #8f6400; }
.btn.red { background: #ffe3e1; color: #8f1f18; }
.btn.blue { background: #d9edff; color: #005ea8; }

.btn.shake {
  animation: shake 1.1s ease-in-out infinite;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  15% { transform: translateX(-2px); }
  35% { transform: translateX(2px); }
  55% { transform: translateX(-2px); }
  75% { transform: translateX(2px); }
}

.table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.table th, .table td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ebf1f7;
}
.table th { color: var(--muted); font-size: 12px; }

.risk {
  border-left: 3px solid transparent;
}
.risk.low-conf { border-left-color: #c0352b; }
.risk.safe-flag { border-left-color: #d08700; }
.risk.aging { border-left-color: #0f80e8; }

.kpi-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
}

.kpi {
  border-radius: 16px;
  padding: 14px;
  border: 1px solid #dce8f5;
  background: linear-gradient(160deg, #ffffff 0%, #f5faff 100%);
}
.kpi .trend { color: #0f6a39; font-size: 13px; font-weight: 700; }

.chart-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.chart {
  border: 1px solid #dce8f5;
  border-radius: 14px;
  padding: 12px;
  background: #fcfdff;
}

.spark {
  height: 70px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  align-items: end;
  gap: 5px;
}

.spark span {
  border-radius: 8px 8px 4px 4px;
  background: linear-gradient(180deg, #8bc8ff, #2787e5);
}

.alerts {
  display: grid;
  gap: 8px;
}

.alert-item {
  border-radius: 11px;
  border: 1px solid #f1dccf;
  background: #fff5ef;
  color: #744a2f;
  padding: 10px 12px;
  font-size: 13px;
}

.admin-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.metric {
  border: 1px solid #dce8f5;
  border-radius: 14px;
  padding: 12px;
  background: #f8fbff;
}

.role-list {
  display: grid;
  gap: 9px;
}

.role-line {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #dce8f5;
  border-radius: 12px;
  padding: 10px;
}

.toggle {
  width: 46px;
  height: 24px;
  border-radius: 999px;
  background: #b8c5d3;
  position: relative;
}
.toggle::after {
  content: "";
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #fff;
  position: absolute;
  left: 4px;
  top: 3px;
}
.toggle.on { background: #55b37a; }
.toggle.on::after { left: 24px; }

.toast {
  position: fixed;
  right: 20px;
  bottom: 20px;
  background: #0f6a39;
  color: #fff;
  padding: 12px 14px;
  border-radius: 12px;
  box-shadow: var(--elev);
  font-weight: 700;
}

.overlay {
  position: fixed;
  inset: 0;
  background: rgba(20, 30, 42, 0.56);
  display: grid;
  place-items: center;
  padding: 20px;
  z-index: 10;
}

.modal {
  width: min(480px, 100%);
  background: #fff;
  border-radius: 18px;
  padding: 16px;
  border: 1px solid #dce8f5;
}

.input, .select {
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #cfdbea;
  margin-top: 6px;
  margin-bottom: 10px;
  font: inherit;
}

.offline-tint {
  filter: grayscale(0.25);
}

@media (max-width: 1100px) {
  .diag-grid, .chart-grid, .admin-grid { grid-template-columns: 1fr; }
  .kpi-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (max-width: 760px) {
  .hero { grid-template-columns: 1fr; text-align: left; }
  .quick-cards { grid-template-columns: 1fr; }
  .kpi-grid { grid-template-columns: 1fr; }
}
`;

function ShellHeader({ role, setRole }) {
  const roles = ["Junior", "Senior", "Manager", "Admin"];
  return (
    <div className="top">
      <div>
        <h1 className="title">ServiceSync AI UX Prototype</h1>
        <p className="subtitle">Role-focused workflows with AI-guided diagnostics and governance</p>
      </div>
      <div className="role-tabs">
        {roles.map((item) => (
          <button key={item} className={role === item ? "active" : ""} onClick={() => setRole(item)}>
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

function JuniorView({ toast, setToast }) {
  const [offline, setOffline] = useState(false);
  const [ripple, setRipple] = useState(false);
  const confidence = 82;
  const escalateUrgent = 35;

  const startDiag = () => {
    setRipple(true);
    setTimeout(() => setRipple(false), 760);
    setToast("Diagnostics started. Engine link request sent.");
  };

  return (
    <div className={offline ? "offline-tint" : ""}>
      <div className="panel section" style={{ marginBottom: 12 }}>
        <div className="row">
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <div className="avatar">JT</div>
            <div className="status">
              <span className={`pulse ${offline ? "off" : "good"}`} />
              <span>{offline ? "Offline" : "Online"}</span>
              {offline && <span className="tag med">Sync Pending</span>}
            </div>
          </div>
          <button className="btn blue" onClick={() => setOffline((v) => !v)}>
            {offline ? "Go Online" : "Simulate Offline"}
          </button>
        </div>
      </div>

      {offline && <div className="banner" style={{ marginBottom: 12 }}>Offline Mode - Using Cached AI Model | 2 Pending Sync</div>}

      <div className="panel hero" style={{ marginBottom: 12 }}>
        <div>
          <h2>Start Diagnostics</h2>
          <p className="subtitle" style={{ marginTop: 8 }}>Connect to engine to retrieve fault codes</p>
        </div>
        <button className={`ai-orb ${ripple ? "ripple" : ""}`} onClick={startDiag}>AI Connect</button>
      </div>

      <div className="quick-cards" style={{ marginBottom: 12 }}>
        <div className="stat"><div className="label">Recent Diagnoses</div><div className="value">3</div></div>
        <div className="stat"><div className="label">Pending Escalations</div><div className="value">2</div></div>
        <div className="stat"><div className="label">Offline Cached Engines</div><div className="value">6</div></div>
      </div>

      <div className="diag-grid">
        <div className="panel section grid">
          <h3>Fault Code Retrieval</h3>
          <div className="row"><span>Engine: QSK60</span><span>Connection: Stable</span><span>Signal: ████░</span></div>
          {[{ c: "P1187", d: "Fuel Rail Pressure Drop", s: "high" }, { c: "P026C", d: "Injector Timing Drift", s: "med" }, { c: "P203F", d: "DEF Level Sensor Mismatch", s: "med" }].map((x) => (
            <div className="fault-card" key={x.c}>
              <div className="row">
                <strong>{x.c}</strong>
                <span className={`tag ${x.s}`}>{x.s === "high" ? "High Severity" : "Medium Severity"}</span>
              </div>
              <div>{x.d}</div>
              <div className="subtitle">Expand for details ▾</div>
            </div>
          ))}
        </div>

        <div className="panel section">
          <h3 style={{ marginBottom: 10 }}>AI Recommendation</h3>
          <div className="recommend">
            <div className="label">Diagnosis</div>
            <div style={{ fontWeight: 800, marginTop: 4 }}>Fuel Pressure Sensor Failure</div>
            <div style={{ marginTop: 10 }}>
              <div className="row"><span className="label">Confidence</span><strong>{confidence}% (High)</strong></div>
              <div className="bar"><div className="fill" style={{ width: `${confidence}%` }} /></div>
            </div>
            <details style={{ marginTop: 10 }}>
              <summary style={{ cursor: "pointer", fontWeight: 700 }}>AI Reasoning</summary>
              <div className="subtitle" style={{ marginTop: 8 }}>Similar case cluster: 64% | Last replacement: None | Wear threshold reached</div>
            </details>
            <div className="actions">
              <button className="btn green" onClick={() => setToast("Proceed action accepted and logged.")}>Proceed</button>
              <button className="btn yellow" onClick={() => setToast("Guided checklist launched.")}>Proceed with Guidance</button>
              <button className={`btn red ${escalateUrgent < 40 ? "shake" : ""}`} onClick={() => setToast("Escalation queued with full diagnostic context + optional voice note.")}>Escalate to Senior</button>
            </div>
          </div>
        </div>
      </div>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

function SeniorView({ setToast, setShowOverride }) {
  return (
    <div className="grid" style={{ gridTemplateColumns: "280px 1fr", alignItems: "start" }}>
      <div className="panel section grid">
        <h3>Senior Dashboard</h3>
        <div className="stat"><div className="label">Pending Escalations</div><div className="value">14</div></div>
        <div className="stat"><div className="label">High Risk Cases</div><div className="value">5</div></div>
        <div className="stat"><div className="label">AI Overrides</div><div className="value">8</div></div>
        <div className="stat"><div className="label">AI Performance</div><div className="value">89%</div></div>
      </div>

      <div className="grid">
        <div className="panel section">
          <h3 style={{ marginBottom: 10 }}>Escalation Queue</h3>
          <table className="table">
            <thead>
              <tr><th>Priority</th><th>Engine</th><th>AI Confidence</th><th>Fault</th><th>Wait</th></tr>
            </thead>
            <tbody>
              <tr className="risk low-conf"><td>High</td><td>QSK60</td><td>34%</td><td>Fuel Rail Pressure</td><td>17m</td></tr>
              <tr className="risk safe-flag"><td>Critical</td><td>X15</td><td>61%</td><td>Coolant Temp Spike</td><td>39m</td></tr>
              <tr className="risk aging"><td>Medium</td><td>B6.7</td><td>78%</td><td>NOx Sensor Drift</td><td>1h 24m</td></tr>
            </tbody>
          </table>
        </div>

        <div className="diag-grid">
          <div className="panel section grid">
            <h3>Escalation Detail</h3>
            <div className="metric">Engine Data: QSK60 | 2,420 hrs | Unit #A49</div>
            <div className="metric">Service History: Fuel filter replaced 3 months ago</div>
            <div className="metric">Junior Notes: "Intermittent power drop under load."</div>
            <div className="metric">Photos: 3 attachments present</div>
          </div>

          <div className="panel section grid">
            <h3>AI Context</h3>
            <div className="metric">Recommendation: Replace fuel pressure sensor + inspect harness</div>
            <div className="metric">Confidence: 82%</div>
            <div className="metric">Reasoning: Similar pattern in last 12 cases</div>
            <div className="metric">Similar Cases: 8 resolved, 1 overridden</div>
            <div className="actions">
              <button className="btn green" onClick={() => setToast("Escalation approved. Response timestamped.")}>Approve</button>
              <button className="btn red" onClick={() => setToast("Escalation rejected with notes.")}>Reject</button>
              <button className="btn blue" onClick={() => setToast("Requested more information from junior technician.")}>Request More Info</button>
              <button className="btn yellow" onClick={() => setShowOverride(true)}>Override AI</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ManagerView() {
  const bars = useMemo(() => [22, 34, 28, 44, 51, 58, 62], []);
  return (
    <div className="grid">
      <div className="kpi-grid">
        {[{ k: "MTTR", v: "↓ 18%" }, { k: "FTFR", v: "↑ 12%" }, { k: "Escalation Rate", v: "↓ 22%" }, { k: "AI Accuracy", v: "89%" }].map((x) => (
          <div className="kpi" key={x.k}><div className="label">{x.k}</div><div className="value">{x.v}</div><div className="trend">Improving trend</div></div>
        ))}
      </div>

      <div className="chart-grid">
        <div className="chart"><h4>AI Accuracy Trend (30/60/90)</h4><div className="spark">{bars.map((v, i) => <span key={i} style={{ height: `${v + 10}px` }} />)}</div></div>
        <div className="chart"><h4>Escalation by Technician</h4><div className="spark">{[30, 52, 20, 66, 41, 57, 25].map((v, i) => <span key={i} style={{ height: `${v}px` }} />)}</div></div>
        <div className="chart"><h4>Repeat Fault Heatmap</h4><p className="subtitle" style={{ marginTop: 8 }}>Cluster concentration highest on fuel and sensor-related fault families.</p></div>
        <div className="chart"><h4>Warranty Cost Reduction</h4><p className="subtitle" style={{ marginTop: 8 }}>Projected quarterly savings trend remains above target by 9%.</p></div>
      </div>

      <div className="panel section">
        <h3 style={{ marginBottom: 10 }}>Risk Alerts</h3>
        <div className="alerts">
          <div className="alert-item">Technicians with high override rate detected in East region (3 users)</div>
          <div className="alert-item">AI confidence drift detected in DEF subsystem diagnostics</div>
          <div className="alert-item">Repeat part replacement cluster detected: Fuel pressure sensors</div>
        </div>
      </div>
    </div>
  );
}

function AdminView({ setToast }) {
  return (
    <div className="admin-grid">
      <div className="panel section grid">
        <h3>System Health</h3>
        <div className="metric"><strong>API Uptime:</strong> 99.97%</div>
        <div className="metric"><strong>Offline Device Count:</strong> 23</div>
        <div className="metric"><strong>Sync Latency:</strong> 1.8s avg</div>
      </div>

      <div className="panel section grid">
        <h3>AI Management</h3>
        <div className="metric"><strong>Model Version:</strong> v3.8.2</div>
        <div className="actions">
          <button className="btn blue" onClick={() => setToast("New model deployment started.")}>Deploy New Model</button>
          <button className="btn yellow" onClick={() => setToast("Rollback initiated to previous stable model.")}>Rollback</button>
        </div>
        <div className="metric"><strong>Audit Logs:</strong> Performance and override records available</div>
      </div>

      <div className="panel section" style={{ gridColumn: "1 / -1" }}>
        <h3 style={{ marginBottom: 10 }}>Role-Based Access Control</h3>
        <div className="role-list">
          {[
            ["Junior", true],
            ["Senior", true],
            ["Manager", true],
            ["Admin", true],
          ].map(([role, on]) => (
            <div className="role-line" key={role}>
              <span>{role}</span>
              <span className={`toggle ${on ? "on" : ""}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function App() {
  const [role, setRole] = useState("Junior");
  const [toast, setToast] = useState("");
  const [showOverride, setShowOverride] = useState(false);
  const [overrideReason, setOverrideReason] = useState("");
  const [overrideType, setOverrideType] = useState("");

  const dismissToastSoon = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2400);
  };

  let view = null;
  if (role === "Junior") view = <JuniorView toast={toast} setToast={dismissToastSoon} />;
  if (role === "Senior") view = <SeniorView setToast={dismissToastSoon} setShowOverride={setShowOverride} />;
  if (role === "Manager") view = <ManagerView />;
  if (role === "Admin") view = <AdminView setToast={dismissToastSoon} />;

  const confirmOverride = () => {
    dismissToastSoon("Override confirmed, audit trail logged with timestamp.");
    setShowOverride(false);
    setOverrideReason("");
    setOverrideType("");
  };

  return (
    <>
      <style>{styles}</style>
      <div className="app-shell">
        <ShellHeader role={role} setRole={setRole} />
        {view}
      </div>

      {showOverride && (
        <div className="overlay">
          <div className="modal">
            <h3>Override AI Recommendation</h3>
            <p className="subtitle" style={{ marginTop: 6, marginBottom: 10 }}>
              Mandatory comment and AI error tag are required for audit quality.
            </p>
            <label>
              Justification Comment
              <textarea
                className="input"
                rows={3}
                placeholder="Explain why this recommendation is being overridden..."
                value={overrideReason}
                onChange={(e) => setOverrideReason(e.target.value)}
              />
            </label>
            <label>
              AI Error Category
              <select className="select" value={overrideType} onChange={(e) => setOverrideType(e.target.value)}>
                <option value="">Select category</option>
                <option value="insufficient_context">Insufficient Context</option>
                <option value="fault_misclassification">Fault Misclassification</option>
                <option value="unsafe_recommendation">Unsafe Recommendation</option>
              </select>
            </label>
            <div className="actions" style={{ justifyContent: "flex-end" }}>
              <button className="btn blue" onClick={() => setShowOverride(false)}>Cancel</button>
              <button
                className="btn red"
                disabled={!overrideReason.trim() || !overrideType}
                onClick={confirmOverride}
                style={{ opacity: !overrideReason.trim() || !overrideType ? 0.55 : 1 }}
              >
                Confirm Override
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && role !== "Junior" && <div className="toast">{toast}</div>}
    </>
  );
}

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(<App />);
}
