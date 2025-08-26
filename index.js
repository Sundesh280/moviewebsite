let APIKey = "1ba87d3f";
let searchInput = document.getElementById("SearchInput");
let Search_button = document.getElementById("Search button");

const getid = async (movie) => {
    try {
        let fetchdata = await fetch(`http://www.omdbapi.com/?apikey=${APIKey}&t=${movie}`);
        let jsonData = await fetchdata.json();
        console.log(jsonData);

        document.querySelector(".moviecard").innerHTML = "";
        searchInput.value = "";

        // Construct search link on desicinemas.to
        let movieLink = "https://desicinemas.to/?s=" + encodeURIComponent(jsonData.Title);

        let div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `
            <img src="${jsonData.Poster}" alt="">
            <div class="cardtext">
                <h1>${jsonData.Title}</h1>   
                <p class="Rating">Rating: <span>${jsonData.Ratings ? jsonData.Ratings[0].Value : "N/A"}</span></p>
                <p>Genre: <span>${jsonData.Genre}</span></p>
                <p>Actors: <span>${jsonData.Actors}</span></p>
                <p>Director: <span>${jsonData.Director}</span></p>
                <p>Released Date: <span>${jsonData.Released}</span></p>
                <p>Runtime: <span>${jsonData.Runtime}</span></p>
                <p>Year: <span>${jsonData.Year}</span></p>
                <p>About Movie: <span>${jsonData.Plot}</span></p>
                <p>Writer: <span>${jsonData.Writer}</span></p>
                <p>Collection: <span>${jsonData.BoxOffice}</span></p>
                <a href="${movieLink}" target="_blank" class="movielink">Watch Movie</a>
            </div>
        `;
        document.querySelector(".moviecard").appendChild(div);
    } catch (error) {
        document.querySelector(".moviecard").innerHTML = "<h1>Enter Valid Movie Information</h1>";
    }
}

Search_button.addEventListener("click", function () {
    let movieName = searchInput.value;
    if (movieName != "") {
        getid(movieName);
    } else {
        document.querySelector(".moviecard").innerHTML = "<h1>First Search Movie</h1>";
    }
});
