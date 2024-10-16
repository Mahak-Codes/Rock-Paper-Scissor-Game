const gameContainer = document.querySelector(".container"),
  userResult = document.querySelector(".user_result img"),
  BotResult = document.querySelector(".Bot_result img"),
  result = document.querySelector(".result"),
  userScoreDisplay = document.querySelector(".user_score"),
  BotScoreDisplay = document.querySelector(".Bot_score"),
  resetButton = document.querySelector(".reset"),
  winnermodel = document.getElementById("winnermodel"),
  winnerMessage = document.getElementById("winnerMessage"),
  playAgainButton = document.getElementById("playAgainButton");

let userScore = 0,
  BotScore = 0;

const optionImages = document.querySelectorAll(".option_image");

function checkWinner() {
  if (userScore === 3) {
    showWinner("User");
  } else if (BotScore === 3) {
    showWinner("Bot");
  }
}

function showWinner(winner) {
  winnerMessage.textContent = `${winner} Won 3 Times!`;
  winnermodel.style.display = "block";
}

function resetGame() {
  userScore = 0;
  BotScore = 0;
  userScoreDisplay.textContent = `User: ${userScore}`;
  BotScoreDisplay.textContent = `Bot: ${BotScore}`;
  result.textContent = "Let's Play!!";
  optionImages.forEach((image) => image.classList.remove("active"));
}

playAgainButton.addEventListener("click", () => {
  winnermodel.style.display = "none";
  resetGame();
});

optionImages.forEach((image, index) => {
  image.addEventListener("click", (e) => {
    image.classList.add("active");

    userResult.src = BotResult.src = "./images/rock.png";
    result.textContent = "Wait...";

    optionImages.forEach((image2, index2) => {
      index !== index2 && image2.classList.remove("active");
    });

    gameContainer.classList.add("start");

    let time = setTimeout(() => {
      gameContainer.classList.remove("start");

      let imageSrc = e.target.querySelector("img").src;
      userResult.src = imageSrc;

      let randomNumber = Math.floor(Math.random() * 3);
      let BotImages = [
        "./images/rock.png",
        "./images/paper.png",
        "./images/scissors.png",
      ];
      BotResult.src = BotImages[randomNumber];

      let BotValue = ["R", "P", "S"][randomNumber];
      let userValue = ["R", "P", "S"][index];

      let outcomes = {
        RR: "Draw",
        RP: "Bot",
        RS: "User",
        PP: "Draw",
        PR: "User",
        PS: "Bot",
        SS: "Draw",
        SR: "Bot",
        SP: "User",
      };

      let outComeValue = outcomes[userValue + BotValue];

      result.textContent =
        userValue === BotValue ? "Match Draw" : `${outComeValue} Won!!`;

      if (outComeValue === "User") {
        userScore++;
      } else if (outComeValue === "Bot") {
        BotScore++;
      }

      userScoreDisplay.textContent = `User: ${userScore}`;
      BotScoreDisplay.textContent = `Bot: ${BotScore}`;

      checkWinner();
    }, 2500);
  });
});

resetButton.addEventListener("click", () => {
  resetGame();
});