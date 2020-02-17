'use strict';

(function () {
  const inputs = document.querySelectorAll('.js-input input');

  if (inputs.length) {
    inputs.forEach(function (input) {
      input.addEventListener('focus', function () {
        input.parentElement.classList.add('is-filled');
      });

      input.addEventListener('blur', function () {
        if (!input.value) {
          input.parentElement.classList.remove('is-filled');
        }
      });
    });
  }
})();
