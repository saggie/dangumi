window.extension = ".txt";

(function () {

  dragHandler.addCallback(loader.load);
  keyHandler.addCallback(publisher.publish);

  window.onbeforeunload = function (e) {
    e.returnValue = "このページから移動してもよろしいですか？";
  }

})();