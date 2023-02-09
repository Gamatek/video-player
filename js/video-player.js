class VideoPlayer {
    constructor(parentElemVideo, options) {
        options = {
            src: options?.src,
            name: options?.name,
            currentTime: options?.currentTime
        };

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
            },
            volume: {
                viewBox: "0 32 544 448",
                path: "M473.1 107c43.2 35.2 70.9 88.9 70.9 149s-27.7 113.8-70.9 149c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C475.3 341.3 496 301.1 496 256s-20.7-85.3-53.2-111.8c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zm-60.5 74.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3z"
            }
        };

        const handlers = {
            upVolume: () => this.video.volume = Math.min(this.video.volume+0.1, 1),
            downVolume: () => this.video.volume = Math.max(this.video.volume-0.1, 0),
            play: () => {
                if(this.video.paused) {
                    this.video.play();
                } else {
                    this.video.pause();
                    clearTimeout(timeoutControls);
                    parentElemVideo.classList.add("show-controls");
                };
            },
            fullscreen: () => {
                clearTimeout(timeoutControls);
                if(document.fullscreenElement) {
                    document.exitFullscreen();
                } else {
                    parentElemVideo.requestFullscreen();
                };
            }
        };

        this.parentElemVideo = parentElemVideo;
        parentElemVideo.classList.add("show-controls");

        let timeoutControls;
        parentElemVideo.onmouseenter = () => {
            parentElemVideo.classList.add("show-controls");
            if(!document.fullscreenElement) return;
            clearTimeout(timeoutControls);
            timeoutControls = setTimeout(() => {
                parentElemVideo.classList.remove("show-controls");
                clearTimeout(timeoutControls);
            }, 3*1000);
        }
        parentElemVideo.onmouseleave = () => {
            if(this.video.paused) return;
            parentElemVideo.classList.remove("show-controls");
            clearTimeout(timeoutControls);
        };
        parentElemVideo.onmousemove = () => {
            if(!document.fullscreenElement) return;
            parentElemVideo.classList.add("show-controls");
            clearTimeout(timeoutControls);
            timeoutControls = setTimeout(() => {
                parentElemVideo.classList.remove("show-controls");
                clearTimeout(timeoutControls);
            }, 3*1000);
        };

        // Name
        if(options.name) {
            let span = document.createElement("span");
            span.classList.add("video-name");
            span.innerHTML = options.name;
            parentElemVideo.appendChild(span);
        };

        // Video
        this.video = document.createElement("video");
        this.video.src = options.src;
        this.video.tabIndex = -1;
        this.video.onplay = () => {
            buttonPlay.title = "Pause";
            buttonPlay.replaceChildren(
                this.createSvg(iconsSvg.pause)
            );
        };
        this.video.onpause = () => {
            buttonPlay.title = "Play";
            buttonPlay.replaceChildren(
                this.createSvg(iconsSvg.play)
            );
        };
        this.video.onloadeddata = () => this.video.currentTime = options.currentTime || 0;
        this.video.onwaiting = () => this.createLoader();
        this.video.oncanplay = () => this?.loader?.remove();
        this.video.onclick = () => { if(document.body.clientWidth > 900) handlers.play(); };
        this.video.ondblclick = () => { if(document.body.clientWidth > 900) handlers.fullscreen(); };
        this.video.onkeydown = (evt) => {
            switch (evt.code) {
                case "Space": handlers.play(); break;
                case "ArrowLeft": this.video.currentTime -= 5; break;
                case "ArrowRight": this.video.currentTime += 5; break;
                case "ArrowUp": handlers.upVolume(); break;
                case "ArrowDown": handlers.downVolume(); break;
                case "KeyF": handlers.fullscreen(); break;
                case "Numpad0": this.video.currentTime = 0; break;
                case "Numpad1": this.video.currentTime = this.video.duration*0.1; break;
                case "Numpad2": this.video.currentTime = this.video.duration*0.2; break;
                case "Numpad3": this.video.currentTime = this.video.duration*0.3; break;
                case "Numpad4": this.video.currentTime = this.video.duration*0.4; break;
                case "Numpad5": this.video.currentTime = this.video.duration*0.5; break;
                case "Numpad6": this.video.currentTime = this.video.duration*0.6; break;
                case "Numpad7": this.video.currentTime = this.video.duration*0.7; break;
                case "Numpad8": this.video.currentTime = this.video.duration*0.8; break;
                case "Numpad9": this.video.currentTime = this.video.duration*0.9; break;
            };
        };
        this.video.onwheel = (evt) => {
            if(evt.deltaY < 0) {
                handlers.upVolume();
            } else if(evt.deltaY > 0) {
                handlers.downVolume();
            };
        };
        parentElemVideo.appendChild(this.video);

        // Controls
        let wrapper = document.createElement("div");
        wrapper.classList.add("wrapper");
            let controls = document.createElement("div");
            controls.classList.add("controls");
                // Play button
                let buttonPlay = document.createElement("button");
                buttonPlay.title = "Play";
                buttonPlay.onclick = handlers.play;
                buttonPlay.appendChild(
                    this.createSvg(iconsSvg.play)
                );
                controls.appendChild(buttonPlay);

                // Volume
                let buttonVolume = document.createElement("button");
                buttonVolume.replaceChildren(
                    this.createSvg(iconsSvg.volume)
                );
                controls.appendChild(buttonVolume);

                // Current time
                let videoCurrentTime = document.createElement("span");
                videoCurrentTime.innerHTML = "00:00";
                controls.appendChild(videoCurrentTime);

                // Progress time
                let progressTime = document.createElement("input");
                progressTime.type = "range";
                progressTime.classList.add("progress");
                progressTime.oninput = () => this.video.currentTime = this.video.duration*(progressTime.value/100);
                progressTime.value = 0;
                controls.appendChild(progressTime);
                
                // Time remaining
                let videoTimeRemaining = document.createElement("span");
                videoTimeRemaining.innerHTML = "00:00";
                controls.appendChild(videoTimeRemaining);

                this.video.addEventListener("timeupdate", () => {
                    const { currentTime, duration } = this.video;
                    videoCurrentTime.innerHTML = this.formatTime(currentTime);
                    videoTimeRemaining.innerHTML = this.formatTime(duration-currentTime);
                    progressTime.value = (currentTime/duration)*100;
                });

                // Full screen
                let buttonFullScreen = document.createElement("button");
                buttonFullScreen.title = "Full screen";
                buttonFullScreen.onclick = () => parentElemVideo.requestFullscreen();
                parentElemVideo.onfullscreenchange = () => {
                    clearTimeout(timeoutControls);
                    if(document.fullscreenElement) {
                        buttonFullScreen.title = "Exit full screen";
                        buttonFullScreen.onclick = () => document.exitFullscreen();
                        buttonFullScreen.replaceChildren(
                            this.createSvg(iconsSvg.compress)
                        );
                    } else {
                        buttonFullScreen.title = "Full screen";
                        buttonFullScreen.onclick = () => parentElemVideo.requestFullscreen();
                        buttonFullScreen.replaceChildren(
                            this.createSvg(iconsSvg.expand)
                        );
                    };
                };
                buttonFullScreen.appendChild(
                    this.createSvg(iconsSvg.expand)
                );
                controls.appendChild(buttonFullScreen);
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

    createLoader = () => {
        if(this.loader) return;
        let loader = document.createElement("div");
        loader.classList.add("loader");
            let spinner = document.createElement("div");
            spinner.classList.add("spinner");
            loader.appendChild(spinner);
        this.parentElemVideo.appendChild(loader);
        this.loader = loader;
    };
};
