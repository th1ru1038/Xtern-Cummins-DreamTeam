import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import cumminsLogo from "./Cummins_logo.svg";

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;700&display=swap');

:root {
  --bg: #0b0b0d;
  --panel: #ffffff;
  --ink: #15181d;
  --muted: #697887;
  --line: #d8e0e8;
  --brand: #da291c;
  --brand-soft: #ffe7e5;
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
    radial-gradient(1100px 500px at -8% 100%, rgba(218, 41, 28, 0.5) 0%, rgba(218, 41, 28, 0) 62%),
    radial-gradient(980px 460px at 102% -10%, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0) 58%),
    radial-gradient(860px 360px at 102% 94%, rgba(218, 41, 28, 0.4) 0%, rgba(218, 41, 28, 0) 66%),
    linear-gradient(165deg, #040404 0%, #0c0c0f 46%, #16161a 100%),
    var(--bg);
  background-attachment: fixed;
}

body::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(620px 230px at 22% 22%, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0)),
    radial-gradient(720px 260px at 72% 72%, rgba(218, 41, 28, 0.1), rgba(218, 41, 28, 0)),
    repeating-linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.015) 0px,
      rgba(255, 255, 255, 0.015) 1px,
      rgba(0, 0, 0, 0) 2px,
      rgba(0, 0, 0, 0) 4px
    );
  mix-blend-mode: screen;
  opacity: 0.62;
  z-index: 0;
}

body::after {
  content: "";
  position: fixed;
  inset: -10%;
  pointer-events: none;
  background:
    radial-gradient(360px 130px at 20% 72%, rgba(218, 41, 28, 0.25), rgba(218, 41, 28, 0)),
    radial-gradient(420px 170px at 78% 26%, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0));
  filter: blur(18px);
  animation: drift 16s ease-in-out infinite alternate;
  z-index: 0;
}

@keyframes drift {
  0% { transform: translate3d(-2%, 0, 0); }
  100% { transform: translate3d(2%, -1.5%, 0); }
}
h1, h2, h3, h4 { margin: 0; font-family: "Space Grotesk", sans-serif; }
p { margin: 0; }

.app-shell {
  max-width: 1240px;
  margin: 0 auto;
  padding: 16px 22px 26px;
  position: relative;
  z-index: 1;
}

.site-masthead {
  position: relative;
  z-index: 8;
  background: linear-gradient(145deg, rgba(13, 13, 16, 0.94), rgba(9, 9, 10, 0.9));
  border-bottom: 1px solid rgba(255, 255, 255, 0.14);
  color: #eef3f7;
}

.utility-bar {
  background: rgba(0, 0, 0, 0.42);
  color: #fff;
  font-size: 11px;
}

.utility-inner {
  max-width: 1240px;
  margin: 0 auto;
  padding: 6px 22px;
  display: flex;
  justify-content: flex-end;
  gap: 18px;
  font-weight: 700;
  letter-spacing: 0.2px;
}

.primary-header {
  background: transparent;
}

.header-inner {
  max-width: 1240px;
  margin: 0 auto;
  padding: 8px 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.brand-link {
  display: inline-flex;
  align-items: center;
}

.brand-logo {
  height: 40px;
  width: auto;
  display: block;
}

.primary-nav {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.nav-link {
  color: #eef3f7;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.2px;
  text-transform: uppercase;
}

.nav-link, .utility-link, .footer-link, .brand-link {
  text-decoration: none;
}

.utility-link {
  color: #fff;
}

.header-actions {
  display: flex;
  gap: 10px;
  align-items: center;
}

.search-form {
  display: flex;
  align-items: center;
  gap: 8px;
}

.search-input {
  border: 1px solid rgba(255, 255, 255, 0.28);
  border-radius: 999px;
  padding: 6px 12px;
  font-size: 12px;
  width: 220px;
  background: rgba(255, 255, 255, 0.09);
  color: #f1f5f8;
}
.search-input::placeholder {
  color: #d4dde7;
}

.search-pill {
  border: 1px solid rgba(255, 255, 255, 0.32);
  border-radius: 999px;
  padding: 6px 11px;
  font-size: 11px;
  font-weight: 700;
  background: rgba(255, 255, 255, 0.12);
  text-decoration: none;
  color: #eef3f7;
}

.role-strip {
  max-width: 1240px;
  margin: 0 auto;
  padding: 8px 22px;
  border-top: 1px solid rgba(255, 255, 255, 0.16);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
}

.title { font-size: 20px; }
.subtitle { color: var(--muted); font-size: 12px; }

.role-tabs {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.role-tabs button {
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.08);
  color: #edf3f8;
  font-weight: 700;
  border-radius: 8px;
  padding: 10px 16px;
  cursor: pointer;
  transition: 0.2s ease;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 0.3px;
}

.role-tabs button.active {
  background: var(--brand);
  color: #fff;
  border-color: var(--brand);
  box-shadow: none;
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
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid #d7dde5;
  background: #fcfcfc;
}

.model-workspace {
  min-height: 392px;
  display: grid;
  grid-template-columns: 180px 1fr;
}

.model-sidebar {
  border-right: 1px solid #e0e6ee;
  background: linear-gradient(180deg, #f6f7f9 0%, #f0f2f5 100%);
  padding: 14px 12px;
  display: grid;
  align-content: start;
  gap: 8px;
}

.model-item {
  border-radius: 10px;
  border: 1px solid transparent;
  padding: 10px;
  font-size: 13px;
  color: #33475b;
  font-weight: 700;
}

.model-item.active {
  border-color: #d1dbe7;
  background: #fff;
  color: #121a22;
}

.model-main {
  background:
    radial-gradient(420px 150px at 80% 10%, rgba(218, 41, 28, 0.07), rgba(218, 41, 28, 0)),
    radial-gradient(460px 180px at 40% 100%, rgba(0, 0, 0, 0.06), rgba(0, 0, 0, 0)),
    #f8f9fb;
  padding: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.model-pill {
  margin: 0 auto;
  border: 1px solid #d9e0e9;
  border-radius: 999px;
  padding: 8px 14px;
  background: #ffffffc7;
  font-size: 13px;
  font-weight: 700;
  color: #365068;
}

.model-summary {
  width: min(680px, 100%);
  margin: 0 auto;
  border: 1px solid #d7dde5;
  border-radius: 16px;
  background: #fff;
  padding: 14px;
  box-shadow: 0 8px 24px rgba(20, 35, 56, 0.08);
}

.model-title {
  font-weight: 800;
  margin-bottom: 8px;
}

.model-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.model-tag {
  border-radius: 999px;
  border: 1px solid #d8dfe8;
  background: #f8fafc;
  color: #42566b;
  font-size: 12px;
  font-weight: 700;
  padding: 6px 10px;
}

.prompt-dock {
  width: min(780px, 100%);
  margin: 0 auto;
  border: 1px solid #d2dae4;
  border-radius: 18px;
  background: #fff;
  padding: 12px 12px 10px;
  box-shadow: 0 8px 26px rgba(12, 24, 39, 0.08);
}

.prompt-input {
  color: #9ba6b3;
  font-size: 30px;
  line-height: 1;
}

.prompt-actions {
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.model-actions-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.model-chip {
  border: 1px solid #d5dde8;
  border-radius: 999px;
  padding: 7px 12px;
  font-size: 13px;
  font-weight: 700;
  color: #455a70;
  background: #fafcfe;
}

.send-btn {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 0;
  background: #101316;
  color: #fff;
  font-size: 16px;
  font-weight: 800;
}

.role-shell {
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: linear-gradient(145deg, rgba(13, 13, 16, 0.92), rgba(9, 9, 10, 0.86));
  box-shadow: 0 26px 50px rgba(0, 0, 0, 0.35);
  padding: 12px;
}

.role-shell .panel,
.role-shell .stat,
.role-shell .kpi,
.role-shell .chart,
.role-shell .metric,
.role-shell .role-line {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.18);
  color: #f1f5f8;
  box-shadow: none;
}

.role-shell .label,
.role-shell .subtitle,
.role-shell .table th,
.role-shell .table td,
.role-shell .trend {
  color: #d2dde8;
}

.role-shell .alert-item {
  background: rgba(218, 41, 28, 0.2);
  border-color: rgba(218, 41, 28, 0.45);
  color: #ffe8e5;
}

.junior-page {
  display: grid;
  gap: 14px;
}

.agent-layout {
  min-height: 620px;
  display: grid;
  grid-template-columns: 248px 1fr;
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: linear-gradient(145deg, rgba(13, 13, 16, 0.92), rgba(9, 9, 10, 0.86));
  box-shadow: 0 26px 50px rgba(0, 0, 0, 0.35);
}

.agent-sidebar {
  background: rgba(255, 255, 255, 0.05);
  border-right: 1px solid rgba(255, 255, 255, 0.11);
  padding: 14px 10px;
  color: #f1f5f8;
  display: grid;
  align-content: start;
  gap: 10px;
}

.agent-brand {
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: rgba(255, 255, 255, 0.07);
  border-radius: 10px;
  padding: 10px;
  font-size: 13px;
  font-weight: 700;
}

.agent-link {
  border-radius: 10px;
  padding: 10px;
  font-size: 13px;
  color: #d4dde5;
  border: 1px solid transparent;
}

.agent-link.active {
  color: #fff;
  border-color: rgba(218, 41, 28, 0.4);
  background: rgba(218, 41, 28, 0.18);
}

.agent-main {
  position: relative;
  padding: 16px;
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: 12px;
}

.agent-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #e6edf3;
  font-size: 13px;
}

.agent-badge {
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.24);
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.08);
  color: #f1f5f8;
  font-weight: 700;
}

.agent-canvas {
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background:
    radial-gradient(420px 180px at 80% 8%, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0)),
    radial-gradient(450px 220px at 8% 88%, rgba(218, 41, 28, 0.28), rgba(218, 41, 28, 0)),
    linear-gradient(165deg, rgba(22, 22, 25, 0.92), rgba(10, 10, 12, 0.88));
  padding: 24px;
  color: #f5f7fa;
  display: grid;
  align-content: center;
  gap: 12px;
}

.agent-canvas h2 {
  max-width: 620px;
  font-size: clamp(30px, 4.8vw, 52px);
  line-height: 1.08;
}

.agent-canvas p {
  max-width: 560px;
  color: #d8e0e8;
}

.agent-prompt {
  width: min(860px, 100%);
  margin: 0 auto;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.24);
  background: rgba(255, 255, 255, 0.94);
  padding: 12px;
}

.agent-prompt-row {
  display: flex;
  gap: 10px;
  align-items: center;
}

.prompt-placeholder {
  color: #8d98a6;
  font-size: clamp(16px, 2.1vw, 32px);
  line-height: 1.1;
  flex: 1;
}

.icon-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid #d2d9e3;
  background: #fff;
  color: #19222b;
  font-weight: 800;
}

.agent-controls {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
}

.chip-dark {
  border-radius: 999px;
  border: 1px solid #d0d8e3;
  background: #fff;
  color: #334658;
  padding: 7px 12px;
  font-size: 12px;
  font-weight: 700;
}

.page-footer {
  margin-top: 22px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(8, 8, 10, 0.76);
  color: #dce3ea;
}

.footer-inner {
  max-width: 1240px;
  margin: 0 auto;
  padding: 14px 22px 18px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
  font-size: 12px;
}

.footer-links {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.footer-link {
  color: #ffffff;
  opacity: 0.9;
}

.info-page {
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: linear-gradient(145deg, rgba(13, 13, 16, 0.92), rgba(9, 9, 10, 0.86));
  box-shadow: 0 26px 50px rgba(0, 0, 0, 0.35);
  color: #f0f4f8;
  padding: 24px;
  min-height: 420px;
}

.search-page {
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: linear-gradient(145deg, rgba(13, 13, 16, 0.92), rgba(9, 9, 10, 0.86));
  box-shadow: 0 26px 50px rgba(0, 0, 0, 0.35);
  color: #f0f4f8;
  padding: 24px;
  min-height: 420px;
}

.search-results {
  display: grid;
  gap: 10px;
  margin-top: 14px;
}

.search-result {
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 12px;
  padding: 12px;
  color: #f0f4f8;
  text-decoration: none;
  background: rgba(255, 255, 255, 0.05);
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
  .model-workspace { grid-template-columns: 1fr; }
  .model-sidebar { grid-auto-flow: column; overflow-x: auto; border-right: 0; border-bottom: 1px solid #e0e6ee; }
  .agent-layout { grid-template-columns: 1fr; min-height: 560px; }
  .agent-sidebar { grid-auto-flow: column; overflow-x: auto; border-right: 0; border-bottom: 1px solid rgba(255, 255, 255, 0.11); }
  .agent-main { min-height: 460px; }
}

@media (max-width: 760px) {
  .header-inner { flex-wrap: wrap; }
  .primary-nav { overflow-x: auto; flex-wrap: nowrap; max-width: 100%; }
  .search-input { width: 160px; }
  .role-strip { align-items: flex-start; }
  .app-shell { padding: 12px 14px 20px; }
  .hero { grid-template-columns: 1fr; text-align: left; }
  .quick-cards { grid-template-columns: 1fr; }
  .kpi-grid { grid-template-columns: 1fr; }
  .agent-canvas { padding: 16px; }
  .agent-canvas h2 { font-size: clamp(22px, 9vw, 34px); }
  .agent-prompt { padding: 10px; }
  .agent-controls { gap: 8px; }
}

@media (max-width: 480px) {
  .role-tabs { width: 100%; }
  .role-tabs button { flex: 1; min-width: 0; padding: 9px 8px; }
  .prompt-placeholder { font-size: 20px; }
  .agent-top { flex-wrap: wrap; }
}
`;

function ShellHeader({ role, setRole, onSearch }) {
  const roles = ["Junior", "Senior", "Manager", "Admin"];
  const [searchText, setSearchText] = useState("");
  const handleRole = (nextRole) => {
    setRole(nextRole);
    window.location.hash = "#/home";
  };
  const submitSearch = (e) => {
    e.preventDefault();
    onSearch(searchText);
  };
  return (
    <header className="site-masthead">
      <div className="utility-bar">
        <div className="utility-inner">
          <a className="utility-link" href="#/about">About</a>
          <a className="utility-link" href="#/support">Support</a>
          <a className="utility-link" href="#/contact">Contact</a>
        </div>
      </div>
      <div className="primary-header">
        <div className="header-inner">
          <a className="brand-link" href="#/home" aria-label="Cummins">
            <img className="brand-logo" src={cumminsLogo} alt="Cummins logo" />
          </a>
          <nav className="primary-nav" aria-label="Primary">
            <a className="nav-link" href="#/products">Products</a>
            <a className="nav-link" href="#/parts-service">Parts & Service</a>
            <a className="nav-link" href="#/technology">Technology</a>
            <a className="nav-link" href="#/sustainability">Sustainability</a>
          </nav>
          <div className="header-actions">
            <form className="search-form" onSubmit={submitSearch}>
              <input
                className="search-input"
                placeholder="Search chats, pages, diagnostics..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button className="search-pill" type="submit">Search</button>
            </form>
          </div>
        </div>
      </div>
      <div className="role-strip">
        <div>
          <h1 className="title">ServiceSync AI</h1>
          <p className="subtitle">Role-focused workflows with AI-guided diagnostics and governance</p>
        </div>
        <div className="role-tabs">
          {roles.map((item) => (
            <button key={item} className={role === item ? "active" : ""} onClick={() => handleRole(item)}>
              {item}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}

function JuniorView({ toast, setToast }) {
  const [offline, setOffline] = useState(false);
  const confidence = 82;
  const escalateUrgent = 35;

  return (
    <div className={`junior-page ${offline ? "offline-tint" : ""}`}>
      {offline && <div className="banner">Offline Mode - Using Cached AI Model | 2 Pending Sync</div>}

      <section className="agent-layout">
        <aside className="agent-sidebar">
          <div className="agent-brand">ServiceSync Agent</div>
          <div className="agent-link active">AI Mentor</div>
          <div className="agent-link">Fault Code Retrieval</div>
          <div className="agent-link">Service History</div>
          <div className="agent-link">Escalation Queue</div>
          <div className="agent-link">Offline Cache</div>
        </aside>

        <div className="agent-main">
          <div className="agent-top">
            <span>
              Engine: QSK60 | Signal: ████░
            </span>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span className={`pulse ${offline ? "off" : "good"}`} />
              <span>{offline ? "Offline" : "Online"}</span>
              <button className="chip-dark" onClick={() => setOffline((v) => !v)}>
                {offline ? "Go Online" : "Simulate Offline"}
              </button>
            </div>
          </div>

          <div className="agent-canvas">
            <div className="agent-badge">{confidence}% confidence recommendation ready</div>
            <h2>AI Mentor for Fast, Confident Cummins Diagnostics</h2>
            <p>Diagnosis: Fuel Pressure Sensor Failure. Similar case cluster: 64%. Wear threshold reached.</p>
          </div>

          <div className="agent-prompt">
            <div className="agent-prompt-row">
              <button className="icon-btn">+</button>
              <div className="prompt-placeholder">Ask AI for next diagnostic action...</div>
              <button className="icon-btn">🎤</button>
              <button className="send-btn" onClick={() => setToast("AI mentor prompt sent.")}>→</button>
            </div>
            <div className="agent-controls">
              <span className="chip-dark">Model ▾</span>
              <div style={{ display: "flex", gap: 8 }}>
                <button className="btn green" onClick={() => setToast("Proceed action accepted and logged.")}>Proceed</button>
                <button className="btn yellow" onClick={() => setToast("Guided checklist launched.")}>Guidance</button>
                <button className={`btn red ${escalateUrgent < 40 ? "shake" : ""}`} onClick={() => setToast("Escalation queued with full diagnostic context + optional voice note.")}>Escalate</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="quick-cards">
        <div className="stat"><div className="label">Recent Diagnoses</div><div className="value">3</div></div>
        <div className="stat"><div className="label">Pending Escalations</div><div className="value">2</div></div>
        <div className="stat"><div className="label">Offline Cached Engines</div><div className="value">6</div></div>
      </div>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

function SeniorView({ setToast, setShowOverride }) {
  return (
    <div className="role-shell">
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
    </div>
  );
}

function ManagerView() {
  const bars = useMemo(() => [22, 34, 28, 44, 51, 58, 62], []);
  return (
    <div className="role-shell">
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
    </div>
  );
}

function AdminView({ setToast }) {
  return (
    <div className="role-shell">
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
    </div>
  );
}

function Footer() {
  return (
    <footer className="page-footer">
      <div className="footer-inner">
        <span>© {new Date().getFullYear()} Cummins ServiceSync AI</span>
        <div className="footer-links">
          <a className="footer-link" href="#/privacy">Privacy</a>
          <a className="footer-link" href="#/terms">Terms</a>
          <a className="footer-link" href="#/contact">Contact</a>
        </div>
      </div>
    </footer>
  );
}

function InfoPage({ title, description }) {
  return (
    <section className="info-page">
      <h2 style={{ color: "#fff", marginBottom: 8 }}>{title}</h2>
      <p style={{ color: "#d3dce6", maxWidth: 760 }}>{description}</p>
      <div style={{ marginTop: 16 }}>
        <a className="chip-dark" href="#/home">Return to ServiceSync Dashboard</a>
      </div>
    </section>
  );
}

function SearchPage({ query, results, onPickRole }) {
  return (
    <section className="search-page">
      <h2 style={{ color: "#fff", marginBottom: 8 }}>Search</h2>
      <p style={{ color: "#d3dce6", maxWidth: 760 }}>
        {query ? `Results for "${query}"` : "Search chats, dashboards, diagnostics, and support pages."}
      </p>
      <div className="search-results">
        {results.length === 0 && <div className="model-tag">No results found. Try another keyword.</div>}
        {results.map((item) => (
          <a
            key={item.title}
            className="search-result"
            href={item.href}
            onClick={() => item.role && onPickRole(item.role)}
          >
            <strong>{item.title}</strong>
            <div className="subtitle" style={{ color: "#d3dce6", marginTop: 4 }}>{item.type}</div>
          </a>
        ))}
      </div>
    </section>
  );
}

function App() {
  const [role, setRole] = useState("Junior");
  const [toast, setToast] = useState("");
  const [showOverride, setShowOverride] = useState(false);
  const [overrideReason, setOverrideReason] = useState("");
  const [overrideType, setOverrideType] = useState("");
  const [route, setRoute] = useState(() => window.location.hash || "#/home");

  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash || "#/home");
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const dismissToastSoon = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2400);
  };
  const handleSearch = (queryText) => {
    const cleaned = queryText.trim();
    const suffix = cleaned ? `?query=${encodeURIComponent(cleaned)}` : "";
    window.location.hash = `#/search${suffix}`;
  };

  const pages = {
    about: { title: "About", description: "ServiceSync AI delivers guided diagnostics, escalation intelligence, and role-based reliability tooling for field operations." },
    support: { title: "Support", description: "Support resources include troubleshooting guides, model diagnostics, and escalation response workflows." },
    contact: { title: "Contact", description: "Contact the ServiceSync operations team for platform access, issue response, and enterprise onboarding." },
    products: { title: "Products", description: "Explore Cummins power solutions integrated with ServiceSync diagnostics and predictive maintenance tooling." },
    "parts-service": { title: "Parts & Service", description: "Find service workflows, replacement planning, and maintenance guidance linked to field diagnostics." },
    technology: { title: "Technology", description: "View AI model capabilities, confidence monitoring, and production support architecture for technicians." },
    sustainability: { title: "Sustainability", description: "Track operational efficiency and sustainability outcomes through reliable diagnostics and reduced repeat repairs." },
    search: { title: "Search", description: "Use global search to locate cases, engines, fault clusters, and support resources across ServiceSync AI." },
    privacy: { title: "Privacy", description: "Privacy controls include audit-safe data handling, role-based access, and secure escalation context management." },
    terms: { title: "Terms", description: "Review operational terms for platform usage, escalation governance, and model override accountability." },
  };

  const routeValue = route.startsWith("#/") ? route.slice(2) : "home";
  const [routeKey, routeQuery = ""] = routeValue.split("?");
  const searchParams = new URLSearchParams(routeQuery);
  const searchQuery = searchParams.get("query") || "";
  const staticPage = pages[routeKey];
  const searchItems = [
    { title: "Junior Technician Dashboard", type: "Dashboard", href: "#/home", role: "Junior" },
    { title: "Senior Escalation Queue", type: "Dashboard", href: "#/home", role: "Senior" },
    { title: "Manager Analytics Overview", type: "Dashboard", href: "#/home", role: "Manager" },
    { title: "Admin System Health", type: "Dashboard", href: "#/home", role: "Admin" },
    { title: "Chat: QSK60 Fuel Pressure Case", type: "Chat", href: "#/home", role: "Junior" },
    { title: "Chat: DEF Sensor Escalation", type: "Chat", href: "#/home", role: "Senior" },
    { title: "About", type: "Page", href: "#/about" },
    { title: "Support", type: "Page", href: "#/support" },
    { title: "Contact", type: "Page", href: "#/contact" },
    { title: "Products", type: "Page", href: "#/products" },
    { title: "Parts & Service", type: "Page", href: "#/parts-service" },
    { title: "Technology", type: "Page", href: "#/technology" },
    { title: "Sustainability", type: "Page", href: "#/sustainability" },
    { title: "Privacy", type: "Page", href: "#/privacy" },
    { title: "Terms", type: "Page", href: "#/terms" },
  ];
  const results = searchItems.filter((item) => {
    if (!searchQuery) return true;
    return `${item.title} ${item.type}`.toLowerCase().includes(searchQuery.toLowerCase());
  });

  let view = null;
  if (routeKey === "search") {
    view = <SearchPage query={searchQuery} results={results} onPickRole={setRole} />;
  } else if (staticPage) {
    view = <InfoPage title={staticPage.title} description={staticPage.description} />;
  } else {
    if (role === "Junior") view = <JuniorView toast={toast} setToast={dismissToastSoon} />;
    if (role === "Senior") view = <SeniorView setToast={dismissToastSoon} setShowOverride={setShowOverride} />;
    if (role === "Manager") view = <ManagerView />;
    if (role === "Admin") view = <AdminView setToast={dismissToastSoon} />;
  }

  const confirmOverride = () => {
    dismissToastSoon("Override confirmed, audit trail logged with timestamp.");
    setShowOverride(false);
    setOverrideReason("");
    setOverrideType("");
  };

  return (
    <>
      <style>{styles}</style>
      <ShellHeader role={role} setRole={setRole} onSearch={handleSearch} />
      <div className="app-shell">
        {view}
      </div>
      <Footer />

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
