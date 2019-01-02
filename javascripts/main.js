window.fileExtension = ".txt";
window.lineSeparator = navigator.platform.startsWith("Win") ? "\r\n" : "\n";

(function () {

  dragHandler.addCallback(loader.load);
  keyHandler.addCallback(publisher.publish);

  window.onbeforeunload = function (e) {
    e.returnValue = "このページから移動してもよろしいですか？";
  };

})();