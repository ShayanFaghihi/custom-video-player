const container = document.querySelector(".container");
const video = document.getElementById("videoContainer");
const playBtn = document.getElementById("play");
const controllerBox = document.querySelector(".video-controller");
const volumeSpeaker = document.getElementById("volume");
const volumeLine = document.getElementById("volume-line");
const volumeLineActive = document.querySelector("#volume-line .volume-line__active");
const fullScreen = document.getElementById("fullScreen")
const speedControll = document.getElementById("speed-control")
const time = document.getElementById("time")
const videoDuration = document.getElementById("duration");
const videoTimeline = document.getElementById("video-timeline");
const videoTimelineActive = document.querySelector("#video-timeline .video-timeline__active");

let videoSpeedRate = 1;
let currentVolume = 1;
let isFullScreen = false;


// Play or Pause The Video
const playAndPause = () => {
    if(video.paused) {
        playBtn.classList.replace('fa-play','fa-pause');
        video.play();
    } else {
        playBtn.classList.replace('fa-pause','fa-play');
        video.pause();
    }
}

// Make video full screen
const makeFullScreen = elem => {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
      }
    video.classList.add('is-full-screen');
    isFullScreen = true;
}

const closeFullScreen = () => {
    if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
      }
    video.classList.remove('is-full-screen');
    isFullScreen = false;
}

const changeScreen = () => {
    if(!isFullScreen) {
        makeFullScreen(container);
    } else {
        closeFullScreen();
    }
}


// Change Video Speed Rate
const changeVideoRate = () => {
    videoSpeedRate = speedControll.value;
    video.playbackRate = videoSpeedRate;
}


// Updating Video Time and Duration
const updateTime = () => {
    let minute = Math.floor(video.currentTime / 60);
    let second = Math.floor(video.currentTime % 60);
    time.textContent = `${minute}:${second < 10 ? `0${second}`: second}`;

    // Change Interval Active Time line
    videoTimelineActive.style.width = `${(video.currentTime / video.duration) * 100}%`
}

const updateVideoDuration = () => {
    const durationMinute = Math.floor(video.duration / 60);
    const durationSecond = Math.floor(video.duration % 60);
    duration.textContent = `${durationMinute}:${durationSecond < 10 ? `0${durationSecond}` : durationSecond}`;
}

// Update Video Time when clicking on the timeline
const changeTimeline = (e) => {
    const newTime = e.layerX / e.srcElement.clientWidth;
    video.currentTime = newTime * video.duration;
}

// Mute or Unmute the video
const muteUnmute = () => {
    if(video.volume > 0) {
        currentVolume = video.volume;
        video.volume = 0;
        volumeSpeaker.className = '';
        volumeSpeaker.classList.add('fas','fa-volume-mute');
        volumeLineActive.style.width = '0%'
    } else if (video.volume === 0) {
        video.volume = currentVolume;
        changeVolumeIcon();
        volumeLineActive.style.width = `${currentVolume * 100}%`;
    }
}


// Change Video Volume 
const changevolumeSpeaker = (e) => {
    let newVolume = e.offsetX / volumeLine.offsetWidth;
    currentVolume = newVolume;

    if(newVolume > .9) {
        newVolume = 1;
    } 
    if(newVolume < .1) {
        newVolume = 0;
    }
    video.volume = newVolume;
    volumeLineActive.style.width = `${newVolume * 100}%`

    // Change Speaker Icon based on the volume 
    changeVolumeIcon();
}


// Change Volume Icons
const changeVolumeIcon = () => {
    volumeSpeaker.className = '';
    if (currentVolume > .7) {
        volumeSpeaker.classList.add('fas','fa-volume-up')
    } else if (currentVolume < .7 && currentVolume > 0) {
        volumeSpeaker.classList.add('fas','fa-volume-down')
    } else if (currentVolume === 0) {
        volumeSpeaker.classList.add('fas','fa-volume-off')
    }
}

// Event Listeners
video.addEventListener("click", playAndPause);
playBtn.addEventListener("click", playAndPause);
video.addEventListener("timeupdate",updateTime)
video.addEventListener("canplay", updateVideoDuration)
video.addEventListener("ended", () => {playBtn.classList.replace('fa-pause','fa-play')})
volumeSpeaker.addEventListener("click",muteUnmute) 
volumeLine.addEventListener("click", changevolumeSpeaker);
fullScreen.addEventListener('click',changeScreen);
speedControll.addEventListener('change', changeVideoRate);
videoTimeline.addEventListener('click', changeTimeline);