const LT_STORES = [
  { name: "Knygos.lt", url: "https://www.knygos.lt/lt/knygos/lengvas-budas-tapti-it-specialistu/" },
  { name: "Boku.style", url: "https://boku.style/en/products/lengvas-budas-tapti-it-specialistu" },
  { name: "Pigu.lt", url: "https://pigu.lt/lt/knygos/dalykine-moksline-literatura/enciklopedijos-ir-zinynai/lengvas-budas-tapti-it-specialistu?id=261701797" },
  { name: "Mano akcija", url: "https://www.manoakcija.lt/akcijos/lengvas-b%C5%ABdas-tapti-it-specialistu" },
  { name: "Patogu pirkti", url: "https://www.patogupirkti.lt/knyga/lengvas-budas-tapti-it-specialistu.html" },
  { name: "Pegasas", url: "https://www.pegasas.lt/lengvas-budas-tapti-it-specialistu-22750762/" },
  { name: "Vaga", url: "https://vaga.lt/lengvas-budas-tapti-it-specialistu" },
  { name: "Varle.lt", url: "https://www.varle.lt/knygos/knyga-lengvas-budas-tapti-it-specialistu--53900885.html" }
];

const STORY_IMAGES = [
   "stories/story-01.jpg",
   "stories/story-02.jpg",
   "stories/story-03.jpg",
   "stories/story-04.jpg",
   "stories/story-05.jpg",
   "stories/story-06.jpg"
];

const $ = (selector, root = document) => root.querySelector(selector);

function renderStores() {
  const container = $("#ltStores");
  if (!container) return;

  container.innerHTML = LT_STORES.map(store => `
    <a class="store-card" href="${store.url}" target="_blank" rel="noopener">
      <span>
        <strong>${store.name}</strong>
        <small>Pirkti Lietuvoje</small>
      </span>
      <em>Atidaryti</em>
    </a>
  `).join("");
}

function renderStories() {
  const grid = $("#storiesGrid");
  if (!grid || !STORY_IMAGES.length) return;

    grid.innerHTML = STORY_IMAGES.map((src, index) => `
        <a class="story-card"
          href="https://www.instagram.com/stories/highlights/18075757547528865/"
          target="_blank">

          <img src="${src}" alt="Skaitytojo pasidalinimas apie knygą ${index + 1}" loading="lazy" />
        </a>
    `).join("");
}

function initMenu() {
  const button = $("#menuToggle");
  const nav = $("#navLinks");
  if (!button || !nav) return;

  button.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    button.setAttribute("aria-expanded", String(open));
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      button.setAttribute("aria-expanded", "false");
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();

  renderStores();
  renderStories();
  initMenu();
});
