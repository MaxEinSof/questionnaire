'use strict';

(function () {
  const LEVEL_AREA_HALF_WIDTH = 30;
  const thumb = document.querySelector('.js-thumb');
  const trackFill = document.querySelector('.js-track-fill');
  const slider = document.querySelector('.js-slider');
  const levelsElements = document.querySelectorAll('.js-level');
  const levelsTitles = document.querySelectorAll('.js-level span');
  const levelsRadioBtns = document.querySelectorAll('.js-radiobtns input');
  let currentLevelIndex = null;

  if (thumb) {
    thumb.addEventListener('mousedown', onMouseDown);
    thumb.addEventListener('touchstart', onTouchStart);

    window.addEventListener('resize', function () {
      if (currentLevelIndex !== null) {
        stickThumbToLevel(currentLevelIndex);
      }
    });
  }

  if (levelsRadioBtns.length) {
    levelsRadioBtns.forEach(function (radioBtn, index) {
      radioBtn.addEventListener('click', function () {
        stickThumbToLevel(index);
        currentLevelIndex = index;
      });
    });
  }

  if (levelsTitles.length) {
    levelsTitles.forEach(function (title, index) {
      title.addEventListener('click', function () {
        stickThumbToLevel(index);
        levelsRadioBtns[index].click();
        currentLevelIndex = index;
      });
    });
  }

  function onMouseDown() {
    let sliderParameters = defineSliderParameters();

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    function onMouseMove(moveEvt) {
      let currentCoordX = moveEvt.clientX - sliderParameters.sliderRect.left;
      moveThumb(currentCoordX, sliderParameters.BoundingCoord, sliderParameters.levelsAreas);
    }

    function onMouseUp() {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }
  }

  function onTouchStart() {
    let sliderParameters = defineSliderParameters();

    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener('touchend', onTouchEnd);

    function onTouchMove(moveEvt) {
      let currentCoordX = moveEvt.touches[0].clientX - sliderParameters.sliderRect.left;
      moveThumb(currentCoordX, sliderParameters.BoundingCoord, sliderParameters.levelsAreas);
    }

    function onTouchEnd() {
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
    }
  }

  function defineSliderParameters() {
    let sliderRect = slider.getBoundingClientRect();
    let BoundingCoord = {
      MIN_X: 0,
      MAX_X: sliderRect.width
    };
    let levels = defineLevelsWidths();
    let levelsAreas = [
      {
        MIN_X: levels[0] - LEVEL_AREA_HALF_WIDTH,
        MAX_X: levels[0] + LEVEL_AREA_HALF_WIDTH
      },
      {
        MIN_X: levels[1] - LEVEL_AREA_HALF_WIDTH,
        MAX_X: levels[1] + LEVEL_AREA_HALF_WIDTH
      },
      {
        MIN_X: levels[2] - LEVEL_AREA_HALF_WIDTH,
        MAX_X: levels[2] + LEVEL_AREA_HALF_WIDTH
      },
      {
        MIN_X: levels[3] - LEVEL_AREA_HALF_WIDTH,
        MAX_X: levels[3] + LEVEL_AREA_HALF_WIDTH
      }
    ];

    return {
      sliderRect: sliderRect,
      BoundingCoord: BoundingCoord,
      levels: levels,
      levelsAreas: levelsAreas
    };
  }

  function defineLevelsWidths() {
    return [
      0,
      levelsElements[0].offsetWidth + 1,
      levelsElements[0].offsetWidth + levelsElements[1].offsetWidth + 1,
      levelsElements[0].offsetWidth + levelsElements[1].offsetWidth + levelsElements[2].offsetWidth + levelsElements[3].offsetWidth
    ];
  }

  function moveThumb(currentCoordX, BoundingCoord, levelsAreas) {
    let isCoordValid = validateCoord(currentCoordX, BoundingCoord);

    if (isCoordValid) {
      checkCoordPosition(currentCoordX, levelsAreas);

      if (currentLevelIndex === null) {
        thumb.style.left = currentCoordX + 'px';
        trackFill.style.width = currentCoordX + 'px';
        levelsElements.forEach(function (el) {
          el.classList.remove('active');
        });
      } else {
        stickThumbToLevel(currentLevelIndex);
        levelsRadioBtns[currentLevelIndex].click();
      }
    }
  }

  function validateCoord(coordX, BoundingCoord) {
    return coordX >= BoundingCoord.MIN_X && coordX <= BoundingCoord.MAX_X;
  }

  function checkCoordPosition(coordX, levelsAreas) {
    currentLevelIndex = null;

    levelsAreas.forEach(function (levelArea, index) {
      if (coordX >= levelArea.MIN_X && coordX <= levelArea.MAX_X) {
        currentLevelIndex = index;
      }
    });
  }

  function stickThumbToLevel(index) {
    let levels = defineLevelsWidths();

    thumb.style.left = levels[index] + 'px';
    trackFill.style.width = levels[index] + 'px';

    levelsElements.forEach(function (el) {
      el.classList.remove('active');
    });
    levelsElements[index].classList.add('active');
  }
})();
