function errorsRatio(wrong, right) {
  return Math.round((wrong / (wrong + right)) * 100);
}

export default errorsRatio;
