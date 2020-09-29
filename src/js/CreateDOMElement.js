function createDOMElement(tag, classes, attributes, text) {
  const el = document.createElement(tag);

  if (classes && classes.length > 0) {
    classes.forEach((i) => el.classList.add(i));
  }

  if (attributes) {
    Object.keys(attributes).forEach((i) => el.setAttribute(i, attributes[i]));
  }

  if (text) {
    el.textContent = text;
  }

  return el;
}

export default createDOMElement;
