function insertComponent(selector, html) {
  document.querySelector(selector)
    .insertAdjacentHTML('beforeend', html);
}

insertComponent(selector, html);

