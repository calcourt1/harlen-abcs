function frame(body, ground = true) {
  const shadow = ground
    ? '<ellipse class="ground" cx="180" cy="214" rx="86" ry="12" fill="#241c16" opacity=".08"/>'
    : "";
  return `<svg viewBox="0 0 360 240" aria-hidden="true">${body}${shadow}</svg>`;
}

const SCENES = {
  A: frame(`
    <path d="M168 78c4-26 32-32 38-10" fill="none" stroke="#2f6a34" stroke-width="7" stroke-linecap="round"/>
    <ellipse cx="204" cy="62" rx="18" ry="9" fill="#3f8a45" transform="rotate(-32 204 62)"/>
    <circle cx="180" cy="132" r="62" fill="#d63c2e"/>
    <ellipse class="gloss" cx="158" cy="112" rx="16" ry="10" fill="#fff" opacity=".35" transform="rotate(-28 158 112)"/>
  `),
  B: frame(`
    <path d="M180 176c0 18 0 28 0 36" fill="none" stroke="#163a66" stroke-width="3"/>
    <ellipse cx="180" cy="104" rx="54" ry="70" fill="#2f6fbe"/>
    <ellipse cx="162" cy="78" rx="16" ry="26" fill="#fff" opacity=".28"/>
    <path d="M168 172h24l-12 16z" fill="#163a66"/>
  `),
  C: frame(`
    <ellipse cx="138" cy="138" rx="64" ry="44" fill="#f7fbff"/>
    <ellipse cx="206" cy="128" rx="62" ry="48" fill="#f7fbff"/>
    <circle cx="246" cy="118" r="32" fill="#f7fbff"/>
    <path d="M272 118h28l-10 12z" fill="#e09a2b"/>
    <circle cx="240" cy="112" r="4" fill="#241c16"/>
  `),
  D: frame(`
    <ellipse cx="180" cy="168" rx="96" ry="26" fill="#6a4a10"/>
    <path d="M84 118h192v40c0 10-43 22-96 22s-96-12-96-22z" fill="#e09a2b"/>
    <ellipse cx="180" cy="118" rx="96" ry="26" fill="#f3d7a4"/>
    <ellipse cx="180" cy="118" rx="72" ry="16" fill="#fff8ea"/>
    <path d="M118 128l132-62" stroke="#6a4a10" stroke-width="7" stroke-linecap="round"/>
    <path d="M246 128L108 62" stroke="#241c16" stroke-width="7" stroke-linecap="round"/>
  `),
  E: frame(`
    <circle cx="118" cy="126" r="42" fill="#d5dbe3"/>
    <ellipse cx="206" cy="140" rx="80" ry="52" fill="#7d8796"/>
    <circle cx="108" cy="104" r="32" fill="#7d8796"/>
    <circle cx="98" cy="100" r="5" fill="#241c16"/>
    <path d="M78 124c-6 28 8 52 36 58 8-16 4-36-8-52 10 2 16 8 16 16" fill="#7d8796"/>
    <path d="M128 124h16" stroke="#f4efe6" stroke-width="6" stroke-linecap="round"/>
    <circle cx="176" cy="184" r="12" fill="#7d8796"/>
    <circle cx="240" cy="184" r="12" fill="#7d8796"/>
  `),
  F: frame(`
    <ellipse cx="120" cy="150" rx="16" ry="7" fill="#3f4d12" opacity=".35"/>
    <ellipse cx="210" cy="168" rx="22" ry="8" fill="#3f4d12" opacity=".28"/>
    <circle cx="118" cy="132" r="8" fill="#e7f26a"/>
    <circle cx="118" cy="132" r="16" fill="#e7f26a" opacity=".35"/>
    <circle cx="214" cy="146" r="7" fill="#e7f26a"/>
    <circle cx="214" cy="146" r="18" fill="#e7f26a" opacity=".4"/>
    <path d="M250 96c8 8 6 16-2 20 10 2 16 10 12 18" fill="none" stroke="#3f4d12" stroke-width="4" stroke-linecap="round"/>
    <circle cx="262" cy="86" r="6" fill="#e7f26a"/>
    <circle cx="262" cy="86" r="16" fill="#e7f26a" opacity=".45"/>
  `),
  G: frame(`
    <path d="M70 168c30-8 50-8 78 0 28-10 58-8 86 4 20 8 36 8 52 2" fill="none" stroke="#1d4a28" stroke-width="6" stroke-linecap="round"/>
    <rect x="150" y="118" width="36" height="28" rx="4" fill="#c9842a"/>
    <circle cx="158" cy="108" r="16" fill="#e25b8c"/>
    <circle cx="178" cy="100" r="16" fill="#f0c14a"/>
    <circle cx="168" cy="90" r="14" fill="#fff"/>
    <rect x="164" y="78" width="8" height="16" rx="3" fill="#3e8f4a"/>
    <path d="M214 70c18 20 16 48-2 62" fill="none" stroke="#3e8f4a" stroke-width="6" stroke-linecap="round"/>
    <ellipse cx="230" cy="64" rx="16" ry="8" fill="#7dba6a" transform="rotate(20 230 64)"/>
    <path d="M206 132c8 10 8 16 2 22" fill="none" stroke="#2f6fbe" stroke-width="4" stroke-linecap="round"/>
  `),
  H: frame(`
    <circle cx="180" cy="78" r="28" fill="#f3c98a"/>
    <path d="M156 74c4-20 48-22 52-2" fill="#6a4c0e"/>
    <circle cx="170" cy="78" r="3" fill="#241c16"/>
    <circle cx="192" cy="78" r="3" fill="#241c16"/>
    <path d="M172 90c6 6 14 6 20 0" fill="none" stroke="#241c16" stroke-width="3" stroke-linecap="round"/>
    <path d="M138 118c6 40 18 62 42 66 26-2 40-24 46-66 4-8-8-16-20-14l-26 8-24-8c-12-2-24 4-18 14z" fill="#e2a322"/>
    <path d="M150 118c-28 4-36 22-22 32" fill="none" stroke="#f3c98a" stroke-width="12" stroke-linecap="round"/>
    <circle cx="122" cy="108" r="9" fill="#f3c98a"/>
    <path d="M262 128l7 16 17 2-13 11 4 17-15-9-15 9 4-17-13-11 17-2z" fill="#e2a322"/>
  `),
  I: frame(`
    <path d="M40 168h280" stroke="#2a9d8f" stroke-width="8" stroke-linecap="round"/>
    <path d="M40 168c30 16 60 16 90 0" fill="#b7e4dc"/>
    <path d="M130 168c30 16 60 16 90 0" fill="#8fd4c8"/>
    <path d="M210 168c24 12 48 12 74 0v28H40v-20c20 8 40 6 0 0z" fill="#2a9d8f" opacity=".35"/>
    <path d="M150 168c20-28 70-36 96-8 8 10-4 22-28 16-20-6-48-2-68-8z" fill="#e7d3a1"/>
    <circle cx="196" cy="150" r="5" fill="#f4efe6"/>
    <circle cx="214" cy="158" r="4" fill="#e07a4c"/>
    <path d="M168 146c6-16 8-16 14-6" stroke="#6a4c0e" stroke-width="3" fill="none" stroke-linecap="round"/>
  `, false),
  J: frame(`
    <path d="M118 150h124a18 18 0 0 1 18 18v8H100v-8a18 18 0 0 1 18-18z" fill="#f7f1e6"/>
    <path d="M112 132h136v22H112z" fill="#e7d3a1"/>
    <path d="M124 118h40c0 18-8 28-20 28s-20-10-20-28z" fill="#f3d7a4"/>
    <path d="M132 126h112v16c-20 18-70 22-112 4z" fill="#c43355"/>
    <ellipse cx="196" cy="132" rx="28" ry="8" fill="#e25b8c" opacity=".85"/>
  `),
  K: frame(`
    <path d="M70 196c40-20 90-70 120-120" fill="none" stroke="#1a466e" stroke-width="3"/>
    <path d="M150 92l70 28-24 10 28 16-16 12-30-20-10 22-12-8 12-24-28-8z" fill="#3d8fd4"/>
    <path d="M168 104l28 10" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".7"/>
    <circle cx="214" cy="48" r="16" fill="#fff"/>
    <circle cx="236" cy="40" r="12" fill="#fff"/>
  `),
  L: frame(`
    <circle cx="168" cy="118" r="54" fill="#e2b15a"/>
    <circle cx="130" cy="78" r="16" fill="#e2b15a"/>
    <circle cx="206" cy="78" r="16" fill="#e2b15a"/>
    <circle cx="118" cy="70" r="10" fill="#c9842a"/>
    <circle cx="218" cy="70" r="10" fill="#c9842a"/>
    <circle cx="150" cy="114" r="5" fill="#241c16"/>
    <circle cx="188" cy="114" r="5" fill="#241c16"/>
    <path d="M160 132h18" stroke="#241c16" stroke-width="3" stroke-linecap="round"/>
    <path d="M118 122h18M202 122h18" stroke="#241c16" stroke-width="2"/>
    <path d="M210 150c30 10 48 28 40 40-16 4-36-8-48-22" fill="#c9842a"/>
  `),
  M: frame(`
    <rect x="70" y="70" width="220" height="130" rx="8" fill="#f7f4ee"/>
    <rect x="82" y="82" width="196" height="106" rx="4" fill="#d9d4f0"/>
    <circle cx="250" cy="78" r="28" fill="#f7f1c8"/>
    <circle cx="258" cy="74" r="22" fill="#d9d4f0"/>
    <circle cx="150" cy="150" r="3" fill="#fff" opacity=".8"/>
    <circle cx="190" cy="120" r="2" fill="#fff"/>
    <circle cx="120" cy="130" r="2.5" fill="#fff"/>
  `),
  N: frame(`
    <path d="M108 176c20-40 40-70 52-78 8 20 18 48 22 78" fill="#8d5a32"/>
    <ellipse cx="180" cy="96" rx="46" ry="22" fill="#a67c52"/>
    <ellipse cx="164" cy="92" rx="12" ry="16" fill="#f4efe6"/>
    <ellipse cx="180" cy="90" rx="12" ry="16" fill="#f7f1e6"/>
    <ellipse cx="196" cy="92" rx="12" ry="16" fill="#f4efe6"/>
    <circle cx="164" cy="96" r="4" fill="#6a4c0e"/>
    <circle cx="180" cy="94" r="4" fill="#c9842a"/>
    <circle cx="196" cy="96" r="4" fill="#6a4c0e"/>
  `),
  O: frame(`
    <rect width="360" height="240" fill="#d4eaf8"/>
    <path d="M0 150c40 18 70 8 110-6 40 22 80 26 120 4 36 18 70 16 130-8v100H0z" fill="#1f7eb5"/>
    <path d="M0 146c30 10 60 4 84-8 8 8 20 10 28 2 10-12-8-20-20-12-28 10-48 8-64 2z" fill="#f7fbff" opacity=".9"/>
    <circle cx="250" cy="188" r="10" fill="#f3c98a"/>
    <path d="M40 70h70" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity=".8"/>
  `, false),
  P: frame(`
    <ellipse cx="176" cy="150" rx="70" ry="40" fill="#e7d3a1"/>
    <circle cx="230" cy="118" r="32" fill="#e7d3a1"/>
    <ellipse cx="252" cy="108" rx="14" ry="20" fill="#c9842a"/>
    <circle cx="240" cy="114" r="4" fill="#241c16"/>
    <ellipse cx="248" cy="128" rx="10" ry="6" fill="#e07a4c"/>
    <path d="M120 150c-10 20 6 36 24 30" fill="#e7d3a1"/>
    <circle cx="150" cy="176" r="8" fill="#e7d3a1"/>
    <circle cx="196" cy="178" r="8" fill="#e7d3a1"/>
  `),
  Q: frame(`
    <path d="M70 120h220v70H70z" fill="#b06bbf"/>
    <path d="M70 120h55v70H70z" fill="#e2a322"/>
    <path d="M125 120h55v70h-55z" fill="#2a9d8f"/>
    <path d="M180 120h55v70h-55z" fill="#e25b8c"/>
    <path d="M235 120h55v70h-55z" fill="#3d8fd4"/>
    <path d="M70 150h220" stroke="#f7f1e6" stroke-width="8"/>
    <path d="M150 100h60v24h-60z" fill="#5c2e68"/>
  `),
  R: frame(`
    <path d="M40 48c20 40 10 70-8 100M80 36c16 48 8 80-6 112M130 52c14 36 6 64-4 90" fill="none" stroke="#5b7ec4" stroke-width="4" stroke-linecap="round"/>
    <path d="M200 40c18 46 8 78-8 108M250 60c12 34 4 60-6 84" fill="none" stroke="#5b7ec4" stroke-width="4" stroke-linecap="round"/>
    <circle cx="168" cy="150" r="22" fill="#f3c98a"/>
    <path d="M150 146c8-16 32-16 40 2" fill="#6a4c0e"/>
    <circle cx="160" cy="150" r="2.5" fill="#241c16"/>
    <circle cx="176" cy="150" r="2.5" fill="#241c16"/>
    <path d="M162 160c6 4 12 4 16 0" fill="none" stroke="#241c16" stroke-width="2" stroke-linecap="round"/>
    <path d="M120 186h100" stroke="#24385c" stroke-width="8" stroke-linecap="round"/>
  `),
  S: frame(`
    <rect width="360" height="240" fill="#1d2440"/>
    <circle cx="70" cy="48" r="1.5" fill="#fff"/>
    <circle cx="120" cy="36" r="1.2" fill="#fff"/>
    <circle cx="260" cy="52" r="1.4" fill="#fff"/>
    <circle cx="300" cy="30" r="1" fill="#fff"/>
    <circle cx="40" cy="90" r="1" fill="#fff"/>
    <path d="M180 118l8 18 20 2-15 13 5 20-18-11-18 11 5-20-15-13 20-2z" fill="#f0c14a"/>
  `, false),
  T: frame(`
    <rect x="48" y="118" width="250" height="58" rx="12" fill="#d4533c"/>
    <rect x="70" y="132" width="28" height="22" rx="3" fill="#f7f1e6"/>
    <rect x="112" y="132" width="28" height="22" rx="3" fill="#f7f1e6"/>
    <rect x="154" y="132" width="28" height="22" rx="3" fill="#f7f1e6"/>
    <rect x="196" y="132" width="28" height="22" rx="3" fill="#f7f1e6"/>
    <rect x="250" y="100" width="46" height="76" rx="10" fill="#6e2418"/>
    <circle cx="286" cy="128" r="6" fill="#f0c14a"/>
    <rect x="40" y="136" width="22" height="16" rx="4" fill="#241c16"/>
    <circle cx="78" cy="184" r="12" fill="#241c16"/>
    <circle cx="150" cy="184" r="12" fill="#241c16"/>
    <circle cx="230" cy="184" r="12" fill="#241c16"/>
  `),
  U: frame(`
    <path d="M100 150c0-52 160-52 160 0" fill="#e2b400"/>
    <path d="M118 150c0-36 124-36 124 0" fill="#fff4cc"/>
    <path d="M108 78v74M252 78v74" stroke="#6a5608" stroke-width="8" stroke-linecap="round"/>
    <path d="M108 150c8 28 136 28 144 0" fill="none" stroke="#6a5608" stroke-width="8"/>
    <circle cx="180" cy="168" r="16" fill="#f3c98a"/>
    <circle cx="174" cy="166" r="2" fill="#241c16"/>
    <circle cx="186" cy="166" r="2" fill="#241c16"/>
  `),
  V: frame(`
    <path d="M168 48c-8 70-20 110-36 132 28 8 48 0 62-22 6 20 24 30 48 26-20-28-28-70-22-136z" fill="#8a4a2a"/>
    <path d="M176 70c-4 48-10 78-18 96 16 4 28 0 36-14-2-28 0-58 4-82z" fill="#f3d7a4"/>
    <path d="M120 150h150" stroke="#6a2848" stroke-width="6" stroke-linecap="round"/>
    <circle cx="118" cy="150" r="7" fill="#241c16"/>
  `),
  W: frame(`
    <path d="M70 150h200l-16 36H96z" fill="#6a9a4a"/>
    <path d="M86 150h36l-8 28h-24z" fill="#c45b8a"/>
    <circle cx="210" cy="132" r="16" fill="#d4533c"/>
    <ellipse cx="250" cy="128" rx="28" ry="16" fill="#e7d3a1"/>
    <circle cx="272" cy="120" r="10" fill="#e7d3a1"/>
    <circle cx="276" cy="118" r="2" fill="#241c16"/>
    <circle cx="92" cy="190" r="12" fill="#241c16"/>
    <circle cx="230" cy="190" r="12" fill="#241c16"/>
    <path d="M70 168h18" stroke="#2c4a18" stroke-width="6" stroke-linecap="round"/>
  `),
  X: frame(`
    <path d="M214 150c28 6 40 20 36 32-18 2-40-12-52-26z" fill="#d4763a"/>
    <ellipse cx="176" cy="146" rx="62" ry="32" fill="#e07028"/>
    <circle cx="112" cy="124" r="26" fill="#e07028"/>
    <path d="M96 108l-8-16 16 6 8-14 6 16 16-2-12 12 6 14z" fill="#d4763a"/>
    <path d="M118 110l-6-14 12 8z" fill="#d4763a"/>
    <circle cx="104" cy="122" r="3" fill="#241c16"/>
    <path d="M90 132l18 4" stroke="#241c16" stroke-width="3" stroke-linecap="round"/>
    <path d="M150 156c10 8 20 8 28 0" fill="#fff"/>
    <circle cx="150" cy="176" r="7" fill="#e08a48"/>
    <circle cx="196" cy="176" r="7" fill="#e08a48"/>
  `),
  Y: frame(`
    <path d="M180 36v70" stroke="#7a243c" stroke-width="4"/>
    <circle cx="180" cy="118" r="28" fill="#e25d7a"/>
    <circle cx="180" cy="118" r="16" fill="#f7f1e6"/>
    <path d="M180 146c18 20 18 36 0 48" fill="none" stroke="#7a243c" stroke-width="4"/>
    <circle cx="180" cy="200" r="10" fill="#e25d7a"/>
  `),
  Z: frame(`
    <ellipse cx="196" cy="142" rx="84" ry="42" fill="#f7f4ee"/>
    <path d="M130 126c20 8 30 8 40 0M150 142c24 8 36 8 48 0M160 158c22 8 34 8 44 0M210 124c16 6 24 6 34 0M214 140c18 6 26 6 36 0M206 156c16 6 28 6 36 0" stroke="#241c16" stroke-width="7" stroke-linecap="round"/>
    <circle cx="108" cy="124" r="26" fill="#f7f4ee"/>
    <path d="M96 112c6 8 8 8 16 0M112 108c6 8 8 8 14 0" stroke="#241c16" stroke-width="5" stroke-linecap="round"/>
    <circle cx="100" cy="124" r="3" fill="#241c16"/>
    <path d="M90 132h16" stroke="#241c16" stroke-width="3" stroke-linecap="round"/>
    <path d="M86 100c6-16 20-18 28-6" stroke="#241c16" stroke-width="6" fill="none"/>
    <circle cx="168" cy="178" r="8" fill="#241c16"/>
    <circle cx="230" cy="178" r="8" fill="#241c16"/>
  `),
};

export function sceneFor(letter) {
  return SCENES[letter] || frame(`<text x="180" y="140" text-anchor="middle" font-size="96" font-family="Georgia, serif" fill="#241c16">${letter}</text>`);
}

export const sceneLetters = Object.keys(SCENES);
