const videoContainer = document.getElementById("videoContainer");
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

// Play or Pause The Video
const playAndPause = () => {
    if(videoContainer.paused) {
        playBtn.classList.replace('fa-play','fa-pause');
        videoContainer.play();
    } else {
        playBtn.classList.replace('fa-pause','fa-play');
        videoContainer.pause();
    }
}

// Make video full screen
const makeFullScreen = () => {
    if (videoContainer.requestFullscreen) {
        videoContainer.requestFullscreen();
      } else if (videoContainer.webkitRequestFullscreen) { /* Safari */
        videoContainer.webkitRequestFullscreen();
      } else if (videoContainer.msRequestFullscreen) { /* IE11 */
        videoContainer.msRequestFullscreen();
      }
}

// Change Video Speed Rate
const changeVideoRate = (e) => {
    videoSpeedRate = Number(e.srcElement.value);
    videoContainer.playbackRate = videoSpeedRate;
}


// Updating Video Time and Duration
videoContainer.onplay = () => {
    setInterval(() => {
        let minute = Math.floor(videoContainer.currentTime / 60);
        let second = Math.floor(videoContainer.currentTime % 60);
        time.textContent = `${minute}:${second < 10 ? `0${second}`: second}`;

        // Change Interval Active Time line
        videoTimelineActive.style.width = `${(videoContainer.currentTime / videoContainer.duration) * 100}%`
    }, 400)
}
const updateVideoDuration = () => {
    const durationMinute = Math.floor(videoContainer.duration / 60);
    const durationSecond = Math.floor(videoContainer.duration % 60);
    duration.textContent = `${durationMinute}:${durationSecond < 10 ? `0${durationSecond}` : durationSecond}`;
    duration = videoContainer.duration;
}

// Update Video Time when clicking on the timeline
const changeTimeline = (e) => {
    const timelineWidth = videoTimeline.clientWidth;
    const startPoint = (window.innerWidth - timelineWidth) / 2;
    const clickedPoint = e.clientX - startPoint;
    const pointToGo = (clickedPoint * videoContainer.duration) / timelineWidth;
    videoContainer.currentTime = pointToGo;

    // Change active color
    videoTimelineActive.style.width = `${(clickedPoint / timelineWidth) * 100}%`;
}

// Mute or Unmute the video
const muteUnmute = () => {
    if(videoContainer.volume > 0) {
        videoContainer.volume = 0;
        volumeSpeaker.classList.replace('fa-volume-up','fa-volume-mute');
        volumeLineActive.style.width = '0%'
    } else {
        videoContainer.volume = currentVolume;
        volumeSpeaker.classList.replace('fa-volume-mute','fa-volume-up')
        volumeLineActive.style.width = `${currentVolume * 100}%`
    }
}


// Change Video Volume 
const changevolumeSpeaker = (e) => {
    const position = e.layerX;
    if(position < 10) {
        currentVolume = 0;
        muteUnmute();
    }else if (position < 50) {
        volumeSpeaker.classList.replace('fa-volume-mute','fa-volume-down')
        volumeSpeaker.classList.replace('fa-volume-up','fa-volume-down')
        videoContainer.volume = position / 100;
        currentVolume = position / 100;
        volumeLineActive.style.width = `${position}%`
    } else {
        volumeSpeaker.classList.replace('fa-volume-mute','fa-volume-up')
        volumeSpeaker.classList.replace('fa-volume-down','fa-volume-up')
        videoContainer.volume = position / 100;
        currentVolume = position / 100;
        volumeLineActive.style.width = `${position}%`
    }
}


// Event Listeners
videoContainer.addEventListener("click", playAndPause);
playBtn.addEventListener("click", playAndPause);
volumeSpeaker.addEventListener("click",muteUnmute) 
fullScreen.addEventListener('click',makeFullScreen);
speedControll.addEventListener('change', changeVideoRate);
videoContainer.addEventListener('loadeddata', updateVideoDuration);
videoTimeline.addEventListener('click', changeTimeline);
volumeLine.addEventListener("click", changevolumeSpeaker);