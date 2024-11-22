const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
    startButton: document.querySelector("#start-btn"),
    resetButton: document.querySelector("#reset-btn"),
    life: document.querySelector("#life"),
    backgroundMusic: document.getElementById("#background-music")
  },
  values: {
    timerId: null,
    countDownTimerId: null,
    gameVelocity: 600,
    hitPosition: 0,
    result: 0,
    currentTime: 60,
    countLife: 3,
  },
};

function playSound(audioname) {
  let audio = new Audio(`./src/audios/${audioname}.m4a`);
  audio.volume = 0.2;  
  audio.play();
}

function countDown() {
  state.values.countDownTimerId = setInterval(() => {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
      clearInterval(state.values.countDownTimerId);
      clearInterval(state.values.timerId);

      if (state.values.result >= 50) {
        alert("🏆 You Win! O seu resultado foi: " + state.values.result);
        location.reload();
      } else {
        alert(
          "⚠️ Ops! O seu resultado foi: " +
            state.values.result +
            " Tente outra vez"
        );

        state.values.countLife--;
        state.view.life.textContent = state.values.countLife;
      }

      if (state.values.countLife === 0) {
        alert("👎 Game Over! Você perdeu todas as vidas! O jogo será reiniciado.");
        setTimeout(() => {
          location.reload();
        }, 2000);
      } else {
        state.view.squares.forEach((square) => {
          square.classList.remove("enemy");
          square.classList.remove("enemyError");
        });
        resetGame();
      }
    }
  }, 1000);
}

function moveEnemy() {
  state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
    square.classList.remove("enemyError");
  });

  let randomNumber = Math.floor(Math.random() * 9);
  let randomSquare = state.view.squares[randomNumber];
  randomSquare.classList.add("enemy");
  state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (square.id === state.values.hitPosition) {
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
        playSound("hit");
        square.classList.add("sureEnemy");
        setTimeout(() => {
          square.classList.remove("sureEnemy");
        }, 500);
        
      } else {
        playSound("error");
        square.classList.add("enemyError");
        
        setTimeout(() => {
          square.classList.remove("enemyError");
        }, 500);
      }
    });
  });
}

function resetGame() {
  state.values.currentTime = 60;
  state.view.timeLeft.textContent = state.values.result;
  state.values.result = 0;
  state.view.timeLeft.textContent = 0;
  state.view.score.textContent = state.values.result;
  state.view.startButton.hidden = false;
}

function initialize() {
  state.view.startButton.addEventListener("click", () => {
    resetGame()
    moveEnemy();
    addListenerHitBox();
    countDown();
    state.view.startButton.hidden = true;
  });

  state.view.resetButton.addEventListener("click", () => {
    location.reload();
  });
}

function resetGame() {
  state.values.currentTime = 60;
  state.view.timeLeft.textContent = state.values.result;
  state.values.result = 0;
  state.view.timeLeft.textContent = 0;
  state.view.score.textContent = state.values.result;
  state.view.startButton.hidden = false;
}
initialize();
