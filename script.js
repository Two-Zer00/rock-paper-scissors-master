const rock = `
    <div class="rock">
      <img src="images/icon-rock.svg" alt="icon-rock">
</div>`
const paper = `
<div class="paper">
    <img src="images/icon-paper.svg" alt="icon-paper">
</div>`
const scissors = `
<div class="scissors">
    <img src="images/icon-scissors.svg" alt="icon-scissors">
</div>`



let options = document.querySelectorAll("main>section:nth-child(2)>div>div");
const modalOpen = document.querySelector('#rules');
const modalClose = document.querySelector('#close-modal');

modalOpen.addEventListener('click', openModal)
modalClose.addEventListener('click', closeModal)

updateScoreboard();



options.forEach((element) => {
    element.addEventListener('click', initialState);
});


function initialState() {
    optionSelected(this);
    generateTitles();
    this.parentElement.classList.add('selected');
    let iaOptionContainer = generateOption();
    let temp = generateTemp();
    this.parentElement.parentElement.appendChild(temp)
    setTimeout(() => {
        temp.remove();
        this.parentElement.parentElement.appendChild(iaOptionContainer)
        getWinner(this, iaOptionContainer);
        updateScoreboard();
        this.parentElement.parentElement.classList.add('selected');
        this.parentElement.parentElement.classList.remove('waiting');
    }, 1000);
}

function showResult(point) {
    let resultContainer = document.createElement('div')
    resultContainer.classList.add('result')
    if (point === 2) {
        resultContainer.innerHTML = `<h2>draw</h2><button>play again</button>`;
    }
    else {
        resultContainer.innerHTML = `<h2>You ${point < 0 ? 'loose' : 'win'}</h2><button>play again</button>`;
    }
    document.querySelector('.board').insertBefore(resultContainer, document.querySelector('.board>.ia-selected'));
    resultContainer.children[1].addEventListener('click', reset);
}
function optionSelected(option) {
    option.parentElement.parentElement.classList.add('waiting');
    option.removeEventListener('click', initialState);
    options.forEach((element) => {
        if (element !=option) {
            element.parentElement.remove();
        }
    })
}

function generateOption() {
    const array = [rock, paper, scissors];
    let option = document.createElement('div');
    option.classList.add('ia-selected')
    option.innerHTML = array[getRandomInt(3)];
    return option;
}

function generateTemp() {
    let option = document.createElement('div');
    option.classList.add('ia-selected')
    option.innerHTML = `<div class="temp">
  </div>`;
    return option;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getScore() {
    let score = window.localStorage.getItem('score');
    return parseInt(score) ? parseInt(score) : 0;
}

function setScore(point) {
    setWinner(point);
    showResult(point);
    let score = getScore();
    score = Math.max(0, (score + point));
    window.localStorage.setItem('score',score)
}

function draw() {
    showResult(2);
}

function getWinner(playerc,iac) {
    let player = playerc.className;
    let ia = iac.children[0].className;
    console.log(player === ia);
    player === ia && draw();
    switch (player) {
        case 'rock':
            ia === 'scissors' && setScore(1);
            ia === 'paper' && setScore(-1);
            break;
        case 'paper':
            ia === 'rock' && setScore(1);
            ia === 'scissors' && setScore(-1);
            break;
        case 'scissors':
            ia === 'paper' && setScore(1);
            ia === 'rock' && setScore(-1)
            break;
    }
}

function updateScoreboard() {
    document.querySelector("#score").innerHTML = getScore();
}

function generateTitles() {
    let title = `<h2>You picked</h2><h2>The house picked</h2>`
    let titleContainer = document.createElement('div');
    titleContainer.innerHTML=title;
    titleContainer.classList.add('title');
    document.querySelector('main').insertBefore((titleContainer),document.querySelector('main > section:nth-child(2)'));
}

function setWinner(point) {
    if (point < 0) {
        document.querySelector('.ia-selected').classList.add('winner');
    }
    else {document.querySelector('.board .selected').classList.add('winner');}
}

function reset() {
    const main = document.querySelector('main');
    main.innerHTML = `<section>
    <div>
      <p class="title">Rock Paper Scissors</p>
    </div>
    <div>
      <div>
        Score
        <span id="score">0</span>
      </div>
    </div>
  </section>
  <section class="board">
    <div>
      <div class="paper">
        <img src="images/icon-paper.svg" alt="icon-paper">
      </div>
    </div>
    <div>
      <div class="scissors">
        <img src="images/icon-scissors.svg" alt="icon-scissors">
      </div>
    </div>
    <div>
      <div class="rock">
        <img src="images/icon-rock.svg" alt="icon-rock">
      </div>
    </div>
  </section>
  <div>
      <button id='rules'>Rules</button>
    </div>`;

    main.querySelector('#rules').addEventListener('click',openModal)
  options=document.querySelectorAll("main>section:nth-child(2)>div>div");
  updateScoreboard();
  
  
  options.forEach((element) => {
      element.addEventListener('click', initialState);
  });
}

function openModal() {
    document.querySelector('.modal').classList.add('show');
}

function closeModal() {
    document.querySelector('.modal').classList.remove('show');
}
