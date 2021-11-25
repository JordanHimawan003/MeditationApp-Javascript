// pretty much everything
const app = () => {
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vid-container video');
    // sounds
    const sounds = document.querySelectorAll('.sound-picker button');
    // time dispplay
    const timeDisplay = document.querySelector('.time-display');
    const timeSelect = document.querySelectorAll('.time-select button');
    // get the length of the outline
    const outlineLength = outline.getTotalLength();
    console.log(outlineLength);
    // duration
    let fakeDuration = 600;
    // pick different sounds
    sounds.forEach(sound => {
        sound.addEventListener('click', function() {
            song.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            checkPlaying(song);
        });
    });
    // animate the circle thing to look like starting from 0
    outline.style.strokeDasharray = outlineLength;
    // animate the circle offset
    outline.style.strokeDashoffset = outlineLength;
    //play sounds
    play.addEventListener("click", () => {
        checkPlaying(song);
    });
    // select time
    timeSelect.forEach(option => {
        option.addEventListener('click', function() {
            fakeDuration = this.getAttribute('data-time');
            timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:0${Math.floor(fakeDuration % 60)}`;
        });
    });
    //create a spesific func to stop and play the sounds
    const checkPlaying = song => {
        if(song.paused) {
            song.play();
            video.play();
            play.src = './svg/pause.svg';
        } else {
            song.pause();
            video.pause();
            play.src = './svg/play.svg';
        }
    }
    // we can animated the circle
    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);
        // animate the circle
        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;
        // animate the text
        timeDisplay.textContent = `${minutes}:0${seconds}`;
        if(currentTime >= fakeDuration) {
            song.pause();
            video.pause();
            song.currentTime = 0;
            play.src = './svg/play.svg';

        }
    }
};

app();