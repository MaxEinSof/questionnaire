'use strict';

(function () {
  const select = document.querySelector('#year-select');

  if (select) {
    createCustomSelect();
    addCustomScrollBar();

    select.addEventListener('change', function () {
      select.parentElement.classList.add('is-filled');
    });
  }

  function createCustomSelect() {
    new CustomSelect({
      elem: 'year-select'
    });
  }

  function addCustomScrollBar() {
    const dropdown = document.querySelector('.js-Dropdown-list');

    dropdown.setAttribute('data-simplebar', null);
    dropdown.setAttribute('data-simplebar-auto-hide', false);
  }
})();
