function clickCounter(cardName, stats, type) {
  stats.forEach((el) => {
    el.forEach((el2) => {
      if (el2.word === cardName) {
        el2.type += 1;
        localStorage.setItem('cardStat', JSON.stringify(stats));
      }
    });
  });
}

export default clickCounter;
