function isStatisticsUnset() {
  return !localStorage.getItem('cardStat');
}

export default isStatisticsUnset;
