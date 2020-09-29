function setStatistics(srcStat) {
  localStorage.setItem('cardStat', JSON.stringify(srcStat));
}

export default setStatistics;
