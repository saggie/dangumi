const publisher = (function () {

  const contents = document.getElementById("contents");

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
    const chapters = contents.children;
    for (let i = 0; i < chapters.length; i++) {
      const paragraphs = chapters[i].children;
      let filename = "untitled.txt";
      const texts = [];
      for (let j = 0; j < paragraphs.length; j++) {
        if (paragraphs[j] instanceof HTMLHeadingElement) {
          filename = paragraphs[j].innerText + window.fileExtension;
          continue;
        }
        texts.push(paragraphs[j].innerText);
      }
      saveFile(filename, texts.join("\n"));
    }
  };

  return {
    publish: publish
  };

})();