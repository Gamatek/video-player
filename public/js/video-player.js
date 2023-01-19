class VideoPlayer {
    constructor(parentElemVideo, { videoId, videoSrc, videoPoster }) {
        //! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc.
        const iconsSvg = {
            play: {
                viewBox: "0 0 384 512",
                path: "M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"
            },
            pause: {
                viewBox: "0 0 320 512",
                path: "M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"
            },
            expand: {
                viewBox: "0 0 448 512",
                path: "M32 32C14.3 32 0 46.3 0 64v96c0 17.7 14.3 32 32 32s32-14.3 32-32V96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H32zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7 14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H64V352zM320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32h64v64c0 17.7 14.3 32 32 32s32-14.3 32-32V64c0-17.7-14.3-32-32-32H320zM448 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64H320c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32V352z"
            },
            compress: {
                viewBox: "0 0 448 512",
                path: "M160 64c0-17.7-14.3-32-32-32s-32 14.3-32 32v64H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32V64zM32 320c-17.7 0-32 14.3-32 32s14.3 32 32 32H96v64c0 17.7 14.3 32 32 32s32-14.3 32-32V352c0-17.7-14.3-32-32-32H32zM352 64c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7 14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H352V64zM320 320c-17.7 0-32 14.3-32 32v96c0 17.7 14.3 32 32 32s32-14.3 32-32V384h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H320z"
            }
        };

        // Video
        let video = document.createElement("video");
        video.src = videoSrc;
        if(videoPoster) video.poster = videoPoster;
        video.onplay = () => {
            videoControlPlay.title = "Pause";
            videoControlPlay.replaceChildren(
                this.createSvg(iconsSvg.pause)
            );
        };
        video.onpause = () => {
            videoControlPlay.title = "Play";
            videoControlPlay.replaceChildren(
                this.createSvg(iconsSvg.play)
            );
        };
        if(String(videoId)) video.addEventListener("timeupdate", () => window.localStorage.setItem(`VideoPlayer_${videoId}`, video.currentTime));
        if(window.localStorage.getItem(`VideoPlayer_${videoId}`)) video.currentTime = window.localStorage.getItem(`VideoPlayer_${videoId}`);
        parentElemVideo.appendChild(video);

        // Video Src
        let xhr = new XMLHttpRequest();
        xhr.open("GET", videoSrc);
        xhr.responseType = "arraybuffer";
        xhr.onload = () => {
            const blob = new Blob([ xhr.response ]);
            const url = URL.createObjectURL(blob);
            video.src = url;
        };
        xhr.send();

        // Controls
        let wrapper = document.createElement("div");
        wrapper.classList.add("wrapper");
            let controls = document.createElement("div");
            controls.classList.add("controls");
                // Play button
                let videoControlPlay = document.createElement("button");
                videoControlPlay.title = "Play";
                videoControlPlay.onclick = () => {
                    if(video.paused) {
                        video.play();
                    } else {
                        video.pause();
                    };
                };
                videoControlPlay.appendChild(
                    this.createSvg(iconsSvg.play)
                );
                controls.appendChild(videoControlPlay);

                // Current time
                let videoTimeCurrent = document.createElement("span");
                videoTimeCurrent.innerHTML = "00:00";
                controls.appendChild(videoTimeCurrent);

                // Progress time
                let videoControlTime = document.createElement("input");
                videoControlTime.type = "range";
                videoControlTime.classList.add("slider");
                videoControlTime.oninput = () => video.currentTime = video.duration*(videoControlTime.value/100);
                videoControlTime.value = 0;
                controls.appendChild(videoControlTime);

                // Time remaining
                let videoTimeRemaining = document.createElement("span");
                videoTimeRemaining.innerHTML = "00:00";
                controls.appendChild(videoTimeRemaining);

                video.addEventListener("timeupdate", () => {
                    videoTimeCurrent.innerHTML = this.formatTime(video.currentTime);
                    videoTimeRemaining.innerHTML = this.formatTime(video.duration-video.currentTime);
                    videoControlTime.value = (video.currentTime/video.duration)*100;
                });

                // Full screen
                let videoControlsFullScreen = document.createElement("button");
                videoControlsFullScreen.onclick = () => parentElemVideo.requestFullscreen();
                parentElemVideo.onfullscreenchange = () => {
                    if(document.fullscreenElement) {
                        videoControlsFullScreen.onclick = () => document.exitFullscreen();
                        videoControlsFullScreen.replaceChildren(
                            this.createSvg(iconsSvg.compress)
                        );
                    } else {
                        videoControlsFullScreen.onclick = () => parentElemVideo.requestFullscreen();
                        videoControlsFullScreen.replaceChildren(
                            this.createSvg(iconsSvg.expand)
                        );
                    };
                };
                videoControlsFullScreen.appendChild(
                    this.createSvg(iconsSvg.expand)
                );
                controls.appendChild(videoControlsFullScreen);
            wrapper.appendChild(controls);
        parentElemVideo.appendChild(wrapper);
    };

    formatTime = (time) => {
        const seconds = String(Math.floor(time%60)).padStart(2, "0");
        const minutes = String(Math.floor(time/60)%60).padStart(2, "0");
        const hours = String(Math.floor(time/3600)).padStart(2, "0");
        if(hours > 0) {
            return `${hours}:${minutes}:${seconds}`;
        } else {
            return `${minutes}:${seconds}`;
        };
    };

    createSvg = ({ viewBox, path }) => {
        let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        svg.setAttribute("viewBox", viewBox);
        svg.setAttribute("fill", "currentColor");
        let pathElem = document.createElementNS("http://www.w3.org/2000/svg", "path");
        pathElem.setAttribute("d", path);
        svg.appendChild(pathElem);
        return svg;
    };
};