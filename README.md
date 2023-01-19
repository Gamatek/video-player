# 🎥 Video Player
This project was inspired by the default video player (Pictures) in Windows 11.

## Preview
<img src="preview.png">

## Setup
```html
<!-- Head -->
<link rel="stylesheet" href="./css/video-player.css">
<script src="./js/video-player.js"></script>

<!-- Body -->
<div class="video-player" id="video-player"></div>
<script>
    new VideoPlayer(document.getElementById("video-player"), {
        videoId: Number,
        videoSrc: String,
        videoPoster: String
    });
</script>
```