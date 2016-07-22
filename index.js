var sunlight = require("./sunlight-all-min.js").Sunlight;
var highlighter = new sunlight.Highlighter();

function highlight(lang, code) {
    if(!lang) return {
        body: code,
        html: false
    };

    try {
      //first argument is the text to highlight, second is the language id
      var context = highlighter.highlight(code, lang);
      var nodes = context.getNodes(); //array of DOM nodes

      //the following will convert it to an HTML string
      var jsdom = require("jsdom").jsdom;
      var document = jsdom("", {});

      var dummyElement = document.createElement("div");
      for (var i = 0; i < nodes.length; i++) {
          dummyElement.appendChild(nodes[i]);
      }

      var rawHtml = dummyElement.innerHTML;
      return rawHtml;
    } catch(e) { console.log(e); }

    return {
        body: code,
        html: false
    };
}

module.exports = {
    book: {
        assets: "./themes",
        js: [],
        css: [
            "sunlight.default.css"
        ]
    },
    ebook: {
        assets: "./themes",
        css: [
            "sunlight.default.css"
        ]
    },
    blocks: {
        code: function(block) {
            return highlight(block.kwargs.language, block.body);
        }
    }
};
