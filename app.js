let songs = [
    { button: ".song-1", audio: "song1", name: "Apna Bana Le" },
    { button: ".song-2", audio: "song2", name: "Jogi" },
    { button: ".song-3", audio: "song3", name: "Makhna" },
    { button: ".song-4", audio: "song4", name: "Ve Maahi" },
    { button: ".song-5", audio: "song5", name: "Nazm Nazm" },
    { button: ".song-6", audio: "song6", name: "Zaalima" },
];

let currentSong = song1;
let songInfo = document.querySelector(".song-info");
let playButton = document.querySelector("#play");
let prevButton = document.querySelector("#prev"); 
let nextButton = document.querySelector("#next"); 
let currentTimeDisplay = document.querySelector(".current-time");  // Element to display current time
let durationDisplay = document.querySelector(".duration-time");  


const playIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 16 16">
        <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path>
    </svg>`;
const pauseIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 16 16">
        <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path>
    </svg>`;

function resetAll() {
    songs.forEach(({ audio }) => {
        let songElement = document.getElementById(audio);
        songElement.pause();
        songElement.currentTime = 0;
    });
}

function setSongEvents() {
    songs.forEach(({ button, audio, name }, index) => {
        let buttonElement = document.querySelector(button);
        let audioElement = document.getElementById(audio);

        buttonElement.addEventListener("click", () => {
            resetAll();
            
            if (currentSong === audioElement && !audioElement.paused) {
                audioElement.pause();
                playButton.innerHTML = playIcon;
                currentSong = song1;
            } else {
                audioElement.play();
                songInfo.innerText = name;
                playButton.innerHTML = pauseIcon;
                currentSong = audioElement;
                updateDurationDisplay(audioElement);
                
            }
        });
        audioElement.addEventListener("timeupdate", () => {
            if (audioElement === currentSong) {
                updateCurrentTimeDisplay(audioElement);
            }
        });
    });
}

playButton.addEventListener("click", () => {
    if (currentSong) {
        if (currentSong.paused) {
            currentSong.play();
            playButton.innerHTML = pauseIcon;
            currentSong.addEventListener("timeupdate", updateSeekbarCircle);


        } else {
            currentSong.pause();
            playButton.innerHTML = playIcon;
        }
    }
});

function playNext() {
    if (currentSong) {
        let currentIndex = songs.findIndex(song => song.audio === currentSong.id);
        let nextIndex = (currentIndex + 1) % songs.length;  // Wrap around to first song
        let nextSong = document.getElementById(songs[nextIndex].audio);
        resetAll();
        nextSong.play();
        songInfo.innerText = songs[nextIndex].name;
        playButton.innerHTML = pauseIcon;
        currentSong = nextSong;
        currentSong.addEventListener("timeupdate", updateSeekbarCircle);

    }
}
function playPrev() {
    if (currentSong) {
        let currentIndex = songs.findIndex(song => song.audio === currentSong.id);
        let prevIndex = (currentIndex - 1 + songs.length) % songs.length;  // Wrap around to last song
        let prevSong = document.getElementById(songs[prevIndex].audio);
        resetAll();
        prevSong.play();
        songInfo.innerText = songs[prevIndex].name;
        playButton.innerHTML = pauseIcon;
        currentSong = prevSong;
        currentSong.addEventListener("timeupdate", updateSeekbarCircle);

    }
}
function updateCurrentTimeDisplay(audioElement) {
    // Format current time (in seconds) as MM:SS
    let currentTime = audioElement.currentTime;
    let minutes = Math.floor(currentTime / 60);
    let seconds = Math.floor(currentTime % 60);
    currentTimeDisplay.innerText = `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
}

function updateDurationDisplay(audioElement) {
    // Format duration (in seconds) as MM:SS
    let duration = audioElement.duration;
    let minutes = Math.floor(duration / 60);
    let seconds = Math.floor(duration % 60);
    durationDisplay.innerText = `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
} 

prevButton.addEventListener("click", playPrev);
nextButton.addEventListener("click", playNext);

function updateSeekbarCircle() {
    if (currentSong && currentSong.duration > 0) {
        let progress = (currentSong.currentTime / currentSong.duration) * 100;
        document.querySelector(".circle").style.left = progress + "%";
    }
}


currentSong.addEventListener("timeupdate", updateSeekbarCircle);

function seekbarUpdate() {
    document.querySelector(".seekbar").addEventListener("click",(e)=>{
        let percent=((e.offsetX/e.target.getBoundingClientRect().width)*100);
        document.querySelector(".circle").style.left= percent+"%";
        currentSong.currentTime=(currentSong.duration*percent)/100;
    })
}
seekbarUpdate();
document.querySelector(".hamburger").addEventListener("click",()=>{
document.querySelector(".left").style.left="0";
});
// document.querySelector(".close").addEventListener("click",()=>{
// document.querySelector(".left").style.left="-100%";
// });
document.querySelector(".close").addEventListener("click", () => {
    console.log("Close button clicked");
    document.querySelector(".left").style.left = "-100%";
  });
document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change",(e)=>{
    currentSong.volume=parseInt(e.target.value)/100;

})  
document.querySelector("#card1").addEventListener("click",()=>{
    currentSong.play();
    playButton.innerHTML = pauseIcon;
    seekbarUpdate();
})
// Initialize
setSongEvents();
console.log("Script loaded successfully.");
