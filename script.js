//You can edit ALL of the code here
let input = document.createElement("input");
let header = document.createElement("header");
input.type = "text";
input.id = "userSearch";

let body = document.querySelector("body");
body.prepend(header);
header.appendChild(input);
let searchInput = document.getElementById("userSearch");
const allEpisodes = getAllEpisodes();

function setup() {
    const allEpisodes = getAllEpisodes();
    makePageForEpisodes(allEpisodes);
}
// populate page with elements made from the allEpisodes array
function makePageForEpisodes(episodeList) {
    const rootElem = document.getElementById("root");
    let container = document.createElement("section");
    rootElem.innerHTML = "";

    console.log(episodeList.length);

    episodeList.forEach(function (episode) {
        let episodeDiv = document.createElement("div");
        episodeDiv.classList = "episodeStyle";
        episodeDiv.id = episode.id;
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
//Filter the episode array and pass the filtered episodes back into populate elements
function searchEpisodes(searchTerm, allEpisodes) {
    let episodes = [];

    episodes = allEpisodes.filter(
        (episode) =>
            episode.name.toLowerCase().includes(searchTerm) ||
            episode.summary.toLowerCase().includes(searchTerm)
    );

    makePageForEpisodes(episodes);
}
//listen to search and call the search function
searchInput.addEventListener("keyup", function (e) {
    let searchTerm = e.target.value.toLowerCase();
    searchEpisodes(searchTerm, allEpisodes);
});
// Listen to the select button and call the function to select the episode

let dropButton = document.getElementById("myDropdown");
dropButton.addEventListener("click", function () {
    selectEpisode(allEpisodes);
});

//toggle the dropdown, populate it and go to selected episode
function selectEpisode(episodeList) {
    let itsDropdown = document.querySelector(".dropdown-content");

    itsDropdown.classList.toggle("show");

    episodeList.forEach((episode) => {
        let dropBits = document.createElement("option");

        let episodeName = episode.name;
        let seasons = episode.season.toString();
        let episodeNumber = episode.number.toString();
        let seasonsPadded = seasons.padStart(2, "0");
        let episodesPadded = episodeNumber.padStart(2, "0");
        dropBits.textContent = `S${seasonsPadded}E${episodesPadded} - ${episodeName}`;
        dropBits.value = `#${episode.id}`;
        itsDropdown.appendChild(dropBits);

        dropBits.addEventListener("click", function () {
            itsDropdown.innerHTML = ""; //doesn't seem to be doing anything now
        });
    });
}

window.onload = setup;
