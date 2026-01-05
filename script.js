// ====== CONFIG ======
const STRIPE_URL = "https://buy.stripe.com/14A14f9iZ6xzgrP0pn1Jm01";
const WHATSAPP_URL = "https://wa.me/37064034810";
const LINKEDIN_URL = "https://www.linkedin.com/in/liudas-jankauskas/";
// ====================

const $ = (q, el=document) => el.querySelector(q);
const $$ = (q, el=document) => Array.from(el.querySelectorAll(q));

function setHref(id, url){
  const el = document.getElementById(id);
  if (!el) return;
  el.href = url;
}

function initNavHighlight(){
  const navLinks = $$(".navlink");
  if (!navLinks.length) return;

  const sections = navLinks
    .map(a => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting) return;
      const id = "#" + entry.target.id;
      navLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === id));
    });
  }, { threshold: 0.45 });

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
  // year
  const y = $("#year");
  if (y) y.textContent = new Date().getFullYear();

  // scroll to top
  $("#scrollTopBtn")?.addEventListener("click", ()=>window.scrollTo({top:0, behavior:"smooth"}));

  // Set all presale buttons to Stripe
  ["presaleTopBtn","presaleHeroBtn","presaleMidBtn","presaleFaqBtn","presaleStickyBtn"]
    .forEach(id => setHref(id, STRIPE_URL));

  // Contact links
  setHref("whatsappBtn", WHATSAPP_URL);
  setHref("linkedinBtn", LINKEDIN_URL);

  // smooth scroll
  document.documentElement.style.scrollBehavior = "smooth";

  initNavHighlight();
  initSticky();
}

document.addEventListener("DOMContentLoaded", init);
