class VideoPlayer {
    constructor(parentElemVideo, options) {
        this.options = {
            src: options?.src,
            name: options?.name,
            currentTime: options?.currentTime
        };

        // https://fonts.google.com/icons (Material Symbols)
        const iconsSvg = {
            play_arrow: "M366 824q-15 10-30.5 1T320 798V348q0-18 15.5-27t30.5 1l354 226q14 9 14 25t-14 25L366 824Z",
            pause: "M583 796V356q0-24.75 17.677-42.375t42.5-17.625Q668 296 685.5 313.625T703 356v440q0 24.75-17.677 42.375T642.823 856Q618 856 600.5 838.375T583 796Zm-325 0V356q0-24.75 17.677-42.375t42.5-17.625Q343 296 360.5 313.625T378 356v440q0 24.75-17.677 42.375T317.823 856Q293 856 275.5 838.375T258 796Z",
            volume_up: "M602 913q-16 5-29-5t-13-27q0-8 4.5-14.5T577 858q91-32 147-109t56-174q0-97-56-174.5T577 292q-8-2-12.5-9t-4.5-15q0-17 13.5-26.5T602 237q107 38 172.5 130.5T840 575q0 115-65.5 207.5T602 913ZM150 696q-13 0-21.5-8.5T120 666V486q0-13 8.5-21.5T150 456h130l149-149q14-14 32.5-6.5T480 328v496q0 20-18.5 27.5T429 845L280 696H150Zm390 48V407q54 17 87 64t33 105q0 59-33 105t-87 63Z",
            fullscreen: "M230 856q-12.75 0-21.375-8.625T200 826V693q0-12.75 8.675-21.375 8.676-8.625 21.5-8.625 12.825 0 21.325 8.625T260 693v103h103q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T363 856H230Zm-.175-367Q217 489 208.5 480.375T200 459V326q0-12.75 8.625-21.375T230 296h133q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T363 356H260v103q0 12.75-8.675 21.375-8.676 8.625-21.5 8.625ZM597 856q-12.75 0-21.375-8.675-8.625-8.676-8.625-21.5 0-12.825 8.625-21.325T597 796h103V693q0-12.75 8.675-21.375 8.676-8.625 21.5-8.625 12.825 0 21.325 8.625T760 693v133q0 12.75-8.625 21.375T730 856H597Zm132.825-367Q717 489 708.5 480.375T700 459V356H597q-12.75 0-21.375-8.675-8.625-8.676-8.625-21.5 0-12.825 8.625-21.325T597 296h133q12.75 0 21.375 8.625T760 326v133q0 12.75-8.675 21.375-8.676 8.625-21.5 8.625Z",
            fullscreen_exit: "M362.825 856Q350 856 341.5 847.375T333 826V723H230q-12.75 0-21.375-8.675-8.625-8.676-8.625-21.5 0-12.825 8.625-21.325T230 663h133q12.75 0 21.375 8.625T393 693v133q0 12.75-8.675 21.375-8.676 8.625-21.5 8.625ZM230 489q-12.75 0-21.375-8.675-8.625-8.676-8.625-21.5 0-12.825 8.625-21.325T230 429h103V326q0-12.75 8.675-21.375 8.676-8.625 21.5-8.625 12.825 0 21.325 8.625T393 326v133q0 12.75-8.625 21.375T363 489H230Zm366.825 367Q584 856 575.5 847.375T567 826V693q0-12.75 8.625-21.375T597 663h133q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T730 723H627v103q0 12.75-8.675 21.375-8.676 8.625-21.5 8.625ZM597 489q-12.75 0-21.375-8.625T567 459V326q0-12.75 8.675-21.375 8.676-8.625 21.5-8.625 12.825 0 21.325 8.625T627 326v103h103q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T730 489H597Z"
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
                controlVolume.classList.remove("show");
                clearTimeout(timeoutControls);
            }, 3*1000);
        }
        parentElemVideo.onmouseleave = () => {
            if(this.video.paused) return;
            parentElemVideo.classList.remove("show-controls");
            controlVolume.classList.remove("show");
            clearTimeout(timeoutControls);
        };
        parentElemVideo.onmousemove = () => {
            if(!document.fullscreenElement) return;
            parentElemVideo.classList.add("show-controls");
            clearTimeout(timeoutControls);
            timeoutControls = setTimeout(() => {
                parentElemVideo.classList.remove("show-controls");
                controlVolume.classList.remove("show");
                clearTimeout(timeoutControls);
            }, 3*1000);
        };

        // Name
        if(this.options.name) {
            let span = document.createElement("span");
            span.classList.add("video-name");
            span.innerHTML = this.options.name;
            parentElemVideo.appendChild(span);
        };

        // Video
        this.video = document.createElement("video");
        this.video.src = this.options.src;
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
                this.createSvg(iconsSvg.play_arrow)
            );
        };
        this.video.onloadeddata = () => this.video.currentTime = this.options.currentTime || 0;
        this.video.onwaiting = () => this.createLoader();
        this.video.oncanplay = () => this?.loader?.remove();
        this.video.onclick = () => { if(document.body.clientWidth > 900) handlers.play(); };
        this.video.ondblclick = () => { if(document.body.clientWidth > 900) handlers.fullscreen(); };
        this.video.onvolumechange = () => textVolume.innerHTML = Math.floor(this.video.volume*100)+"%";
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
                    this.createSvg(iconsSvg.play_arrow)
                );
                controls.appendChild(buttonPlay);

                // Volume
                let buttonVolume = document.createElement("button");
                buttonVolume.title = "Volume";
                buttonVolume.onclick = () => {
                    controlVolume.classList.toggle("show");
                    inputVolume.value = this.video.volume*100;
                };
                buttonVolume.replaceChildren(
                    this.createSvg(iconsSvg.volume_up)
                );
                controls.appendChild(buttonVolume);

                let controlVolume = document.createElement("div");
                controlVolume.classList.add("volume-control");
                    let inputVolume = document.createElement("input");
                    inputVolume.type = "range";
                    inputVolume.classList.add("volume-progress", "progress");
                    inputVolume.value = 100;
                    inputVolume.oninput = () => this.video.volume = inputVolume.value/100;
                    controlVolume.appendChild(inputVolume);

                    let textVolume = document.createElement("span");
                    textVolume.innerHTML = "100%";
                    controlVolume.appendChild(textVolume);
                controls.appendChild(controlVolume);

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
                            this.createSvg(iconsSvg.fullscreen_exit)
                        );
                    } else {
                        buttonFullScreen.title = "Full screen";
                        buttonFullScreen.onclick = () => parentElemVideo.requestFullscreen();
                        buttonFullScreen.replaceChildren(
                            this.createSvg(iconsSvg.fullscreen)
                        );
                    };
                };
                buttonFullScreen.appendChild(
                    this.createSvg(iconsSvg.fullscreen)
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

    createSvg = (path) => {
        let svgElem = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svgElem.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        svgElem.setAttribute("viewBox", "0 96 960 960");
        svgElem.setAttribute("fill", "currentColor");

        let pathElem = document.createElementNS("http://www.w3.org/2000/svg", "path");
        pathElem.setAttribute("stroke-linecap", "round");
        pathElem.setAttribute("stroke-linejoin", "round");
        pathElem.setAttribute("d", path);
        svgElem.appendChild(pathElem);

        return svgElem;
    };

    createLoader = () => {
        if(this.loader) return;
        let loader = document.createElement("div");
        loader.classList.add("video-player-loader");
            let spinner = document.createElement("div");
            spinner.classList.add("video-player-spinner");
            loader.appendChild(spinner);
        this.parentElemVideo.appendChild(loader);
        this.loader = loader;
    };
};
