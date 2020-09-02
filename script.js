//You can edit ALL of the code here

function setup() {
    const allEpisodes = getAllEpisodes();
    makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
    const rootElem = document.getElementById("root");
    let container = document.createElement("section");
    console.log(episodeList.length);

    episodeList.forEach(function (episode) {
        let episodeDiv = document.createElement("div");
        episodeDiv.classList = "episodeStyle";
        let heading = document.createElement("h3");
        let episodeName = episode.name;
        let seasons = episode.season.toString();
        let episodeNumber = episode.number.toString();
        let seasonsPadded = seasons.padStart(2, "0");
        let episodesPadded = episodeNumber.padStart(2, "0");
        rootElem.appendChild(container);
        container.appendChild(episodeDiv);
        episodeDiv.appendChild(heading);
        heading.textContent = `${episodeName} - S${seasonsPadded}E${episodesPadded}`;
        let newImg = document.createElement("img");
        newImg.src = episode.image["medium"];
        heading.after(newImg);
        episodeDiv.insertAdjacentHTML("beforeend", episode.summary);
    });
}

let input = document.createElement("input");
let header = document.createElement("header");
input.type = "text";
input.id = "userSearch";

let body = document.querySelector("body");
body.prepend(header);
header.appendChild(input);
let searchInput = document.getElementById("userSearch");
const allEpisodes = getAllEpisodes();

function searchEpisodes(searchTerm, allEpisodes) {
    let episodes = [];

    episodes = allEpisodes.filter(
        (episode) =>
            episode.name.toLowerCase().includes(searchTerm) ||
            episode.summary.toLowerCase().includes(searchTerm)
    );

    makePageForEpisodes(episodes);
}

searchInput.addEventListener("keyup", function (e) {
    let searchTerm = e.target.value.toLowerCase();
    searchEpisodes(searchTerm, allEpisodes);
});

window.onload = setup;
