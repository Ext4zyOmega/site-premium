const path = window.location.pathname.substring(1); // enlever le "/"

if (path && path.startsWith("http")) {
  try {
    const streamUrl = decodeURIComponent(path);
    if (streamUrl.includes(".m3u8")) {
      document.body.innerHTML = `
        <div class="video-container">
          <video id="video" controls autoplay></video>
          <button class="fullscreen-btn" onclick="toggleFull()">⛶ Plein écran</button>
        </div>
      `;
      const video = document.getElementById('video');
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(streamUrl);
        hls.attachMedia(video);
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = streamUrl;
      }
    }
  } catch (e) {
    console.error("Erreur:", e);
  }
}

function toggleFull() {
  const video = document.getElementById("video");
  if (!document.fullscreenElement) {
    video.requestFullscreen().catch(err => console.error(err));
  } else {
    document.exitFullscreen();
  }
}
