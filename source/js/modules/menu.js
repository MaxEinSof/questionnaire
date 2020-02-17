'use strict';

(function () {
  const mobileMenuBtn = document.querySelector('.js-mobile-menu-btn');
  const menu = document.querySelector('.js-menu');
  const menuLinks = document.querySelectorAll('.js-menu a');

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function (evt) {
      evt.stopPropagation();
      if (!mobileMenuBtn.classList.contains('menu-opened')) {
        openMenu();
      } else {
        closeMenu();
      }
    });
  }

  if (menuLinks.length) {
    menuLinks.forEach(function (link, index) {
      link.addEventListener('click', function (evt) {
        evt.preventDefault();
        toggleNavigationLinks(index);
        scrollToContent(link);
      });
    });
  }

  function openMenu() {
    mobileMenuBtn.classList.add('menu-opened');
    menu.classList.add('menu-opened');
    document.addEventListener('click', onDocumentClick);
  }

  function closeMenu() {
    mobileMenuBtn.classList.remove('menu-opened');
    menu.classList.remove('menu-opened');
    document.removeEventListener('click', onDocumentClick);
  }

  function onDocumentClick(evt) {
    if (!evt.target.matches('.js-menu, .js-menu li')) {
      closeMenu();
    }
  }

  function toggleNavigationLinks(index) {
    menuLinks.forEach(function (link) {
      link.classList.remove('active');
    });
    menuLinks[index].classList.add('active');
  }

  function scrollToContent(link) {
    const blockID = link.getAttribute('href').substr(1);

    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }
})();
