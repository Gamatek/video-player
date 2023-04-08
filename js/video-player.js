class VideoPlayer {
    constructor(parentElemVideoSelector, options) {
        this.options = {
            src: options?.src,
            name: options?.name,
            currentTime: options?.currentTime
        };

        let parentElemVideo = document.querySelector(parentElemVideoSelector);

        // https://fonts.google.com/icons (Material Symbols) (Rounded @600)
        const iconsSvg = {
            play_arrow: "M367.13 840.392q-20.652 12.826-40.957 1.283-20.304-11.544-20.304-35.196V339.521q0-23.652 20.304-35.196 20.305-11.543 40.957 1.283l366.436 234.479q19.087 11.826 19.087 33.196 0 21.369-19.087 32.63L367.13 840.392Z",
            pause: "M576.217 802.218V349.782q0-33.49 23.199-56.637 23.199-23.146 56.762-23.146 32.736 0 55.889 23.146 23.152 23.147 23.152 56.637v452.436q0 33.49-23.329 56.637-23.33 23.146-56.349 23.146t-56.171-23.146q-23.153-23.147-23.153-56.637Zm-350.436 0V349.782q0-33.49 23.199-56.637 23.198-23.146 56.762-23.146 32.736 0 55.888 23.146 23.153 23.147 23.153 56.637v452.436q0 33.49-23.33 56.637-23.329 23.146-56.348 23.146t-56.172-23.146q-23.152-23.147-23.152-56.637Z",
            volume_up: "M617.827 918.652q-17.696 6.131-32.109-5-14.413-11.13-14.413-30.391 0-9.131 4.783-16.196 4.782-7.065 13.913-10.195 89.869-32 145.587-109 55.717-77 55.717-172.87t-55.717-173.087q-55.718-77.217-145.587-109.348-8.566-2.565-13.631-10.413-5.065-7.848-5.065-16.978 0-18.131 14.913-29.044t31.609-4.782q108.13 39.13 173.913 133.043Q857.523 458.304 857.523 575q0 116.696-65.783 210.609-65.783 93.913-173.913 133.043ZM142.652 710.131q-17.522 0-28.848-11.326-11.327-11.326-11.327-28.283V481.478q0-16.957 11.327-28.566 11.326-11.608 28.848-11.608h128.304l152.392-152.392q19.087-18.522 43.522-8.196 24.435 10.327 24.435 35.979V834.74q0 26.217-24.435 36.544-24.435 10.326-43.522-8.761L270.956 710.131H142.652Zm408.653 38.956V401.913q56.261 18.13 91.239 66.543Q677.523 516.87 677.523 576q0 60.13-34.979 107.261-34.978 47.13-91.239 65.826Z",
            volume_off: "m793.261 988.74-108.87-108.87q-17.173 11.739-35.564 21.826-18.392 10.087-38.565 16.956-16.566 5.566-31.544-5-14.978-10.565-14.978-30.391 0-7.435 3.369-13.37 3.37-5.934 10.239-8.5 15.174-4.869 30.978-12.586 15.804-7.718 29.109-17.587L483.74 675.957V834.74q0 26.783-24.435 36.826-24.435 10.044-42.957-9.043L263.956 710.131H135.087q-16.957 0-28.283-11.326-11.327-11.326-11.327-28.283V481.478q0-16.957 11.327-28.566 11.326-11.608 28.283-11.608h116.956L57.565 245.13q-10.13-10.131-9.63-23.761.5-13.631 10.63-23.761 10.13-10.131 23.543-10.131 13.413 0 23.544 10.131l736.131 744.175q10.13 10.13 10.13 23.761 0 13.63-10.13 23.196-10.131 10.695-24.261 10.695-14.131 0-24.261-10.695ZM610.262 231.348q108.13 39.13 174.195 133.043Q850.523 458.304 850.523 575q0 52.696-14.848 102.826-14.848 50.131-43.413 94.696L744.74 723.87q20-33.435 29.5-71.153 9.5-37.717 9.5-77.717 0-97.87-54.935-176.587-54.935-78.717-145.804-106.848-8.566-2.565-13.913-9.913-5.348-7.348-5.348-16.478 0-18.131 14.913-29.044t31.609-4.782Zm48.565 406.609-95.087-96.218V408.913q48.695 23.13 77.739 68.261 29.044 45.13 29.044 98.826 0 16.13-3.066 31.761-3.065 15.63-8.63 30.196ZM483.74 460.609 365.043 340.216l51.305-51.304q18.522-18.522 42.957-8.196 24.435 10.327 24.435 35.979v143.914Z",
            fullscreen: "M223.782 871.827q-16.706 0-28.158-11.451-11.451-11.452-11.451-28.158V693q0-16.707 11.502-28.158 11.501-11.451 28.283-11.451 16.781 0 28.107 11.451T263.391 693v99.609H363q16.707 0 28.158 11.501 11.451 11.502 11.451 28.283t-11.451 28.108Q379.707 871.827 363 871.827H223.782Zm-.175-373.218q-16.781 0-28.108-11.451-11.326-11.451-11.326-28.158V319.782q0-16.706 11.451-28.44 11.452-11.734 28.158-11.734H363q16.707 0 28.158 11.784t11.451 28.566q0 16.781-11.451 28.107T363 359.391h-99.609V459q0 16.707-11.501 28.158-11.502 11.451-28.283 11.451ZM597 871.827q-16.707 0-28.158-11.502-11.451-11.501-11.451-28.283 0-16.781 11.451-28.107T597 792.609h99.609V693q0-16.707 11.501-28.158 11.502-11.451 28.283-11.451t28.39 11.451q11.609 11.451 11.609 28.158v139.218q0 16.706-11.734 28.158-11.734 11.451-28.44 11.451H597Zm139.042-373.218q-16.781 0-28.107-11.451T696.609 459v-99.609H597q-16.707 0-28.158-11.501-11.451-11.502-11.451-28.283t11.451-28.39q11.451-11.609 28.158-11.609h139.218q16.706 0 28.44 11.734 11.734 11.734 11.734 28.44V459q0 16.707-11.784 28.158t-28.566 11.451Z",
            fullscreen_exit: "M362.825 871.827q-16.782 0-28.108-11.451-11.326-11.452-11.326-28.158v-99.609h-99.609q-16.706 0-28.158-11.501-11.451-11.502-11.451-28.283 0-16.782 11.451-28.108 11.452-11.326 28.158-11.326H363q16.707 0 28.158 11.451T402.609 693v139.218q0 16.706-11.501 28.158-11.502 11.451-28.283 11.451ZM223.782 498.609q-16.706 0-28.158-11.501-11.451-11.502-11.451-28.283 0-16.782 11.451-28.108 11.452-11.326 28.158-11.326h99.609v-99.609q0-16.706 11.501-28.44 11.502-11.734 28.283-11.734 16.782 0 28.108 11.734t11.326 28.44V459q0 16.707-11.451 28.158T363 498.609H223.782Zm373.043 373.218q-16.782 0-28.108-11.451-11.326-11.452-11.326-28.158V693q0-16.707 11.451-28.158T597 653.391h139.218q16.706 0 28.44 11.501 11.734 11.502 11.734 28.283 0 16.782-11.734 28.108t-28.44 11.326h-99.609v99.609q0 16.706-11.501 28.158-11.502 11.451-28.283 11.451ZM597 498.609q-16.707 0-28.158-11.451T557.391 459V319.782q0-16.706 11.501-28.44 11.502-11.734 28.283-11.734 16.782 0 28.108 11.734t11.326 28.44v99.609h99.609q16.706 0 28.44 11.501 11.734 11.502 11.734 28.283 0 16.782-11.734 28.108t-28.44 11.326H597Z"
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
        this.video.onvolumechange = () => {
            textVolume.innerHTML = Math.floor(this.video.volume*100)+"%";
            buttonVolume.replaceChildren(
                this.createSvg(this.video.volume === 0 ? iconsSvg.volume_off : iconsSvg.volume_up)
            );
        };
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
                buttonVolume.appendChild(
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