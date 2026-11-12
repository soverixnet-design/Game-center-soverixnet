const GAME_SERVER = "https://soverix-games-provider-staging.soverixnet.workers.dev";
const grid = document.getElementById("game-grid");
const message = document.getElementById("catalog-message");
const filters = [...document.querySelectorAll("[data-filter]")];
const originalLink = GAME_SERVER + "/demo";
function makeElement(tag, text, className = "") {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
}
function card(game) {
  const article = makeElement("article", "", "game-card");
  const visual = makeElement("div", "", "game-visual");
  visual.setAttribute("aria-hidden", "true");
  visual.append(makeElement("span", game.symbol));
  const details = makeElement("div", "", "game-details");
  details.append(
    makeElement("div", game.category, "category"),
    makeElement("h3", game.name),
    makeElement("p", game.description),
    makeElement("div", game.kind === "standalone" ? "Playable standalone · free practice" : "Hosted original preview · select in demo", "tag")
  );
  const isStandalone = game.kind === "standalone";
  const play = makeElement("a", isStandalone ? "▶ Play This Game ↗" : "▶ Open Original Demo ↗", "button button-main");
  play.href = isStandalone && game.play_url ? game.play_url : originalLink;
  play.target = "_blank";
  play.rel = "noopener noreferrer";
  play.setAttribute("aria-label", isStandalone ? "Play " + game.name : "Open original game collection to select " + game.name);
  details.append(play);
  article.append(visual, details);
  return article;
}
async function init() {
  try {
    const response = await fetch("data/games.json", { cache: "no-cache" });
    if (!response.ok) throw new Error("Catalogue could not be loaded.");
    const games = await response.json();
    if (!Array.isArray(games) || !games.length) throw new Error("No games in catalogue.");
    const render = (filter) => {
      grid.replaceChildren(...games.filter(game => filter === "All" || game.category === filter).map(card));
      message.textContent = filter === "All" ? "All 12 games: eight hosted originals plus four standalone previews. The originals open in their separate demo lobby." : "Showing " + grid.childElementCount + " " + filter + " games.";
    };
    for (const filter of filters) {
      filter.addEventListener("click", () => {
        for (const f of filters) f.classList.toggle("active", f === filter);
        render(filter.dataset.filter);
      });
    }
    render("All");
  } catch (error) {
    grid.replaceChildren(makeElement("p", "Could not load the game catalogue. You can still open the live SOVERIX demo.", "muted"));
    message.textContent = error.message;
  }
}
init();