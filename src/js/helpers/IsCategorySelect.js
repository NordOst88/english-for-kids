function isCategorySelect(selectedCategory, card, cardImageParent) {
  if (selectedCategory === card.textContent || selectedCategory === cardImageParent.textContent) {
    return selectedCategory;
  }
  return false;
}

export default isCategorySelect;
