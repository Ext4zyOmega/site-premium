document.getElementById("playBtn").addEventListener("click", () => {
    const url = document.getElementById("m3u8Input").value.trim();
    if (!url) return alert("Veuillez coller un lien .m3u8");

    // Créer le lecteur
    document.body.innerHTML = `
        <div class="video-container">
            <video id="video" controls autoplay></video>
            <button class="fullscreen-btn" onclick="toggleFull()">⛶ Plein écran</button>
        </div>
    `;

    const video = document.getElementById("video");

    if (url.includes(".m3u8")) {
        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(url);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, () => video.play().catch(e => console.error(e)));
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = url;
        } else {
            alert("Votre navigateur ne supporte pas ce format de stream");
        }
    } else {
        video.src = url;
    }
});

function toggleFull() {
    const video = document.getElementById("video");
    if (!document.fullscreenElement) {
        video.requestFullscreen().catch(err => console.error(err));
    } else {
        document.exitFullscreen();
    }
}
