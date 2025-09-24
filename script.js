// Récupérer le path
let path = window.location.pathname;

// Cas où URL commence par /index.html/https://...
if (path.includes("index.html/")) {
    path = path.split("index.html/")[1];
} else {
    path = path.substring(1); // retirer le premier "/"
}

// Vérifier que c'est un lien http(s)
if (path && path.startsWith("http")) {
    const streamUrl = decodeURIComponent(path);
    
    if (streamUrl.includes(".m3u8")) {
        // Remplacer le body par le lecteur
        document.body.innerHTML = `
            <div class="video-container">
                <video id="video" controls autoplay></video>
                <button class="fullscreen-btn" onclick="toggleFull()">⛶ Plein écran</button>
            </div>
        `;
        
        const video = document.getElementById("video");
        
        // HLS.js
        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(streamUrl);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, function() {
                video.play().catch(e => console.error(e));
            });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = streamUrl;
        }
    }
}

// Fonction fullscreen
function toggleFull() {
    const video = document.getElementById("video");
    if (!document.fullscreenElement) {
        video.requestFullscreen().catch(err => console.error(err));
    } else {
        document.exitFullscreen();
    }
}
