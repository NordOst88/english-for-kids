const menu = document.querySelector('.menu');

function addStatisticsLink() {
  const menuElement = document.createElement('a');
  menuElement.setAttribute('id', 'Statistics');
  menuElement.classList.add('menu-item');
  menuElement.textContent = 'Statistics';
  menu.append(menuElement);
}

export default addStatisticsLink;
