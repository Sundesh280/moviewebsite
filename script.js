let APIKey = "1ba87d3f";
let searchInput = document.getElementById("SearchInput");
let Search_button = document.getElementById("Search_button");

function getMovie(movie) {
    fetch(`http://www.omdbapi.com/?apikey=${APIKey}&t=${movie}`)
        .then(function (res) {
            return res.json();
        })
        .then(function (jsonData) {

            document.querySelector(".moviecard").innerHTML = "";
            searchInput.value = "";

            if (jsonData.Response === "False") {
                document.querySelector(".moviecard").innerHTML = "<h1>Movie Not Found</h1>";
                return;
            }

            // Create desicinemas link
            let movieLink = "https://desicinemas.to/?s=" + encodeURIComponent(jsonData.Title);

            let card = `
                <div class="card">
                    <img src="${jsonData.Poster}" alt="">
                    <div class="cardtext">
                        <h1>${jsonData.Title}</h1>
                        <p class="Rating">Rating: <span>${jsonData.Ratings?.[0]?.Value || "N/A"}</span></p>
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
                </div>
            `;

            document.querySelector(".moviecard").innerHTML = card;
        })
        .catch(function () {
            document.querySelector(".moviecard").innerHTML = "<h1>Error Fetching Movie</h1>";
        });
}

Search_button.addEventListener("click", function () {
    let movieName = searchInput.value.trim();

    if (movieName === "") {
        document.querySelector(".moviecard").innerHTML = "<h1>First Search Movie</h1>";
    } else {
        getMovie(movieName);
    }

    
});
