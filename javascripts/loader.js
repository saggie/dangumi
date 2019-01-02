const loader = (function () {

  const contents = document.getElementById("contents");

  const clearContents = function () {
    while (contents.firstChild) {
      contents.removeChild(contents.firstChild);
    };
  };

  const getFileName = function (filename) {
    if (filename.lastIndexOf(".") > 0) {
      window.fileExtension = filename.substr(filename.lastIndexOf("."));
      return filename.substr(0, filename.lastIndexOf("."));
    }
    window.fileExtension = "";
    return filename;
  };

  const buildHeading = function (text) {
    const heading = document.createElement("h1");
    heading.appendChild(document.createTextNode(text));
    return heading;
  };

  const buildParagraph = function (line) {
    const paragraph = document.createElement("div");
    paragraph.appendChild(document.createTextNode(line));
    if (line == "") {
      paragraph.appendChild(document.createElement("br"));
    }
    return paragraph;
  };

  const buildAndAppendParagraphs = function (file) {
    const fileReader = new FileReader();
    fileReader.onload = function (event) {
      const lines = event.target.result.split("\n");
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].replace("\r", "");
        contents.appendChild(buildParagraph(line));
      }
    };
    fileReader.readAsText(file);
  };

  const buildContents = function (file) {
    const filename = getFileName(file.name);
    contents.appendChild(buildHeading(filename));

    buildAndAppendParagraphs(file);

    return chapter;
  };

  const load = function (files) {
    clearContents();
    for (let i = 0; i < files.length; i++) {
      buildContents(files[i]);

      // Restriction: Only one file can be loaded at a time.
      break;
    }
  };

  return {
    load: load
  };

})();