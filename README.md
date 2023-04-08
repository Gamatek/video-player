# 🎥 Video Player
This project was inspired by the default video player (Pictures) in Windows 11.

## Preview
<img src="preview.png">

## Setup
#### HTML
```html
<div class="video-player" id="video-player"></div>
```

#### CSS
```css
.video-player {
    --videoPlayerColor: #1e90ff; /* dodgerblue */
    width: 900px;
    border-radius: 8px;
}
```

#### JS
```js
const player = new VideoPlayer(document.getElementById("video-player"), {
    src: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4",
    name: "View_From_A_Blue_Moon_Trailer-1080p",
    currentTime: window.localStorage.getItem("VideoPlayerCurrentTime")
});

player.video.addEventListener("timeupdate", () => {
    window.localStorage.setItem("VideoPlayerCurrentTime", player.video.currentTime);
});
```
