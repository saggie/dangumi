const loader = (function () {

  const contents = document.getElementById("contents");

  const clearContents = function () {
    while (contents.firstChild) {
      contents.removeChild(contents.firstChild);
    };
  };

  const buildHeader = function (filename) {
    const headerText = filename.lastIndexOf(".") > 0
      ? filename.substr(0, filename.lastIndexOf("."))
      : filename;

    const header = document.createElement("h3");
    header.appendChild(document.createTextNode(headerText));
    return header;
  };

  const buildParagraph = function (line) {
    if (line == "") {
      return document.createElement("br");
    }
    const paragraph = document.createElement("p");
    paragraph.appendChild(document.createTextNode(line));
    return paragraph;
  };

  const buildAndAppendParagraphs = function (file, chapter) {
    const fileReader = new FileReader();
    fileReader.onload = function (event) {
      const lines = event.target.result.split("\n");
      for (let i = 0; i < lines.length; i++) {
        chapter.appendChild(buildParagraph(lines[i]));
      }
    };
    fileReader.readAsText(file);
  };

  const buildChapter = function (file) {
    const chapter = document.createElement("div");
    chapter.className = "dangumi";

    chapter.appendChild(buildHeader(file.name));
    buildAndAppendParagraphs(file, chapter);

    return chapter;
  };

  const load = function (files) {
    clearContents();
    for (let i = 0; i < files.length; i++) {
      const chapter = buildChapter(files[i]);
      contents.appendChild(chapter);
    }
  };

  return {
    load: load
  };

})();