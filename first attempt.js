/* function setup() {
    const allEpisodes = getAllEpisodes();
    makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
    const rootElem = document.getElementById("root");
    let container = document.createElement("section");

    let i = 0;

    for (const episodeInfo of episodeList) {
        let seasons = episodeList[i].season.toString();
        let seasonsPadded = seasons.padStart(2, "0");
        let episodesNumber = episodeList[i].number.toString();
        let episodesPadded = episodesNumber.padStart(2, "0");
        let listDiv = document.createElement("div");
        let heading = document.createElement("h3");
        let newImg = document.createElement("img");

        heading.textContent =
            episodeList[i].name + ` - S${seasonsPadded}E${episodesPadded}`;

        rootElem.appendChild(container);
        container.appendChild(listDiv);
        listDiv.appendChild(heading);
        listDiv.insertAdjacentHTML("beforeend", episodeList[i].summary);
        newImg.src = episodeList[i].image["medium"];
        heading.insertAdjacentElement("afterend", newImg);
        listDiv.className = "episodeStyle";
        i++;
    }
}

//let listDiv = document.createElement("div");
let divEpisodes = document.getElementsByClassName("episodeStyle");

let input = document.querySelector("input");
let search = input.value;

function getEpisodes(e) {
    let allEpisodes = getAllEpisodes();
    for (let y = 0; y < allEpisodes.length; y++) {
        if (allEpisodes[y].name.includes(e.target.value)) {
            divEpisodes[y].style.backgroundColor = "green";
        } else {
        }
        divEpisodes[y].style.backgroundColor = "red";
        console.log(e.target.value);
        console.log(allEpisodes[y].name);
    }
}

input.addEventListener("keyup", getEpisodes);

window.onload = setup; */
