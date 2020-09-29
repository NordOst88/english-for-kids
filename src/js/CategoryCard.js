export default class CategoryCard {
  constructor(name, img) {
    this.name = name;
    this.img = img;
  }

  createElement(mode) {
    const mainCard = document.createElement('a');
    mainCard.classList.add('main-card');
    mainCard.classList.add('main-card_container');
    if (mode) { mainCard.classList.add(mode); }
    mainCard.textContent = this.name;

    const mainCardImage = document.createElement('img');
    mainCardImage.setAttribute('src', this.img);
    mainCardImage.classList.add('main-card');
    mainCardImage.classList.add('main-card_image');
    mainCard.append(mainCardImage);

    return mainCard;
  }
}
