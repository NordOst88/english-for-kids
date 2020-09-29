/* eslint-disable no-param-reassign */
import './src/scss/style.scss';
import cards from './src/js/Cards';
import Card from './src/js/Card';
import CategoryCard from './src/js/CategoryCard';
import cardStat from './src/js/CardStat';
import addStatisticsLink from './src/js/AddStatisticsLink';
import setStatistics from './src/js/helpers/SetStatistics';
import isStatisticsUnset from './src/js/helpers/IsStatisticsUnset';
import clearPage from './src/js/helpers/ClearPage';
import shuffle from './src/js/helpers/Shuffle';
import isCategorySelect from './src/js/helpers/IsCategorySelect';
import handler from './src/js/helpers/Handler';
import errorsRatio from './src/js/helpers/ErrorsRatio';
import getMode from './src/js/helpers/GetMode';
import createDOMElement from './src/js/CreateDOMElement';
import APP_MODES from './src/js/constants/AppModes';
import GLOBAL_DOM_ELEMENTS from './src/js/constants/GlobalDOMElements';
import GLOBAL_SOUNDS from './src/js/constants/GlobalSounds';

/* VARIABLES */

const mainPage = createDOMElement('div', ['mainPage']);
const btns = createDOMElement('div', ['btns']);
const btnsStat = createDOMElement('div', ['btns-stat']);
const btn = createDOMElement('button', ['btn']);
const reset = createDOMElement('button', ['reset-btn'], {}, 'Reset');
const finalContainer = createDOMElement('div', ['finalContainer']);
const sucImage = createDOMElement('img', ['sucImage'], { src: 'img/success.jpg' });
const failImage = createDOMElement('img', ['failImage'], { src: 'img/failure.jpg' });
const finalText = createDOMElement('div', ['finalText']);

let appMode = getMode();
let cardsElementIndex;
let startGame = false;
let mistakes = 0;
let stats;

/* RENDERING MAIN PAGE */

function renderMainPage() {
  clearPage(GLOBAL_DOM_ELEMENTS.rating, mainPage);
  mainPage.classList.add('categories');
  mainPage.classList.remove('statistics');
  cards[0].forEach((el) => {
    const i = cards[0].findIndex((item) => item === el);
    const categoryCard1 = new CategoryCard(el, cards[i + 1][0].image);
    if (appMode === APP_MODES.TRAIN) {
      mainPage.append(categoryCard1.createElement());
    } else {
      mainPage.append(categoryCard1.createElement('red'));
    }
  });
}

/* RENDERING SET'S PAGE */

function renderCategoryPage(categoryIndex) {
  clearPage(GLOBAL_DOM_ELEMENTS.rating, mainPage);
  mainPage.classList.remove('categories');
  mainPage.classList.remove('statistics');
  cards[categoryIndex + 1].forEach((el) => {
    const card1 = new Card(el);
    mainPage.append(card1.createElement());
    GLOBAL_SOUNDS.audioElement[el.word] = new Audio(el.audioSrc);
  });
}

function renderPlayCategoryPage(playCardsElementIndex) {
  clearPage(GLOBAL_DOM_ELEMENTS.rating, mainPage);
  mainPage.classList.remove('categories');
  mainPage.classList.remove('statistics');
  cards[playCardsElementIndex + 1].forEach((el) => {
    const card1 = new Card(el);
    mainPage.append(card1.createPlayElement());
    GLOBAL_SOUNDS.audioElement[el.word] = new Audio(el.audioSrc);
  });
  mainPage.append(btns);
  btn.textContent = 'Start game';
  btns.append(btn);
}

/* RENDER STATISTICS */

function renderStatisticsPage() {
  clearPage(GLOBAL_DOM_ELEMENTS.rating, mainPage);
  mainPage.classList.remove('categories');
  mainPage.classList.add('statistics');

  mainPage.append(btnsStat);
  btnsStat.append(reset);

  const script = createDOMElement('script', [], { src: 'https://www.kryogenix.org/code/browser/sorttable/sorttable.js' });
  script.onload = document.head.append(script);

  const table = createDOMElement('table', ['sortable', 'responsive-table'], {});

  const tableHeaderRow = document.createElement('tr');
  const tableHeaderContent = ['Word', 'Translation', 'Train clicks', 'Guessed', 'Errors', '% of Errors'];

  mainPage.append(table);
  table.append(tableHeaderRow);

  tableHeaderContent.forEach((el) => {
    const tableHeader = createDOMElement('th', [], {}, el);
    tableHeaderRow.append(tableHeader);
  });

  const tbody = document.createElement('tbody');
  table.append(tbody);

  for (let i = 1; i < stats.length; i += 1) {
    for (let j = 0; j < stats[i].length; j += 1) {
      const tableRow = document.createElement('tr');
      tbody.append(tableRow);
      const tableData1 = createDOMElement('td', [], {}, stats[i][j].word);
      tableRow.append(tableData1);
      const tableData2 = createDOMElement('td', [], {}, stats[i][j].translation);
      tableRow.append(tableData2);
      const tableData3 = createDOMElement('td', [], {}, String(stats[i][j].trainCount));
      tableRow.append(tableData3);
      const tableData4 = createDOMElement('td', [], {}, String(stats[i][j].playRight));
      tableRow.append(tableData4);
      const tableData5 = createDOMElement('td', [], {}, String(stats[i][j].playWrong));
      tableRow.append(tableData5);

      let prc = 0;
      if (stats[i][j].playWrong !== 0 || stats[i][j].playRight !== 0) {
        prc = errorsRatio(stats[i][j].playWrong, stats[i][j].playRight);
      }
      const tableData6 = createDOMElement('td', [], {}, String(prc));
      tableRow.append(tableData6);
    }
  }
}

function playAudioElement(name) {
  GLOBAL_SOUNDS.audioElement[name].play();
}

function trainClickCount(cardName) {
  stats.forEach((el) => {
    el.forEach((el2) => {
      if (el2.word === cardName) {
        el2.trainCount += 1;
        setStatistics(stats);
      }
    });
  });
}

function playRightCount(cardName) {
  stats.forEach((el) => {
    el.forEach((el2) => {
      if (el2.word === cardName) {
        el2.playRight += 1;
        setStatistics(stats);
      }
    });
  });
}

function playWrongCount(cardName) {
  stats.forEach((el) => {
    el.forEach((el2) => {
      if (el2.word === cardName) {
        el2.playWrong += 1;
        setStatistics(stats);
      }
    });
  });
}

/* SWITCH MODE */

function setSwitcher() {
  if (appMode === APP_MODES.PLAY) {
    GLOBAL_DOM_ELEMENTS.swMode.checked = true;
    GLOBAL_DOM_ELEMENTS.menu.classList.add('red');
  } else {
    GLOBAL_DOM_ELEMENTS.swMode.checked = false;
    GLOBAL_DOM_ELEMENTS.menu.classList.remove('red');
  }
}

appMode = APP_MODES.TRAIN;
GLOBAL_DOM_ELEMENTS.container.append(mainPage);

/* SET STATS TO LOCAL STORAGE */

if (isStatisticsUnset()) {
  setStatistics(cardStat);
}
stats = JSON.parse(localStorage.getItem('cardStat'));

renderMainPage();

/* RESET BUTTON */

reset.addEventListener('click', () => {
  setStatistics(cardStat);
  stats = JSON.parse(localStorage.getItem('cardStat'));
  clearPage(GLOBAL_DOM_ELEMENTS.rating, mainPage);
  renderStatisticsPage();
});

/* ADD MENU ITEMS */

cards[0].forEach((el) => {
  const menuElement = createDOMElement('a', ['menu-item'], { id: el }, el);
  GLOBAL_DOM_ELEMENTS.menu.append(menuElement);
});

addStatisticsLink();

/* SELECT SET */

GLOBAL_DOM_ELEMENTS.menu.addEventListener('click', (event) => {
  GLOBAL_DOM_ELEMENTS.menu.querySelectorAll('.menu-item').forEach((el) => el.classList.remove('active'));
  event.target.classList.add('active');
  cardsElementIndex = cards[0].findIndex((item) => item === event.target.id);
  clearPage(GLOBAL_DOM_ELEMENTS.rating, mainPage);
  if (event.target.id === 'Statistics') {
    GLOBAL_DOM_ELEMENTS.switchElement.classList.add('none');
    renderStatisticsPage();
  } else if (cardsElementIndex === -1) {
    GLOBAL_DOM_ELEMENTS.switchElement.classList.remove('none');
    renderMainPage();
  } else {
    if (appMode === APP_MODES.PLAY) {
      GLOBAL_DOM_ELEMENTS.switchElement.classList.remove('none');
      renderPlayCategoryPage(cardsElementIndex);
    }
    if (appMode === APP_MODES.TRAIN) {
      GLOBAL_DOM_ELEMENTS.switchElement.classList.remove('none');
      renderCategoryPage(cardsElementIndex);
    }
  }
  GLOBAL_DOM_ELEMENTS.burger.classList.toggle('active');
  GLOBAL_DOM_ELEMENTS.menu.classList.toggle('active');
  startGame = false;
  btn.classList.remove('repeat');
});

/* FLIP CARD */

mainPage.addEventListener('click', (event) => {
  const eventTarget = event.target;
  if (eventTarget.classList.contains('rotate')) {
    eventTarget.parentElement.classList.add('translate');
    eventTarget.parentElement.onmouseleave = handler;
  }
  if (eventTarget.classList.contains('eng')) {
    playAudioElement(eventTarget.textContent);
    trainClickCount(eventTarget.textContent);
  }
  if (eventTarget.nextSibling) {
    if (eventTarget.nextSibling.classList.contains('eng')) {
      playAudioElement(eventTarget.nextSibling.textContent);
      trainClickCount(eventTarget.nextSibling.textContent);
    }
  }
});

/* BURGER MENU */

document.querySelector('.burger').addEventListener('click', (e) => {
  e.currentTarget.classList.toggle('active');
  GLOBAL_DOM_ELEMENTS.menu.classList.toggle('active');
});

/* SELECT CARD */

mainPage.addEventListener('click', (event) => {
  if (event.target.classList.contains('main-card')) {
    const selCat = event.target;
    const selImgPt = event.target.parentElement;
    clearPage(GLOBAL_DOM_ELEMENTS.rating, mainPage);
    cards[0].forEach((el) => {
      cardsElementIndex = cards[0].findIndex((item) => isCategorySelect(item, selCat, selImgPt));
      if (isCategorySelect(el, selCat, selImgPt)) {
        if (appMode === APP_MODES.PLAY) {
          renderPlayCategoryPage(cardsElementIndex);
        }
        if (appMode === APP_MODES.TRAIN) {
          renderCategoryPage(cardsElementIndex);
        }
      }
    });
  }

  if (event.target.classList.contains('card-cover_image') && !event.target.classList.contains('inactive')) {
    if (startGame) {
      if (event.target.dataset.name === GLOBAL_SOUNDS.audioArr[GLOBAL_SOUNDS.audioArr.length - 1]) {
        GLOBAL_SOUNDS.audioArr.pop();
        event.target.classList.add('inactive');
        GLOBAL_SOUNDS.correct.play();
        playRightCount(event.target.dataset.name);
        const starWin = createDOMElement('img', ['starWin'], { src: 'img/star-win.svg' });
        GLOBAL_DOM_ELEMENTS.rating.append(starWin);
        if (GLOBAL_SOUNDS.audioArr.length === 0) {
          clearPage(GLOBAL_DOM_ELEMENTS.rating, mainPage);
          if (mistakes === 0) {
            clearPage(finalContainer);
            finalText.textContent = 'WIN!';
            mainPage.append(finalContainer);
            finalContainer.append(finalText);
            finalContainer.append(sucImage);
            GLOBAL_SOUNDS.success.play();
            startGame = false;
            btn.classList.remove('repeat');
            setTimeout(renderMainPage, 3000);
          } else {
            clearPage(finalContainer);
            finalText.textContent = `${mistakes} errors`;
            mainPage.append(finalContainer);
            finalContainer.append(finalText);
            finalContainer.append(failImage);
            GLOBAL_SOUNDS.failure.play();
            startGame = false;
            btn.classList.remove('repeat');
            setTimeout(renderMainPage, 3000);
          }
          startGame = false;
        } else {
          // eslint-disable-next-line max-len
          setTimeout(playAudioElement, 650, GLOBAL_SOUNDS.audioArr[GLOBAL_SOUNDS.audioArr.length - 1]);
        }
      } else {
        GLOBAL_SOUNDS.error.play();
        playWrongCount(GLOBAL_SOUNDS.audioArr[GLOBAL_SOUNDS.audioArr.length - 1]);
        const star = createDOMElement('img', ['star'], { src: 'img/star.svg' });
        GLOBAL_DOM_ELEMENTS.rating.append(star);
        mistakes += 1;
      }
    }
  }
});

setSwitcher();

GLOBAL_DOM_ELEMENTS.swMode.addEventListener('click', () => {
  if (appMode === APP_MODES.TRAIN) {
    appMode = APP_MODES.PLAY;
    localStorage.setItem('mode', appMode);
    setSwitcher();
  } else {
    appMode = APP_MODES.TRAIN;
    localStorage.setItem('mode', appMode);
    setSwitcher();
    startGame = false;
    btn.classList.remove('repeat');
  }

  if (mainPage.classList.contains('categories')) {
    renderMainPage();
  } else {
    if (appMode === APP_MODES.PLAY) {
      renderPlayCategoryPage(cardsElementIndex);
    }
    if (appMode === APP_MODES.TRAIN) {
      renderCategoryPage(cardsElementIndex);
    }
  }
});

/* START GAME BUTTON */

btn.addEventListener('click', (event) => {
  if (!startGame) {
    event.currentTarget.classList.add('repeat');
    startGame = true;
    mistakes = 0;
    GLOBAL_SOUNDS.audioArr.length = 0;
    document.querySelectorAll('.card-cover_image').forEach((el) => {
      GLOBAL_SOUNDS.audioArr.push(el.dataset.name);
      shuffle(GLOBAL_SOUNDS.audioArr);
    });
    playAudioElement(GLOBAL_SOUNDS.audioArr[GLOBAL_SOUNDS.audioArr.length - 1]);
  } else {
    playAudioElement(GLOBAL_SOUNDS.audioArr[GLOBAL_SOUNDS.audioArr.length - 1]);
  }
});
