function clearPage(div1, div2) {
  while (div1.firstChild) {
    div1.removeChild(div1.firstChild);
  }
  if (div2) {
    while (div2.firstChild) {
      div2.removeChild(div2.firstChild);
    }
  }
}

export default clearPage;
