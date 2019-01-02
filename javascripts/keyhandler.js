const keyHandler = (function () {

  const KV_CTRL = 17;
  const KV_S = 83;

  let isCtrlKeyPressed = false;
  let isSKeyPressed = false;
  let callback = function () { };

  const clearState = function () {
    isCtrlKeyPressed = false;
    isSKeyPressed = false;
  }

  const onKeyDown = function (e) {
    switch (e.keyCode) {
      case KV_CTRL: isCtrlKeyPressed = true; break;
      case KV_S: isSKeyPressed = true; break;
    }

    if (isCtrlKeyPressed && isSKeyPressed) {
      e.preventDefault();
      clearState();
      callback();
    }
  };

  const onKeyUp = function (e) {
    switch (e.keyCode) {
      case KV_CTRL: isCtrlKeyPressed = false; break;
      case KV_S: isSKeyPressed = false; break;
    }
  };

  const addCallback = function (newCallback) {
    callback = newCallback;
  };

  window.addEventListener('keydown', onKeyDown, false);
  window.addEventListener('keyup', onKeyUp, false);

  return {
    addCallback: addCallback
  };

})();