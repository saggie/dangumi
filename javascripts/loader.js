const loader = (function () {

  const contents = document.getElementById("contents");

  const clearContents = function () {
    while (contents.firstChild) {
      contents.removeChild(contents.firstChild);
    };
  };

  const getFileName = function (filename) {
    if (filename.lastIndexOf(".") > 0) {
      window.extension = filename.substr(filename.lastIndexOf("."));
      return filename.substr(0, filename.lastIndexOf("."));
    }
    window.extension = "";
    return filename;
  };

  const buildHeader = function (chapterTitle) {
    const header = document.createElement("h1");
    header.appendChild(document.createTextNode(chapterTitle));
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

    const chapterTitle = getFileName(file.name);
    chapter.appendChild(buildHeader(chapterTitle));

    buildAndAppendParagraphs(file, chapter);

    return chapter;
  };

  const load = function (files) {
    clearContents();
    for (let i = 0; i < files.length; i++) {
      const chapter = buildChapter(files[i]);
      contents.appendChild(chapter);

      // Restriction: Only one file can be loaded at a time.
      break;
    }
  };

  return {
    load: load
  };

})();