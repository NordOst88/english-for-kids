const audioElement = [];
const audioArr = [];
const success = new Audio('audio/success.mp3');
const failure = new Audio('audio/failure.mp3');
const correct = new Audio('audio/correct.mp3');
const error = new Audio('audio/error.mp3');

const GLOBAL_SOUNDS = {
  audioElement,
  audioArr,
  success,
  failure,
  correct,
  error,
};

export default GLOBAL_SOUNDS;
