console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Joto Bar Dekhi Maago - Lata Mangeskar", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Tumi Maa Amake - Kishore Kumar", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Amake Amar Moto Thakte Dao - Anupam Roy", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Besh Toh - Monali Thakur", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Are Hi - Fairose Nawar", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Tomar Pichu Charbo Na - Nahid Hasan", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Raag Komle Phone Koris - Abanti Sithi", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Chup Kore Tui - Monali Thakur | Ash King", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Ki Mayay | কি মায়ায় - Shreya Ghoshal | Anupam Roy", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Bolo Na Radhika - Monali Thakur | Ritam Sen | Prasen", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"},
    {songName: "Bahu Manaratha - Subhomita Banerjee", filePath: "songs/11.mp3", coverPath: "covers/11.jpg"},
    {songName: "Baarat - Ritviz & Nucleya", filePath: "songs/12.mp3", coverPath: "covers/12.jpg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})