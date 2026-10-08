/* ============================================================
   QZF Sport Apparel — site script
   ============================================================ */

const WA_NUMBER = "6281617342015";
const SHOPEE_URL = "https://shopee.co.id/qzf.sport";
const TOKOPEDIA_URL = "https://tokopedia.link/qzfsport";

const waLink = (text) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

const COLORS = [
  { hex: "#0b0d10", name: "Hitam" },
  { hex: "#ffffff", name: "Putih" },
  { hex: "#d4ff2e", name: "Hijau Stabilo" },
  { hex: "#ff4d2e", name: "Oranye Merah" },
  { hex: "#c7202f", name: "Merah" },
  { hex: "#1f4bd8", name: "Biru" },
  { hex: "#00007f", name: "Navy QZF" },
  { hex: "#60a5fa", name: "Biru Muda" },
  { hex: "#03a65a", name: "Hijau" },
  { hex: "#f4c430", name: "Kuning" },
  { hex: "#7b2cbf", name: "Ungu" },
  { hex: "#ff7a00", name: "Oranye" },
  { hex: "#8a8f98", name: "Abu-abu" },
];
const colorName = (hex) => (COLORS.find((c) => c.hex.toLowerCase() === hex.toLowerCase()) || {}).name || hex.toUpperCase();

const PATTERN_NAMES = {
  polos: "Polos", stripes: "Garis vertikal", hoops: "Hoops (garis horizontal)",
  sash: "Selempang", halves: "Belah dua", chevron: "Chevron", gradient: "Gradasi",
};

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* ---------- Jersey SVG generator ---------- */
let uid = 0;
const BODY = "M96 18 L122 8 C134 22 166 22 178 8 L204 18 L282 58 L258 118 L226 104 L226 298 C176 310 124 310 74 298 L74 104 L42 118 L18 58 Z";

function patternMarkup(pattern, c2, gradId) {
  switch (pattern) {
    case "stripes": {
      let s = "";
      for (let x = 82; x < 226; x += 28) s += `<rect x="${x}" y="0" width="14" height="320" fill="${c2}"/>`;
      return s;
    }
    case "hoops": {
      let s = "";
      for (let y = 70; y < 310; y += 44) s += `<rect x="0" y="${y}" width="300" height="20" fill="${c2}"/>`;
      return s;
    }
    case "sash":
      return `<polygon points="70,0 130,0 270,320 210,320" fill="${c2}"/>`;
    case "halves":
      return `<rect x="150" y="0" width="150" height="320" fill="${c2}"/>`;
    case "chevron":
      return `<path d="M40 104 L150 176 L260 104" fill="none" stroke="${c2}" stroke-width="24"/>
              <path d="M40 150 L150 222 L260 150" fill="none" stroke="${c2}" stroke-width="9"/>`;
    case "gradient":
      return `<rect x="0" y="0" width="300" height="320" fill="url(#${gradId})"/>`;
    default:
      return "";
  }
}

function jerseySVG({ primary = "#0b0d10", secondary = "#d4ff2e", text = "#ffffff", pattern = "polos", name = "", number = "", view = "back" } = {}) {
  const id = `j${++uid}`;
  const clip = `${id}c`, grad = `${id}g`, shade = `${id}s`;
  const isBack = view === "back";

  const collar = isBack
    ? `<path d="M122 8 C134 18 166 18 178 8" fill="none" stroke="${secondary}" stroke-width="7" stroke-linecap="round"/>`
    : `<path d="M122 8 L150 44 L178 8 C166 22 134 22 122 8 Z" fill="rgba(0,0,0,.35)"/>
       <path d="M122 8 L150 44 L178 8" fill="none" stroke="${secondary}" stroke-width="7" stroke-linejoin="round"/>`;

  const nameSize = name.length > 8 ? 20 : 26;
  const content = isBack
    ? `<text x="150" y="96" text-anchor="middle" font-family="Anton, Impact, sans-serif" font-size="${nameSize}" letter-spacing="2" fill="${text}">${esc(name.toUpperCase())}</text>
       <text x="150" y="232" text-anchor="middle" font-family="Anton, Impact, sans-serif" font-size="128" fill="${text}" stroke="rgba(0,0,0,.25)" stroke-width="1.5">${esc(number)}</text>`
    : `<g transform="translate(110 82)">
         <path d="M-14 -16 H14 V4 C14 14 0 20 0 20 C0 20 -14 14 -14 4 Z" fill="${text}" opacity=".95"/>
         <text x="0" y="3" text-anchor="middle" font-family="Anton, Impact, sans-serif" font-size="11" fill="${primary}">QZF</text>
       </g>
       <text x="190" y="88" text-anchor="middle" font-family="Anton, Impact, sans-serif" font-size="14" letter-spacing="1" fill="${text}">QZF</text>
       <text x="150" y="168" text-anchor="middle" font-family="Anton, Impact, sans-serif" font-size="58" fill="${text}">${esc(number)}</text>`;

  return `<svg viewBox="0 0 300 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Jersey ${isBack ? "tampak belakang" : "tampak depan"}">
    <defs>
      <clipPath id="${clip}"><path d="${BODY}"/></clipPath>
      <linearGradient id="${grad}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${primary}"/><stop offset="1" stop-color="${secondary}"/>
      </linearGradient>
      <linearGradient id="${shade}" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#000" stop-opacity=".28"/>
        <stop offset=".28" stop-color="#000" stop-opacity="0"/>
        <stop offset=".5" stop-color="#fff" stop-opacity=".07"/>
        <stop offset=".72" stop-color="#000" stop-opacity="0"/>
        <stop offset="1" stop-color="#000" stop-opacity=".28"/>
      </linearGradient>
    </defs>
    <g clip-path="url(#${clip})">
      <rect x="0" y="0" width="300" height="320" fill="${primary}"/>
      ${patternMarkup(pattern, secondary, grad)}
      <polygon points="18,58 32,50 56,112 42,118" fill="${secondary}"/>
      <polygon points="282,58 268,50 244,112 258,118" fill="${secondary}"/>
      <path d="M74 104 L74 300 M226 104 L226 300" stroke="rgba(0,0,0,.18)" stroke-width="2"/>
      <rect x="0" y="0" width="300" height="320" fill="url(#${shade})"/>
    </g>
    ${collar}
    ${content}
    <path d="${BODY}" fill="none" stroke="rgba(0,0,0,.35)" stroke-width="2" stroke-linejoin="round"/>
  </svg>`;
}

/* ---------- Hero ---------- */
document.getElementById("heroBack").innerHTML = jerseySVG({ primary: "#00007f", secondary: "#1d4ed8", text: "#ffffff", pattern: "stripes", name: "QZF", number: "10", view: "back" });
document.getElementById("heroFront").innerHTML = jerseySVG({ primary: "#ffffff", secondary: "#1d4ed8", text: "#00007f", pattern: "chevron", number: "7", view: "front" });

/* ---------- Studio configurator ---------- */
const cfg = { primary: "#00007f", secondary: "#ffffff", text: "#ffffff", pattern: "polos", view: "back" };
const stage = document.getElementById("studioJersey");
const nameInput = document.getElementById("cfgName");
const numInput = document.getElementById("cfgNumber");

function renderStudio() {
  const num = numInput.value === "" ? "" : String(Math.max(0, Math.min(99, parseInt(numInput.value, 10) || 0)));
  stage.innerHTML = jerseySVG({ ...cfg, name: nameInput.value.trim(), number: num });
}

document.querySelectorAll(".swatches").forEach((wrap) => {
  const target = wrap.dataset.target;
  const palette = target === "text" ? COLORS.filter((c) => ["#ffffff", "#00007f", "#1d4ed8", "#0b0d10", "#f4c430", "#c7202f"].includes(c.hex)) : COLORS;

  palette.forEach((c) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "swatch" + (c.hex === cfg[target] ? " is-active" : "");
    b.style.background = c.hex;
    b.title = c.name;
    b.setAttribute("aria-label", c.name);
    b.addEventListener("click", () => {
      cfg[target] = c.hex;
      wrap.querySelectorAll(".swatch").forEach((s) => s.classList.remove("is-active"));
      b.classList.add("is-active");
      renderStudio();
    });
    wrap.appendChild(b);
  });

  const custom = document.createElement("label");
  custom.className = "swatch swatch--custom";
  custom.title = "Warna lain";
  custom.innerHTML = `<input type="color" aria-label="Pilih warna lain" value="${cfg[target]}">`;
  custom.querySelector("input").addEventListener("input", (e) => {
    cfg[target] = e.target.value;
    wrap.querySelectorAll(".swatch").forEach((s) => s.classList.remove("is-active"));
    custom.classList.add("is-active");
    renderStudio();
  });
  wrap.appendChild(custom);
});

document.getElementById("patterns").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-pattern]");
  if (!btn) return;
  cfg.pattern = btn.dataset.pattern;
  document.querySelectorAll("#patterns .chip").forEach((c) => c.classList.toggle("is-active", c === btn));
  renderStudio();
});

document.querySelectorAll("[data-view]").forEach((btn) => {
  btn.addEventListener("click", () => {
    cfg.view = btn.dataset.view;
    document.querySelectorAll("[data-view]").forEach((b) => {
      const on = b === btn;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-selected", on);
    });
    renderStudio();
  });
});

nameInput.addEventListener("input", renderStudio);
numInput.addEventListener("input", renderStudio);

document.getElementById("cfgSend").addEventListener("click", () => {
  const msg = [
    "Halo QZF, saya mau order custom jersey. Ini rancangan dari Studio Desain website:",
    "",
    `• Olahraga: ${document.getElementById("cfgSport").value}`,
    `• Warna utama: ${colorName(cfg.primary)}`,
    `• Warna kedua: ${colorName(cfg.secondary)}`,
    `• Motif: ${PATTERN_NAMES[cfg.pattern]}`,
    `• Nama punggung (contoh): ${nameInput.value.trim() || "-"}`,
    `• Nomor (contoh): ${numInput.value || "-"}`,
    `• Warna teks: ${colorName(cfg.text)}`,
    `• Jumlah: ${document.getElementById("cfgQty").value || "-"} pcs`,
    "",
    "Mohon info harga & estimasi pengerjaannya. Terima kasih!",
  ].join("\n");
  window.open(waLink(msg), "_blank", "noopener");
});

renderStudio();

/* ---------- Portfolio ----------
   Ganti item di bawah dengan foto asli: tambahkan properti `img: "images/nama-file.jpg"`. */
const PORTFOLIO = [
  { title: "Jersey Sepak Bola", tag: "Home Kit", j: { primary: "#00007f", secondary: "#ffffff", text: "#ffffff", pattern: "stripes", number: "9" } },
  { title: "Jersey Futsal", tag: "Tim Putri", j: { primary: "#ffffff", secondary: "#1d4ed8", text: "#00007f", pattern: "sash", number: "11" } },
  { title: "Jersey Akademi", tag: "Usia Muda", j: { primary: "#1d4ed8", secondary: "#ffffff", text: "#00007f", pattern: "hoops", number: "5" } },
  { title: "Jersey Komunitas", tag: "Fun Match", j: { primary: "#00007f", secondary: "#60a5fa", text: "#ffffff", pattern: "chevron", number: "23" } },
  { title: "Jersey Basket", tag: "Kampus", j: { primary: "#c7202f", secondary: "#ffffff", text: "#ffffff", pattern: "polos", number: "3" } },
  { title: "Jersey Voli", tag: "Instansi", j: { primary: "#00007f", secondary: "#60a5fa", text: "#ffffff", pattern: "gradient", number: "8" } },
  { title: "Jersey Running", tag: "Event Fun Run", j: { primary: "#ffffff", secondary: "#00007f", text: "#00007f", pattern: "chevron", number: "42" } },
  { title: "Jersey Kiper", tag: "Goalkeeper", j: { primary: "#f4c430", secondary: "#00007f", text: "#00007f", pattern: "polos", number: "1" } },
];

document.getElementById("gallery").innerHTML = PORTFOLIO.map((p, i) => `
  <figure class="shot reveal" style="background:${p.img ? "#000" : "radial-gradient(circle at 50% 30%, #ffffff, #d6e0fb 85%)"}; margin:0">
    ${p.img
      ? `<img src="${esc(p.img)}" alt="${esc(p.title)}" loading="lazy" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover">`
      : jerseySVG({ ...p.j, view: i % 2 ? "front" : "back", name: "QZF" })}
    <figcaption class="shot__meta"><strong>${esc(p.title)}</strong><span>${esc(p.tag)}</span></figcaption>
  </figure>`).join("");

/* ---------- Retail products ----------
   Ganti dengan produk asli: isi `img`, `shopee`, dan `tokopedia` dengan link produk masing-masing. */
const PRODUCTS = [
  { name: "Jersey Training Pro", cat: "Training", badge: "Ready Stock", j: { primary: "#00007f", secondary: "#60a5fa", text: "#ffffff", pattern: "chevron" } },
  { name: "Jersey Futsal Classic Stripe", cat: "Futsal", badge: "Best Seller", hot: true, j: { primary: "#1d4ed8", secondary: "#ffffff", text: "#ffffff", pattern: "stripes" } },
  { name: "Jersey Running Lite", cat: "Running", badge: "Ready Stock", j: { primary: "#60a5fa", secondary: "#00007f", text: "#ffffff", pattern: "gradient" } },
  { name: "Jersey Retro Hoops", cat: "Lifestyle", badge: "New", j: { primary: "#ffffff", secondary: "#00007f", text: "#00007f", pattern: "hoops" } },
  { name: "Jersey Sash Edition", cat: "Sepak Bola", badge: "Ready Stock", j: { primary: "#ffffff", secondary: "#1d4ed8", text: "#00007f", pattern: "sash" } },
  { name: "Jersey Half & Half", cat: "Futsal", badge: "New", j: { primary: "#00007f", secondary: "#60a5fa", text: "#ffffff", pattern: "halves" } },
  { name: "Jersey Basic Polos", cat: "Basic", badge: "Ready Stock", j: { primary: "#0b0d10", secondary: "#1d4ed8", text: "#ffffff", pattern: "polos" } },
  { name: "Jersey Kiper Pro", cat: "Goalkeeper", badge: "Best Seller", hot: true, j: { primary: "#f4c430", secondary: "#00007f", text: "#00007f", pattern: "chevron" } },
];

document.getElementById("products").innerHTML = PRODUCTS.map((p) => `
  <article class="product reveal">
    <div class="product__img">
      <span class="badge${p.hot ? " badge--hot" : ""}">${esc(p.badge)}</span>
      ${p.img ? `<img src="${esc(p.img)}" alt="${esc(p.name)}" loading="lazy">` : jerseySVG({ ...p.j, view: "front", number: "" })}
    </div>
    <div class="product__body">
      <small>${esc(p.cat)}</small>
      <h3>${esc(p.name)}</h3>
      <div class="product__actions">
        <a href="${esc(p.shopee || SHOPEE_URL)}" target="_blank" rel="noopener">Shopee</a>
        <a href="${esc(p.tokopedia || TOKOPEDIA_URL)}" target="_blank" rel="noopener">Tokopedia</a>
      </div>
    </div>
  </article>`).join("");

/* ---------- WhatsApp links ---------- */
document.querySelectorAll("[data-wa]").forEach((a) => {
  a.href = waLink(a.dataset.wa);
  a.target = "_blank";
  a.rel = "noopener";
});

/* ---------- Order form ---------- */
document.getElementById("orderForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const f = new FormData(e.target);
  const v = (k) => (f.get(k) || "").toString().trim() || "-";
  let deadline = v("deadline");
  if (deadline !== "-") {
    deadline = new Date(deadline + "T00:00:00").toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  }
  const msg = [
    `Halo QZF, saya mau order *${v("type")}*.`,
    "",
    `• Nama: ${v("name")}`,
    `• Tim/Instansi: ${v("team")}`,
    `• Olahraga: ${v("sport")}`,
    `• Jumlah: ${v("qty")} pcs`,
    `• Target selesai: ${deadline}`,
    `• Catatan: ${v("note")}`,
  ].join("\n");
  window.open(waLink(msg), "_blank", "noopener");
});

/* ---------- Mobile nav ---------- */
const nav = document.querySelector(".nav");
const burger = document.getElementById("burger");
burger.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  burger.setAttribute("aria-expanded", open);
});
document.querySelectorAll("#navLinks a").forEach((a) =>
  a.addEventListener("click", () => {
    nav.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
  })
);

/* ---------- Reveal on scroll ---------- */
const io = new IntersectionObserver(
  (entries) => entries.forEach((en) => {
    if (en.isIntersecting) {
      en.target.classList.add("is-in");
      io.unobserve(en.target);
    }
  }),
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

document.getElementById("year").textContent = new Date().getFullYear();
