//You can edit ALL of the code here

function setup() {
    const allEpisodes = getAllEpisodes();
    makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
    const rootElem = document.getElementById("root");
    let container = document.createElement("section");
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

let rootElem = document.getElementById("root");
let input = document.createElement("input");
let header = document.createElement("header");
input.type = "text";
input.id = "userSearch";
console.log(input);
let body = document.querySelector("body");
body.prepend(header);
header.appendChild(input);
const episodes = getAllEpisodes();
let episodeSquares = document.getElementsByClassName("episodeStyle");

function f() {
    return Array.from(arguments);
}

let episodeArray = f(episodeSquares);



function searchEpisodes(e) {
    let searchTerm = e.target.value.toLowerCase();
    for (let i = 0; i < episodeSquares.length; i++) {
        if (
            episodeSquares[i].children[0].textContent
                .toLowerCase()
                .includes(searchTerm)
        ) {
            episodeSquares[i].classList = "episodeStyle";
        } else {
            episodeSquares[i].classList = "hidden";
        }
    }
}

input.addEventListener("keyup", searchEpisodes);


window.onload = setup;
