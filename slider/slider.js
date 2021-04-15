const slider = document.getElementById('myRange');
const output = document.getElementById('value');
const gameMusic = new Audio('/gameMusic.mp3')

// gameMusic.play();

output.innerHTML = slider.value;

slider.oninput = function () {
    output.innerHTML = this.value
}

slider.addEventListener('mousemove', function () {
    let x = slider.value;
    let color = 'linear-gradient(90deg, rgb(117, 252, 117)' + x + '%, rgb(214,214,214)' + x + '%)';
    slider.style.background = color;
})


let volume = document.querySelector("#myRange");
volume.addEventListener("change", function(e) {
gameMusic.volume = e.currentTarget.value / 100;
})

gameMusic.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);







