export default class Card {
  constructor(state) {
    this.state = state;
  }

  createElement() {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card-container');
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardContainer.append(cardElement);

    const front = document.createElement('div');
    front.classList.add('front');
    cardElement.append(front);
    const img = document.createElement('img');
    img.setAttribute('src', this.state.image);
    front.append(img);
    const cardHeader = document.createElement('div');
    cardHeader.classList.add('cardHeader');
    cardHeader.classList.add('eng');
    cardHeader.textContent = this.state.word;
    front.append(cardHeader);

    const back = document.createElement('div');
    back.classList.add('back');
    cardElement.append(back);
    const img2 = document.createElement('img');
    img2.setAttribute('src', this.state.image);
    back.append(img2);
    const cardHeader2 = document.createElement('div');
    cardHeader2.classList.add('cardHeader');
    cardHeader2.textContent = this.state.translation;
    back.append(cardHeader2);

    const rotate = document.createElement('div');
    rotate.classList.add('rotate');
    cardElement.append(rotate);

    return cardContainer;
  }

  createPlayElement() {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card-container');
    const cardElement = document.createElement('div');
    cardElement.classList.add('card-cover');
    cardContainer.append(cardElement);
    const img = document.createElement('img');
    img.classList.add('card-cover_image');
    img.dataset.name = this.state.word;
    img.setAttribute('src', this.state.image);
    cardElement.append(img);

    return cardContainer;
  }
}
