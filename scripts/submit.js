//https://open.spotify.com/track/0ttyQPhxTXajLR9vNCBvV9
//https://open.spotify.com/embed/track/0ttyQPhxTXajLR9vNCBvV9?utm_source=generator
//https://music.apple.com/in/album/cant-hold-us-feat-ray-dalton/1065728572?i=1065728690
//https://embed.music.apple.com/in/album/cant-hold-us-feat-ray-dalton/1065728572?i=1065728690
//https://www.youtube.com/watch?v=Ue6VQTcKPQo
//https://www.youtube.com/embed/Ue6VQTcKPQo

window.addEventListener("DOMContentLoaded", (event) => {
    let submitBtn = document.getElementById("submit");
    let success = document.getElementById("success");
    let error = document.getElementById("error");

    // input fields
    let name = document.getElementById("name");
    let artist = document.getElementById("artist");
    let ytLink = document.getElementById("yt-link");
    let appleLink = document.getElementById("apple-link");
    let spotifyLink = document.getElementById("spotify-link");

    function returnHandle(ret) {
        success.style.display = error.style.display = "";
        if (ret[0] == "err") {
            error.style.display = "block";
            error.innerText = ret[1];
        } else {
            success.style.display = "block";
            success.innerText = ret[1];
        }
    }

    function submitSong() {
        if (!name.value || !artist.value || !ytLink.value)
            returnHandle(["err", "Missing required details."]);

        // build the request body
        // coverting the normal links to embeds
        let appleEm = null;
        if (appleLink.value) {
            appleEm = appleLink.value.replace("music", "embed.music");
        }
        let spotifyEm = null;
        if (spotifyLink.value) {
            spotifyEm =
                spotifyLink.value.replace("track", "embed/track") +
                "?utm_source=generator";
        }
        let temp = {
            name: name.value,
            artist: artist.value,
            yt: ytLink.value.replace("watch?v=", "embed/"),
            apple: appleEm,
            spotify: spotifyEm,
        };

        fetch("http://localhost:3600/song", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(temp),
        }).then((response) =>
            response.json().then((data) => {
                if (response.status == 200) {
                    returnHandle(["success", "Song successfully submitted!"]);
                } else {
                    returnHandle(["err", data]);
                }
            })
        );
    }

    submitBtn.addEventListener("click", submitSong);
});
