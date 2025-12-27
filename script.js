// ====== CONFIG (edit these) ======
const STRIPE_URL = "https://buy.stripe.com/14A14f9iZ6xzgrP0pn1Jm01";
const AUTHOR_EMAIL = "liudasjan@gmail.com";           
const WHATSAPP_URL = "https://wa.me/37064034810";    
const LINKEDIN_URL = "https://www.linkedin.com/in/liudas-jankauskas/";

const MEDIA_LINKS = [
  { name: "Delfi",  url: "",  note: "Straipsnis / interviu" },
  { name: "Lrytas", url: "", note: "Straipsnis / interviu" },
  { name: "15min",  url: "",  note: "Straipsnis / interviu" },
];
// ================================

const $ = (q, el=document) => el.querySelector(q);
const $$ = (q, el=document) => Array.from(el.querySelectorAll(q));

function toast(msg){
  const t = $("#toast");
  if (!t) return;
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toast._t);
  toast._t = setTimeout(()=>t.classList.remove("show"), 2200);
}

function setHref(id, url){
  const el = document.getElementById(id);
  if (!el) return;
  el.href = url;
}

function fillMedia(){
  const grid = $("#mediaGrid");
  if (!grid) return;

  const valid = (u) => typeof u === "string" && u.startsWith("http");
  const items = MEDIA_LINKS.filter(x => valid(x.url));

  // fallback: show placeholders if not configured
  const list = items.length ? items : MEDIA_LINKS;

  grid.innerHTML = list.map(x => `
    <a class="item" href="${valid(x.url) ? x.url : "#"}" target="${valid(x.url) ? "_blank" : "_self"}" rel="noopener">
      <div class="tag">📰 ${escapeHtml(x.name)}</div>
      <h3>${valid(x.url) ? "Skaityti straipsnį" : "Įdėk nuorodą"}</h3>
      <p>${escapeHtml(x.note || "Publikacija")}</p>
      <div style="height:10px"></div>
      <span class="btn" style="pointer-events:none; opacity:.9;">
        ${valid(x.url) ? "Atidaryti" : "Pakeisk URL script.js"}
      </span>
    </a>
  `).join("");
}

function escapeHtml(str){
  return String(str ?? "")
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

async function copyEmail(){
  try{
    await navigator.clipboard.writeText(AUTHOR_EMAIL);
    toast("El. paštas nukopijuotas.");
  }catch(e){
    const ta = document.createElement("textarea");
    ta.value = AUTHOR_EMAIL;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
    toast("El. paštas nukopijuotas.");
  }
}

function initNavHighlight(){
  const navLinks = $$(".navlink");
  const sections = navLinks
    .map(a => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting) return;
      const id = "#" + entry.target.id;
      navLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === id));
    });
  }, { root: null, threshold: 0.45 });

  sections.forEach(s => observer.observe(s));
}

function initSticky(){
  const sticky = $("#mobileSticky");
  if (!sticky) return;

  const isMobile = () => window.matchMedia("(max-width: 980px)").matches;
  const update = () => {
    sticky.hidden = !isMobile();
  };

  window.addEventListener("resize", update, { passive: true });
  update();
}

function init(){
  // year + email
  $("#year").textContent = new Date().getFullYear();
  $("#emailText").textContent = AUTHOR_EMAIL;

  // buttons
  $("#copyEmailBtn")?.addEventListener("click", copyEmail);
  $("#copyEmailBtn2")?.addEventListener("click", copyEmail);
  $("#scrollTopBtn")?.addEventListener("click", ()=>window.scrollTo({top:0, behavior:"smooth"}));

  // Set all presale buttons to Stripe
  ["presaleTopBtn","presaleHeroBtn","presaleMidBtn","presaleFaqBtn","presaleStickyBtn"].forEach(id => setHref(id, STRIPE_URL));

  // Contact links
  setHref("whatsappBtn", WHATSAPP_URL);
  setHref("linkedinBtn", LINKEDIN_URL);

  // media section
  fillMedia();

  // smooth scroll
  document.documentElement.style.scrollBehavior = "smooth";

  // nav highlight
  initNavHighlight();

  // mobile sticky CTA
  initSticky();

  // config guards
  if (!STRIPE_URL.startsWith("http")) toast("Pakeisk STRIPE_URL į realų Stripe Checkout linką (script.js).");
  if (AUTHOR_EMAIL.includes("example.com")) setTimeout(()=>toast("Pakeisk AUTHOR_EMAIL į realų el. paštą (script.js)."), 1000);
}

document.addEventListener("DOMContentLoaded", init);
