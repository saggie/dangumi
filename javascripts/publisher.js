const publisher = (function () {

  const contents = document.getElementById("contents");

  const chopLastBr = function (text) {
    if (text.lastIndexOf("\n") == text.length - 1) {
      return text.substring(0, text.length - 1);
    }
    return text;
  };

  const getTextFromNode = function (node) {
    let text = chopLastBr(node.innerText);
    text = text.replace("\n", lineSeparator);
    return text;
  };

  const saveFile = function (filename, text) {
    const file = new Blob([text], { type: "text/plain" });

    const dummyLink = document.createElement("a");
    dummyLink.href = URL.createObjectURL(file);
    dummyLink.download = filename;

    document.body.appendChild(dummyLink);
    dummyLink.click();
    document.body.removeChild(dummyLink);
  };

  const publish = function () {
    const paragraphs = contents.children;
    let filename = "untitled.txt";
    const texts = [];
    for (let i = 0; i < paragraphs.length; i++) {
      if (paragraphs[i] instanceof HTMLHeadingElement) {
        filename = paragraphs[i].innerText + window.fileExtension;
        continue;
      }
      texts.push(getTextFromNode(paragraphs[i]));
    }
    saveFile(filename, texts.join(window.lineSeparator));
  };

  return {
    publish: publish
  };

})();