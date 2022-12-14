let songData = [];
window.addEventListener("DOMContentLoaded", (event) => {
    const main = document.getElementById("main");

    fetch(apiLink + "/songs")
        .then((response) => response.json())
        .then((data) => {
            songData = data;
            //https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
            if (window.location.pathname.includes("new")) {
                songData.reverse();
            } else {
                songData.sort((a, b) => b.votes - a.votes);
            }
            console.log(songData);
            // grab the source
            const source = document.querySelector("#song-template").innerHTML;

            // compile it using Handlebars
            const template = Handlebars.compile(source);

            // get the HTML after passing the template the context
            const html = template(songData);

            // insert the html into the page
            main.insertAdjacentHTML("beforeend", html);
        });
});

// vote function to submit a vote for a specific song to the api
function vote(id, index) {
    fetch(apiLink + "/vote", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
    }).then((response) =>
        response.json().then((data) => {
            alert(data);
            if (response.status == 200) {
                songData[index].votes++;
                document.getElementById(`btn-${id}`).innerText = "ᐱ " + songData[index].votes;
            }
        })
    );
}
