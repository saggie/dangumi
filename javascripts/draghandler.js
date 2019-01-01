const dragHandler = (function () {

  let callback = function () { };

  const onDragOver = function (event) {
    event.stopPropagation();
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
  };

  const onDrop = function (event) {
    event.stopPropagation();
    event.preventDefault();

    callback(event.dataTransfer.files);
  };

  const addCallback = function (newCallback) {
    callback = newCallback;
  };

  const contents = document.getElementById("contents");
  contents.addEventListener("dragover", onDragOver, false);
  contents.addEventListener("drop", onDrop, false);

  return {
    addCallback: addCallback
  };

})();