let input = document.createElement("input");
let header = document.createElement("header");
let nav = document.querySelector("nav");
console.log(nav);
input.type = "text";
input.id = "userSearch";
let display = document.createElement("p");
let body = document.querySelector("body");
body.prepend(header);
header.appendChild(input);
header.appendChild(display);
let searchInput = document.getElementById("userSearch");
let allEpisodes = getAllEpisodes();

let root = document.querySelector("#root");

// fetch episodes from API
function fetchEpisodes(showId = 82) {
    let targetUrl = `https://api.tvmaze.com/shows/${showId}/episodes`;
    fetch(targetUrl)
        .then((response) => response.json())
        .then((data) => {
            allEpisodes = data;
            makePageForEpisodes(allEpisodes);
        })
        .catch((error) => {
            console.log(error);
        });
}

// populate page with elements made from the allEpisodes array
function makePageForEpisodes(episodeList) {
    let rootElem = document.getElementById("root");
    let container = document.createElement("section");

    rootElem.innerHTML = "";

    display.textContent = `${episodeList.length} matches`;
    nav.addEventListener("click", () => {
        setup();
        let section = document.querySelector("section");
        section.style.display = "none";
    });
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
    });
}
//Listen to the show dropdown and populate it
let showSearch = document.getElementById("myShowDropdown");
showSearch.addEventListener("click", function () {
    let shows = getAllShows();
    shows.sort();

    shows.forEach(function (show) {
        let dropDownShow = document.createElement("option");
        let selectMe = document.getElementById("selectMe");
        dropDownShow.textContent = `${show.name}`;
        dropDownShow.value = `${show.id}`;

        dropDownShow.addEventListener("click", function () {});

        selectMe.classList.toggle("show");

        selectMe.appendChild(dropDownShow);
    });
});
//Seems to be causing an error, too many requests
document.querySelector("#selectMe").addEventListener("change", selectShow);
function selectShow(event) {
    let showId = event.target.value;
    fetchEpisodes(showId);
}

//fetchEpisodes();

function setup() {
    let doItAgain = getAllShows();
    ///body.textContent = "";
    doItAgain.forEach((show) => {
        let showDiv = document.createElement("div");
        showDiv.className = "showDiv";

        root.appendChild(showDiv);
        let showHeading = document.createElement("h1");
        showHeading.setAttribute("showId", show.id);
        showHeading.textContent = `${show.name}`;
        let image = document.createElement("img");

        if (show.image === null) {
            image.src =
                "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png";
        } else {
            image.src = `${show.image.medium}`;
        }

        let rest = document.createElement("div");

        rest.textContent = `Status: ${show.status}; Genres: ${show.genres}; Rating: ${show.rating.average}; Runtime: ${show.runtime}`;

        body.appendChild(showDiv);
        showDiv.appendChild(showHeading);
        showHeading.insertAdjacentElement("afterend", image);
        image.insertAdjacentElement("afterend", rest);
        rest.insertAdjacentHTML("afterend", show.summary);
        showHeading.addEventListener("click", function (e) {
            //console.log(e.target.textContent);
            let particularShows = getAllShows();
            //let divSiblings = getSiblings(showDiv);
            let divSiblings = document.querySelectorAll(".showDiv");
            console.log("e.target.parentElement: ", e.target.parentElement);
            e.target.parentElement.innerHTML = "";

            divSiblings.forEach((eachDiv) => {
                console.log("divSiblings: ", eachDiv);
                eachDiv.style.display = "none";
            });

            let showId = e.target.getAttribute("showId");
            console.log("target", e.currentTarget);
            console.log("Show ID", showId);
            fetchEpisodes(showId);
        });
        //heading.addEventListener(onclick, fetchEpisodes)
    });
}
window.onload = setup;

let getSiblings = function (elem) {
    // Setup siblings array and get the first sibling
    let siblings = [];
    let sibling = elem.parentNode.firstChild;

    // Loop through each sibling and push to the array
    while (sibling) {
        if (sibling.nodeType === 1 && sibling !== elem) {
            siblings.push(sibling);
        }
        sibling = sibling.nextSibling;
    }

    return siblings;
};
