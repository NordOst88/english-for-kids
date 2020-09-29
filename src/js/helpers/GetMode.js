function getMode() {
  return localStorage.getItem('mode') || 'train';
}

export default getMode;
