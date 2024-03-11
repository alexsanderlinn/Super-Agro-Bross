const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
var scoreElement = document.getElementById('score');
let score = 0;
let pipePassed = false; // Variable to track if Mario has passed the pipe

// Array de URLs das imagens do cano
const pipeImages = [
    "../img/fertilizante.gif",
    "../img/defensivo.gif",
    "../img/semente.gif"
];

const jump = () => {
    mario.classList.add('jump');
    score++;
    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);

    setTimeout(() => {
        pipePassed = true; // Set pipePassed to true
        const randomIndex = Math.floor(Math.random() * pipeImages.length);
            pipe.src = pipeImages[randomIndex];
    }, 400); // Delay of 1 second
} 

const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

        if (pipePosition <= 50 && pipePosition > 0 && marioPosition < 100) {

            pipe.style.animation = 'none';
            pipe.style.left = `${pipePosition}px`;
    
            mario.style.animation = 'none';
            mario.style.bottom = `${marioPosition}px`;
    
            mario.src = "../img/game-over.png";
            mario.style.width = '75px';
            mario.style.marginLeft = '50px';
    
            // Adjust the z-index of Mario to ensure he appears in front of the pipe
            mario.style.zIndex = '1';

            setTimeout(() => {
                window.location.href = 'end.html';
            }, 1500);
    
            clearInterval(loop);
        }

    // Update score display
    scoreElement.innerHTML = `Sua Pontuação: ${score}`;

    // Check if score is 4, if so, redirect to win.html
    if (score >= 10) {
        clearInterval(loop); // Stop the game loop
        setTimeout(() => {
            window.location.href = 'win.html'; // Redirect to win.html after 2 seconds
        }, 2000); // 2000 milliseconds = 2 seconds
    }

}, 10);

document.addEventListener('keydown', jump);
