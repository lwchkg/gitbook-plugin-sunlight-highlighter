"use strict";

if (!document) {
  var jsdom = require("jsdom").jsdom;var document = jsdom("", {});var window = document.defaultView;
}(function (j, q, h) {
  var A = !+"\v1",
      n = A ? "\r" : "\n",
      E = function E() {
    return null;
  },
      p = 0,
      t = "plaintext",
      a = "sunlight-",
      D,
      s,
      b = { tabWidth: 4, classPrefix: a, showWhitespace: false, maxHeight: false },
      m = {},
      r = {},
      c = { beforeHighlightNode: [], beforeHighlight: [], beforeTokenize: [], afterTokenize: [], beforeAnalyze: [], afterAnalyze: [], afterHighlight: [], afterHighlightNode: [] };D = function () {
    function F(G) {
      return function (I) {
        var H = q.createElement("span");H.className = I.options.classPrefix + G;H.appendChild(I.createTextNode(I.tokens[I.index]));return I.addNode(H) || true;
      };
    }return { handleToken: function handleToken(G) {
        return F(G.tokens[G.index].name)(G);
      }, handle_default: function handle_default(G) {
        return G.addNode(G.createTextNode(G.tokens[G.index]));
      }, handle_ident: function handle_ident(G) {
        var H = function H(J, K) {
          var I;J = J || [];for (I = 0; I < J.length; I++) {
            if (typeof J[I] === "function") {
              if (J[I](G)) {
                return F("named-ident")(G);
              }
            } else {
              if (K && K(J[I])(G.tokens)) {
                return F("named-ident")(G);
              }
            }
          }return false;
        };return H(G.language.namedIdentRules.custom) || H(G.language.namedIdentRules.follows, function (I) {
          return k(G.index - 1, -1, I, G.language.caseInsensitive);
        }) || H(G.language.namedIdentRules.precedes, function (I) {
          return k(G.index + 1, 1, I, G.language.caseInsensitive);
        }) || H(G.language.namedIdentRules.between, function (I) {
          return f(G.index, I.opener, I.closer, G.language.caseInsensitive);
        }) || F("ident")(G);
      } };
  }();r = { analyzer: o(D), customTokens: [], namedIdentRules: {}, punctuation: /[^\w\s]/, numberParser: w, caseInsensitive: false, doNotParse: /\s/, contextItems: {}, embeddedLanguages: {} };s = function () {
    var F = null;if (q.defaultView && q.defaultView.getComputedStyle) {
      F = q.defaultView.getComputedStyle;
    } else {
      F = function F(H, G) {
        return H.currentStyle || {};
      };
    }return function (G, H) {
      return F(G, null)[H];
    };
  }();function u(K) {
    var I = 0,
        N = 1,
        G = 1,
        F,
        H = h,
        M,
        L;K = K.replace(/\r\n/g, "\n").replace(/\r/g, "\n");F = K.length;M = F > 0 ? K.charAt(0) : H;function J(O) {
      var P;if (O === 0) {
        return "";
      }O = O || 1;P = K.substring(I + 1, I + O + 1);return P === "" ? H : P;
    }return { toString: function toString() {
        return "length: " + F + ", index: " + I + ", line: " + N + ", column: " + G + ", current: [" + M + "]";
      }, peek: function peek(O) {
        return J(O);
      }, substring: function substring() {
        return K.substring(I);
      }, peekSubstring: function peekSubstring() {
        return K.substring(I + 1);
      }, read: function read(P) {
        var R = J(P),
            Q,
            O;if (R === "") {
          return R;
        }if (R !== H) {
          I += R.length;G += R.length;if (L) {
            N++;G = 1;L = false;
          }Q = R.substring(0, R.length - 1).replace(/[^\n]/g, "").length;if (Q > 0) {
            N += Q;G = 1;
          }O = l(R);if (O === "\n") {
            L = true;
          }M = O;
        } else {
          I = F;M = H;
        }return R;
      }, text: function text() {
        return K;
      }, getLine: function getLine() {
        return N;
      }, getColumn: function getColumn() {
        return G;
      }, isEof: function isEof() {
        return I >= F;
      }, isSol: function isSol() {
        return G === 1;
      }, isSolWs: function isSolWs() {
        var O = I,
            P;if (G === 1) {
          return true;
        }while ((P = K.charAt(--O)) !== "") {
          if (P === "\n") {
            return true;
          }if (!/\s/.test(P)) {
            return false;
          }
        }return true;
      }, isEol: function isEol() {
        return L;
      }, EOF: H, current: function current() {
        return M;
      } };
  }function o(H) {
    function G() {}G.prototype = H;return new G();
  }function y(H, G) {
    var F;for (F = 0; F < G.length; F++) {
      H.appendChild(G[F]);
    }
  }function l(F) {
    return F.charAt ? F.charAt(F.length - 1) : F[F.length - 1];
  }function i(G, I, F) {
    var H;if (G.indexOf && !F) {
      return G.indexOf(I) >= 0;
    }for (H = 0; H < G.length; H++) {
      if (G[H] === I) {
        return true;
      }if (F && typeof G[H] === "string" && typeof I === "string" && G[H].toUpperCase() === I.toUpperCase()) {
        return true;
      }
    }return false;
  }function g(F, G) {
    var H;if (!G) {
      return F;
    }for (H in G) {
      F[H] = G[H];
    }return F;
  }function x(F) {
    return g({}, F);
  }function C(F) {
    return F.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
  }function k(I, H, G, F) {
    G = G.slice(0);return function (M) {
      var L = I,
          J,
          K,
          N;if (H === 1) {
        G.reverse();
      }for (J = 0; J < G.length; J++) {
        N = M[L + J * H];K = G[G.length - 1 - J];if (N === h) {
          if (K.optional !== h && K.optional) {
            L -= H;
          } else {
            return false;
          }
        } else {
          if (N.name === K.token && (K.values === h || i(K.values, N.value, F))) {
            continue;
          } else {
            if (K.optional !== h && K.optional) {
              L -= H;
            } else {
              return false;
            }
          }
        }
      }return true;
    };
  }function f(H, G, I, F) {
    return function (L) {
      var J = H,
          K,
          M = false;while ((K = L[--J]) !== h) {
        if (K.name === I.token && i(I.values, K.value)) {
          if (K.name === G.token && i(G.values, K.value, F)) {
            M = true;break;
          }return false;
        }if (K.name === G.token && i(G.values, K.value, F)) {
          M = true;break;
        }
      }if (!M) {
        return false;
      }J = H;while ((K = L[++J]) !== h) {
        if (K.name === G.token && i(G.values, K.value, F)) {
          if (K.name === I.token && i(I.values, K.value, F)) {
            M = true;break;
          }return false;
        }if (K.name === I.token && i(I.values, K.value, F)) {
          M = true;break;
        }
      }return M;
    };
  }function e(H, M, I, F) {
    var L = H.reader.current(),
        K,
        G,
        N,
        O = H.reader.getLine(),
        J = H.reader.getColumn();M = M || [];if (H.language.caseInsensitive) {
      L = L.toUpperCase();
    }if (!M[L]) {
      return null;
    }M = M[L];for (K = 0; K < M.length; K++) {
      G = M[K].value;N = L + H.reader.peek(G.length);if (G === N || M[K].regex.test(N)) {
        return H.createToken(I, H.reader.current() + H.reader[F ? "peek" : "read"](G.length - 1), O, J);
      }
    }return null;
  }function z(K, F, J, I) {
    var H = 1,
        G;J = J || 1;while (G = K[F + J * H++]) {
      if (!I(G)) {
        return G;
      }
    }return h;
  }function v(L, K, F) {
    var G = {},
        H,
        J,
        I;for (H = 0; H < L.length; H++) {
      J = F ? L[H].toUpperCase() : L[H];I = J.charAt(0);if (!G[I]) {
        G[I] = [];
      }G[I].push({ value: J, regex: new RegExp("^" + C(J) + K, F ? "i" : "") });
    }return G;
  }function w(I) {
    var L = I.reader.current(),
        K,
        G = I.reader.getLine(),
        J = I.reader.getColumn(),
        F = true,
        H;if (!/\d/.test(L)) {
      if (L !== "." || !/\d/.test(I.reader.peek())) {
        return null;
      }K = L + I.reader.read();F = false;
    } else {
      K = L;if (L === "0" && I.reader.peek() !== ".") {
        F = false;
      }
    }while ((H = I.reader.peek()) !== I.reader.EOF) {
      if (!/[A-Za-z0-9]/.test(H)) {
        if (H === "." && F && /\d$/.test(I.reader.peek(2))) {
          K += I.reader.read();F = false;continue;
        }break;
      }K += I.reader.read();
    }return I.createToken("number", K, G, J);
  }function B(F, H, G) {
    var J = c[F] || [],
        I;for (I = 0; I < J.length; I++) {
      J[I].call(H, G);
    }
  }function d(F) {
    this.options = g(x(b), F);
  }d.prototype = function () {
    var J = function () {
      function W(Z) {
        return Z.language.identFirstLetter && Z.language.identFirstLetter.test(Z.reader.current());
      }function S(Z) {
        return e(Z, Z.language.keywords, "keyword");
      }function X(aa) {
        var ab, Z;if (aa.language.customTokens === h) {
          return null;
        }for (ab in aa.language.customTokens) {
          Z = e(aa, aa.language.customTokens[ab], ab);if (Z !== null) {
            return Z;
          }
        }return null;
      }function V(Z) {
        return e(Z, Z.language.operators, "operator");
      }function R(Z) {
        var aa = Z.reader.current();if (Z.language.punctuation.test(C(aa))) {
          return Z.createToken("punctuation", aa, Z.reader.getLine(), Z.reader.getColumn());
        }return null;
      }function Q(ab) {
        var ad,
            aa,
            Z = ab.reader.getLine(),
            ac = ab.reader.getColumn();if (!W(ab)) {
          return null;
        }ad = ab.reader.current();while ((aa = ab.reader.peek()) !== ab.reader.EOF) {
          if (!ab.language.identAfterFirstLetter.test(aa)) {
            break;
          }ad += ab.reader.read();
        }return ab.createToken("ident", ad, Z, ac);
      }function Y(Z) {
        if (Z.defaultData.text === "") {
          Z.defaultData.line = Z.reader.getLine();Z.defaultData.column = Z.reader.getColumn();
        }Z.defaultData.text += Z.reader.current();return null;
      }function P(Z) {
        var af = Z.reader.current(),
            ab,
            aa,
            ae,
            ag,
            ai,
            ac,
            ad,
            ah;for (ab in Z.language.scopes) {
          aa = Z.language.scopes[ab];for (ae = 0; ae < aa.length; ae++) {
            ag = aa[ae][0];ah = af + Z.reader.peek(ag.length - 1);if (ag !== ah && (!Z.language.caseInsensitive || ah.toUpperCase() !== ag.toUpperCase())) {
              continue;
            }ai = Z.reader.getLine(), ac = Z.reader.getColumn();Z.reader.read(ag.length - 1);ad = H(aa[ae], ab);return ad(Z, ad, ah, ai, ac);
          }
        }return null;
      }function T(Z) {
        return Z.language.numberParser(Z);
      }function U(ab) {
        var ac = ab.language.customParseRules,
            aa,
            Z;if (ac === h) {
          return null;
        }for (aa = 0; aa < ac.length; aa++) {
          Z = ac[aa](ab);if (Z) {
            return Z;
          }
        }return null;
      }return function (Z) {
        if (Z.language.doNotParse.test(Z.reader.current())) {
          return Y(Z);
        }return U(Z) || X(Z) || S(Z) || P(Z) || Q(Z) || T(Z) || V(Z) || R(Z) || Y(Z);
      };
    }();function H(S, T) {
      var Q = S[2] || [],
          P = S[1].length,
          U = typeof S[1] === "string" ? new RegExp(C(S[1])) : S[1].regex,
          R = S[3] || false;return function (Z, V, X, W, ab, Y) {
        var aa = false;X = X || "";Y = Y ? 1 : 0;function ac(af) {
          var ad,
              ag = Z.reader.current(),
              ae;for (ae = 0; ae < Q.length; ae++) {
            ad = (af ? ag : "") + Z.reader.peek(Q[ae].length - af);if (ad === Q[ae]) {
              X += Z.reader.read(ad.length - af);return true;
            }
          }ad = (af ? ag : "") + Z.reader.peek(P - af);if (U.test(ad)) {
            aa = true;return false;
          }X += af ? ag : Z.reader.read();return true;
        }if (!Y || ac(true)) {
          while (Z.reader.peek() !== Z.reader.EOF && ac(false)) {}
        }if (Y) {
          X += Z.reader.current();Z.reader.read();
        } else {
          X += R || Z.reader.peek() === Z.reader.EOF ? "" : Z.reader.read(P);
        }if (!aa) {
          Z.continuation = V;
        }return Z.createToken(T, X, W, ab);
      };
    }function L(R) {
      var Q, P;for (Q = 0; Q < R.language.embeddedLanguages.length; Q++) {
        if (!m[R.language.embeddedLanguages[Q].language]) {
          continue;
        }P = x(R.language.embeddedLanguages[Q]);if (P.switchTo(R)) {
          P.oldItems = x(R.items);R.embeddedLanguageStack.push(P);R.language = m[P.language];R.items = g(R.items, x(R.language.contextItems));break;
        }
      }
    }function O(P) {
      var Q = l(P.embeddedLanguageStack),
          R;if (Q && Q.switchBack(P)) {
        P.language = m[Q.parentLanguage];R = P.embeddedLanguageStack.pop();P.items = x(R.oldItems);R.oldItems = {};
      }
    }function N(T, W, U, Q) {
      var V = [],
          S,
          P,
          R;B("beforeTokenize", this, { code: T, language: W });S = { reader: u(T), language: W, items: x(W.contextItems), token: function token(X) {
          return V[X];
        }, getAllTokens: function getAllTokens() {
          return V.slice(0);
        }, count: function count() {
          return V.length;
        }, options: Q, embeddedLanguageStack: [], defaultData: { text: "", line: 1, column: 1 }, createToken: function createToken(Y, aa, X, Z) {
          return { name: Y, line: X, value: A ? aa.replace(/\n/g, "\r") : aa, column: Z, language: this.language.name };
        } };if (U.continuation) {
        P = U.continuation;U.continuation = null;V.push(P(S, P, "", S.reader.getLine(), S.reader.getColumn(), true));
      }while (!S.reader.isEof()) {
        L(S);R = J(S);if (R !== null) {
          if (S.defaultData.text !== "") {
            V.push(S.createToken("default", S.defaultData.text, S.defaultData.line, S.defaultData.column));S.defaultData.text = "";
          }if (R[0] !== h) {
            V = V.concat(R);
          } else {
            V.push(R);
          }
        }O(S);S.reader.read();
      }if (S.defaultData.text !== "") {
        V.push(S.createToken("default", S.defaultData.text, S.defaultData.line, S.defaultData.column));
      }B("afterTokenize", this, { code: T, parserContext: S });return S;
    }function F(T, R, Q) {
      var P = [],
          S = function () {
        var U, V;if (Q.showWhitespace) {
          U = String.fromCharCode(183);V = new Array(Q.tabWidth).join(String.fromCharCode(8212)) + String.fromCharCode(8594);
        } else {
          U = String.fromCharCode(160);V = new Array(Q.tabWidth + 1).join(U);
        }return function (Z) {
          var aa = Z.value.split(" ").join(U),
              X,
              ab,
              Y,
              W;while ((X = aa.indexOf("\t")) >= 0) {
            ab = aa.lastIndexOf(n, X);Y = ab === -1 ? X : X - ab - 1;W = Q.tabWidth - Y % Q.tabWidth;aa = aa.substring(0, X) + V.substring(Q.tabWidth - W) + aa.substring(X + 1);
          }return aa;
        };
      }();return { tokens: (R.tokens || []).concat(T.getAllTokens()), index: R.index ? R.index + 1 : 0, language: null, getAnalyzer: E, options: Q, continuation: T.continuation, addNode: function addNode(U) {
          P.push(U);
        }, createTextNode: function createTextNode(U) {
          return q.createTextNode(S(U));
        }, getNodes: function getNodes() {
          return P;
        }, resetNodes: function resetNodes() {
          P = [];
        }, items: T.items };
    }function K(Q, P, R) {
      var T = m[P],
          S;R = R || {};if (T === h) {
        T = m[t];
      }B("beforeHighlight", this, { code: Q, language: T, previousContext: R });S = F(N.call(this, Q, T, R, this.options), R, this.options);I.call(this, S, R.index ? R.index + 1 : 0);B("afterHighlight", this, { analyzerContext: S });return S;
    }function M(Q) {
      var P = q.createElement("span");P.className = Q.options.classPrefix + Q.language.name;return P;
    }function I(X, Y) {
      var P, W, Q, U, R, S, T, V;B("beforeAnalyze", this, { analyzerContext: X });if (X.tokens.length > 0) {
        X.language = m[X.tokens[0].language] || m[t];P = [];W = 0;Q = M(X);for (U = Y; U < X.tokens.length; U++) {
          T = m[X.tokens[U].language] || m[t];if (T.name !== X.language.name) {
            y(Q, X.getNodes());X.resetNodes();P.push(Q);X.language = T;Q = M(X);
          }X.index = U;R = X.tokens[U].name;S = "handle_" + R;V = X.getAnalyzer.call(X) || X.language.analyzer;V[S] ? V[S](X) : V.handleToken(X);
        }y(Q, X.getNodes());P.push(Q);X.resetNodes();for (U = 0; U < P.length; U++) {
          X.addNode(P[U]);
        }
      }B("afterAnalyze", this, { analyzerContext: X });
    }return { matchSunlightNode: function () {
        var P;return function (Q) {
          if (!P) {
            P = new RegExp("(?:\\s|^)" + this.options.classPrefix + "highlight-(\\S+)(?:\\s|$)");
          }return P.exec(Q.className);
        };
      }(), isAlreadyHighlighted: function () {
        var P;return function (Q) {
          if (!P) {
            P = new RegExp("(?:\\s|^)" + this.options.classPrefix + "highlighted(?:\\s|$)");
          }return P.test(Q.className);
        };
      }(), highlight: function highlight(Q, P) {
        return K.call(this, Q, P);
      }, highlightNode: function G(S) {
        var V, R, Y, U, Q, T, X, P, W;if (this.isAlreadyHighlighted(S) || (V = this.matchSunlightNode(S)) === null) {
          return;
        }R = V[1];Y = 0;B("beforeHighlightNode", this, { node: S });for (U = 0; U < S.childNodes.length; U++) {
          if (S.childNodes[U].nodeType === 3) {
            X = K.call(this, S.childNodes[U].nodeValue, R, X);p++;Y = Y || p;Q = X.getNodes();S.replaceChild(Q[0], S.childNodes[U]);for (T = 1; T < Q.length; T++) {
              S.insertBefore(Q[T], Q[T - 1].nextSibling);
            }
          } else {
            if (S.childNodes[U].nodeType === 1) {
              G.call(this, S.childNodes[U]);
            }
          }
        }S.className += " " + this.options.classPrefix + "highlighted";if (s(S, "display") === "block") {
          P = q.createElement("div");P.className = this.options.classPrefix + "container";W = q.createElement("div");W.className = this.options.classPrefix + "code-container";if (this.options.maxHeight !== false) {
            W.style.overflowY = "auto";W.style.maxHeight = this.options.maxHeight + (/^\d+$/.test(this.options.maxHeight) ? "px" : "");
          }P.appendChild(W);S.parentNode.insertBefore(W, S);S.parentNode.removeChild(S);W.appendChild(S);W.parentNode.insertBefore(P, W);W.parentNode.removeChild(W);P.appendChild(W);
        }B("afterHighlightNode", this, { container: P, codeContainer: W, node: S, count: Y });
      } };
  }();j.Sunlight = { version: "1.22.0", Highlighter: d, createAnalyzer: function createAnalyzer() {
      return o(D);
    }, globalOptions: b, highlightAll: function highlightAll(H) {
      var G = new d(H),
          F = q.getElementsByTagName("*"),
          I;for (I = 0; I < F.length; I++) {
        G.highlightNode(F[I]);
      }
    }, registerLanguage: function registerLanguage(F, J) {
      var I, H, G;if (!F) {
        throw 'Languages must be registered with an identifier, e.g. "php" for PHP';
      }J = g(g({}, r), J);J.name = F;J.keywords = v(J.keywords || [], "\\b", J.caseInsensitive);J.operators = v(J.operators || [], "", J.caseInsensitive);for (I in J.customTokens) {
        J.customTokens[I] = v(J.customTokens[I].values ? J.customTokens[I].values : [], J.customTokens[I].boundary, J.caseInsensitive);
      }H = [];for (G in J.embeddedLanguages) {
        H.push({ parentLanguage: J.name, language: G, switchTo: J.embeddedLanguages[G].switchTo, switchBack: J.embeddedLanguages[G].switchBack });
      }J.embeddedLanguages = H;m[J.name] = J;
    }, isRegistered: function isRegistered(F) {
      return m[F] !== h;
    }, bind: function bind(F, G) {
      if (!c[F]) {
        throw 'Unknown event "' + F + '"';
      }c[F].push(G);
    }, util: { last: l, regexEscape: C, eol: n, clone: x, escapeSequences: ["\\n", "\\t", "\\r", "\\\\", "\\v", "\\f"], contains: i, matchWord: e, createHashMap: v, createBetweenRule: f, createProceduralRule: k, getNextNonWsToken: function getNextNonWsToken(G, F) {
        return z(G, F, 1, function (H) {
          return H.name === "default";
        });
      }, getPreviousNonWsToken: function getPreviousNonWsToken(G, F) {
        return z(G, F, -1, function (H) {
          return H.name === "default";
        });
      }, getNextWhile: function getNextWhile(H, F, G) {
        return z(H, F, 1, G);
      }, getPreviousWhile: function getPreviousWhile(H, F, G) {
        return z(H, F, -1, G);
      }, whitespace: { token: "default", optional: true }, getComputedStyle: s } };j.Sunlight.registerLanguage(t, { punctuation: /(?!x)x/, numberParser: E });
})(undefined, document);(function (b, a, d) {
  if (b === d) {
    throw "Include sunlight.js before including plugin files";
  }function c(g) {
    var e = function f(h) {
      if (!h.lastChild) {
        return null;
      }if (h.lastChild.nodeType === 3) {
        return h.lastChild;
      }return f(h.lastChild);
    }(g) || { lastChild: "" };return g.innerHTML.replace(/[^\n]/g, "").length - /\n$/.test(e.nodeValue);
  }b.bind("afterHighlightNode", function (g) {
    var n, o, j, m, e, h, k, l, f;if (!this.options.lineNumbers) {
      return;
    }if (this.options.lineNumbers === "automatic" && b.util.getComputedStyle(g.node, "display") !== "block") {
      return;
    }n = a.createElement("pre");o = c(g.node);e = this.options.lineHighlight.length > 0;if (e) {
      j = a.createElement("div");j.className = this.options.classPrefix + "line-highlight-overlay";
    }n.className = this.options.classPrefix + "line-number-margin";k = a.createTextNode(b.util.eol);for (h = this.options.lineNumberStart; h <= this.options.lineNumberStart + o; h++) {
      l = a.createElement("a");f = (g.node.id ? g.node.id : this.options.classPrefix + g.count) + "-line-" + h;l.setAttribute("name", f);l.setAttribute("href", "#" + f);l.appendChild(a.createTextNode(h));n.appendChild(l);n.appendChild(k.cloneNode(false));if (e) {
        m = a.createElement("div");if (b.util.contains(this.options.lineHighlight, h)) {
          m.className = this.options.classPrefix + "line-highlight-active";
        }j.appendChild(m);
      }
    }g.codeContainer.insertBefore(n, g.codeContainer.firstChild);if (e) {
      g.codeContainer.appendChild(j);
    }g.codeContainer.style.borderWidth = "1px";g.codeContainer.style.borderStyle = "solid";
  });b.globalOptions.lineNumbers = "automatic";b.globalOptions.lineNumberStart = 1;b.globalOptions.lineHighlight = [];
})(undefined["Sunlight"], document);(function (sunlight, document, undefined) {
  if (sunlight === undefined) {
    throw "Include sunlight.js before including plugin files";
  }var ieVersion = eval("0 /*@cc_on+ScriptEngineMajorVersion()@*/");function createLink(href, title, text) {
    var link = document.createElement("a");link.setAttribute("href", href);link.setAttribute("title", title);if (text) {
      link.appendChild(document.createTextNode(text));
    }return link;
  }function getTextRecursive(node) {
    var text = "",
        i = 0;if (node.nodeType === 3) {
      return node.nodeValue;
    }text = "";for (i = 0; i < node.childNodes.length; i++) {
      text += getTextRecursive(node.childNodes[i]);
    }return text;
  }sunlight.bind("afterHighlightNode", function (context) {
    var menu, sunlightIcon, ul, collapse, mDash, collapseLink, viewRaw, viewRawLink, about, aboutLink, icon;if (ieVersion && ieVersion < 7 || !this.options.showMenu || sunlight.util.getComputedStyle(context.node, "display") !== "block") {
      return;
    }menu = document.createElement("div");menu.className = this.options.classPrefix + "menu";sunlightIcon = "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41Ljg3O4BdAAAAl0lEQVQ4jWP4P9n9PyWYgTYGzAr+///Q9P//Ty/HjhfEETDg1oH/YPDgNKbm4wsIuGBO+H84WJJKhhd2dkA0v3tEZhjcPQox4MVN7P7fUEHAgM112DX++Qkx+PEFMqPxwSmIAQenkWHAvCicAUucAbCAfX2PQCCCEtDGKkz86RXEgL39BAwAKcAFbh/6/39GIL3yAj0NAAB+LQeDCZ9tvgAAAABJRU5ErkJggg==";ul = document.createElement("ul");collapse = document.createElement("li");mDash = String.fromCharCode(8212);collapseLink = createLink("#", "collapse code block", mDash);collapseLink.onclick = function () {
      var originalHeight = sunlight.util.getComputedStyle(context.codeContainer, "height"),
          originalOverflow = sunlight.util.getComputedStyle(context.codeContainer, "overflowY");return function () {
        var needsToExpand = sunlight.util.getComputedStyle(context.codeContainer, "height") !== originalHeight;this.replaceChild(document.createTextNode(needsToExpand ? mDash : "+"), this.firstChild);this.setAttribute("title", (needsToExpand ? "collapse" : "expand") + " clode block");context.codeContainer.style.height = needsToExpand ? originalHeight : "0px";context.codeContainer.style.overflowY = needsToExpand ? originalOverflow : "hidden";return false;
      };
    }();collapse.appendChild(collapseLink);viewRaw = document.createElement("li");viewRawLink = createLink("#", "view raw code", "raw");viewRawLink.onclick = function () {
      var textarea;return function () {
        var rawCode;if (textarea) {
          textarea.parentNode.removeChild(textarea);textarea = null;context.node.style.display = "block";this.replaceChild(document.createTextNode("raw"), this.firstChild);this.setAttribute("title", "view raw code");
        } else {
          rawCode = getTextRecursive(context.node);textarea = document.createElement("textarea");textarea.value = rawCode;textarea.setAttribute("readonly", "readonly");textarea.style.width = parseInt(sunlight.util.getComputedStyle(context.node, "width")) - 5 + "px";textarea.style.height = sunlight.util.getComputedStyle(context.node, "height");textarea.style.border = "none";textarea.style.overflowX = "hidden";textarea.setAttribute("wrap", "off");context.codeContainer.insertBefore(textarea, context.node);context.node.style.display = "none";this.replaceChild(document.createTextNode("highlighted"), this.firstChild);this.setAttribute("title", "view highlighted code");textarea.select();
        }return false;
      };
    }();viewRaw.appendChild(viewRawLink);about = document.createElement("li");aboutLink = createLink("http://sunlightjs.com/", "Sunlight: JavaScript syntax highlighter by Tommy Montgomery");icon = document.createElement("img");icon.setAttribute("src", "data:image/png;base64," + sunlightIcon);icon.setAttribute("alt", "about");aboutLink.appendChild(icon);about.appendChild(aboutLink);ul.appendChild(about);ul.appendChild(viewRaw);ul.appendChild(collapse);menu.appendChild(ul);context.container.insertBefore(menu, context.container.firstChild);if (this.options.autoCollapse) {
      collapseLink.onclick.call(collapseLink);
    }
  });sunlight.globalOptions.showMenu = false;sunlight.globalOptions.autoCollapse = false;
})(undefined["Sunlight"], document);(function (c, a, e) {
  if (c === e) {
    throw "Include sunlight.js before including plugin files";
  }var b = { php: { "function": function _function(f) {
        return "http://php.net/" + f;
      }, languageConstruct: function languageConstruct(f) {
        return "http://php.net/" + f;
      } }, ruby: { "function": function _function(f) {
        return "http://www.ruby-doc.org/docs/ruby-doc-bundle/Manual/man-1.4/function.html#" + f.replace(/!/g, "_bang").replace(/\?/g, "_p");
      } }, python: { "function": function _function(f) {
        return "http://docs.python.org/py3k/library/functions.html#" + f;
      } }, perl: { "function": function _function(f) {
        return "http://perldoc.perl.org/functions/" + f + ".html";
      } }, lua: { "function": function _function(f) {
        return "http://www.lua.org/manual/5.1/manual.html#pdf-" + f;
      } } };function d(f) {
    return function (g) {
      var h = a.createElement("a");h.className = g.options.classPrefix + g.tokens[g.index].name;h.setAttribute("href", f(g.tokens[g.index].value));h.appendChild(g.createTextNode(g.tokens[g.index]));g.addNode(h);
    };
  }c.bind("beforeAnalyze", function (f) {
    if (!this.options.enableDocLinks) {
      return;
    }f.analyzerContext.getAnalyzer = function () {
      var i = b[this.language.name],
          h,
          g;if (!i) {
        return;
      }h = c.util.clone(f.analyzerContext.language.analyzer);for (g in i) {
        if (!i.hasOwnProperty(g)) {
          continue;
        }h["handle_" + g] = d(i[g]);
      }return h;
    };
  });c.globalOptions.enableDocLinks = false;
})(undefined["Sunlight"], document);(function (a, e) {
  if (a === e || a.registerLanguage === e) {
    throw "Include sunlight.js before including language files";
  }var d = ["int", "bool", "double", "float", "char", "byte", "sbyte", "uint", "long", "ulong", "char", "decimal", "short", "ushort"],
      c = d.concat(["in", "out", "string", "object"]);function b(g) {
    var f = /^T([A-Z0-9]\w*)?$/;return function (h) {
      return !f.test(h.tokens[h.index].value) && g(h);
    };
  }a.registerLanguage("csharp", { keywords: d.concat(["extern alias", "public", "private", "protected", "internal", "static", "sealed", "abstract", "partial", "virtual", "override", "new", "implicit", "explicit", "extern", "override", "operator", "const", "readonly", "volatile", "class", "interface", "enum", "struct", "event", "delegate", "null", "true", "false", "string", "object", "void", "for", "foreach", "do", "while", "fixed", "unchecked", "using", "lock", "namespace", "checked", "unsafe", "if", "else", "try", "catch", "finally", "break", "continue", "goto", "case", "throw", "return", "switch", "yield return", "yield break", "in", "out", "ref", "params", "as", "is", "typeof", "this", "sizeof", "stackalloc", "var", "default", "from", "select", "where", "groupby", "orderby"]), customParseRules: [function (g) {
      var k = "xmlDocCommentMeta",
          j = "xmlDocCommentContent",
          i,
          f,
          h = { line: 0, column: 0, value: "", name: null };if (g.reader.current() !== "/" || g.reader.peek(2) !== "//") {
        return null;
      }i = [g.createToken(k, "///", g.reader.getLine(), g.reader.getColumn())];g.reader.read(2);while ((f = g.reader.peek()) !== g.reader.EOF) {
        if (f === "<" && h.name !== k) {
          if (h.value !== "") {
            i.push(g.createToken(h.name, h.value, h.line, h.column));
          }h.line = g.reader.getLine();h.column = g.reader.getColumn();h.name = k;h.value = g.reader.read();continue;
        }if (f === ">" && h.name === k) {
          h.value += g.reader.read();i.push(g.createToken(h.name, h.value, h.line, h.column));h.name = null;h.value = "";continue;
        }if (f === "\n") {
          break;
        }if (h.name === null) {
          h.name = j;h.line = g.reader.getLine();h.column = g.reader.getColumn();
        }h.value += g.reader.read();
      }if (h.name === j) {
        i.push(g.createToken(h.name, h.value, h.line, h.column));
      }return i.length > 0 ? i : null;
    }, function (h) {
      var m,
          k,
          g,
          j = false,
          f = h.reader.getLine(),
          i = h.reader.getColumn(),
          l;if (!/^(get|set)\b/.test(h.reader.current() + h.reader.peek(3))) {
        return null;
      }m = a.util.createProceduralRule(h.count() - 1, -1, [{ token: "punctuation", values: ["}", "{", ";"] }, a.util.whitespace, { token: "keyword", values: ["public", "private", "protected", "internal"], optional: true }]);if (!m(h.getAllTokens())) {
        return null;
      }k = "get".length;g = h.reader.peek(k);while (g.length === k) {
        if (!/\s$/.test(g)) {
          if (!/[\{;]$/.test(g)) {
            return null;
          }j = true;break;
        }g = h.reader.peek(++k);
      }if (!j) {
        return null;
      }l = h.reader.current() + h.reader.read(2);return h.createToken("keyword", l, f, i);
    }, function (f) {
      var k,
          m,
          h,
          j,
          l,
          g,
          o = f.reader.getLine(),
          i = f.reader.getColumn(),
          n;if (!/^value\b/.test(f.reader.current() + f.reader.peek(5))) {
        return null;
      }k = "value".length;m = f.reader.peek(k);while (m.length === k) {
        if (!/\s$/.test(m)) {
          n = f.reader.peek(k + 1);if (m.charAt(m.length - 1) === "=" && n.charAt(n.length - 1) !== "=") {
            return null;
          }h = true;break;
        }m = f.reader.peek(++k);
      }if (!h) {
        return null;
      }l = f.count() - 1;g = [0, 0];tokenLoop: while ((j = f.token(l--)) !== e) {
        if (j.name === "punctuation") {
          if (j.value === "{") {
            g[0]++;
          } else {
            if (j.value === "}") {
              g[1]++;
            }
          }
        } else {
          if (j.name === "keyword") {
            switch (j.value) {case "set":
                break tokenLoop;case "class":case "public":case "private":case "protected":case "internal":
                return null;}
          }
        }
      }if (j === e) {
        return null;
      }if (g[1] >= g[0]) {
        return null;
      }f.reader.read(4);return f.createToken("keyword", "value", o, i);
    }], scopes: { string: [['"', '"', a.util.escapeSequences.concat(['\\"'])], ['@"', '"', ['""']]], "char": [["'", "'", ["\\'", "\\\\"]]], comment: [["//", "\n", null, true], ["/*", "*/"]], pragma: [["#", "\n", null, true]] }, identFirstLetter: /[A-Za-z_@]/, identAfterFirstLetter: /\w/, namedIdentRules: { custom: [b(function (j) {
        var h = j.index,
            i,
            g = false,
            f;while ((i = j.tokens[--h]) !== e) {
          if (i.name === "punctuation" && i.value === "{") {
            return false;
          }if (i.name === "keyword" && i.value === "case") {
            return false;
          }if (i.name === "keyword" && (i.value === "class" || i.value === "where")) {
            f = j.tokens[h + 1].name === "default" ? j.tokens[h + 2] : j.tokens[h + 1];if (f.name === "punctuation" && f.value === ",") {
              continue;
            }break;
          }if (i.name === "operator" && i.value === ":") {
            g = true;
          }
        }if (!g) {
          return false;
        }return true;
      }), b(function (j) {
        var h = j.index,
            i,
            g = false,
            f = [0, 0];while ((i = j.tokens[--h]) !== e) {
          if (i.name === "keyword" && i.value === "class") {
            return false;
          }if (i.name === "operator") {
            switch (i.value) {case "<":case "<<":
                f[0] += i.value.length;continue;case ">":case ">>":
                if (f[0] === 0) {
                  return false;
                }f[1] += i.value.length;continue;}break;
          }if (i.name === "keyword" && a.util.contains(c, i.value) || i.name === "default" || i.name === "punctuation" && i.value === ",") {
            continue;
          }if (i.name === "ident") {
            g = true;continue;
          }break;
        }if (!g || f[0] === 0) {
          return false;
        }h = j.index;while ((i = j.tokens[++h]) !== e) {
          if (i.name === "operator" && (i.value === ">" || i.value === ">>")) {
            return true;
          }if (i.name === "keyword" && a.util.contains(c, i.value) || i.name === "operator" && a.util.contains(["<", "<<", ">", ">>"], i.value) || i.name === "punctuation" && i.value === "," || i.name === "ident" || i.name === "default") {
            continue;
          }return false;
        }return false;
      }), b(function (i) {
        var h = a.util.getPreviousNonWsToken(i.tokens, i.index),
            g,
            f;if (h !== e) {
          if (h.name === "ident" || h.name === "keyword" && a.util.contains(d.concat(["string", "object", "void"]), h.value) || h.name === "operator" && h.value === ".") {
            return false;
          }
        }h = a.util.getNextNonWsToken(i.tokens, i.index);if (!h || h.name !== "operator" || h.value !== "<") {
          return false;
        }g = i.index;f = [0, 0];while ((h = i.tokens[++g]) !== e) {
          if (h.name === "operator") {
            switch (h.value) {case "<":
                f[0]++;break;case "<<":
                f[0] += 2;break;case ">":
                f[1]++;break;case ">>":
                f[1] += 2;break;default:
                return false;}if (f[0] === f[1]) {
              break;
            }continue;
          }if (h.name === "default" || h.name === "ident" || h.name === "keyword" && a.util.contains(c, h.value) || h.name === "punctuation" && h.value === ",") {
            continue;
          }return false;
        }if (f[0] !== f[1]) {
          return false;
        }h = i.tokens[++g];if (!h || h.name !== "default" && h.name !== "ident") {
          return false;
        }if (h.name === "default") {
          h = i.tokens[++g];if (!h || h.name !== "ident") {
            return false;
          }
        }return true;
      }), function (g) {
        var h = a.util.getPreviousNonWsToken(g.tokens, g.index),
            f;if (!h || h.name !== "keyword" || h.value !== "using") {
          return false;
        }f = a.util.getNextNonWsToken(g.tokens, g.index);if (!f || f.name !== "operator" || f.value !== "=") {
          return false;
        }return true;
      }, b(function (j) {
        var i = a.util.getNextNonWsToken(j.tokens, j.index),
            g,
            f,
            k = false,
            h;if (i && i.name === "operator" && (i.value === "=" || i.value === ".")) {
          return false;
        }g = j.index;f = [0, 0];k = false;while ((i = j.tokens[--g]) !== e) {
          if (i.name === "punctuation") {
            if (i.value === "[") {
              f[0]++;continue;
            }if (i.value === "]") {
              f[1]++;continue;
            }if (i.value === ",") {
              k = true;
            }if (i.value === "{" || i.value === "}" || i.value === ";") {
              break;
            }
          }
        }if (f[0] === 0 || f[0] === f[1]) {
          return false;
        }g = j.index;h = -1;while ((i = j.tokens[++g]) !== e) {
          if (i.name === "punctuation") {
            if (i.value === "[") {
              f[0]++;continue;
            }if (i.value === "]") {
              h = g;f[1]++;continue;
            }if (i.value === "{" || i.value === "}" || i.value === ";") {
              break;
            }
          }
        }if (h < 0 || f[0] !== f[1]) {
          return false;
        }i = a.util.getNextNonWsToken(j.tokens, h);if (i && (i.name === "keyword" || i.name === "ident")) {
          return true;
        }return false;
      }), b(function (i) {
        var f = a.util.getNextNonWsToken(i.tokens, i.index),
            h,
            g,
            j;if (f && f.name === "operator" && f.value === ".") {
          return false;
        }g = i.index;j = i.tokens[g];while ((h = i.tokens[--g]) !== e) {
          if (h.name === "keyword" && (h.value === "new" || h.value === "is")) {
            return true;
          }if (h.name === "default") {
            continue;
          }if (h.name === "ident") {
            if (j && j.name === "ident") {
              return false;
            }j = h;continue;
          }if (h.name === "operator" && h.value === ".") {
            if (j && j.name !== "ident") {
              return false;
            }j = h;continue;
          }break;
        }return false;
      }), function () {
        var f = [[a.util.whitespace, { token: "punctuation", values: [")"] }, a.util.whitespace, { token: "ident" }], [a.util.whitespace, { token: "punctuation", values: [")"] }, a.util.whitespace, { token: "keyword", values: ["this"] }]];return b(function (j) {
          var i,
              h,
              k,
              g = function (m) {
            for (var l = 0; l < f.length; l++) {
              if (a.util.createProceduralRule(j.index + 1, 1, f[l], false)(m)) {
                return true;
              }
            }return false;
          }(j.tokens);if (!g) {
            return false;
          }h = j.index;while (i = j.tokens[--h]) {
            if (i.name === "punctuation" && i.value === "(") {
              k = a.util.getPreviousNonWsToken(j.tokens, h);if (k && k.name === "keyword") {
                return false;
              }return true;
            }
          }return false;
        });
      }(), function (i) {
        var f = a.util.getNextNonWsToken(i.tokens, i.index),
            h,
            g;if (!f || f.name !== "punctuation" || f.value !== ";") {
          return false;
        }g = i.index;while (h = i.tokens[--g]) {
          if (h.name !== "ident" && h.name !== "default" && (h.name !== "operator" || h.value !== ".")) {
            if (h.name !== "operator" || h.value !== "=") {
              return false;
            }return a.util.createProceduralRule(g - 1, -1, [{ token: "keyword", values: ["using"] }, { token: "default" }, { token: "ident" }, a.util.whitespace])(i.tokens);
          }
        }return false;
      }, b(function (h) {
        var g,
            j = [[{ token: "keyword", values: ["class", "interface", "event", "struct", "enum", "delegate", "public", "private", "protected", "internal", "static", "virtual", "sealed", "params"] }, a.util.whitespace], [{ token: "keyword", values: ["typeof", "default"] }, a.util.whitespace, { token: "punctuation", values: ["("] }, a.util.whitespace], [{ token: "keyword", values: ["as"] }, a.util.whitespace]],
            f = [[a.util.whitespace, { token: "punctuation", values: ["["] }, a.util.whitespace, { token: "punctuation", values: ["]"] }], [{ token: "default" }, { token: "ident" }]];for (g = 0; g < j.length; g++) {
          if (a.util.createProceduralRule(h.index - 1, -1, j[g], false)(h.tokens)) {
            return true;
          }
        }for (g = 0; g < f.length; g++) {
          if (a.util.createProceduralRule(h.index + 1, 1, f[g], false)(h.tokens)) {
            return true;
          }
        }return false;
      })] }, operators: ["++", "+=", "+", "--", "-=", "-", "*=", "*", "/=", "/", "%=", "%", "&&", "||", "|=", "|", "&=", "&", "^=", "^", ">>=", ">>", "<<=", "<<", "<=", "<", ">=", ">", "==", "!=", "!", "~", "??", "?", "::", ":", ".", "=>", "="] });
})(undefined["Sunlight"]);(function (a, b) {
  if (a === b || a.registerLanguage === b) {
    throw "Include sunlight.js before including language files";
  }a.registerLanguage("javascript", { keywords: ["break", "case", "catch", "continue", "default", "delete", "do", "else", "finally", "for", "function", "if", "in", "instanceof", "new", "return", "switch", "this", "throw", "try", "typeof", "var", "void", "while", "with", "true", "false", "null"], customTokens: { reservedWord: { values: ["abstract", "boolean", "byte", "char", "class", "const", "debugger", "double", "enum", "export", "extends", "final", "float", "goto", "implements", "import", "int", "interface", "long", "native", "package", "private", "protected", "public", "short", "static", "super", "synchronized", "throws", "transient", "volatile"], boundary: "\\b" }, globalVariable: { values: ["NaN", "Infinity", "undefined"], boundary: "\\b" }, globalFunction: { values: ["encodeURI", "encodeURIComponent", "decodeURI", "decodeURIComponent", "parseInt", "parseFloat", "isNaN", "isFinite", "eval"], boundary: "\\b" }, globalObject: { values: ["Math", "JSON", "XMLHttpRequest", "XDomainRequest", "ActiveXObject", "Boolean", "Date", "Array", "Image", "Function", "Object", "Number", "RegExp", "String"], boundary: "\\b" } }, scopes: { string: [['"', '"', a.util.escapeSequences.concat(['\\"'])], ["'", "'", a.util.escapeSequences.concat(["\\'", "\\\\"])]], comment: [["//", "\n", null, true], ["/*", "*/"]] }, customParseRules: [function (c) {
      var j = c.reader.peek(),
          i,
          e = "/",
          k = c.reader.getLine(),
          d = c.reader.getColumn(),
          h = false,
          g,
          f;if (c.reader.current() !== "/" || j === "/" || j === "*") {
        return null;
      }i = function () {
        var m = c.token(c.count() - 1),
            l = null;if (c.defaultData.text !== "") {
          l = c.createToken("default", c.defaultData.text);
        }if (!l) {
          l = m;
        }if (l === b) {
          return true;
        }if (l.name === "default" && l.value.indexOf("\n") > -1) {
          return true;
        }if (a.util.contains(["keyword", "ident", "number"], m.name)) {
          return false;
        }if (m.name === "punctuation" && !a.util.contains(["(", "{", "[", ",", ";"], m.value)) {
          return false;
        }return true;
      }();if (!i) {
        return null;
      }while (c.reader.peek() !== c.reader.EOF) {
        g = c.reader.peek(2);if (g === "\\/" || g === "\\\\") {
          e += c.reader.read(2);continue;
        }if (g === "\\[" || g === "\\]") {
          e += c.reader.read(2);continue;
        } else {
          if (f === "[") {
            h = true;
          } else {
            if (f === "]") {
              h = false;
            }
          }
        }e += f = c.reader.read();if (f === "/" && !h) {
          break;
        }
      }while (c.reader.peek() !== c.reader.EOF) {
        if (!/[A-Za-z]/.test(c.reader.peek())) {
          break;
        }e += c.reader.read();
      }return c.createToken("regexLiteral", e, k, d);
    }], identFirstLetter: /[$A-Za-z_]/, identAfterFirstLetter: /[\w\$]/, namedIdentRules: { follows: [[{ token: "keyword", values: ["function"] }, a.util.whitespace]] }, operators: ["++", "+=", "+", "--", "-=", "-", "*=", "*", "/=", "/", "%=", "%", "&&", "||", "|=", "|", "&=", "&", "^=", "^", ">>>=", ">>>", ">>=", ">>", "<<=", "<<", "<=", "<", ">=", ">", "===", "==", "!==", "!=", "!", "~", "?", ":", ".", "="] });
})(undefined["Sunlight"]);(function (b, a, c) {
  if (b === c || b.registerLanguage === c) {
    throw "Include sunlight.js before including language files";
  }b.registerLanguage("php", { keywords: ["public", "private", "protected", "static", "final", "abstract", "extends", "implements", "const", "var", "class", "interface", "integer", "boolean", "int", "bool", "double", "float", "real", "string", "null", "true", "false", "for", "foreach", "do", "while", "as", "endwhile", "endfor", "endforeach", "namespace", "if", "else", "elseif", "try", "catch", "break", "continue", "goto", "case", "throw", "switch", "endif", "endswitch", "endwhile", "instanceof", "use", "and", "or", "xor", "self", "parent", "clone", "default", "new", "function", "declare", "enddeclare", "global"], customTokens: { "function": { values: ["zlib_get_coding_type", "zip_read", "zip_open", "zip_entry_read", "zip_entry_open", "zip_entry_name", "zip_entry_filesize", "zip_entry_compressionmethod", "zip_entry_compressedsize", "zip_entry_close", "zip_close", "zend_version", "zend_logo_guid", "xmlwriter_write_raw", "xmlwriter_write_pi", "xmlwriter_write_element_ns", "xmlwriter_write_element", "xmlwriter_write_dtd_entity", "xmlwriter_write_dtd_element", "xmlwriter_write_dtd_attlist", "xmlwriter_write_dtd", "xmlwriter_write_comment", "xmlwriter_write_cdata", "xmlwriter_write_attribute_ns", "xmlwriter_write_attribute", "xmlwriter_text", "xmlwriter_start_pi", "xmlwriter_start_element_ns", "xmlwriter_start_element", "xmlwriter_start_dtd_entity", "xmlwriter_start_dtd_element", "xmlwriter_start_dtd_attlist", "xmlwriter_start_dtd", "xmlwriter_start_document", "xmlwriter_start_comment", "xmlwriter_start_cdata", "xmlwriter_start_attribute_ns", "xmlwriter_start_attribute", "xmlwriter_set_indent_string", "xmlwriter_set_indent", "xmlwriter_output_memory", "xmlwriter_open_uri", "xmlwriter_open_memory", "xmlwriter_full_end_element", "xmlwriter_flush", "xmlwriter_end_pi", "xmlwriter_end_element", "xmlwriter_end_dtd_entity", "xmlwriter_end_dtd_element", "xmlwriter_end_dtd_attlist", "xmlwriter_end_dtd", "xmlwriter_end_document", "xmlwriter_end_comment", "xmlwriter_end_cdata", "xmlwriter_end_attribute", "xmlrpc_set_type", "xmlrpc_server_register_method", "xmlrpc_server_register_introspection_callback", "xmlrpc_server_destroy", "xmlrpc_server_create", "xmlrpc_server_call_method", "xmlrpc_server_add_introspection_data", "xmlrpc_parse_method_descriptions", "xmlrpc_is_fault", "xmlrpc_get_type", "xmlrpc_encode_request", "xmlrpc_encode", "xmlrpc_decode_request", "xmlrpc_decode", "xml_set_unparsed_entity_decl_handler", "xml_set_start_namespace_decl_handler", "xml_set_processing_instruction_handler", "xml_set_object", "xml_set_notation_decl_handler", "xml_set_external_entity_ref_handler", "xml_set_end_namespace_decl_handler", "xml_set_element_handler", "xml_set_default_handler", "xml_set_character_data_handler", "xml_parser_set_option", "xml_parser_get_option", "xml_parser_free", "xml_parser_create_ns", "xml_parser_create", "xml_parse_into_struct", "xml_parse", "xml_get_error_code", "xml_get_current_line_number", "xml_get_current_column_number", "xml_get_current_byte_index", "xml_error_string", "wordwrap", "wddx_serialize_vars", "wddx_serialize_value", "wddx_packet_start", "wddx_packet_end", "wddx_deserialize", "wddx_add_vars", "vsprintf", "vprintf", "vfprintf", "version_compare", "variant_xor", "variant_sub", "variant_set_type", "variant_set", "variant_round", "variant_pow", "variant_or", "variant_not", "variant_neg", "variant_mul", "variant_mod", "variant_int", "variant_imp", "variant_idiv", "variant_get_type", "variant_fix", "variant_eqv", "variant_div", "variant_date_to_timestamp", "variant_date_from_timestamp", "variant_cmp", "variant_cat", "variant_cast", "variant_and", "variant_add", "variant_abs", "var_export", "var_dump", "utf8_encode", "utf8_decode", "usort", "usleep", "user_error", "use_soap_error_handler", "urlencode", "urldecode", "unserialize", "unregister_tick_function", "unpack", "unlink", "unixtojd", "uniqid", "umask", "uksort", "ucwords", "ucfirst", "uasort", "trim", "trigger_error", "touch", "token_name", "token_get_all", "tmpfile", "timezone_version_get", "timezone_transitions_get", "timezone_open", "timezone_offset_get", "timezone_name_get", "timezone_name_from_abbr", "timezone_location_get", "timezone_identifiers_list", "timezone_abbreviations_list", "time_sleep_until", "time_nanosleep", "time", "tidy_warning_count", "tidy_repair_string", "tidy_repair_file", "tidy_parse_string", "tidy_parse_file", "tidy_is_xml", "tidy_is_xhtml", "tidy_getopt", "tidy_get_status", "tidy_get_root", "tidy_get_release", "tidy_get_output", "tidy_get_html_ver", "tidy_get_html", "tidy_get_head", "tidy_get_error_buffer", "tidy_get_config", "tidy_get_body", "tidy_error_count", "tidy_diagnose", "tidy_config_count", "tidy_clean_repair", "tidy_access_count", "textdomain", "tempnam", "tanh", "tan", "system", "syslog", "sys_get_temp_dir", "symlink", "substr_replace", "substr_count", "substr_compare", "substr", "strval", "strtr", "strtoupper", "strtotime", "strtolower", "strtok", "strstr", "strspn", "strrpos", "strripos", "strrev", "strrchr", "strpos", "strpbrk", "strncmp", "strncasecmp", "strnatcmp", "strnatcasecmp", "strlen", "stristr", "stripslashes", "stripos", "stripcslashes", "strip_tags", "strftime", "stream_wrapper_unregister", "stream_wrapper_restore", "stream_wrapper_register", "stream_supports_lock", "stream_socket_shutdown", "stream_socket_server", "stream_socket_sendto", "stream_socket_recvfrom", "stream_socket_pair", "stream_socket_get_name", "stream_socket_enable_crypto", "stream_socket_client", "stream_socket_accept", "stream_set_write_buffer", "stream_set_timeout", "stream_set_blocking", "stream_select", "stream_resolve_include_path", "stream_register_wrapper", "stream_is_local", "stream_get_wrappers", "stream_get_transports", "stream_get_meta_data", "stream_get_line", "stream_get_filters", "stream_get_contents", "stream_filter_remove", "stream_filter_register", "stream_filter_prepend", "stream_filter_append", "stream_copy_to_stream", "stream_context_set_params", "stream_context_set_option", "stream_context_set_default", "stream_context_get_params", "stream_context_get_options", "stream_context_get_default", "stream_context_create", "stream_bucket_prepend", "stream_bucket_new", "stream_bucket_make_writeable", "stream_bucket_append", "strcspn", "strcoll", "strcmp", "strchr", "strcasecmp", "str_word_count", "str_split", "str_shuffle", "str_rot13", "str_replace", "str_repeat", "str_pad", "str_ireplace", "str_getcsv", "stat", "sscanf", "srand", "sqrt", "sqlite_valid", "sqlite_unbuffered_query", "sqlite_udf_encode_binary", "sqlite_udf_decode_binary", "sqlite_single_query", "sqlite_seek", "sqlite_rewind", "sqlite_query", "sqlite_prev", "sqlite_popen", "sqlite_open", "sqlite_num_rows", "sqlite_num_fields", "sqlite_next", "sqlite_libversion", "sqlite_libencoding", "sqlite_last_insert_rowid", "sqlite_last_error", "sqlite_has_prev", "sqlite_has_more", "sqlite_field_name", "sqlite_fetch_string", "sqlite_fetch_single", "sqlite_fetch_object", "sqlite_fetch_column_types", "sqlite_fetch_array", "sqlite_fetch_all", "sqlite_factory", "sqlite_exec", "sqlite_escape_string", "sqlite_error_string", "sqlite_current", "sqlite_create_function", "sqlite_create_aggregate", "sqlite_column", "sqlite_close", "sqlite_changes", "sqlite_busy_timeout", "sqlite_array_query", "sql_regcase", "sprintf", "spliti", "split", "spl_object_hash", "spl_classes", "spl_autoload_unregister", "spl_autoload_register", "spl_autoload_functions", "spl_autoload_extensions", "spl_autoload_call", "spl_autoload", "soundex", "sort", "socket_write", "socket_strerror", "socket_shutdown", "socket_setopt", "socket_set_timeout", "socket_set_option", "socket_set_nonblock", "socket_set_blocking", "socket_set_block", "socket_sendto", "socket_send", "socket_select", "socket_recvfrom", "socket_recv", "socket_read", "socket_listen", "socket_last_error", "socket_getsockname", "socket_getpeername", "socket_getopt", "socket_get_status", "socket_get_option", "socket_create_pair", "socket_create_listen", "socket_create", "socket_connect", "socket_close", "socket_clear_error", "socket_bind", "socket_accept", "sleep", "sizeof", "sinh", "sin", "simplexml_load_string", "simplexml_load_file", "simplexml_import_dom", "similar_text", "shuffle", "show_source", "shmop_write", "shmop_size", "shmop_read", "shmop_open", "shmop_delete", "shmop_close", "shell_exec", "sha1_file", "sha1", "settype", "setrawcookie", "setlocale", "setcookie", "set_time_limit", "set_socket_blocking", "set_magic_quotes_runtime", "set_include_path", "set_file_buffer", "set_exception_handler", "set_error_handler", "session_write_close", "session_unset", "session_unregister", "session_start", "session_set_save_handler", "session_set_cookie_params", "session_save_path", "session_register", "session_regenerate_id", "session_name", "session_module_name", "session_is_registered", "session_id", "session_get_cookie_params", "session_encode", "session_destroy", "session_decode", "session_commit", "session_cache_limiter", "session_cache_expire", "serialize", "scandir", "rtrim", "rsort", "round", "rmdir", "rewinddir", "rewind", "restore_include_path", "restore_exception_handler", "restore_error_handler", "reset", "rename", "register_tick_function", "register_shutdown_function", "realpath_cache_size", "realpath_cache_get", "realpath", "readlink", "readgzfile", "readfile", "readdir", "read_exif_data", "rawurlencode", "rawurldecode", "range", "rand", "rad2deg", "quotemeta", "quoted_printable_encode", "quoted_printable_decode", "putenv", "property_exists", "proc_terminate", "proc_open", "proc_get_status", "proc_close", "printf", "print_r", "prev", "preg_split", "preg_replace_callback", "preg_replace", "preg_quote", "preg_match_all", "preg_match", "preg_last_error", "preg_grep", "preg_filter", "pow", "pos", "popen", "pi", "phpversion", "phpinfo", "phpcredits", "php_uname", "php_strip_whitespace", "php_sapi_name", "php_real_logo_guid", "php_logo_guid", "php_ini_scanned_files", "php_ini_loaded_file", "php_egg_logo_guid", "pg_version", "pg_update", "pg_untrace", "pg_unescape_bytea", "pg_tty", "pg_transaction_status", "pg_trace", "pg_setclientencoding", "pg_set_error_verbosity", "pg_set_client_encoding", "pg_send_query_params", "pg_send_query", "pg_send_prepare", "pg_send_execute", "pg_select", "pg_result_status", "pg_result_seek", "pg_result_error_field", "pg_result_error", "pg_result", "pg_query_params", "pg_query", "pg_put_line", "pg_prepare", "pg_port", "pg_ping", "pg_pconnect", "pg_parameter_status", "pg_options", "pg_numrows", "pg_numfields", "pg_num_rows", "pg_num_fields", "pg_meta_data", "pg_lowrite", "pg_lounlink", "pg_loreadall", "pg_loread", "pg_loopen", "pg_loimport", "pg_loexport", "pg_locreate", "pg_loclose", "pg_lo_write", "pg_lo_unlink", "pg_lo_tell", "pg_lo_seek", "pg_lo_read_all", "pg_lo_read", "pg_lo_open", "pg_lo_import", "pg_lo_export", "pg_lo_create", "pg_lo_close", "pg_last_oid", "pg_last_notice", "pg_last_error", "pg_insert", "pg_host", "pg_getlastoid", "pg_get_result", "pg_get_pid", "pg_get_notify", "pg_freeresult", "pg_free_result", "pg_fieldtype", "pg_fieldsize", "pg_fieldprtlen", "pg_fieldnum", "pg_fieldname", "pg_fieldisnull", "pg_field_type_oid", "pg_field_type", "pg_field_table", "pg_field_size", "pg_field_prtlen", "pg_field_num", "pg_field_name", "pg_field_is_null", "pg_fetch_row", "pg_fetch_result", "pg_fetch_object", "pg_fetch_assoc", "pg_fetch_array", "pg_fetch_all_columns", "pg_fetch_all", "pg_execute", "pg_exec", "pg_escape_string", "pg_escape_bytea", "pg_errormessage", "pg_end_copy", "pg_delete", "pg_dbname", "pg_copy_to", "pg_copy_from", "pg_convert", "pg_connection_status", "pg_connection_reset", "pg_connection_busy", "pg_connect", "pg_cmdtuples", "pg_close", "pg_clientencoding", "pg_client_encoding", "pg_cancel_query", "pg_affected_rows", "pfsockopen", "pdo_drivers", "pclose", "pathinfo", "passthru", "parse_url", "parse_str", "parse_ini_string", "parse_ini_file", "pack", "output_reset_rewrite_vars", "output_add_rewrite_var", "ord", "openssl_x509_read", "openssl_x509_parse", "openssl_x509_free", "openssl_x509_export_to_file", "openssl_x509_export", "openssl_x509_checkpurpose", "openssl_x509_check_private_key", "openssl_verify", "openssl_sign", "openssl_seal", "openssl_random_pseudo_bytes", "openssl_public_encrypt", "openssl_public_decrypt", "openssl_private_encrypt", "openssl_private_decrypt", "openssl_pkey_new", "openssl_pkey_get_public", "openssl_pkey_get_private", "openssl_pkey_get_details", "openssl_pkey_free", "openssl_pkey_export_to_file", "openssl_pkey_export", "openssl_pkcs7_verify", "openssl_pkcs7_sign", "openssl_pkcs7_encrypt", "openssl_pkcs7_decrypt", "openssl_pkcs12_read", "openssl_pkcs12_export_to_file", "openssl_pkcs12_export", "openssl_open", "openssl_get_publickey", "openssl_get_privatekey", "openssl_get_md_methods", "openssl_get_cipher_methods", "openssl_free_key", "openssl_error_string", "openssl_encrypt", "openssl_digest", "openssl_dh_compute_key", "openssl_decrypt", "openssl_csr_sign", "openssl_csr_new", "openssl_csr_get_subject", "openssl_csr_get_public_key", "openssl_csr_export_to_file", "openssl_csr_export", "openlog", "opendir", "odbc_tables", "odbc_tableprivileges", "odbc_statistics", "odbc_specialcolumns", "odbc_setoption", "odbc_rollback", "odbc_result_all", "odbc_result", "odbc_procedures", "odbc_procedurecolumns", "odbc_primarykeys", "odbc_prepare", "odbc_pconnect", "odbc_num_rows", "odbc_num_fields", "odbc_next_result", "odbc_longreadlen", "odbc_gettypeinfo", "odbc_free_result", "odbc_foreignkeys", "odbc_field_type", "odbc_field_scale", "odbc_field_precision", "odbc_field_num", "odbc_field_name", "odbc_field_len", "odbc_fetch_row", "odbc_fetch_object", "odbc_fetch_into", "odbc_fetch_array", "odbc_execute", "odbc_exec", "odbc_errormsg", "odbc_error", "odbc_do", "odbc_data_source", "odbc_cursor", "odbc_connect", "odbc_commit", "odbc_columns", "odbc_columnprivileges", "odbc_close_all", "odbc_close", "odbc_binmode", "odbc_autocommit", "octdec", "ob_tidyhandler", "ob_start", "ob_list_handlers", "ob_inflatehandler", "ob_implicit_flush", "ob_iconv_handler", "ob_gzhandler", "ob_get_status", "ob_get_level", "ob_get_length", "ob_get_flush", "ob_get_contents", "ob_get_clean", "ob_flush", "ob_etaghandler", "ob_end_flush", "ob_end_clean", "ob_deflatehandler", "ob_clean", "number_format", "nl2br", "ngettext", "next", "natsort", "natcasesort", "mysqli_warning_count", "mysqli_use_result", "mysqli_thread_safe", "mysqli_thread_id", "mysqli_store_result", "mysqli_stmt_store_result", "mysqli_stmt_sqlstate", "mysqli_stmt_send_long_data", "mysqli_stmt_result_metadata", "mysqli_stmt_reset", "mysqli_stmt_prepare", "mysqli_stmt_param_count", "mysqli_stmt_num_rows", "mysqli_stmt_next_result", "mysqli_stmt_more_results", "mysqli_stmt_insert_id", "mysqli_stmt_init", "mysqli_stmt_get_warnings", "mysqli_stmt_get_result", "mysqli_stmt_free_result", "mysqli_stmt_field_count", "mysqli_stmt_fetch", "mysqli_stmt_execute", "mysqli_stmt_error", "mysqli_stmt_errno", "mysqli_stmt_data_seek", "mysqli_stmt_close", "mysqli_stmt_bind_result", "mysqli_stmt_bind_param", "mysqli_stmt_attr_set", "mysqli_stmt_attr_get", "mysqli_stmt_affected_rows", "mysqli_stat", "mysqli_sqlstate", "mysqli_set_opt", "mysqli_set_charset", "mysqli_send_long_data", "mysqli_select_db", "mysqli_rollback", "mysqli_report", "mysqli_refresh", "mysqli_reap_async_query", "mysqli_real_query", "mysqli_real_escape_string", "mysqli_real_connect", "mysqli_query", "mysqli_prepare", "mysqli_poll", "mysqli_ping", "mysqli_param_count", "mysqli_options", "mysqli_num_rows", "mysqli_num_fields", "mysqli_next_result", "mysqli_multi_query", "mysqli_more_results", "mysqli_kill", "mysqli_insert_id", "mysqli_init", "mysqli_info", "mysqli_get_warnings", "mysqli_get_server_version", "mysqli_get_server_info", "mysqli_get_proto_info", "mysqli_get_metadata", "mysqli_get_host_info", "mysqli_get_connection_stats", "mysqli_get_client_version", "mysqli_get_client_stats", "mysqli_get_client_info", "mysqli_get_charset", "mysqli_get_cache_stats", "mysqli_free_result", "mysqli_field_tell", "mysqli_field_seek", "mysqli_field_count", "mysqli_fetch_row", "mysqli_fetch_object", "mysqli_fetch_lengths", "mysqli_fetch_fields", "mysqli_fetch_field_direct", "mysqli_fetch_field", "mysqli_fetch_assoc", "mysqli_fetch_array", "mysqli_fetch_all", "mysqli_fetch", "mysqli_execute", "mysqli_escape_string", "mysqli_error", "mysqli_errno", "mysqli_dump_debug_info", "mysqli_debug", "mysqli_data_seek", "mysqli_connect_error", "mysqli_connect_errno", "mysqli_connect", "mysqli_commit", "mysqli_close", "mysqli_client_encoding", "mysqli_character_set_name", "mysqli_change_user", "mysqli_bind_result", "mysqli_bind_param", "mysqli_autocommit", "mysqli_affected_rows", "mysql_unbuffered_query", "mysql_thread_id", "mysql_tablename", "mysql_table_name", "mysql_stat", "mysql_set_charset", "mysql_selectdb", "mysql_select_db", "mysql_result", "mysql_real_escape_string", "mysql_query", "mysql_ping", "mysql_pconnect", "mysql_numrows", "mysql_numfields", "mysql_num_rows", "mysql_num_fields", "mysql_listtables", "mysql_listfields", "mysql_listdbs", "mysql_list_tables", "mysql_list_processes", "mysql_list_fields", "mysql_list_dbs", "mysql_insert_id", "mysql_info", "mysql_get_server_info", "mysql_get_proto_info", "mysql_get_host_info", "mysql_get_client_info", "mysql_freeresult", "mysql_free_result", "mysql_fieldtype", "mysql_fieldtable", "mysql_fieldname", "mysql_fieldlen", "mysql_fieldflags", "mysql_field_type", "mysql_field_table", "mysql_field_seek", "mysql_field_name", "mysql_field_len", "mysql_field_flags", "mysql_fetch_row", "mysql_fetch_object", "mysql_fetch_lengths", "mysql_fetch_field", "mysql_fetch_assoc", "mysql_fetch_array", "mysql_escape_string", "mysql_error", "mysql_errno", "mysql_dbname", "mysql_db_query", "mysql_db_name", "mysql_data_seek", "mysql_connect", "mysql_close", "mysql_client_encoding", "mysql_affected_rows", "mysql", "mt_srand", "mt_rand", "mt_getrandmax", "move_uploaded_file", "mktime", "mkdir", "min", "microtime", "method_exists", "metaphone", "memory_get_usage", "memory_get_peak_usage", "mdecrypt_generic", "md5_file", "md5", "mcrypt_ofb", "mcrypt_module_self_test", "mcrypt_module_open", "mcrypt_module_is_block_mode", "mcrypt_module_is_block_algorithm_mode", "mcrypt_module_is_block_algorithm", "mcrypt_module_get_supported_key_sizes", "mcrypt_module_get_algo_key_size", "mcrypt_module_get_algo_block_size", "mcrypt_module_close", "mcrypt_list_modes", "mcrypt_list_algorithms", "mcrypt_get_key_size", "mcrypt_get_iv_size", "mcrypt_get_cipher_name", "mcrypt_get_block_size", "mcrypt_generic_init", "mcrypt_generic_end", "mcrypt_generic_deinit", "mcrypt_generic", "mcrypt_encrypt", "mcrypt_enc_self_test", "mcrypt_enc_is_block_mode", "mcrypt_enc_is_block_algorithm_mode", "mcrypt_enc_is_block_algorithm", "mcrypt_enc_get_supported_key_sizes", "mcrypt_enc_get_modes_name", "mcrypt_enc_get_key_size", "mcrypt_enc_get_iv_size", "mcrypt_enc_get_block_size", "mcrypt_enc_get_algorithms_name", "mcrypt_ecb", "mcrypt_decrypt", "mcrypt_create_iv", "mcrypt_cfb", "mcrypt_cbc", "mbsplit", "mbregex_encoding", "mberegi_replace", "mberegi", "mbereg_search_setpos", "mbereg_search_regs", "mbereg_search_pos", "mbereg_search_init", "mbereg_search_getregs", "mbereg_search_getpos", "mbereg_search", "mbereg_replace", "mbereg_match", "mbereg", "mb_substr_count", "mb_substr", "mb_substitute_character", "mb_strwidth", "mb_strtoupper", "mb_strtolower", "mb_strstr", "mb_strrpos", "mb_strripos", "mb_strrichr", "mb_strrchr", "mb_strpos", "mb_strlen", "mb_stristr", "mb_stripos", "mb_strimwidth", "mb_strcut", "mb_split", "mb_send_mail", "mb_regex_set_options", "mb_regex_encoding", "mb_preferred_mime_name", "mb_parse_str", "mb_output_handler", "mb_list_encodings", "mb_language", "mb_internal_encoding", "mb_http_output", "mb_http_input", "mb_get_info", "mb_eregi_replace", "mb_eregi", "mb_ereg_search_setpos", "mb_ereg_search_regs", "mb_ereg_search_pos", "mb_ereg_search_init", "mb_ereg_search_getregs", "mb_ereg_search_getpos", "mb_ereg_search", "mb_ereg_replace", "mb_ereg_match", "mb_ereg", "mb_encoding_aliases", "mb_encode_numericentity", "mb_encode_mimeheader", "mb_detect_order", "mb_detect_encoding", "mb_decode_numericentity", "mb_decode_mimeheader", "mb_convert_variables", "mb_convert_kana", "mb_convert_encoding", "mb_convert_case", "mb_check_encoding", "max", "mail", "magic_quotes_runtime", "ltrim", "lstat", "long2ip", "log1p", "log10", "log", "localtime", "localeconv", "linkinfo", "link", "libxml_use_internal_errors", "libxml_set_streams_context", "libxml_get_last_error", "libxml_get_errors", "libxml_disable_entity_loader", "libxml_clear_errors", "levenshtein", "ldap_unbind", "ldap_start_tls", "ldap_sort", "ldap_set_option", "ldap_search", "ldap_rename", "ldap_read", "ldap_parse_result", "ldap_parse_reference", "ldap_next_reference", "ldap_next_entry", "ldap_next_attribute", "ldap_modify", "ldap_mod_replace", "ldap_mod_del", "ldap_mod_add", "ldap_list", "ldap_get_values_len", "ldap_get_values", "ldap_get_option", "ldap_get_entries", "ldap_get_dn", "ldap_get_attributes", "ldap_free_result", "ldap_first_reference", "ldap_first_entry", "ldap_first_attribute", "ldap_explode_dn", "ldap_error", "ldap_errno", "ldap_err2str", "ldap_dn2ufn", "ldap_delete", "ldap_count_entries", "ldap_connect", "ldap_compare", "ldap_close", "ldap_bind", "ldap_add", "lcg_value", "lcfirst", "ksort", "krsort", "key_exists", "key", "juliantojd", "json_last_error", "json_encode", "json_decode", "join", "jewishtojd", "jdtounix", "jdtojulian", "jdtojewish", "jdtogregorian", "jdtofrench", "jdmonthname", "jddayofweek", "iterator_to_array", "iterator_count", "iterator_apply", "is_writeable", "is_writable", "is_uploaded_file", "is_subclass_of", "is_string", "is_soap_fault", "is_scalar", "is_resource", "is_real", "is_readable", "is_object", "is_numeric", "is_null", "is_nan", "is_long", "is_link", "is_integer", "is_int", "is_infinite", "is_float", "is_finite", "is_file", "is_executable", "is_double", "is_dir", "is_callable", "is_bool", "is_array", "is_a", "iptcparse", "iptcembed", "ip2long", "intval", "interface_exists", "ini_set", "ini_restore", "ini_get_all", "ini_get", "ini_alter", "inet_pton", "inet_ntop", "in_array", "import_request_variables", "implode", "image_type_to_mime_type", "image_type_to_extension", "ignore_user_abort", "idate", "iconv_substr", "iconv_strrpos", "iconv_strpos", "iconv_strlen", "iconv_set_encoding", "iconv_mime_encode", "iconv_mime_decode_headers", "iconv_mime_decode", "iconv_get_encoding", "iconv", "hypot", "http_throttle", "http_support", "http_send_stream", "http_send_status", "http_send_last_modified", "http_send_file", "http_send_data", "http_send_content_type", "http_send_content_disposition", "http_request_method_unregister", "http_request_method_register", "http_request_method_name", "http_request_method_exists", "http_request_body_encode", "http_request", "http_redirect", "http_put_stream", "http_put_file", "http_put_data", "http_post_fields", "http_post_data", "http_persistent_handles_ident", "http_persistent_handles_count", "http_persistent_handles_clean", "http_parse_params", "http_parse_message", "http_parse_headers", "http_parse_cookie", "http_negotiate_language", "http_negotiate_content_type", "http_negotiate_charset", "http_match_request_header", "http_match_modified", "http_match_etag", "http_inflate", "http_head", "http_get_request_headers", "http_get_request_body_stream", "http_get_request_body", "http_get", "http_deflate", "http_date", "http_chunked_decode", "http_cache_last_modified", "http_cache_etag", "http_build_url", "http_build_str", "http_build_query", "http_build_cookie", "htmlspecialchars_decode", "htmlspecialchars", "htmlentities", "html_entity_decode", "highlight_string", "highlight_file", "hexdec", "hebrevc", "hebrev", "headers_sent", "headers_list", "header_remove", "header", "hash_update_stream", "hash_update_file", "hash_update", "hash_init", "hash_hmac_file", "hash_hmac", "hash_final", "hash_file", "hash_copy", "hash_algos", "hash", "gzwrite", "gzuncompress", "gztell", "gzseek", "gzrewind", "gzread", "gzputs", "gzpassthru", "gzopen", "gzinflate", "gzgetss", "gzgets", "gzgetc", "gzfile", "gzeof", "gzencode", "gzdeflate", "gzcompress", "gzclose", "gregoriantojd", "gmstrftime", "gmmktime", "gmdate", "glob", "gettype", "gettimeofday", "gettext", "getservbyport", "getservbyname", "getrandmax", "getprotobynumber", "getprotobyname", "getopt", "getmyuid", "getmypid", "getmyinode", "getmygid", "getmxrr", "getlastmod", "getimagesize", "gethostname", "gethostbynamel", "gethostbyname", "gethostbyaddr", "getenv", "getdate", "getcwd", "get_resource_type", "get_required_files", "get_parent_class", "get_object_vars", "get_meta_tags", "get_magic_quotes_runtime", "get_magic_quotes_gpc", "get_loaded_extensions", "get_included_files", "get_include_path", "get_html_translation_table", "get_headers", "get_extension_funcs", "get_defined_vars", "get_defined_functions", "get_defined_constants", "get_declared_interfaces", "get_declared_classes", "get_current_user", "get_class_vars", "get_class_methods", "get_class", "get_cfg_var", "get_called_class", "get_browser", "gc_enabled", "gc_enable", "gc_disable", "gc_collect_cycles", "fwrite", "function_exists", "func_num_args", "func_get_args", "func_get_arg", "ftruncate", "ftp_systype", "ftp_ssl_connect", "ftp_size", "ftp_site", "ftp_set_option", "ftp_rmdir", "ftp_rename", "ftp_rawlist", "ftp_raw", "ftp_quit", "ftp_pwd", "ftp_put", "ftp_pasv", "ftp_nlist", "ftp_nb_put", "ftp_nb_get", "ftp_nb_fput", "ftp_nb_fget", "ftp_nb_continue", "ftp_mkdir", "ftp_mdtm", "ftp_login", "ftp_get_option", "ftp_get", "ftp_fput", "ftp_fget", "ftp_exec", "ftp_delete", "ftp_connect", "ftp_close", "ftp_chmod", "ftp_chdir", "ftp_cdup", "ftp_alloc", "ftell", "fstat", "fsockopen", "fseek", "fscanf", "frenchtojd", "fread", "fputs", "fputcsv", "fprintf", "fpassthru", "forward_static_call_array", "forward_static_call", "fopen", "fnmatch", "fmod", "flush", "floor", "flock", "floatval", "filter_var_array", "filter_var", "filter_list", "filter_input_array", "filter_input", "filter_id", "filter_has_var", "filetype", "filesize", "fileperms", "fileowner", "filemtime", "fileinode", "filegroup", "filectime", "fileatime", "file_put_contents", "file_get_contents", "file_exists", "file", "fgetss", "fgets", "fgetcsv", "fgetc", "fflush", "feof", "fclose", "ezmlm_hash", "extract", "extension_loaded", "expm1", "explode", "exp", "exif_thumbnail", "exif_tagname", "exif_read_data", "exif_imagetype", "exec", "escapeshellcmd", "escapeshellarg", "error_reporting", "error_log", "error_get_last", "eregi_replace", "eregi", "ereg_replace", "ereg", "end", "easter_days", "easter_date", "each", "doubleval", "dom_import_simplexml", "dns_get_record", "dns_get_mx", "dns_check_record", "dngettext", "dl", "diskfreespace", "disk_total_space", "disk_free_space", "dirname", "dir", "dgettext", "deg2rad", "defined", "define_syslog_variables", "define", "decoct", "dechex", "decbin", "debug_zval_dump", "debug_print_backtrace", "debug_backtrace", "dcngettext", "dcgettext", "date_timezone_set", "date_timezone_get", "date_timestamp_set", "date_timestamp_get", "date_time_set", "date_sunset", "date_sunrise", "date_sun_info", "date_sub", "date_parse_from_format", "date_parse", "date_offset_get", "date_modify", "date_isodate_set", "date_interval_format", "date_interval_create_from_date_string", "date_get_last_errors", "date_format", "date_diff", "date_default_timezone_set", "date_default_timezone_get", "date_date_set", "date_create_from_format", "date_create", "date_add", "date", "current", "ctype_xdigit", "ctype_upper", "ctype_space", "ctype_punct", "ctype_print", "ctype_lower", "ctype_graph", "ctype_digit", "ctype_cntrl", "ctype_alpha", "ctype_alnum", "crypt", "create_function", "crc32", "count_chars", "count", "cosh", "cos", "copy", "convert_uuencode", "convert_uudecode", "convert_cyr_string", "constant", "connection_status", "connection_aborted", "compact", "com_print_typeinfo", "com_message_pump", "com_load_typelib", "com_get_active_object", "com_event_sink", "com_create_guid", "closelog", "closedir", "clearstatcache", "class_parents", "class_implements", "class_exists", "class_alias", "chunk_split", "chr", "chown", "chop", "chmod", "chgrp", "checkdnsrr", "checkdate", "chdir", "ceil", "call_user_method_array", "call_user_method", "call_user_func_array", "call_user_func", "cal_to_jd", "cal_info", "cal_from_jd", "cal_days_in_month", "bindtextdomain", "bindec", "bind_textdomain_codeset", "bin2hex", "bcsub", "bcsqrt", "bcscale", "bcpowmod", "bcpow", "bcmul", "bcmod", "bcdiv", "bccomp", "bcadd", "basename", "base_convert", "base64_encode", "base64_decode", "atanh", "atan2", "atan", "assert_options", "assert", "asort", "asinh", "asin", "arsort", "array_walk_recursive", "array_walk", "array_values", "array_unshift", "array_unique", "array_uintersect_uassoc", "array_uintersect_assoc", "array_uintersect", "array_udiff_uassoc", "array_udiff_assoc", "array_udiff", "array_sum", "array_splice", "array_slice", "array_shift", "array_search", "array_reverse", "array_replace_recursive", "array_replace", "array_reduce", "array_rand", "array_push", "array_product", "array_pop", "array_pad", "array_multisort", "array_merge_recursive", "array_merge", "array_map", "array_keys", "array_key_exists", "array_intersect_ukey", "array_intersect_uassoc", "array_intersect_key", "array_intersect_assoc", "array_intersect", "array_flip", "array_filter", "array_fill_keys", "array_fill", "array_diff_ukey", "array_diff_uassoc", "array_diff_key", "array_diff_assoc", "array_diff", "array_count_values", "array_combine", "array_chunk", "array_change_key_case", "addslashes", "addcslashes", "acosh", "acos", "abs"], boundary: "\\b" }, languageConstruct: { values: ["isset", "array", "unset", "list", "echo", "include_once", "include", "require_once", "require", "print", "empty", "return", "die", "eval", "exit"], boundary: "\\b" }, constant: { values: ["__CLASS__", "__DIR__", "__FILE__", "__LINE__", "__FUNCTION__", "__METHOD__", "__NAMESPACE__", "ZEND_THREAD_SAFE", "ZEND_DEBUG_BUILD", "XSL_CLONE_NEVER", "XSL_CLONE_AUTO", "XSL_CLONE_ALWAYS", "XSD_UNSIGNEDSHORT", "XSD_UNSIGNEDLONG", "XSD_UNSIGNEDINT", "XSD_UNSIGNEDBYTE", "XSD_TOKEN", "XSD_TIME", "XSD_STRING", "XSD_SHORT", "XSD_QNAME", "XSD_POSITIVEINTEGER", "XSD_NOTATION", "XSD_NORMALIZEDSTRING", "XSD_NONPOSITIVEINTEGER", "XSD_NONNEGATIVEINTEGER", "XSD_NMTOKENS", "XSD_NMTOKEN", "XSD_NEGATIVEINTEGER", "XSD_NCNAME", "XSD_NAMESPACE", "XSD_NAME", "XSD_LONG", "XSD_LANGUAGE", "XSD_INTEGER", "XSD_INT", "XSD_IDREFS", "XSD_IDREF", "XSD_ID", "XSD_HEXBINARY", "XSD_GYEARMONTH", "XSD_GYEAR", "XSD_GMONTHDAY", "XSD_GMONTH", "XSD_GDAY", "XSD_FLOAT", "XSD_ENTITY", "XSD_ENTITIES", "XSD_DURATION", "XSD_DOUBLE", "XSD_DECIMAL", "XSD_DATETIME", "XSD_DATE", "XSD_BYTE", "XSD_BOOLEAN", "XSD_BASE64BINARY", "XSD_ANYXML", "XSD_ANYURI", "XSD_ANYTYPE", "XSD_1999_TIMEINSTANT", "XSD_1999_NAMESPACE", "XML_TEXT_NODE", "XML_SAX_IMPL", "XML_PI_NODE", "XML_OPTION_TARGET_ENCODING", "XML_OPTION_SKIP_WHITE", "XML_OPTION_SKIP_TAGSTART", "XML_OPTION_CASE_FOLDING", "XML_NOTATION_NODE", "XML_NAMESPACE_DECL_NODE", "XML_LOCAL_NAMESPACE", "XML_HTML_DOCUMENT_NODE", "XML_ERROR_UNKNOWN_ENCODING", "XML_ERROR_UNDEFINED_ENTITY", "XML_ERROR_UNCLOSED_TOKEN", "XML_ERROR_UNCLOSED_CDATA_SECTION", "XML_ERROR_TAG_MISMATCH", "XML_ERROR_SYNTAX", "XML_ERROR_RECURSIVE_ENTITY_REF", "XML_ERROR_PARTIAL_CHAR", "XML_ERROR_PARAM_ENTITY_REF", "XML_ERROR_NO_MEMORY", "XML_ERROR_NO_ELEMENTS", "XML_ERROR_NONE", "XML_ERROR_MISPLACED_XML_PI", "XML_ERROR_JUNK_AFTER_DOC_ELEMENT", "XML_ERROR_INVALID_TOKEN", "XML_ERROR_INCORRECT_ENCODING", "XML_ERROR_EXTERNAL_ENTITY_HANDLING", "XML_ERROR_DUPLICATE_ATTRIBUTE", "XML_ERROR_BINARY_ENTITY_REF", "XML_ERROR_BAD_CHAR_REF", "XML_ERROR_ATTRIBUTE_EXTERNAL_ENTITY_REF", "XML_ERROR_ASYNC_ENTITY", "XML_ENTITY_REF_NODE", "XML_ENTITY_NODE", "XML_ENTITY_DECL_NODE", "XML_ELEMENT_NODE", "XML_ELEMENT_DECL_NODE", "XML_DTD_NODE", "XML_DOCUMENT_TYPE_NODE", "XML_DOCUMENT_NODE", "XML_DOCUMENT_FRAG_NODE", "XML_COMMENT_NODE", "XML_CDATA_SECTION_NODE", "XML_ATTRIBUTE_NOTATION", "XML_ATTRIBUTE_NODE", "XML_ATTRIBUTE_NMTOKENS", "XML_ATTRIBUTE_NMTOKEN", "XML_ATTRIBUTE_IDREFS", "XML_ATTRIBUTE_IDREF", "XML_ATTRIBUTE_ID", "XML_ATTRIBUTE_ENUMERATION", "XML_ATTRIBUTE_ENTITY", "XML_ATTRIBUTE_DECL_NODE", "XML_ATTRIBUTE_CDATA", "X509_PURPOSE_SSL_SERVER", "X509_PURPOSE_SSL_CLIENT", "X509_PURPOSE_SMIME_SIGN", "X509_PURPOSE_SMIME_ENCRYPT", "X509_PURPOSE_NS_SSL_SERVER", "X509_PURPOSE_CRL_SIGN", "X509_PURPOSE_ANY", "WSDL_CACHE_NONE", "WSDL_CACHE_MEMORY", "WSDL_CACHE_DISK", "WSDL_CACHE_BOTH", "VT_VARIANT", "VT_UNKNOWN", "VT_UINT", "VT_UI4", "VT_UI2", "VT_UI1", "VT_R8", "VT_R4", "VT_NULL", "VT_INT", "VT_I4", "VT_I2", "VT_I1", "VT_ERROR", "VT_EMPTY", "VT_DISPATCH", "VT_DECIMAL", "VT_DATE", "VT_CY", "VT_BYREF", "VT_BSTR", "VT_BOOL", "VT_ARRAY", "VARCMP_NULL", "VARCMP_LT", "VARCMP_GT", "VARCMP_EQ", "UPLOAD_ERR_PARTIAL", "UPLOAD_ERR_OK", "UPLOAD_ERR_NO_TMP_DIR", "UPLOAD_ERR_NO_FILE", "UPLOAD_ERR_INI_SIZE", "UPLOAD_ERR_FORM_SIZE", "UPLOAD_ERR_EXTENSION", "UPLOAD_ERR_CANT_WRITE", "UNKNOWN_TYPE", "T_XOR_EQUAL", "T_WHITESPACE", "T_WHILE", "T_VARIABLE", "T_VAR", "T_USE", "T_UNSET_CAST", "T_UNSET", "T_TRY", "T_THROW", "T_SWITCH", "T_STRING_VARNAME", "T_STRING_CAST", "T_STRING", "T_STATIC", "T_START_HEREDOC", "T_SR_EQUAL", "T_SR", "T_SL_EQUAL", "T_SL", "T_RETURN", "T_REQUIRE_ONCE", "T_REQUIRE", "T_PUBLIC", "T_PROTECTED", "T_PRIVATE", "T_PRINT", "T_PLUS_EQUAL", "T_PAAMAYIM_NEKUDOTAYIM", "T_OR_EQUAL", "T_OPEN_TAG_WITH_ECHO", "T_OPEN_TAG", "T_OBJECT_OPERATOR", "T_OBJECT_CAST", "T_NUM_STRING", "T_NS_SEPARATOR", "T_NS_C", "T_NEW", "T_NAMESPACE", "T_MUL_EQUAL", "T_MOD_EQUAL", "T_MINUS_EQUAL", "T_METHOD_C", "T_LOGICAL_XOR", "T_LOGICAL_OR", "T_LOGICAL_AND", "T_LNUMBER", "T_LIST", "T_LINE", "T_IS_SMALLER_OR_EQUAL", "T_IS_NOT_IDENTICAL", "T_IS_NOT_EQUAL", "T_IS_IDENTICAL", "T_IS_GREATER_OR_EQUAL", "T_IS_EQUAL", "T_ISSET", "T_INT_CAST", "T_INTERFACE", "T_INSTANCEOF", "T_INLINE_HTML", "T_INCLUDE_ONCE", "T_INCLUDE", "T_INC", "T_IMPLEMENTS", "T_IF", "T_HALT_COMPILER", "T_GOTO", "T_GLOBAL", "T_FUNC_C", "T_FUNCTION", "T_FOREACH", "T_FOR", "T_FINAL", "T_FILE", "T_EXTENDS", "T_EXIT", "T_EVAL", "T_END_HEREDOC", "T_ENDWHILE", "T_ENDSWITCH", "T_ENDIF", "T_ENDFOREACH", "T_ENDFOR", "T_ENDDECLARE", "T_ENCAPSED_AND_WHITESPACE", "T_EMPTY", "T_ELSEIF", "T_ELSE", "T_ECHO", "T_DOUBLE_COLON", "T_DOUBLE_CAST", "T_DOUBLE_ARROW", "T_DOLLAR_OPEN_CURLY_BRACES", "T_DOC_COMMENT", "T_DO", "T_DNUMBER", "T_DIV_EQUAL", "T_DIR", "T_DEFAULT", "T_DECLARE", "T_DEC", "T_CURLY_OPEN", "T_CONTINUE", "T_CONSTANT_ENCAPSED_STRING", "T_CONST", "T_CONCAT_EQUAL", "T_COMMENT", "T_CLOSE_TAG", "T_CLONE", "T_CLASS_C", "T_CLASS", "T_CHARACTER", "T_CATCH", "T_CASE", "T_BREAK", "T_BOOL_CAST", "T_BOOLEAN_OR", "T_BOOLEAN_AND", "T_BAD_CHARACTER", "T_AS", "T_ARRAY_CAST", "T_ARRAY", "T_AND_EQUAL", "T_ABSTRACT", "TRUE", "TIDY_TAG_XMP", "TIDY_TAG_WBR", "TIDY_TAG_VAR", "TIDY_TAG_UNKNOWN", "TIDY_TAG_UL", "TIDY_TAG_U", "TIDY_TAG_TT", "TIDY_TAG_TR", "TIDY_TAG_TITLE", "TIDY_TAG_THEAD", "TIDY_TAG_TH", "TIDY_TAG_TFOOT", "TIDY_TAG_TEXTAREA", "TIDY_TAG_TD", "TIDY_TAG_TBODY", "TIDY_TAG_TABLE", "TIDY_TAG_SUP", "TIDY_TAG_SUB", "TIDY_TAG_STYLE", "TIDY_TAG_STRONG", "TIDY_TAG_STRIKE", "TIDY_TAG_SPAN", "TIDY_TAG_SPACER", "TIDY_TAG_SMALL", "TIDY_TAG_SERVLET", "TIDY_TAG_SERVER", "TIDY_TAG_SELECT", "TIDY_TAG_SCRIPT", "TIDY_TAG_SAMP", "TIDY_TAG_S", "TIDY_TAG_RUBY", "TIDY_TAG_RTC", "TIDY_TAG_RT", "TIDY_TAG_RP", "TIDY_TAG_RBC", "TIDY_TAG_RB", "TIDY_TAG_Q", "TIDY_TAG_PRE", "TIDY_TAG_PLAINTEXT", "TIDY_TAG_PARAM", "TIDY_TAG_P", "TIDY_TAG_OPTION", "TIDY_TAG_OPTGROUP", "TIDY_TAG_OL", "TIDY_TAG_OBJECT", "TIDY_TAG_NOSCRIPT", "TIDY_TAG_NOSAVE", "TIDY_TAG_NOLAYER", "TIDY_TAG_NOFRAMES", "TIDY_TAG_NOEMBED", "TIDY_TAG_NOBR", "TIDY_TAG_MULTICOL", "TIDY_TAG_META", "TIDY_TAG_MENU", "TIDY_TAG_MARQUEE", "TIDY_TAG_MAP", "TIDY_TAG_LISTING", "TIDY_TAG_LINK", "TIDY_TAG_LI", "TIDY_TAG_LEGEND", "TIDY_TAG_LAYER", "TIDY_TAG_LABEL", "TIDY_TAG_KEYGEN", "TIDY_TAG_KBD", "TIDY_TAG_ISINDEX", "TIDY_TAG_INS", "TIDY_TAG_INPUT", "TIDY_TAG_IMG", "TIDY_TAG_ILAYER", "TIDY_TAG_IFRAME", "TIDY_TAG_I", "TIDY_TAG_HTML", "TIDY_TAG_HR", "TIDY_TAG_HEAD", "TIDY_TAG_H6", "TIDY_TAG_H5", "TIDY_TAG_H4", "TIDY_TAG_H3", "TIDY_TAG_H2", "TIDY_TAG_H1", "TIDY_TAG_FRAMESET", "TIDY_TAG_FRAME", "TIDY_TAG_FORM", "TIDY_TAG_FONT", "TIDY_TAG_FIELDSET", "TIDY_TAG_EMBED", "TIDY_TAG_EM", "TIDY_TAG_DT", "TIDY_TAG_DL", "TIDY_TAG_DIV", "TIDY_TAG_DIR", "TIDY_TAG_DFN", "TIDY_TAG_DEL", "TIDY_TAG_DD", "TIDY_TAG_COMMENT", "TIDY_TAG_COLGROUP", "TIDY_TAG_COL", "TIDY_TAG_CODE", "TIDY_TAG_CITE", "TIDY_TAG_CENTER", "TIDY_TAG_CAPTION", "TIDY_TAG_BUTTON", "TIDY_TAG_BR", "TIDY_TAG_BODY", "TIDY_TAG_BLOCKQUOTE", "TIDY_TAG_BLINK", "TIDY_TAG_BIG", "TIDY_TAG_BGSOUND", "TIDY_TAG_BDO", "TIDY_TAG_BASEFONT", "TIDY_TAG_BASE", "TIDY_TAG_B", "TIDY_TAG_AREA", "TIDY_TAG_APPLET", "TIDY_TAG_ALIGN", "TIDY_TAG_ADDRESS", "TIDY_TAG_ACRONYM", "TIDY_TAG_ABBR", "TIDY_TAG_A", "TIDY_NODETYPE_XMLDECL", "TIDY_NODETYPE_TEXT", "TIDY_NODETYPE_STARTEND", "TIDY_NODETYPE_START", "TIDY_NODETYPE_SECTION", "TIDY_NODETYPE_ROOT", "TIDY_NODETYPE_PROCINS", "TIDY_NODETYPE_PHP", "TIDY_NODETYPE_JSTE", "TIDY_NODETYPE_END", "TIDY_NODETYPE_DOCTYPE", "TIDY_NODETYPE_COMMENT", "TIDY_NODETYPE_CDATA", "TIDY_NODETYPE_ASP", "TCP_NODELAY", "SUNFUNCS_RET_TIMESTAMP", "SUNFUNCS_RET_STRING", "SUNFUNCS_RET_DOUBLE", "STR_PAD_RIGHT", "STR_PAD_LEFT", "STR_PAD_BOTH", "STREAM_USE_PATH", "STREAM_URL_STAT_QUIET", "STREAM_URL_STAT_LINK", "STREAM_SOCK_STREAM", "STREAM_SOCK_SEQPACKET", "STREAM_SOCK_RDM", "STREAM_SOCK_RAW", "STREAM_SOCK_DGRAM", "STREAM_SHUT_WR", "STREAM_SHUT_RDWR", "STREAM_SHUT_RD", "STREAM_SERVER_LISTEN", "STREAM_SERVER_BIND", "STREAM_REPORT_ERRORS", "STREAM_PF_UNIX", "STREAM_PF_INET6", "STREAM_PF_INET", "STREAM_PEEK", "STREAM_OPTION_WRITE_BUFFER", "STREAM_OPTION_READ_TIMEOUT", "STREAM_OPTION_READ_BUFFER", "STREAM_OPTION_BLOCKING", "STREAM_OOB", "STREAM_NOTIFY_SEVERITY_WARN", "STREAM_NOTIFY_SEVERITY_INFO", "STREAM_NOTIFY_SEVERITY_ERR", "STREAM_NOTIFY_RESOLVE", "STREAM_NOTIFY_REDIRECTED", "STREAM_NOTIFY_PROGRESS", "STREAM_NOTIFY_MIME_TYPE_IS", "STREAM_NOTIFY_FILE_SIZE_IS", "STREAM_NOTIFY_FAILURE", "STREAM_NOTIFY_CONNECT", "STREAM_NOTIFY_COMPLETED", "STREAM_NOTIFY_AUTH_RESULT", "STREAM_NOTIFY_AUTH_REQUIRED", "STREAM_MUST_SEEK", "STREAM_MKDIR_RECURSIVE", "STREAM_IS_URL", "STREAM_IPPROTO_IP", "STREAM_IGNORE_URL", "STREAM_FILTER_WRITE", "STREAM_FILTER_READ", "STREAM_FILTER_ALL", "STREAM_ENFORCE_SAFE_MODE", "STREAM_CRYPTO_METHOD_TLS_SERVER", "STREAM_CRYPTO_METHOD_TLS_CLIENT", "STREAM_CRYPTO_METHOD_SSLv3_SERVER", "STREAM_CRYPTO_METHOD_SSLv3_CLIENT", "STREAM_CRYPTO_METHOD_SSLv2_SERVER", "STREAM_CRYPTO_METHOD_SSLv2_CLIENT", "STREAM_CRYPTO_METHOD_SSLv23_SERVER", "STREAM_CRYPTO_METHOD_SSLv23_CLIENT", "STREAM_CLIENT_PERSISTENT", "STREAM_CLIENT_CONNECT", "STREAM_CLIENT_ASYNC_CONNECT", "STREAM_CAST_FOR_SELECT", "STREAM_CAST_AS_STREAM", "STREAM_BUFFER_NONE", "STREAM_BUFFER_LINE", "STREAM_BUFFER_FULL", "STDOUT", "STDIN", "STDERR", "SQL_VARCHAR", "SQL_VARBINARY", "SQL_TINYINT", "SQL_TIMESTAMP", "SQL_TIME", "SQL_SMALLINT", "SQL_REAL", "SQL_ODBC_CURSORS", "SQL_NUMERIC", "SQL_LONGVARCHAR", "SQL_LONGVARBINARY", "SQL_KEYSET_SIZE", "SQL_INTEGER", "SQL_FLOAT", "SQL_FETCH_NEXT", "SQL_FETCH_FIRST", "SQL_DOUBLE", "SQL_DECIMAL", "SQL_DATE", "SQL_CUR_USE_ODBC", "SQL_CUR_USE_IF_NEEDED", "SQL_CUR_USE_DRIVER", "SQL_CURSOR_TYPE", "SQL_CURSOR_STATIC", "SQL_CURSOR_KEYSET_DRIVEN", "SQL_CURSOR_FORWARD_ONLY", "SQL_CURSOR_DYNAMIC", "SQL_CONCUR_VALUES", "SQL_CONCUR_ROWVER", "SQL_CONCUR_READ_ONLY", "SQL_CONCUR_LOCK", "SQL_CONCURRENCY", "SQL_CHAR", "SQL_BIT", "SQL_BINARY", "SQL_BIGINT", "SQLITE_TOOBIG", "SQLITE_SCHEMA", "SQLITE_ROW", "SQLITE_READONLY", "SQLITE_PROTOCOL", "SQLITE_PERM", "SQLITE_OK", "SQLITE_NUM", "SQLITE_NOTFOUND", "SQLITE_NOTADB", "SQLITE_NOMEM", "SQLITE_NOLFS", "SQLITE_MISUSE", "SQLITE_MISMATCH", "SQLITE_LOCKED", "SQLITE_IOERR", "SQLITE_INTERRUPT", "SQLITE_INTERNAL", "SQLITE_FULL", "SQLITE_FORMAT", "SQLITE_ERROR", "SQLITE_EMPTY", "SQLITE_DONE", "SQLITE_CORRUPT", "SQLITE_CONSTRAINT", "SQLITE_CANTOPEN", "SQLITE_BUSY", "SQLITE_BOTH", "SQLITE_AUTH", "SQLITE_ASSOC", "SQLITE_ABORT", "SQLITE3_TEXT", "SQLITE3_OPEN_READWRITE", "SQLITE3_OPEN_READONLY", "SQLITE3_OPEN_CREATE", "SQLITE3_NUM", "SQLITE3_NULL", "SQLITE3_INTEGER", "SQLITE3_FLOAT", "SQLITE3_BOTH", "SQLITE3_BLOB", "SQLITE3_ASSOC", "SO_TYPE", "SO_SNDTIMEO", "SO_SNDLOWAT", "SO_SNDBUF", "SO_REUSEADDR", "SO_RCVTIMEO", "SO_RCVLOWAT", "SO_RCVBUF", "SO_OOBINLINE", "SO_LINGER", "SO_KEEPALIVE", "SO_ERROR", "SO_DONTROUTE", "SO_DEBUG", "SO_BROADCAST", "SORT_STRING", "SORT_REGULAR", "SORT_NUMERIC", "SORT_LOCALE_STRING", "SORT_DESC", "SORT_ASC", "SOMAXCONN", "SOL_UDP", "SOL_TCP", "SOL_SOCKET", "SOCK_STREAM", "SOCK_SEQPACKET", "SOCK_RDM", "SOCK_RAW", "SOCK_DGRAM", "SOCKET_VERNOTSUPPORTED", "SOCKET_TRY_AGAIN", "SOCKET_SYSNOTREADY", "SOCKET_NO_RECOVERY", "SOCKET_NO_DATA", "SOCKET_NO_ADDRESS", "SOCKET_NOTINITIALISED", "SOCKET_HOST_NOT_FOUND", "SOCKET_EWOULDBLOCK", "SOCKET_EUSERS", "SOCKET_ETOOMANYREFS", "SOCKET_ETIMEDOUT", "SOCKET_ESTALE", "SOCKET_ESOCKTNOSUPPORT", "SOCKET_ESHUTDOWN", "SOCKET_EREMOTE", "SOCKET_EPROTOTYPE", "SOCKET_EPROTONOSUPPORT", "SOCKET_EPROCLIM", "SOCKET_EPFNOSUPPORT", "SOCKET_EOPNOTSUPP", "SOCKET_ENOTSOCK", "SOCKET_ENOTEMPTY", "SOCKET_ENOTCONN", "SOCKET_ENOPROTOOPT", "SOCKET_ENOBUFS", "SOCKET_ENETUNREACH", "SOCKET_ENETRESET", "SOCKET_ENETDOWN", "SOCKET_ENAMETOOLONG", "SOCKET_EMSGSIZE", "SOCKET_EMFILE", "SOCKET_ELOOP", "SOCKET_EISCONN", "SOCKET_EINVAL", "SOCKET_EINTR", "SOCKET_EINPROGRESS", "SOCKET_EHOSTUNREACH", "SOCKET_EHOSTDOWN", "SOCKET_EFAULT", "SOCKET_EDQUOT", "SOCKET_EDISCON", "SOCKET_EDESTADDRREQ", "SOCKET_ECONNRESET", "SOCKET_ECONNREFUSED", "SOCKET_ECONNABORTED", "SOCKET_EBADF", "SOCKET_EALREADY", "SOCKET_EAFNOSUPPORT", "SOCKET_EADDRNOTAVAIL", "SOCKET_EADDRINUSE", "SOCKET_EACCES", "SOAP_WAIT_ONE_WAY_CALLS", "SOAP_USE_XSI_ARRAY_TYPE", "SOAP_SINGLE_ELEMENT_ARRAYS", "SOAP_RPC", "SOAP_PERSISTENCE_SESSION", "SOAP_PERSISTENCE_REQUEST", "SOAP_LITERAL", "SOAP_FUNCTIONS_ALL", "SOAP_ENC_OBJECT", "SOAP_ENC_ARRAY", "SOAP_ENCODED", "SOAP_DOCUMENT", "SOAP_COMPRESSION_GZIP", "SOAP_COMPRESSION_DEFLATE", "SOAP_COMPRESSION_ACCEPT", "SOAP_AUTHENTICATION_DIGEST", "SOAP_AUTHENTICATION_BASIC", "SOAP_ACTOR_UNLIMATERECEIVER", "SOAP_ACTOR_NONE", "SOAP_ACTOR_NEXT", "SOAP_1_2", "SOAP_1_1", "SEEK_SET", "SEEK_END", "SEEK_CUR", "PSFS_PASS_ON", "PSFS_FLAG_NORMAL", "PSFS_FLAG_FLUSH_INC", "PSFS_FLAG_FLUSH_CLOSE", "PSFS_FEED_ME", "PSFS_ERR_FATAL", "PREG_SPLIT_OFFSET_CAPTURE", "PREG_SPLIT_NO_EMPTY", "PREG_SPLIT_DELIM_CAPTURE", "PREG_SET_ORDER", "PREG_RECURSION_LIMIT_ERROR", "PREG_PATTERN_ORDER", "PREG_OFFSET_CAPTURE", "PREG_NO_ERROR", "PREG_INTERNAL_ERROR", "PREG_GREP_INVERT", "PREG_BAD_UTF8_OFFSET_ERROR", "PREG_BAD_UTF8_ERROR", "PREG_BACKTRACK_LIMIT_ERROR", "PKCS7_TEXT", "PKCS7_NOVERIFY", "PKCS7_NOSIGS", "PKCS7_NOINTERN", "PKCS7_NOCHAIN", "PKCS7_NOCERTS", "PKCS7_NOATTR", "PKCS7_DETACHED", "PKCS7_BINARY", "PHP_ZTS", "PHP_WINDOWS_VERSION_SUITEMASK", "PHP_WINDOWS_VERSION_SP_MINOR", "PHP_WINDOWS_VERSION_SP_MAJOR", "PHP_WINDOWS_VERSION_PRODUCTTYPE", "PHP_WINDOWS_VERSION_PLATFORM", "PHP_WINDOWS_VERSION_MINOR", "PHP_WINDOWS_VERSION_MAJOR", "PHP_WINDOWS_VERSION_BUILD", "PHP_WINDOWS_NT_WORKSTATION", "PHP_WINDOWS_NT_SERVER", "PHP_WINDOWS_NT_DOMAIN_CONTROLLER", "PHP_VERSION_ID", "PHP_VERSION", "PHP_URL_USER", "PHP_URL_SCHEME", "PHP_URL_QUERY", "PHP_URL_PORT", "PHP_URL_PATH", "PHP_URL_PASS", "PHP_URL_HOST", "PHP_URL_FRAGMENT", "PHP_SYSCONFDIR", "PHP_SHLIB_SUFFIX", "PHP_SAPI", "PHP_ROUND_HALF_UP", "PHP_ROUND_HALF_ODD", "PHP_ROUND_HALF_EVEN", "PHP_ROUND_HALF_DOWN", "PHP_RELEASE_VERSION", "PHP_PREFIX", "PHP_OUTPUT_HANDLER_START", "PHP_OUTPUT_HANDLER_END", "PHP_OUTPUT_HANDLER_CONT", "PHP_OS", "PHP_NORMAL_READ", "PHP_MINOR_VERSION", "PHP_MAXPATHLEN", "PHP_MAJOR_VERSION", "PHP_LOCALSTATEDIR", "PHP_LIBDIR", "PHP_INT_SIZE", "PHP_INT_MAX", "PHP_EXTRA_VERSION", "PHP_EXTENSION_DIR", "PHP_EOL", "PHP_DEBUG", "PHP_DATADIR", "PHP_CONFIG_FILE_SCAN_DIR", "PHP_CONFIG_FILE_PATH", "PHP_BINDIR", "PHP_BINARY_READ", "PGSQL_TUPLES_OK", "PGSQL_TRANSACTION_UNKNOWN", "PGSQL_TRANSACTION_INTRANS", "PGSQL_TRANSACTION_INERROR", "PGSQL_TRANSACTION_IDLE", "PGSQL_TRANSACTION_ACTIVE", "PGSQL_STATUS_STRING", "PGSQL_STATUS_LONG", "PGSQL_SEEK_SET", "PGSQL_SEEK_END", "PGSQL_SEEK_CUR", "PGSQL_NUM", "PGSQL_NONFATAL_ERROR", "PGSQL_FATAL_ERROR", "PGSQL_ERRORS_VERBOSE", "PGSQL_ERRORS_TERSE", "PGSQL_ERRORS_DEFAULT", "PGSQL_EMPTY_QUERY", "PGSQL_DML_STRING", "PGSQL_DML_NO_CONV", "PGSQL_DML_EXEC", "PGSQL_DML_ASYNC", "PGSQL_DIAG_STATEMENT_POSITION", "PGSQL_DIAG_SQLSTATE", "PGSQL_DIAG_SOURCE_LINE", "PGSQL_DIAG_SOURCE_FUNCTION", "PGSQL_DIAG_SOURCE_FILE", "PGSQL_DIAG_SEVERITY", "PGSQL_DIAG_MESSAGE_PRIMARY", "PGSQL_DIAG_MESSAGE_HINT", "PGSQL_DIAG_MESSAGE_DETAIL", "PGSQL_DIAG_INTERNAL_QUERY", "PGSQL_DIAG_INTERNAL_POSITION", "PGSQL_DIAG_CONTEXT", "PGSQL_COPY_OUT", "PGSQL_COPY_IN", "PGSQL_CONV_IGNORE_NOT_NULL", "PGSQL_CONV_IGNORE_DEFAULT", "PGSQL_CONV_FORCE_NULL", "PGSQL_CONNECT_FORCE_NEW", "PGSQL_CONNECTION_OK", "PGSQL_CONNECTION_BAD", "PGSQL_COMMAND_OK", "PGSQL_BOTH", "PGSQL_BAD_RESPONSE", "PGSQL_ASSOC", "PEAR_INSTALL_DIR", "PEAR_EXTENSION_DIR", "PCRE_VERSION", "PATH_SEPARATOR", "PATHINFO_FILENAME", "PATHINFO_EXTENSION", "PATHINFO_DIRNAME", "PATHINFO_BASENAME", "OPENSSL_VERSION_TEXT", "OPENSSL_VERSION_NUMBER", "OPENSSL_TLSEXT_SERVER_NAME", "OPENSSL_SSLV23_PADDING", "OPENSSL_PKCS1_PADDING", "OPENSSL_PKCS1_OAEP_PADDING", "OPENSSL_NO_PADDING", "OPENSSL_KEYTYPE_RSA", "OPENSSL_KEYTYPE_EC", "OPENSSL_KEYTYPE_DSA", "OPENSSL_KEYTYPE_DH", "OPENSSL_CIPHER_RC2_64", "OPENSSL_CIPHER_RC2_40", "OPENSSL_CIPHER_RC2_128", "OPENSSL_CIPHER_DES", "OPENSSL_CIPHER_3DES", "OPENSSL_ALGO_SHA1", "OPENSSL_ALGO_MD5", "OPENSSL_ALGO_MD4", "OPENSSL_ALGO_DSS1", "ODBC_TYPE", "ODBC_BINMODE_RETURN", "ODBC_BINMODE_PASSTHRU", "ODBC_BINMODE_CONVERT", "NULL", "NORM_IGNOREWIDTH", "NORM_IGNORESYMBOLS", "NORM_IGNORENONSPACE", "NORM_IGNOREKANATYPE", "NORM_IGNORECASE", "NAN", "M_SQRTPI", "M_SQRT3", "M_SQRT2", "M_SQRT1_2", "M_PI_4", "M_PI_2", "M_PI", "M_LOG2E", "M_LOG10E", "M_LNPI", "M_LN2", "M_LN10", "M_EULER", "M_E", "M_2_SQRTPI", "M_2_PI", "M_1_PI", "MYSQL_NUM", "MYSQL_CLIENT_SSL", "MYSQL_CLIENT_INTERACTIVE", "MYSQL_CLIENT_IGNORE_SPACE", "MYSQL_CLIENT_COMPRESS", "MYSQL_BOTH", "MYSQL_ASSOC", "MYSQLI_ZEROFILL_FLAG", "MYSQLI_USE_RESULT", "MYSQLI_UNSIGNED_FLAG", "MYSQLI_UNIQUE_KEY_FLAG", "MYSQLI_TYPE_YEAR", "MYSQLI_TYPE_VAR_STRING", "MYSQLI_TYPE_TINY_BLOB", "MYSQLI_TYPE_TINY", "MYSQLI_TYPE_TIMESTAMP", "MYSQLI_TYPE_TIME", "MYSQLI_TYPE_STRING", "MYSQLI_TYPE_SHORT", "MYSQLI_TYPE_SET", "MYSQLI_TYPE_NULL", "MYSQLI_TYPE_NEWDECIMAL", "MYSQLI_TYPE_NEWDATE", "MYSQLI_TYPE_MEDIUM_BLOB", "MYSQLI_TYPE_LONG_BLOB", "MYSQLI_TYPE_LONGLONG", "MYSQLI_TYPE_LONG", "MYSQLI_TYPE_INTERVAL", "MYSQLI_TYPE_INT24", "MYSQLI_TYPE_GEOMETRY", "MYSQLI_TYPE_FLOAT", "MYSQLI_TYPE_ENUM", "MYSQLI_TYPE_DOUBLE", "MYSQLI_TYPE_DECIMAL", "MYSQLI_TYPE_DATETIME", "MYSQLI_TYPE_DATE", "MYSQLI_TYPE_CHAR", "MYSQLI_TYPE_BLOB", "MYSQLI_TYPE_BIT", "MYSQLI_TIMESTAMP_FLAG", "MYSQLI_STORE_RESULT", "MYSQLI_STMT_ATTR_UPDATE_MAX_LENGTH", "MYSQLI_STMT_ATTR_PREFETCH_ROWS", "MYSQLI_STMT_ATTR_CURSOR_TYPE", "MYSQLI_SET_FLAG", "MYSQLI_SET_CHARSET_NAME", "MYSQLI_SERVER_QUERY_WAS_SLOW", "MYSQLI_SERVER_QUERY_NO_INDEX_USED", "MYSQLI_SERVER_QUERY_NO_GOOD_INDEX_USED", "MYSQLI_REPORT_STRICT", "MYSQLI_REPORT_OFF", "MYSQLI_REPORT_INDEX", "MYSQLI_REPORT_ERROR", "MYSQLI_REPORT_ALL", "MYSQLI_REFRESH_THREADS", "MYSQLI_REFRESH_TABLES", "MYSQLI_REFRESH_STATUS", "MYSQLI_REFRESH_SLAVE", "MYSQLI_REFRESH_MASTER", "MYSQLI_REFRESH_LOG", "MYSQLI_REFRESH_HOSTS", "MYSQLI_REFRESH_GRANT", "MYSQLI_REFRESH_BACKUP_LOG", "MYSQLI_READ_DEFAULT_GROUP", "MYSQLI_READ_DEFAULT_FILE", "MYSQLI_PRI_KEY_FLAG", "MYSQLI_PART_KEY_FLAG", "MYSQLI_OPT_NET_READ_BUFFER_SIZE", "MYSQLI_OPT_NET_CMD_BUFFER_SIZE", "MYSQLI_OPT_LOCAL_INFILE", "MYSQLI_OPT_INT_AND_FLOAT_NATIVE", "MYSQLI_OPT_CONNECT_TIMEOUT", "MYSQLI_ON_UPDATE_NOW_FLAG", "MYSQLI_NUM_FLAG", "MYSQLI_NUM", "MYSQLI_NO_DEFAULT_VALUE_FLAG", "MYSQLI_NO_DATA", "MYSQLI_NOT_NULL_FLAG", "MYSQLI_MULTIPLE_KEY_FLAG", "MYSQLI_INIT_COMMAND", "MYSQLI_GROUP_FLAG", "MYSQLI_ENUM_FLAG", "MYSQLI_DEBUG_TRACE_ENABLED", "MYSQLI_DATA_TRUNCATED", "MYSQLI_CURSOR_TYPE_SCROLLABLE", "MYSQLI_CURSOR_TYPE_READ_ONLY", "MYSQLI_CURSOR_TYPE_NO_CURSOR", "MYSQLI_CURSOR_TYPE_FOR_UPDATE", "MYSQLI_CLIENT_SSL", "MYSQLI_CLIENT_NO_SCHEMA", "MYSQLI_CLIENT_INTERACTIVE", "MYSQLI_CLIENT_IGNORE_SPACE", "MYSQLI_CLIENT_FOUND_ROWS", "MYSQLI_CLIENT_COMPRESS", "MYSQLI_BOTH", "MYSQLI_BLOB_FLAG", "MYSQLI_BINARY_FLAG", "MYSQLI_AUTO_INCREMENT_FLAG", "MYSQLI_ASYNC", "MYSQLI_ASSOC", "MSG_WAITALL", "MSG_PEEK", "MSG_OOB", "MSG_DONTROUTE", "MK_E_UNAVAILABLE", "MCRYPT_XTEA", "MCRYPT_WAKE", "MCRYPT_TWOFISH", "MCRYPT_TRIPLEDES", "MCRYPT_THREEWAY", "MCRYPT_SKIPJACK", "MCRYPT_SERPENT", "MCRYPT_SAFERPLUS", "MCRYPT_SAFER64", "MCRYPT_SAFER128", "MCRYPT_RIJNDAEL_256", "MCRYPT_RIJNDAEL_192", "MCRYPT_RIJNDAEL_128", "MCRYPT_RC6", "MCRYPT_RC2", "MCRYPT_RAND", "MCRYPT_PANAMA", "MCRYPT_MODE_STREAM", "MCRYPT_MODE_OFB", "MCRYPT_MODE_NOFB", "MCRYPT_MODE_ECB", "MCRYPT_MODE_CFB", "MCRYPT_MODE_CBC", "MCRYPT_MARS", "MCRYPT_LOKI97", "MCRYPT_IDEA", "MCRYPT_GOST", "MCRYPT_ENIGNA", "MCRYPT_ENCRYPT", "MCRYPT_DEV_URANDOM", "MCRYPT_DEV_RANDOM", "MCRYPT_DES", "MCRYPT_DECRYPT", "MCRYPT_CRYPT", "MCRYPT_CAST_256", "MCRYPT_CAST_128", "MCRYPT_BLOWFISH_COMPAT", "MCRYPT_BLOWFISH", "MCRYPT_ARCFOUR_IV", "MCRYPT_ARCFOUR", "MCRYPT_3DES", "MB_OVERLOAD_STRING", "MB_OVERLOAD_REGEX", "MB_OVERLOAD_MAIL", "MB_CASE_UPPER", "MB_CASE_TITLE", "MB_CASE_LOWER", "LOG_WARNING", "LOG_UUCP", "LOG_USER", "LOG_SYSLOG", "LOG_PID", "LOG_PERROR", "LOG_ODELAY", "LOG_NOWAIT", "LOG_NOTICE", "LOG_NEWS", "LOG_NDELAY", "LOG_MAIL", "LOG_LPR", "LOG_KERN", "LOG_INFO", "LOG_ERR", "LOG_EMERG", "LOG_DEBUG", "LOG_DAEMON", "LOG_CRON", "LOG_CRIT", "LOG_CONS", "LOG_AUTHPRIV", "LOG_AUTH", "LOG_ALERT", "LOCK_UN", "LOCK_SH", "LOCK_NB", "LOCK_EX", "LIBXSLT_VERSION", "LIBXSLT_DOTTED_VERSION", "LIBXML_XINCLUDE", "LIBXML_VERSION", "LIBXML_PARSEHUGE", "LIBXML_NSCLEAN", "LIBXML_NOXMLDECL", "LIBXML_NOWARNING", "LIBXML_NONET", "LIBXML_NOERROR", "LIBXML_NOENT", "LIBXML_NOEMPTYTAG", "LIBXML_NOCDATA", "LIBXML_NOBLANKS", "LIBXML_LOADED_VERSION", "LIBXML_ERR_WARNING", "LIBXML_ERR_NONE", "LIBXML_ERR_FATAL", "LIBXML_ERR_ERROR", "LIBXML_DTDVALID", "LIBXML_DTDLOAD", "LIBXML_DTDATTR", "LIBXML_DOTTED_VERSION", "LIBXML_COMPACT", "LIBEXSLT_VERSION", "LIBEXSLT_DOTTED_VERSION", "LDAP_OPT_TIMELIMIT", "LDAP_OPT_SIZELIMIT", "LDAP_OPT_SERVER_CONTROLS", "LDAP_OPT_RESTART", "LDAP_OPT_REFERRALS", "LDAP_OPT_PROTOCOL_VERSION", "LDAP_OPT_NETWORK_TIMEOUT", "LDAP_OPT_MATCHED_DN", "LDAP_OPT_HOST_NAME", "LDAP_OPT_ERROR_STRING", "LDAP_OPT_ERROR_NUMBER", "LDAP_OPT_DEREF", "LDAP_OPT_DEBUG_LEVEL", "LDAP_OPT_CLIENT_CONTROLS", "LDAP_DEREF_SEARCHING", "LDAP_DEREF_NEVER", "LDAP_DEREF_FINDING", "LDAP_DEREF_ALWAYS", "LC_TIME", "LC_NUMERIC", "LC_MONETARY", "LC_CTYPE", "LC_COLLATE", "LC_ALL", "JSON_HEX_TAG", "JSON_HEX_QUOT", "JSON_HEX_APOS", "JSON_HEX_AMP", "JSON_FORCE_OBJECT", "JSON_ERROR_SYNTAX", "JSON_ERROR_STATE_MISMATCH", "JSON_ERROR_NONE", "JSON_ERROR_DEPTH", "JSON_ERROR_CTRL_CHAR", "INPUT_SESSION", "INPUT_SERVER", "INPUT_REQUEST", "INPUT_POST", "INPUT_GET", "INPUT_ENV", "INPUT_COOKIE", "INI_USER", "INI_SYSTEM", "INI_SCANNER_RAW", "INI_SCANNER_NORMAL", "INI_PERDIR", "INI_ALL", "INFO_VARIABLES", "INFO_MODULES", "INFO_LICENSE", "INFO_GENERAL", "INFO_ENVIRONMENT", "INFO_CREDITS", "INFO_CONFIGURATION", "INFO_ALL", "INF", "IMAGETYPE_XBM", "IMAGETYPE_WBMP", "IMAGETYPE_UNKNOWN", "IMAGETYPE_TIFF_MM", "IMAGETYPE_TIFF_II", "IMAGETYPE_SWF", "IMAGETYPE_SWC", "IMAGETYPE_PSD", "IMAGETYPE_PNG", "IMAGETYPE_JPX", "IMAGETYPE_JPEG2000", "IMAGETYPE_JPEG", "IMAGETYPE_JPC", "IMAGETYPE_JP2", "IMAGETYPE_JB2", "IMAGETYPE_IFF", "IMAGETYPE_ICO", "IMAGETYPE_GIF", "IMAGETYPE_COUNT", "IMAGETYPE_BMP", "ICONV_VERSION", "ICONV_MIME_DECODE_STRICT", "ICONV_MIME_DECODE_CONTINUE_ON_ERROR", "ICONV_IMPL", "HTTP_VERSION_NONE", "HTTP_VERSION_ANY", "HTTP_VERSION_1_1", "HTTP_VERSION_1_0", "HTTP_URL_STRIP_USER", "HTTP_URL_STRIP_QUERY", "HTTP_URL_STRIP_PORT", "HTTP_URL_STRIP_PATH", "HTTP_URL_STRIP_PASS", "HTTP_URL_STRIP_FRAGMENT", "HTTP_URL_STRIP_AUTH", "HTTP_URL_STRIP_ALL", "HTTP_URL_REPLACE", "HTTP_URL_JOIN_QUERY", "HTTP_URL_JOIN_PATH", "HTTP_URL_FROM_ENV", "HTTP_SUPPORT_SSLREQUESTS", "HTTP_SUPPORT_REQUESTS", "HTTP_SUPPORT_MAGICMIME", "HTTP_SUPPORT_EVENTS", "HTTP_SUPPORT_ENCODINGS", "HTTP_SUPPORT", "HTTP_SSL_VERSION_TLSv1", "HTTP_SSL_VERSION_SSLv3", "HTTP_SSL_VERSION_SSLv2", "HTTP_SSL_VERSION_ANY", "HTTP_REDIRECT_TEMP", "HTTP_REDIRECT_PROXY", "HTTP_REDIRECT_POST", "HTTP_REDIRECT_PERM", "HTTP_REDIRECT_FOUND", "HTTP_REDIRECT", "HTTP_QUERYSTRING_TYPE_STRING", "HTTP_QUERYSTRING_TYPE_OBJECT", "HTTP_QUERYSTRING_TYPE_INT", "HTTP_QUERYSTRING_TYPE_FLOAT", "HTTP_QUERYSTRING_TYPE_BOOL", "HTTP_QUERYSTRING_TYPE_ARRAY", "HTTP_PROXY_SOCKS5", "HTTP_PROXY_SOCKS4", "HTTP_PROXY_HTTP", "HTTP_PARAMS_RAISE_ERROR", "HTTP_PARAMS_DEFAULT", "HTTP_PARAMS_ALLOW_FAILURE", "HTTP_PARAMS_ALLOW_COMMA", "HTTP_MSG_RESPONSE", "HTTP_MSG_REQUEST", "HTTP_MSG_NONE", "HTTP_METH_VERSION_CONTROL", "HTTP_METH_UPDATE", "HTTP_METH_UNLOCK", "HTTP_METH_UNCHECKOUT", "HTTP_METH_TRACE", "HTTP_METH_REPORT", "HTTP_METH_PUT", "HTTP_METH_PROPPATCH", "HTTP_METH_PROPFIND", "HTTP_METH_POST", "HTTP_METH_OPTIONS", "HTTP_METH_MOVE", "HTTP_METH_MKWORKSPACE", "HTTP_METH_MKCOL", "HTTP_METH_MKACTIVITY", "HTTP_METH_MERGE", "HTTP_METH_LOCK", "HTTP_METH_LABEL", "HTTP_METH_HEAD", "HTTP_METH_GET", "HTTP_METH_DELETE", "HTTP_METH_COPY", "HTTP_METH_CONNECT", "HTTP_METH_CHECKOUT", "HTTP_METH_CHECKIN", "HTTP_METH_BASELINE_CONTROL", "HTTP_METH_ACL", "HTTP_IPRESOLVE_V6", "HTTP_IPRESOLVE_V4", "HTTP_IPRESOLVE_ANY", "HTTP_E_URL", "HTTP_E_SOCKET", "HTTP_E_RUNTIME", "HTTP_E_RESPONSE", "HTTP_E_REQUEST_POOL", "HTTP_E_REQUEST_METHOD", "HTTP_E_REQUEST", "HTTP_E_QUERYSTRING", "HTTP_E_MESSAGE_TYPE", "HTTP_E_MALFORMED_HEADERS", "HTTP_E_INVALID_PARAM", "HTTP_E_HEADER", "HTTP_E_ENCODING", "HTTP_ENCODING_STREAM_FLUSH_SYNC", "HTTP_ENCODING_STREAM_FLUSH_NONE", "HTTP_ENCODING_STREAM_FLUSH_FULL", "HTTP_DEFLATE_TYPE_ZLIB", "HTTP_DEFLATE_TYPE_RAW", "HTTP_DEFLATE_TYPE_GZIP", "HTTP_DEFLATE_STRATEGY_RLE", "HTTP_DEFLATE_STRATEGY_HUFF", "HTTP_DEFLATE_STRATEGY_FIXED", "HTTP_DEFLATE_STRATEGY_FILT", "HTTP_DEFLATE_STRATEGY_DEF", "HTTP_DEFLATE_LEVEL_MIN", "HTTP_DEFLATE_LEVEL_MAX", "HTTP_DEFLATE_LEVEL_DEF", "HTTP_COOKIE_SECURE", "HTTP_COOKIE_PARSE_RAW", "HTTP_COOKIE_HTTPONLY", "HTTP_AUTH_NTLM", "HTTP_AUTH_GSSNEG", "HTTP_AUTH_DIGEST", "HTTP_AUTH_BASIC", "HTTP_AUTH_ANY", "HTML_SPECIALCHARS", "HTML_ENTITIES", "HASH_HMAC", "GLOB_ONLYDIR", "GLOB_NOSORT", "GLOB_NOESCAPE", "GLOB_NOCHECK", "GLOB_MARK", "GLOB_ERR", "GLOB_BRACE", "GLOB_AVAILABLE_FLAGS", "FTP_TIMEOUT_SEC", "FTP_TEXT", "FTP_MOREDATA", "FTP_IMAGE", "FTP_FINISHED", "FTP_FAILED", "FTP_BINARY", "FTP_AUTOSEEK", "FTP_AUTORESUME", "FTP_ASCII", "FORCE_GZIP", "FORCE_DEFLATE", "FNM_PERIOD", "FNM_PATHNAME", "FNM_NOESCAPE", "FNM_CASEFOLD", "FILTER_VALIDATE_URL", "FILTER_VALIDATE_REGEXP", "FILTER_VALIDATE_IP", "FILTER_VALIDATE_INT", "FILTER_VALIDATE_FLOAT", "FILTER_VALIDATE_EMAIL", "FILTER_VALIDATE_BOOLEAN", "FILTER_UNSAFE_RAW", "FILTER_SANITIZE_URL", "FILTER_SANITIZE_STRIPPED", "FILTER_SANITIZE_STRING", "FILTER_SANITIZE_SPECIAL_CHARS", "FILTER_SANITIZE_NUMBER_INT", "FILTER_SANITIZE_NUMBER_FLOAT", "FILTER_SANITIZE_MAGIC_QUOTES", "FILTER_SANITIZE_ENCODED", "FILTER_SANITIZE_EMAIL", "FILTER_REQUIRE_SCALAR", "FILTER_REQUIRE_ARRAY", "FILTER_NULL_ON_FAILURE", "FILTER_FORCE_ARRAY", "FILTER_FLAG_STRIP_LOW", "FILTER_FLAG_STRIP_HIGH", "FILTER_FLAG_STRIP_BACKTICK", "FILTER_FLAG_SCHEME_REQUIRED", "FILTER_FLAG_QUERY_REQUIRED", "FILTER_FLAG_PATH_REQUIRED", "FILTER_FLAG_NO_RES_RANGE", "FILTER_FLAG_NO_PRIV_RANGE", "FILTER_FLAG_NO_ENCODE_QUOTES", "FILTER_FLAG_NONE", "FILTER_FLAG_IPV6", "FILTER_FLAG_IPV4", "FILTER_FLAG_HOST_REQUIRED", "FILTER_FLAG_ENCODE_LOW", "FILTER_FLAG_ENCODE_HIGH", "FILTER_FLAG_ENCODE_AMP", "FILTER_FLAG_EMPTY_STRING_NULL", "FILTER_FLAG_ALLOW_THOUSAND", "FILTER_FLAG_ALLOW_SCIENTIFIC", "FILTER_FLAG_ALLOW_OCTAL", "FILTER_FLAG_ALLOW_HEX", "FILTER_FLAG_ALLOW_FRACTION", "FILTER_DEFAULT", "FILTER_CALLBACK", "FILE_USE_INCLUDE_PATH", "FILE_TEXT", "FILE_SKIP_EMPTY_LINES", "FILE_NO_DEFAULT_CONTEXT", "FILE_IGNORE_NEW_LINES", "FILE_BINARY", "FILE_APPEND", "FALSE", "E_WARNING", "E_USER_WARNING", "E_USER_NOTICE", "E_USER_ERROR", "E_USER_DEPRECATED", "E_STRICT", "E_RECOVERABLE_ERROR", "E_PARSE", "E_NOTICE", "E_ERROR", "E_DEPRECATED", "E_CORE_WARNING", "E_CORE_ERROR", "E_COMPILE_WARNING", "E_COMPILE_ERROR", "E_ALL", "EXTR_SKIP", "EXTR_REFS", "EXTR_PREFIX_SAME", "EXTR_PREFIX_INVALID", "EXTR_PREFIX_IF_EXISTS", "EXTR_PREFIX_ALL", "EXTR_OVERWRITE", "EXTR_IF_EXISTS", "EXIF_USE_MBSTRING", "ENT_QUOTES", "ENT_NOQUOTES", "ENT_IGNORE", "ENT_COMPAT", "DOM_WRONG_DOCUMENT_ERR", "DOM_VALIDATION_ERR", "DOM_SYNTAX_ERR", "DOM_PHP_ERR", "DOM_NO_MODIFICATION_ALLOWED_ERR", "DOM_NO_DATA_ALLOWED_ERR", "DOM_NOT_SUPPORTED_ERR", "DOM_NOT_FOUND_ERR", "DOM_NAMESPACE_ERR", "DOM_INVALID_STATE_ERR", "DOM_INVALID_MODIFICATION_ERR", "DOM_INVALID_CHARACTER_ERR", "DOM_INVALID_ACCESS_ERR", "DOM_INUSE_ATTRIBUTE_ERR", "DOM_INDEX_SIZE_ERR", "DOM_HIERARCHY_REQUEST_ERR", "DOMSTRING_SIZE_ERR", "DNS_TXT", "DNS_SRV", "DNS_SOA", "DNS_PTR", "DNS_NS", "DNS_NAPTR", "DNS_MX", "DNS_HINFO", "DNS_CNAME", "DNS_ANY", "DNS_ALL", "DNS_AAAA", "DNS_A6", "DNS_A", "DISP_E_OVERFLOW", "DISP_E_DIVBYZERO", "DISP_E_BADINDEX", "DIRECTORY_SEPARATOR", "DEFAULT_INCLUDE_PATH", "DATE_W3C", "DATE_RSS", "DATE_RFC850", "DATE_RFC822", "DATE_RFC3339", "DATE_RFC2822", "DATE_RFC1123", "DATE_RFC1036", "DATE_ISO8601", "DATE_COOKIE", "DATE_ATOM", "CRYPT_STD_DES", "CRYPT_SHA512", "CRYPT_SHA256", "CRYPT_SALT_LENGTH", "CRYPT_MD5", "CRYPT_EXT_DES", "CRYPT_BLOWFISH", "CREDITS_SAPI", "CREDITS_QA", "CREDITS_MODULES", "CREDITS_GROUP", "CREDITS_GENERAL", "CREDITS_FULLPAGE", "CREDITS_DOCS", "CREDITS_ALL", "CP_UTF8", "CP_UTF7", "CP_THREAD_ACP", "CP_SYMBOL", "CP_OEMCP", "CP_MACCP", "CP_ACP", "COUNT_RECURSIVE", "COUNT_NORMAL", "CONNECTION_TIMEOUT", "CONNECTION_NORMAL", "CONNECTION_ABORTED", "CLSCTX_SERVER", "CLSCTX_REMOTE_SERVER", "CLSCTX_LOCAL_SERVER", "CLSCTX_INPROC_SERVER", "CLSCTX_INPROC_HANDLER", "CLSCTX_ALL", "CHAR_MAX", "CASE_UPPER", "CASE_LOWER", "CAL_NUM_CALS", "CAL_MONTH_JULIAN_SHORT", "CAL_MONTH_JULIAN_LONG", "CAL_MONTH_JEWISH", "CAL_MONTH_GREGORIAN_SHORT", "CAL_MONTH_GREGORIAN_LONG", "CAL_MONTH_FRENCH", "CAL_JULIAN", "CAL_JEWISH_ADD_GERESHAYIM", "CAL_JEWISH_ADD_ALAFIM_GERESH", "CAL_JEWISH_ADD_ALAFIM", "CAL_JEWISH", "CAL_GREGORIAN", "CAL_FRENCH", "CAL_EASTER_ROMAN", "CAL_EASTER_DEFAULT", "CAL_EASTER_ALWAYS_JULIAN", "CAL_EASTER_ALWAYS_GREGORIAN", "CAL_DOW_SHORT", "CAL_DOW_LONG", "CAL_DOW_DAYNO", "ASSERT_WARNING", "ASSERT_QUIET_EVAL", "ASSERT_CALLBACK", "ASSERT_BAIL", "ASSERT_ACTIVE", "APACHE_MAP", "AF_UNIX", "AF_INET6", "AF_INET"], boundary: "\\b" }, openTag: { values: ["<?php"], boundary: "\\s" }, shortOpenTag: { values: ["<?=", "<?"], boundary: "" }, closeTag: { values: ["?>"], boundary: "" } }, scopes: { string: [['"', '"', b.util.escapeSequences.concat(['\\"'])], ["'", "'", ["\\'", "\\\\"]]], comment: [["//", "\n", null, true], ["/*", "*/"], ["#", "\n", null, true]], variable: [["$", { length: 1, regex: /[^\$A-Za-z0-9_]/ }, null, true]] }, customParseRules: [function (f) {
      var i = "<<<",
          d = f.reader.getLine(),
          g = f.reader.getColumn(),
          h = "",
          j = false,
          e;if (f.reader.current() !== "<" || f.reader.peek(2) !== "<<") {
        return null;
      }f.reader.read(2);e = f.reader.peek();while (e !== f.reader.EOF && e !== "\n") {
        i += f.reader.read();if (e !== "'") {
          h += f.reader.current();
        } else {
          j = true;
        }e = f.reader.peek();
      }if (e !== f.reader.EOF) {
        i += f.reader.read();while (f.reader.peek() !== f.reader.EOF) {
          if (f.reader.peek(h.length + 2) === "\n" + h + ";") {
            break;
          }i += f.reader.read();
        }if (f.reader.peek() !== f.reader.EOF) {
          i += f.reader.read(h.length + 1);
        }
      }return f.createToken(j ? "nowdoc" : "heredoc", i, d, g);
    }], identFirstLetter: /[A-Za-z_]/, identAfterFirstLetter: /\w/, namedIdentRules: { custom: [function (e) {
        var f = b.util.getPreviousNonWsToken(e.tokens, e.index),
            d;if (!f || f.name !== "keyword" || f.value !== "new") {
          return false;
        }d = b.util.getNextNonWsToken(e.tokens, e.index);if (d && d.name === "operator" && d.value === "\\") {
          return false;
        }return true;
      }, function (g) {
        var d = b.util.getNextNonWsToken(g.tokens, g.index),
            f,
            e;if (!d || d.name !== "punctuation" || d.value !== ";" && d.value !== ",") {
          return false;
        }e = g.index;while (f = g.tokens[--e]) {
          if (f.name !== "ident" && f.name !== "default" && (f.name !== "operator" || f.value !== "\\") && (f.name !== "punctuation" || f.value !== ",")) {
            return f.name === "keyword" && f.value === "use";
          }
        }return false;
      }, function (g) {
        var d = b.util.getNextNonWsToken(g.tokens, g.index),
            f,
            e,
            h;if (d && d.name === "operator" && d.value === "\\") {
          return false;
        }e = g.index;h = g.tokens[e];while ((f = g.tokens[--e]) !== c) {
          if (f.name === "keyword" && (f.value === "new" || f.value === "instanceof")) {
            return true;
          }if (f.name === "default") {
            continue;
          }if (f.name === "ident") {
            if (h && h.name === "ident") {
              return false;
            }h = f;continue;
          }if (f.name === "operator" && f.value === "\\") {
            if (h && h.name !== "ident") {
              return false;
            }h = f;continue;
          }break;
        }return false;
      }], follows: [[{ token: "ident" }, b.util.whitespace, { token: "keyword", values: ["extends", "implements"] }, b.util.whitespace], [{ token: "keyword", values: ["class", "interface", "abstract", "final"] }, b.util.whitespace]], precedes: [[b.util.whitespace, { token: "operator", values: ["::"] }], [{ token: "default" }, { token: "variable" }]], between: [{ opener: { token: "keyword", values: ["implements"] }, closer: { token: "punctuation", values: ["{"] } }] }, operators: ["::", "->", "++", "+=", "+", "--", "-=", "-", "*=", "*", "/=", "/", "%=", "%", "&&", "||", "|=", "|", "&=", "&", "^=", "^", ">>=", ">>", "<<=", "<<", "<=", "<", ">=", ">", "===", "==", "!==", "!=", "!", "~", "?:", "?", ":", ".=", ".", "=>", "=", "\\"] });
})(undefined["Sunlight"], document);(function (a, b) {
  if (a === b || a.registerLanguage === b) {
    throw "Include sunlight.js before including language files";
  }a.registerLanguage("mysql", { caseInsensitive: true, keywords: ["accessible", "add", "all", "alter", "analyze", "and", "as", "asc", "asensitive", "before", "between", "bigint", "binary", "blob", "both", "by", "call", "cascade", "case", "change", "char", "character", "check", "collate", "column", "condition", "constraint", "continue", "convert", "create", "cross", "current_date", "current_time", "current_timestamp", "current_user", "cursor", "database", "databases", "day_hour", "day_microsecond", "day_minute", "day_second", "dec", "decimal", "declare", "default", "delayed", "delete", "desc", "describe", "deterministic", "distinct", "distinctrow", "div", "double", "drop", "dual", "each", "else", "elseif", "enclosed", "escaped", "exists", "exit", "explain", "false", "fetch", "float", "float4", "float8", "for", "force", "foreign", "from", "fulltext", "grant", "group", "having", "high_priority", "hour_microsecond", "hour_minute", "hour_second", "if", "ignore", "in", "index", "infile", "inner", "inout", "insensitive", "insert", "int", "int1", "int2", "int3", "int4", "int8", "integer", "interval", "into", "is", "iterate", "join", "key", "keys", "kill", "leading", "leave", "left", "like", "limit", "linear", "lines", "load", "localtime", "localtimestamp", "lock", "long", "longblob", "longtext", "loop", "low_priority", "master_ssl_verify_server_cert", "match", "maxvalue", "mediumblob", "mediumint", "mediumtext", "middleint", "minute_microsecond", "minute_second", "mod", "modifies", "natural", "not", "no_write_to_binlog", "null", "numeric", "on", "optimize", "option", "optionally", "or", "order", "out", "outer", "outfile", "precision", "primary", "procedure", "purge", "range", "read", "reads", "read_write", "real", "references", "regexp", "release", "rename", "repeat", "replace", "require", "resignal", "restrict", "return", "revoke", "right", "rlike", "schema", "schemas", "second_microsecond", "select", "sensitive", "separator", "set", "show", "signal", "smallint", "spatial", "specific", "sql", "sqlexception", "sqlstate", "sqlwarning", "sql_big_result", "sql_calc_found_rows", "sql_small_result", "ssl", "starting", "straight_join", "table", "terminated", "then", "tinyblob", "tinyint", "tinytext", "to", "trailing", "trigger", "true", "undo", "union", "unique", "unlock", "unsigned", "update", "usage", "use", "using", "utc_date", "utc_time", "utc_timestamp", "values", "varbinary", "varchar", "varcharacter", "varying", "when", "where", "while", "with", "write", "xor", "year_month", "zerofill", "general", "ignore_server_ids", "master_heartbeat_period", "slow", "action", "bit", "date", "enum", "no", "text", "time", "timestamp", "prepare", "execute", "deallocate prepare", "begin", "end", "delimiter", "repeat", "open", "close", "do", "handler", "load data infile", "start transaction", "commit", "rollback", "flush", "with read lock", "sounds"], customParseRules: [function () {
      var c = a.util.createHashMap(["abs", "acos", "adddate", "addtime", "aes_decrypt", "aes_encrypt", "ascii", "asin", "atan2", "atan", "atan", "avg", "benchmark", "bin", "binary", "bit_and", "bit_count", "bit_length", "bit_or", "bit_xor", "cast", "ceil", "ceiling", "char_length", "char", "character_length", "charset", "coalesce", "coercibility", "collation", "compress", "concat_ws", "concat", "connection_id", "conv", "convert_tz", "convert", "cos", "cot", "countdistinct", "count", "crc32", "curdate", "current_date", "current_time", "current_timestamp", "current_user", "curtime", "database", "date_add", "date_format", "date_sub", "date", "datediff", "day", "dayname", "dayofmonth", "dayofweek", "dayofyear", "decode", "default", "degrees", "des_decrypt", "des_encrypt", "elt", "encode", "encrypt", "exp", "export_set", "extract", "extractvalue", "field", "find_in_set", "floor", "format", "found_rows", "from_days", "from_unixtime", "get_format", "get_lock", "greatest", "group_concat", "hex", "hour", "if", "ifnull", "in", "inet_aton", "inet_ntoa", "insert", "instr", "interval", "is_free_lock", "is_used_lock", "isnull", "last_insert_id", "lcase", "least", "left", "length", "ln", "load_file", "localtime", "localtimestamp", "locate", "log10", "log2", "log", "lower", "lpad", "ltrim", "make_set", "makedate", "master_pos_wait", "max", "md5", "microsecond", "mid", "min", "minute", "mod", "month", "monthname", "name_const", "now", "nullif", "oct", "octet_length", "old_password", "ord", "password", "period_add", "period_diff", "pi", "position", "pow", "power", "procedureanalyse", "quarter", "quote", "radians", "rand", "release_lock", "repeat", "replace", "reverse", "right", "rlike", "round", "row_count", "rpad", "rtrim", "schema", "sec_to_time", "second", "session_user", "sha1", "sha", "sha2", "sign", "sin", "sleep", "soundex", "space", "sqrt", "std", "stddev_pop", "stddev_samp", "stddev", "str_to_date", "strcmp", "subdate", "substr", "substring_index", "substring", "subtime", "sum", "sysdate", "system_user", "tan", "time_format", "time_to_sec", "time", "timediff", "timestamp", "timestampadd", "timestampdiff", "to_days", "to_seconds", "trim", "truncate", "ucase", "uncompress", "uncompressed_length", "unhex", "unix_timestamp", "updatexml", "upper", "user", "utc_date", "utc_time", "utc_timestamp", "uuid_short", "uuid", "values", "var_pop", "var_samp", "variance", "version", "week", "weekday", "weekofyear", "year", "yearweek"], "\\b", true);return function (f) {
        var e = a.util.matchWord(f, c, "function", true),
            g,
            d;if (e === null) {
          return null;
        }g = e.value.length;d = f.reader.peek(g);while (d.length === g && d !== f.reader.EOF) {
          if (!/\s$/.test(d)) {
            if (d.charAt(d.length - 1) === "(") {
              f.reader.read(e.value.length - 1);return e;
            }break;
          }d = f.reader.peek(++g);
        }return null;
      };
    }()], scopes: { string: [['"', '"', a.util.escapeSequences.concat(['\\"'])], ["'", "'", ["\\'", "\\\\"]]], comment: [["--", "\n", null, true], ["/*", "*/"], ["#", "\n", null, true]], quotedIdent: [["`", "`", ["`\\`", "\\\\"]]] }, identFirstLetter: /[A-Za-z_]/, identAfterFirstLetter: /\w/, namedIdentRules: { follows: [[{ token: "keyword", values: ["from", "join"] }, { token: "default" }], [{ token: "keyword", values: ["from", "join"] }, { token: "default" }, { token: "ident" }, a.util.whitespace, { token: "operator", values: ["."] }, a.util.whitespace]] }, operators: ["+", "-", "*", "/", "%", "&&", "||", "|", "&", "^", ">>", "<<", "<>", "<=>", "<=", "<", ">=", ">", "==", "!=", "!", "~", ":=", "=", "."] });
})(undefined["Sunlight"]);(function (a, c) {
  if (a === c || a.registerLanguage === c) {
    throw "Include sunlight.js before including language files";
  }function b(f) {
    var e,
        d = f.count();while (e = f.token(--d)) {
      if (e.name === "operator") {
        if (e.value === ">" || e.value === "/>" || e.value === "</") {
          return false;
        }
      }if (e.name === "tagName" || e.name === "xmlOpenTag") {
        return true;
      }
    }return false;
  }a.registerLanguage("xml", { caseInsensitive: true, scopes: { comment: [["<!--", "-->"], ["<%--", "--%>"]], cdata: [["<![CDATA[", "]]>"]], doctype: [["<!DOCTYPE", ">"]] }, punctuation: /(?!x)x/, numberParser: function numberParser() {}, customTokens: { xmlOpenTag: { values: ["<?xml"], boundary: "" }, xmlCloseTag: { values: ["?>"], boundary: "" }, aspOpenTag: { values: ["<%@", "<%$", "<%#", "<%=", "<%"], boundary: "" }, aspCloseTag: { values: ["%>"], boundary: "" } }, customParseRules: [function (g) {
      var j = g.reader.current(),
          i,
          e,
          f = j,
          d = g.reader.getLine(),
          h = g.reader.getColumn();if (!/[A-Za-z_]/.test(j)) {
        return null;
      }i = g.token(g.count() - 1);if (!i || i.name !== "operator" || !a.util.contains(["<", "</"], i.value)) {
        return null;
      }while (e = g.reader.peek()) {
        if (!/[.\w-]/.test(e)) {
          break;
        }f += g.reader.read();
      }return g.createToken("tagName", f, d, h);
    }, function (h) {
      var f = h.reader.current(),
          d,
          g,
          e = h.reader.getLine(),
          i = h.reader.getColumn();if (f !== '"' && f !== "'") {
        return null;
      }if (!b(h)) {
        return null;
      }d = f;while (g = h.reader.peek()) {
        d += h.reader.read();if (g === f) {
          break;
        }
      }return h.createToken("string", d, e, i);
    }, function (f) {
      var j = f.reader.current(),
          e,
          i = 1,
          h,
          d = f.reader.getLine(),
          g = f.reader.getColumn();if (!/[A-Za-z_]/.test(j)) {
        return null;
      }if (!b(f)) {
        return null;
      }e = f.reader.peek();while (e.length === i) {
        if (/<$/.test(e)) {
          return null;
        }if (/>$/.test(e)) {
          h = h || j + e.substring(0, e.length - 1);f.reader.read(h.length - 1);return f.createToken("attribute", h, d, g);
        }if (!h && /[=\s:]$/.test(e)) {
          h = j + e.substring(0, e.length - 1);
        }e = f.reader.peek(++i);
      }return null;
    }, function (f) {
      var i = f.reader.current(),
          h = 1,
          e,
          d = f.reader.getLine(),
          g = f.reader.getColumn();if (i !== "&") {
        return null;
      }e = f.reader.peek(h);while (e.length === h) {
        if (e.charAt(e.length - 1) === ";") {
          return f.createToken("entity", i + f.reader.read(h), d, g);
        }if (!/[A-Za-z0-9]$/.test(e)) {
          break;
        }e = f.reader.peek(++h);
      }return null;
    }, function (f) {
      var e,
          h = "<%--",
          d = f.reader.getLine(),
          g = f.reader.getColumn();if (f.reader.current() !== "<" || f.reader.peek(3) !== "%--") {
        return null;
      }f.reader.read(3);while (e = f.reader.peek()) {
        if (f.reader.peek(4) === "--%>") {
          h += f.reader.read(4);break;
        }h += f.reader.read();
      }return f.createToken("comment", h, d, g);
    }], embeddedLanguages: { css: { switchTo: function switchTo(e) {
          var f = e.token(e.count() - 1),
              d;if (!f || e.reader.current() + e.reader.peek(6) === "</style") {
            return false;
          }if (f.name !== "operator" || f.value !== ">") {
            return false;
          }d = e.count() - 1;while (f = e.token(--d)) {
            if (f.name === "tagName") {
              if (f.value === "style") {
                f = e.token(--d);if (f && f.name === "operator" && f.value === "<") {
                  return true;
                }
              }break;
            }
          }return false;
        }, switchBack: function switchBack(d) {
          return d.reader.peek(7) === "</style";
        } }, javascript: { switchTo: function switchTo(e) {
          var f = e.token(e.count() - 1),
              d;if (!f || e.reader.current() + e.reader.peek(7) === "<\/script") {
            return false;
          }if (f.name !== "operator" || f.value !== ">") {
            return false;
          }d = e.count() - 1;while (f = e.token(--d)) {
            if (f.name === "tagName") {
              if (f.value === "script") {
                f = e.token(--d);if (f && f.name === "operator" && f.value === "<") {
                  return true;
                }
              }break;
            }
          }return false;
        }, switchBack: function switchBack(d) {
          return d.reader.peek(8) === "<\/script";
        } }, php: { switchTo: function switchTo(d) {
          var e = d.reader.peek(4);return d.reader.current() === "<" && (e === "?php" || /^\?(?!xml)/.test(e));
        }, switchBack: function switchBack(d) {
          var e = d.token(d.count() - 1);return e && e.name === "closeTag";
        } }, csharp: { switchTo: function switchTo(d) {
          var e = d.token(d.count() - 1);return e && e.name === "aspOpenTag";
        }, switchBack: function switchBack(d) {
          return d.reader.peek(2) === "%>";
        } }, scala: { switchTo: function switchTo(d) {
          if (!d.options.enableScalaXmlInterpolation) {
            return false;
          }if (d.reader.current() === "{") {
            return true;
          }return false;
        }, switchBack: function switchBack(d) {
          var e = d.token(d.count() - 1);if (e.name === "punctuation") {
            if (e.value === "{") {
              d.items.scalaBracketNestingLevel++;
            } else {
              if (e.value === "}") {
                d.items.scalaBracketNestingLevel--;if (d.items.scalaBracketNestingLevel === 0) {
                  return true;
                }
              }
            }
          }return false;
        } } }, contextItems: { scalaBracketNestingLevel: 0 }, operators: ["=", "/>", "</", "<", ">", ":"] });
})(undefined["Sunlight"]);(function (b, c) {
  if (b === c || b.registerLanguage === c) {
    throw "Include sunlight.js before including language files";
  }function a(h) {
    var g,
        f = h.count(),
        j = "",
        e = true,
        i = 1,
        d;while ((g = h.token(--f)) !== c) {
      if (g.name === "punctuation" && g.value === "}") {
        break;
      } else {
        if (g.name === "punctuation" && g.value === "{") {
          return null;
        }
      }
    }d = h.reader.peek();while (d.length === i) {
      letter = d.charAt(d.length - 1);if (/[^\w-]$/.test(d)) {
        e = false;if (letter === "{") {
          break;
        }if (letter === ";") {
          return null;
        }
      }if (e) {
        j += letter;
      }d = h.reader.peek(++i);
    }return j;
  }b.registerLanguage("css", { caseInsensitive: true, keywords: ["background-color", "background-image", "background-repeat", "background-attachment", "background-position", "background-clip", "background-origin", "background-size", "background", "border-collapse", "border-top-style", "border-right-style", "border-left-style", "border-bottom-style", "border-style", "border-top-width", "border-right-width", "border-left-width", "border-bottom-width", "border-width", "border-top-color", "border-right-color", "border-left-color", "border-bottom-color", "border-color", "border-radius", "border-top-left-radius", "border-top-right-radius", "border-bottom-right-radius", "border-bottom-left-radius", "border-image-repeat", "border-image-source", "border-image-slice", "border-image-width", "border-image-outset", "border-image", "border-top", "border-bottom", "border-right", "border-left", "border-spacing", "border", "box-decoration-break", "box-shadow", "voice-volume", "voice-balance", "pause-before", "pause-after", "pause", "rest-before", "rest-after", "rest", "cue-before", "cue-after", "cue", "mark-before", "mark-after", "mark", "voice-family", "voice-rate", "voice-pitch", "voice-pitch-range", "voice-stress", "voice-duration", "phonemes", "speak-header", "speak-numeral", "speak-punctuation", "pitch-range", "play-during", "richness", "speak", "speech-rate", "appearance", "icon", "box-sizing", "outline-width", "outline-style", "outline-color", "outline-offset", "outline", "resize", "cursor", "nav-index", "nav-up", "nav-right", "nav-down", "nav-left", "display", "position", "float", "clear", "visibility", "bottom", "top", "left", "right", "overflow", "overflow-x", "overflow-y", "overflow-style", "marquee-style", "marquee-direction", "marquee-play-count", "marquee-speed", "padding-top", "padding-right", "padding-bottom", "padding-left", "padding", "margin-top", "margin-right", "margin-bottom", "margin-left", "margin", "width", "height", "min-width", "max-width", "min-height", "max-height", "rotation-point", "rotation", "white-space-collapsing", "white-space", "line-break", "word-break", "hyphens", "hyphenate-character", "hyphenate-limit-before", "hyphenate-limit-after", "hyphenate-limit-lines", "hyphenate-limit-last", "hyphenate-resource", "text-wrap", "word-wrap", "text-align-first", "text-align-last", "text-align", "text-justify", "word-spacing", "letter-spacing", "text-trim", "text-autospace", "text-indent", "hanging-punctuation", "text-decoration-line", "text-decoration-color", "text-decoration-style", "text-decoration-skip", "text-decoration", "text-underline-position", "text-emphasis-position", "text-emphasis-style", "text-emphasis-color", "text-emphasis", "text-shadow", "text-outline", "text-transform", "vertical-align", "direction", "unicode-bidi", "writing-mode", "text-orientation", "text-combine", "color", "opacity", "font-family", "font-weight", "font-stretch", "font-style", "font-size-adjust", "font-size", "font-synthesis", "src", "unicode-range", "font-feature-settings", "font-kerning", "vertical-position", "font-variant-ligatures", "font-variant-caps", "font-variant-numeric", "font-variant-alternates", "font-variant-east-asian", "font-variant", "font-feature-settings", "font-language-override", "font", "line-height", "text-height", "transform-origin", "transform-style", "perspective-origin", "perspective", "backface-visibility", "transform", "transition-property", "transition-duration", "transition-timing-function", "transition-delay", "list-style-type", "list-style-image", "list-style-position", "list-style", "column-width", "column-count", "colunns", "column-gap", "column-rule-color", "column-rule-style", "column-rule-width", "column-rule", "break-before", "break-after", "break-inside", "column-span", "column-fill", "caption-side", "table-layout", "empty-cells", "fit-position", "fit", "image-orientation", "orphans", "page-break-after", "page-break-before", "page-break-inside", "page", "size", "widows", "content", "z-index", "counter-increment", "counter-reset", "azimuth", "elevation", "quotes", "filter", "zoom", "-moz-appearance", "-moz-background-clip", "-moz-background-inline-policy", "-moz-background-origin", "-moz-background-size", "-moz-binding", "-moz-border-bottom-colors", "-moz-border-left-colors", "-moz-border-right-colors", "-moz-border-top-colors", "-moz-border-end", "-moz-border-end-color", "-moz-border-end-style", "-moz-border-end-width", "-moz-border-image", "-moz-border-start", "-moz-border-start-color", "-moz-border-start-style", "-moz-border-start-width", "-moz-box-align", "-moz-box-direction", "-moz-box-flex", "-moz-box-flexgroup", "-moz-box-ordinal-group", "-moz-box-orient", "-moz-box-pack", "-moz-box-sizing", "-moz-column-count", "-moz-column-gap", "-moz-column-width", "-moz-column-rule", "-moz-column-rule-width", "-moz-column-rule-style", "-moz-column-rule-color", "-moz-float-edge", "-moz-font-feature-settings", "-moz-font-language-override", "-moz-force-broken-image-icon", "-moz-image-region", "-moz-margin-end", "-moz-margin", "-moz-opacity", "-moz-outline", "-moz-outline-color", "-moz-outline-offset", "-moz-outline-radius", "-moz-outline-radius-bottomleft", "-moz-outline-radius-bottomright", "-moz-outline-radius-topleft", "-moz-outline-radius-topright", "-moz-outline-style", "-moz-outline-width", "-moz-padding-end", "-moz-padding-start", "-moz-stack-sizing", "-moz-tab-size", "-moz-transform", "-moz-transform-origin", "-moz-transition", "-moz-transition-delay", "-moz-transition-duration", "-moz-transition-property", "-moz-transition-timing-function", "-moz-user-focus", "-moz-user-input", "-moz-user-modify", "-moz-user-select", "-moz-window-shadow", "-webkit-appearance", "-webkit-background-clip", "-webkit-background-composite", "-webkit-background-origin", "-webkit-background-size", "-webkit-binding", "-webkit-border-bottom-left-radius", "-webkit-border-bottom-right-radius", "-webkit-border-fit", "-webkit-border-horizontal-spacing", "-webkit-border-image", "-webkit-border-radius", "-webkit-border-top-left-radius", "-webkit-border-top-right-radius", "-webkit-border-vertical-spacing", "-webkit-box-align", "-webkit-box-direction", "-webkit-box-flex", "-webkit-box-flex-group", "-webkit-box-lines", "-webkit-box-ordinal-group", "-webkit-box-orient", "-webkit-box-pack", "-webkit-box-shadow", "-webkit-box-sizing", "-webkit-column-break-after", "-webkit-column-break-before", "-webkit-column-break-inside", "-webkit-column-count", "-webkit-column-gap", "-webkit-column-rule", "-webkit-column-rule-color", "-webkit-column-rule-style", "-webkit-column-rule-width", "-webkit-column-width", "-webkit-columns", "-webkit-dashboard-region", "-webkit-font-size-delta", "-webkit-highlight", "-webkit-line-break", "-webkit-line-clamp", "-webkit-margin-bottom-collapse", "-webkit-margin-collapse	#", "-webkit-margin-start", "-webkit-margin-top-collapse", "-webkit-marquee", "-webkit-marquee-direction", "-webkit-marquee-increment", "-webkit-marquee-repetition", "-webkit-marquee-speed", "-webkit-marquee-style", "-webkit-match-nearest-mail-blockquote-color", "-webkit-nbsp-mode", "-webkit-padding-start", "-webkit-rtl-ordering", "-webkit-text-decorations-in-effect", "-webkit-text-fill-color", "-webkit-text-security", "-webkit-text-size-adjust", "-webkit-text-stroke", "-webkit-text-stroke-color", "-webkit-text-stroke-width", "-webkit-user-drag", "-webkit-user-modify", "-webkit-user-select", "-o-border-image", "-o-device-pixel-ratio", "-o-linear-gradient", "-o-repeating-linear-gradient", "-o-object-fit", "-o-object-position", "-o-tab-size", "-o-table-baseline", "-o-transform", "-o-transform-origin", "-o-transition", "-o-transition-delay", "-o-transition-duration", "-o-transition-property", "-o-transition-timing-function", "-o-zoom-in", "-o-zoom-out", "-ms-accelerator", "-ms-background-position-x", "-ms-background-position-y", "-ms-behavior", "-ms-block-progression", "-ms-filter", "-ms-ime-mode", "-ms-layout-grid", "-ms-layout-grid-char", "-ms-layout-grid-line", "-ms-layout-grid-mode", "-ms-layout-grid-type", "-ms-line-break", "-ms-line-grid-mode", "-ms-interpolation-mode", "-ms-overflow-x", "-ms-overflow-y", "-ms-scrollbar-3dlight-color", "-ms-scrollbar-arrow-color", "-ms-scrollbar-base-color", "-ms-scrollbar-darkshadow-color", "-ms-scrollbar-face-color", "-ms-scrollbar-highlight-color", "-ms-scrollbar-shadow-color", "-ms-scrollbar-track-color", "-ms-text-align-last", "-ms-text-autospace", "-ms-text-justify", "-ms-text-kashida-space", "-ms-text-overflow", "-ms-text-underline-position", "-ms-word-break", "-ms-word-wrap", "-ms-writing-mode", "-ms-zoom"], customParseRules: [function () {
      var d = b.util.createHashMap(["matrix", "translate", "translateX", "translateY", "scaleX", "scaleY", "rotate", "skewX", "skewY", "skew", "translate3d", "scaleZ", "translateZ", "rotate3d", "perspective", "url", "alpha", "basicimage", "blur", "dropshadow", "engrave", "glow", "light", "maskfilter", "motionblur", "shadow", "wave"], "\\b", true);return function (g) {
        var f = b.util.matchWord(g, d, "function", true),
            h,
            e;if (f === null) {
          return null;
        }h = f.value.length;e = g.reader.peek(h);while (e.length === h && e !== g.reader.EOF) {
          if (!/\s$/.test(e)) {
            if (e.charAt(e.length - 1) === "(") {
              g.reader.read(f.value.length - 1);return f;
            }break;
          }e = g.reader.peek(++h);
        }return null;
      };
    }(), function () {
      var d = b.util.createHashMap(["root", "nth-child", "nth-last-child", "nth-of-type", "nth-last-of-type", "first-child", "last-child", "first-of-type", "last-of-type", "only-child", "only-of-type", "empty", "link", "visited", "active", "hover", "focus", "target", "lang", "enabled", "disabled", "checked", "first-line", "first-letter", "before", "after", "not", "read-only", "read-write", "default", "valid", "invalid", "in-range", "out-of-range", "required", "optional"], "\\b", true);return function (e) {
        var f = b.util.getPreviousNonWsToken(e.getAllTokens(), e.count());if (!f || f.name !== "operator" || f.value !== ":") {
          return null;
        }return b.util.matchWord(e, d, "pseudoClass");
      };
    }(), function () {
      var d = b.util.createHashMap(["before", "after", "value", "choices", "repeat-item", "repeat-index", "marker"], "\\b", true);return function (e) {
        var f = b.util.getPreviousNonWsToken(e.getAllTokens(), e.count());if (!f || f.name !== "operator" || f.value !== "::") {
          return null;
        }return b.util.matchWord(e, d, "pseudoElement");
      };
    }(), function (e) {
      var g,
          d = e.reader.getLine(),
          f = e.reader.getColumn();if (e.reader.current() !== ".") {
        return null;
      }g = a(e);if (g === null) {
        return null;
      }e.reader.read(g.length);return [e.createToken("operator", ".", d, f), e.createToken("class", g, d, f + 1)];
    }, function (f) {
      var i = f.reader.current(),
          h,
          e,
          d = f.reader.getLine(),
          g = f.reader.getColumn();if (!/[A-Za-z_]/.test(i)) {
        return null;
      }h = b.util.getPreviousNonWsToken(f.getAllTokens(), f.count());if (h && h.name === "operator" && (h.value === ":" || h.value === "::")) {
        return null;
      }e = a(f);if (e === null) {
        return null;
      }f.reader.read(e.length);return f.createToken("element", i + e, d, g);
    }, function (f) {
      var e,
          j = 1,
          k = "#",
          i,
          h = true,
          d = f.reader.getLine(),
          g = f.reader.getColumn();if (f.reader.current() !== "#") {
        return null;
      }e = f.reader.peek();while (e.length === j) {
        i = e.charAt(e.length - 1);if (i === "}" || i === ";") {
          break;
        }if (i === "{") {
          return null;
        }if (h && /[A-Fa-f0-9]/.test(i)) {
          k += i;
        } else {
          h = false;
        }e = f.reader.peek(++j);
      }f.reader.read(k.length - 1);return f.createToken("hexColor", k, d, g);
    }], numberParser: function numberParser(g) {
      var j = g.reader.current(),
          i,
          e = g.reader.getLine(),
          h = g.reader.getColumn(),
          d = true,
          f;if (!/\d/.test(j)) {
        if (j !== "." || !/\d/.test(g.reader.peek())) {
          return null;
        }i = j + g.reader.read();d = false;
      } else {
        i = j;if (j === "0" && g.reader.peek() !== ".") {
          d = false;
        }
      }while ((f = g.reader.peek()) !== g.reader.EOF) {
        if (!/[A-Za-z0-9%]/.test(f)) {
          if (f === "." && d && /\d$/.test(g.reader.peek(2))) {
            i += g.reader.read();d = false;continue;
          }break;
        }i += g.reader.read();
      }return g.createToken("number", i, e, h);
    }, customTokens: { rule: { values: ["@import", "@media", "@font-face", "@phonetic-alphabet", "@hyphenate-resource", "@font-feature-values", "@charset", "@namespace", "@page", "@bottom-left-corner", "@bottom-left", "@bottom-center", "@bottom-right", "@bottom-right-corner", "@top-left-corner", "@top-left", "@top-center", "@top-right", "@top-right-corner"], boundary: "\\b" }, microsoftFilterPrefix: { values: ["progid:DXImageTransform.Microsoft"], boundary: "\\b" }, importantFlag: { values: ["!important"], boundary: "\\b" } }, scopes: { string: [['"', '"', ['\\"', "\\\\"]], ["'", "'", ["\\'", "\\\\"]]], comment: [["/*", "*/"]], id: [["#", { length: 1, regex: /[^-\w]/ }, null, true]] }, identFirstLetter: /[A-Za-z-]/, identAfterFirstLetter: /[\w-]/, operators: ["::", ":", ">", "+", "~=", "^=", "$=", "|=", "=", ".", "*"] });
})(undefined["Sunlight"]);(function (a, b) {
  if (a === b || a.registerLanguage === b) {
    throw "Include sunlight.js before including language files";
  }a.registerLanguage("bash", { keywords: ["while", "for", "in", "do", "done", "until", "if", "fi", "then", "else", "case", "esac", "break", "continue", "select"], customTokens: { command: { values: ["return", "source", "ac", "adduser", "agetty", "agrep", "arch", "ar", "at", "autoload", "awk", "badblocks", "banner", "basename", "batch", "bc", "bg", "bind", "bison", "builtin", "bzgrep", "bzip2", "caller", "cal", "cat", "cd", "chattr", "chfn", "chgrp", "chkconfig", "chmod", "chown", "chroot", "cksum", "clear", "clock", "cmp", "colrm", "column", "col", "command", "comm", "compgen", "complete", "compress", "coproc", "cpio", "cp", "cron", "crypt", "csplit", "cut", "cu", "date", "dc", "dd", "debugfs", "declare", "depmod", "df", "dialog", "diff3", "diffstat", "diff", "dig", "dirname", "dirs", "disown", "dmesg", "doexec", "dos2unix", "dump", "dumpe2fs", "du", "e2fsck", "echo", "egrep", "enable", "enscript", "env", "eqn", "eval", "exec", "exit", "expand", "export", "expr", "factor", "false", "fdformat", "fdisk", "fgrep", "fg", "file", "find", "finger", "flex", "flock", "fmt", "fold", "free", "fsck", "ftp", "fuser", "getfacl", "getopts", "getopt", "gettext", "getty", "gnome-mount", "grep", "groff", "groupmod", "groups", "gs", "gzip", "halt", "hash", "hdparm", "head", "help", "hexdump", "hostid", "hostname", "host", "hwclock", "iconv", "id", "ifconfig", "infocmp", "info", "init", "insmod", "install", "ipcalc", "ip", "iwconfig", "jobs", "join", "jot", "killall", "kill", "lastcomm", "lastlog", "last", "ldd", "less", "let", "lex", "lid", "ln", "locate", "lockfile", "logger", "logname", "logout", "logrotate", "look", "losetup", "lp", "lsdev", "lsmod", "lsof", "lspci", "lsusb", "ls", "ltrace", "lynx", "lzcat", "lzma", "m4", "mailstats", "mailto", "mail", "makedev", "make", "man", "mapfile", "mcookie", "md5sum", "merge", "mesg", "mimencode", "mkbootdisk", "mkdir", "mke2fs", "mkfifo", "mkisofs", "mknod", "mkswap", "mktemp", "mmencode", "modinfo", "modprobe", "more", "mount", "msgfmt", "mv", "nc", "netconfig", "netstat", "newgrp", "nice", "nl", "nmap", "nm", "nohup", "nslookup", "objdump", "od", "openssl", "passwd", "paste", "patch", "diff", "pathchk", "pax", "pgrep", "pidof", "ping", "pkill", "popd", "pr", "printenv", "printf", "procinfo", "pstree", "ps", "ptx", "pushd", "pwd", "quota", "rcp", "rdev", "rdist", "readelf", "readlink", "readonly", "read", "reboot", "recode", "renice", "reset", "resize", "restore", "rev", "rlogin", "rmdir", "rmmod", "rm", "route", "rpm2cpio", "rpm", "rsh", "rsync", "runlevel", "run-parts", "rx", "rz", "sar", "scp", "script", "sdiff", "sed", "seq", "service", "setfacl", "setquota", "setserial", "setterm", "set", "sha1sum", "shar", "shopt", "shred", "shutdown", "size", "skill", "sleep", "slocate", "snice", "sort", "source", "sox", "split", "sq", "ssh", "stat", "strace", "strings", "strip", "stty", "sudo", "sum", "suspend", "su", "swapoff", "swapon", "sx", "sync", "sz", "tac", "tail", "tar", "tbl", "tcpdump", "tee", "telinit", "telnet", "tex", "texexec", "time", "times", "tmpwatch", "top", "touch", "tput", "traceroute", "true", "tr", "tset", "tsort", "tty", "tune2fs", "typeset", "type", "ulimit", "umask", "umount", "uname", "unarc", "unarj", "uncompress", "unexpand", "uniq", "units", "unlzma", "unrar", "unset", "unsq", "unzip", "uptime", "usbmodules", "useradd", "userdel", "usermod", "users", "usleep", "uucp", "uudecode", "uuencode", "uux", "vacation", "vdir", "vmstat", "vrfy", "wait", "wall", "watch", "wc", "wget", "whatis", "whereis", "which", "whoami", "whois", "who", "write", "w", "xargs", "yacc", "yes", "zcat", "zdiff", "zdump", "zegrep", "zfgrep", "zgrep", "zip"], boundary: "\\b" }, specialVariable: { values: ["$$", "$?", "$#"], boundary: "" } }, scopes: { string: [['"', '"', a.util.escapeSequences.concat(['\\"'])], ["'", "'", ["'", "\\\\"]]], hashBang: [["#!", "\n", null, true]], comment: [["#", "\n", null, true]], verbatimCommand: [["`", "`", ["\\`", "\\\\"]]], variable: [["$", { length: 1, regex: /[\W]/ }, null, true]] }, identFirstLetter: /[A-Za-z_]/, identAfterFirstLetter: /\w/, namedIdentRules: { precedes: [[a.util.whitespace, { token: "punctuation", values: ["("] }, a.util.whitespace, { token: "punctuation", values: [")"] }, a.util.whitespace, { token: "punctuation", values: ["{"] }]] }, operators: ["++", "--", "=", "/", "+", "*", "-", "!=", ".", "|", ":", ",", "!", "?", ">>", ">", "<", ";;", ";"] });
})(undefined["Sunlight"]);(function (a, b) {
  if (a === b || a.registerLanguage === b) {
    throw "Include sunlight.js before including language files";
  }a.registerLanguage("tsql", { caseInsensitive: true, keywords: ["ddw", "existsw", "precisionwall", "exit", "primary", "alter", "external", "print", "and", "fetch", "proc", "any", "file", "procedure", "as", "fillfactor", "public", "asc", "for", "raiserror", "authorization", "foreign", "read", "backup", "freetext", "readtext", "begin", "freetexttable", "reconfigure", "between", "from", "references", "break", "full", "replication", "browse", "function", "restore", "bulk", "goto", "restrict", "by", "grant", "return", "cascade", "group", "revert", "case", "having", "revoke", "check", "holdlock", "right", "checkpoint", "identity", "rollback", "close", "identity_insert", "rowcount", "clustered", "identitycol", "rowguidcol", "coalesce", "if", "rule", "collate", "in", "save", "column", "index", "schema", "commit", "inner", "securityaudit", "compute", "insert", "select", "constraint", "intersect", "session_user", "contains", "into", "set", "containstable", "is", "setuser", "continue", "join", "shutdown", "convert", "key", "some", "create", "kill", "statistics", "cross", "left", "system_user", "current", "like", "table", "current_date", "lineno", "tablesample", "current_time", "load", "textsize", "current_timestamp", "merge", "then", "current_user", "national", "to", "cursor", "nocheck", "top", "database", "nonclustered", "tran", "dbcc", "not", "transaction", "deallocate", "null", "trigger", "declare", "nullif", "truncate", "default", "of", "tsequal", "delete", "off", "union", "deny", "offsets", "unique", "desc", "on", "unpivot", "disk", "open", "update", "distinct", "opendatasource", "updatetext", "distributed", "openquery", "use", "double", "openrowset", "user", "drop", "openxml", "values", "dump", "option", "varying", "else", "or", "view", "end", "order", "waitfor", "errlvl", "outer", "when", "escape", "over", "where", "except", "percent", "while", "exec", "pivot", "with", "execute", "plan", "writetext"], customParseRules: [function () {
      var c = a.util.createHashMap(["encryptbykey", "decryptbykey", "encryptbypassphrase", "decryptbypassphrase", "key_id", "key_guid", "encryptbyasmkey", "decryptbyasmkey", "encryptbycert", "decryptbycert", "cert_id", "asymkey_id", "certproperty", "signbyasymkey", "verifysignedbyasmkey", "signbycert", "verifysignedbycert", "decryptbykeyautocert", "hashbytes", "cursor_status", "datalength", "ident_seed", "ident_current", "identity", "ident_incr", "sql_variant_property", "sysdatetime", "sysdatetimeoffset", "sysutcdatetime", "current_timestamp", "getdate", "getutcdate", "datename", "datepart", "day", "month", "year", "datediff", "dateadd", "switchoffset", "todatetimeoffset", "set datefirst", "set dateformat", "set language", "sp_helplanguage", "isdate", "abs", "degrees", "rand", "acos", "exp", "round", "asin", "floor", "sign", "atan", "log", "sin", "atn2", "log10", "sqrt", "ceiling", "pi", "square", "cos", "power", "tan", "cot", "radians", "fulltextcatalogproperty", "asymkey_id", "fulltextserviceproperty", "asymkeyproperty", "index_col", "assemblyproperty", "indexkey_property", "cert_id", "indexproperty", "col_length", "key_id", "col_name", "key_guid", "columnproperty", "key_name", "database_principal_id", "object_definition", "databaseproperty", "object_id", "databasepropertyex", "object_name", "db_id", "object_schema_name", "db_name", "objectproperty", "file_id", "objectpropertyex", "file_idex", "schema_id", "file_name", "schema_name", "filegroup_id", "sql_variant_property", "filegroup_name", "symkeyproperty", "filegroupproperty", "type_id", "fileproperty", "type_name", "fn_listextendedproperty", "typeproperty", "bit_length", "concat", "octet_length", "truncate", "current_date", "current_time", "dayname", "dayofweek", "hour", "minute", "monthname", "quarter", "week", "publishingservername", "current_user", "schema_id", "database_principal_id", "schema_name", "sys.fn_builtin_permissions", "session_user", "sys.fn_my_permissions", "setuser", "has_perms_by_name", "suser_id", "is_member", "suser_sid", "is_srvrolemember", "suser_sname", "original_login", "system_user", "permissions", "suser_name", "pwdcompare", "user_id", "pwdencrypt", "user_name", "ascii", "nchar", "soundex", "char", "patindex", "space", "charindex", "quotename", "str", "difference", "replace", "stuff", "left", "replicate", "substring", "len", "reverse", "unicode", "lower", "right", "upper", "ltrim", "rtrim", "app_namexx", "case", "cast", "convert", "coalesce", "collationproperty", "columns_updated", "current_timestamp", "current_user", "datalength", "error_line", "error_message", "error_number", "error_procedure", "error_severity", "error_state", "fn_helpcollations", "fn_servershareddrives", "fn_virtualfilestats", "formatmessage", "getansinull", "host_id", "host_name", "ident_current", "ident_incr", "ident_seed", "identity", "isdate", "isnull", "isnumeric", "newid", "nullif", "parsename", "original_login", "rowcount_big", "scope_identity", "serverproperty", "sessionproperty", "session_user", "stats_date", "dm_db_index_physical_stats", "system_user", "user_name", "xact_state", "fn_virtualfilestats", "patindex", "textvalid", "textptr", "columns_updated", "eventdata", "trigger_nestlevel", "update", "containstable", "openquery", "freetexttable", "openrowset", "opendatasource", "openxml", "vg", "min", "checksum_agg", "over clause", "count", "rowcount_big", "count_big", "stdev", "grouping", "stdevp", "grouping_id", "sum", "max", "var", "rank", "ntile", "dense_rank", "row_number", "varp"], "\\b", true);return function (f) {
        var e = a.util.matchWord(f, c, "function", true),
            g,
            d;if (e === null) {
          return null;
        }g = e.value.length;d = f.reader.peek(g);while (d.length === g && d !== f.reader.EOF) {
          if (!/\s$/.test(d)) {
            if (d.charAt(d.length - 1) === "(") {
              f.reader.read(e.value.length - 1);return e;
            }break;
          }d = f.reader.peek(++g);
        }return null;
      };
    }()], customTokens: { constant: { values: ["@@FETCH_STATUS", "@@DATEFIRST", "@@OPTIONS", "@@DBTS", "@@REMSERVER", "@@LANGID", "@@SERVERNAME", "@@LANGUAGE", "@@SERVICENAME", "@@LOCK_TIMEOUT", "@@SPID", "@@MAX_CONNECTIONS", "@@TEXTSIZE", "@@MAX_PRECISION", "@@VERSION", "@@NESTLEVEL", "@@CURSOR_ROWS", "@@PROCID", "@@IDENTITY", "@@TRANCOUNT", "@@ERROR", "@@ROWCOUNT", "@@CONNECTIONS", "@@PACK_RECEIVED", "@@CPU_BUSY", "@@PACK_SENT", "@@TIMETICKS", "@@IDLE", "@@TOTAL_ERRORS", "@@IO_BUSY", "@@TOTAL_READ", "@@PACKET_ERRORS", "@@TOTAL_WRITE"], boundary: "\\b" } }, scopes: { string: [['"', '"', a.util.escapeSequences.concat(['\\"'])], ["'", "'", ["\\'", "\\\\"]]], comment: [["--", "\n", null, true], ["/*", "*/"]], quotedIdent: [["[", "]", ["\\[", "\\\\"]]] }, identFirstLetter: /[A-Za-z_]/, identAfterFirstLetter: /\w/, namedIdentRules: { follows: [[{ token: "keyword", values: ["from", "join"] }, { token: "default" }], [{ token: "keyword", values: ["from", "join"] }, { token: "default" }, { token: "ident" }, a.util.whitespace, { token: "operator", values: ["."] }, a.util.whitespace]] }, operators: ["+", "-", "*", "/", "%", "&&", "||", "|", "&", "^", ">>", "<<", "<>", "<=>", "<=", "<", ">=", ">", "==", "!=", "!", "~", ":=", "=", "."] });
})(undefined["Sunlight"]);(function (a, b) {
  if (a === b || a.registerLanguage === b) {
    throw "Include sunlight.js before including language files";
  }a.registerLanguage("python", { keywords: ["False", "class", "finally", "is", "return", "None", "continue", "for", "lambda", "try", "True", "def", "from", "nonlocal", "while", "and", "del", "global", "not", "with", "as", "elif", "if", "or", "yield", "assert", "else", "import", "pass", "break", "except", "in", "raise"], customTokens: { ellipsis: { values: ["..."], boundary: "" }, delimiter: { values: ["(", ")", "[", "]", "{", "}", ",", ":", ".", ";", "@", "=", "+=", "-=", "*=", "/=", "//=", "%=", "&=", "|=", "^=", ">>=", "<<=", "**="], boundary: "" }, constant: { values: ["NotImplemented", "Ellipsis", "False", "True", "None", "__debug__"], boundary: "\\b" }, attribute: { values: ["__doc__", "__name__", "__module__", "__defaults__", "__code__", "__globals__", "__dict__", "__closure__", "__annotations__", "__kwedefaults__", "__self__", "__func__", "__bases__"], boundary: "\\b" }, specialMethod: { values: ["__next__", "__new__", "__init__", "__del__", "__repr__", "__str__", "__format__", "__lt__", "__le__", "__eq__", "__ne__", "__gt__", "__ge__", "__hash__", "__bool__", "__call__", "__prepare__", "__getattr__", "__getattribute__", "__setattr__", "__setattribute__", "__delattr__", "__dir__", "__get__", "__set__", "__delete__", "__slots__", "__instancecheck__", "__subclasscheck__", "__getitem__", "__setitem__", "__delitem__", "__iter__", "__reversed__", "__contains__", "__add__", "__sub__", "__mul__", "__truediv__", "__floordiv__", "__mod__", "__divmod__", "__pow__", "__lshift__", "__rshift__", "__and__", "__xor__", "__or__", "__radd__", "__rsub__", "__rmul__", "__rtruediv__", "__rfloordiv__", "__rmod__", "__rdivmod__", "__rpow__", "__rlshift__", "__rrshift__", "__rand__", "__xror__", "__ror__", "__iadd__", "__isub__", "__imul__", "__itruediv__", "__ifloordiv__", "__imod__", "__idivmod__", "__ipow__", "__ilshift__", "__irshift__", "__iand__", "__xror__", "__ior__", "__neg__", "__pos__", "__abs__", "__invert__", "__complex__", "__int__", "__float__", "__round__", "__index__", "__enter__", "__exit__"], boundary: "\\b" }, "function": { values: ["abs", "dict", "help", "min", "setattr", "all", "dir", "hex", "next", "slice", "any", "divmod", "id", "object", "sorted", "ascii", "enumerate", "input", "oct", "staticmethod", "bin", "eval", "int", "open", "str", "bool", "exec", "isinstance", "ord", "sum", "bytearray", "filter", "issubclass", "pow", "super", "bytes", "float", "iter", "print", "tuple", "callable", "format", "len", "property", "type", "chr", "frozenset", "list", "range", "vars", "classmethod", "getattr", "locals", "repr", "zip", "compile", "globals", "map", "reversed", "__import__", "complex", "hasattr", "max", "round", "delattr", "hash", "memoryview", "set"], boundary: "\\b" } }, scopes: { longString: [['"""', '"""', a.util.escapeSequences.concat(['\\"'])], ["'''", "'''", a.util.escapeSequences.concat(["\\'"])]], rawLongString: [['r"""', '"""'], ['R"""', '"""'], ["r'''", "'''"], ["R'''", "'''"]], binaryLongString: [['br"""', '"""'], ['bR"""', '"""'], ['Br"""', '"""'], ['BR"""', '"""'], ["br'''", "'''"], ["bR'''", "'''"], ["Br'''", "'''"], ["BR'''", "'''"], ['b"""', '"""', a.util.escapeSequences.concat(['\\"'])], ['B"""', '"""', a.util.escapeSequences.concat(['\\"'])], ["b'''", "'''", a.util.escapeSequences.concat(["\\'"])], ["B'''", "'''", a.util.escapeSequences.concat(["\\'"])]], string: [['"', '"', a.util.escapeSequences.concat(['\\"'])], ["'", "'", a.util.escapeSequences.concat(["\\'", "\\\\"])]], rawString: [['r"', '"'], ['R"', '"'], ["r'", "'"], ["R'", "'"]], binaryString: [['b"', '"', a.util.escapeSequences.concat(['\\"'])], ["b'", "'", a.util.escapeSequences.concat(["\\'"])], ['B"', '"', a.util.escapeSequences.concat(['\\"'])], ["B'", "'", a.util.escapeSequences.concat(["\\'"])], ['br"', '"'], ['bR"', '"'], ['Br"', '"'], ['BR"', '"'], ["br'", "'"], ["bR'", "'"], ["Br'", "'"], ["BR'", "'"]], comment: [["#", "\n", null, true]] }, identFirstLetter: /[A-Za-z_]/, identAfterFirstLetter: /\w/, namedIdentRules: { follows: [[{ token: "keyword", values: ["class", "def", "raise", "except"] }, a.util.whitespace]] }, operators: ["+", "-", "**", "*", "//", "/", "%", "&", "|", "^", "~", "<<", "<=", "<", ">>", ">=", ">", "==", "!="] });
})(undefined["Sunlight"]);(function (a, b) {
  if (a === b || a.registerLanguage === b) {
    throw "Include sunlight.js before including language files";
  }a.registerLanguage("ruby", { keywords: ["BEGIN", "END", "__ENCODING__", "__END__", "__FILE__", "__LINE__", "alias", "and", "begin", "break", "case", "class", "def", "defined?", "do", "else", "elsif", "end", "ensure", "false", "for", "if", "in", "module", "next", "nil", "not", "or", "redo", "rescue", "retry", "return", "self", "super", "then", "true", "undef", "unless", "until", "when", "while", "yield"], customTokens: { "function": { values: ["Array", "Float", "Integer", "String", "at_exit", "autoload", "binding", "caller", "catch", "chop!", "chop", "chomp!", "chomp", "eval", "exec", "exit!", "exit", "fail", "fork", "format", "gets", "global_variables", "gsub!", "gsub", "iterator?", "lambda", "load", "local_variables", "loop", "open", "p", "print", "printf", "proc", "putc", "puts", "raise", "rand", "readline", "readlines", "require", "select", "sleep", "split", "sprintf", "srand", "sub!", "sub", "syscall", "system", "test", "trace_var", "trap", "untrace_var"], boundary: "\\W" }, specialOperator: { values: ["defined?", "eql?", "equal?"], boundary: "\\W" } }, customParseRules: [function (d) {
      var i,
          h = "/",
          c = d.reader.getLine(),
          f = d.reader.getColumn(),
          g,
          e;if (d.reader.current() !== "/") {
        return null;
      }i = function () {
        var k = d.token(d.count() - 1),
            j = null;if (d.defaultData.text !== "") {
          j = d.createToken("default", d.defaultData.text);
        }if (!j) {
          j = k;
        }if (j === b) {
          return true;
        }if (j.name === "default" && j.value.indexOf("\n") > -1) {
          return true;
        }if (a.util.contains(["keyword", "ident", "number"], k.name)) {
          return false;
        }if (k.name === "punctuation" && !a.util.contains(["(", "{", "[", ","], k.value)) {
          return false;
        }return true;
      }();if (!i) {
        return null;
      }while (d.reader.peek() !== d.reader.EOF) {
        g = d.reader.peek(2);if (g === "\\/" || g === "\\\\") {
          h += d.reader.read(2);continue;
        }h += e = d.reader.read();if (e === "/") {
          break;
        }
      }while (d.reader.peek() !== d.reader.EOF) {
        if (!/[A-Za-z]/.test(d.reader.peek())) {
          break;
        }h += d.reader.read();
      }return d.createToken("regexLiteral", h, c, f);
    }, function (e) {
      var d,
          c = e.count(),
          h = 0,
          g = c - 1,
          f,
          i;if (e.reader.current() !== ":" || !/[a-zA-Z_]/.test(e.reader.peek())) {
        return null;
      }while (d = e.token(--c)) {
        if (d.name === "operator") {
          if (h === 0) {
            if (d.value === "?" && c < g) {
              return null;
            } else {
              if (d.value === ":") {
                break;
              }
            }
          }
        } else {
          if (d.name === "punctuation") {
            switch (d.value) {case "(":
                h--;break;case ")":
                h++;break;}
          } else {
            if (d.name === "default" && /\n/.test(d.value)) {
              f = e.token(c - 1);if (f && (f.name === "operator" || f.name === "punctuation" && f.value === ",")) {
                continue;
              }break;
            }
          }
        }
      }i = /^:\w+/.exec(e.reader.substring())[0];d = e.createToken("symbol", i, e.reader.getLine(), e.reader.getColumn());e.reader.read(i.length - 1);return d;
    }, function (e) {
      var c,
          l = e.reader.getLine(),
          f = e.reader.getColumn(),
          j = "<<",
          g = "",
          i,
          d = "",
          k,
          h;if (e.reader.current() !== "<" || !/<[\w'"`-]/.test(e.reader.peek(2))) {
        return null;
      }c = e.token(e.count() - 1);if (c && a.util.contains(["number", "string"], c.name)) {
        return null;
      }e.reader.read(2);i = e.reader.current();if (i === "-") {
        e.reader.read();j += i;g += i;i = e.reader.current();
      }if (a.util.contains(['"', "'", "`"], i)) {
        d = i;
      } else {
        g += i;
      }j += i;while ((k = e.reader.peek()) !== e.reader.EOF) {
        if (k === "\n" || d === "" && /\W/.test(k)) {
          break;
        }if (k === "\\") {
          h = e.reader.peek(2);if (d !== "" && a.util.contains(["\\" + d, "\\\\"], h)) {
            j += h;g += e.reader.read(2);continue;
          }
        }j += e.reader.read();if (d !== "" && k === d) {
          break;
        }g += k;
      }e.items.heredocQueue.push(g);return e.createToken("heredocDeclaration", j, l, f);
    }, function (c) {
      var g = [],
          d,
          k,
          e,
          j = c.reader.current(),
          h = false,
          i,
          f;if (c.items.heredocQueue.length === 0) {
        return null;
      }if (c.defaultData.text.replace(/[^\n]/g, "").length === 0) {
        return null;
      }while (c.items.heredocQueue.length > 0 && c.reader.peek() !== c.reader.EOF) {
        d = c.items.heredocQueue.shift();if (d.charAt(0) === "-") {
          d = d.substring(1);h = true;
        }k = c.reader.getLine(), e = c.reader.getColumn();i = new RegExp("^\\n" + (h ? "[ \\t]*" : "") + a.util.regexEscape(d) + "\\n");while (c.reader.peek() !== c.reader.EOF) {
          f = i.exec(c.reader.peekSubstring());if (f !== null) {
            j += c.reader.read(f[0].length);break;
          }j += c.reader.read();
        }g.push(c.createToken("heredoc", j, k, e));j = "";
      }return g.length > 0 ? g : null;
    }, function (f) {
      var i = "%",
          h = 1,
          j = false,
          e,
          c = f.reader.getLine(),
          g = f.reader.getColumn(),
          d;if (f.reader.current() !== "%") {
        return null;
      }e = f.reader.peek();if (e === "q" || e === "Q" || e === "r") {
        h++;if (e === "r") {
          j = true;
        }
      }if (/[A-Za-z0-9=]$/.test(f.reader.peek(h))) {
        return null;
      }i += f.reader.read(h);d = i.charAt(i.length - 1);switch (d) {case "(":
          d = ")";break;case "[":
          d = "]";break;case "{":
          d = "}";break;}while ((e = f.reader.peek()) !== f.reader.EOF) {
        if (e === "\\" && a.util.contains(["\\" + d, "\\\\"], f.reader.peek(2))) {
          i += f.reader.read(2);continue;
        }i += f.reader.read();if (e === d) {
          break;
        }
      }if (j) {
        while (f.reader.peek() !== f.reader.EOF) {
          if (!/[A-Za-z]/.test(f.reader.peek())) {
            break;
          }i += f.reader.read();
        }
      }return f.createToken(j ? "regexLiteral" : "rawString", i, c, g);
    }, function (f) {
      var h = "=begin",
          d = f.reader.getLine(),
          g = f.reader.getColumn(),
          c = false,
          e;if (!f.reader.isSol() || f.reader.current() !== "=" || f.reader.peek(5) !== "begin") {
        return null;
      }f.reader.read(5);while ((e = f.reader.peek()) !== f.reader.EOF) {
        if (!c && f.reader.peek(5) === "\n=end") {
          c = true;h += f.reader.read(5);continue;
        }if (c && e === "\n") {
          break;
        }h += f.reader.read();
      }return f.createToken("docComment", h, d, g);
    }], scopes: { string: [['"', '"', a.util.escapeSequences.concat(['\\"'])], ["'", "'", ["\\'", "\\\\"]]], comment: [["#", "\n", null, true]], subshellCommand: [["`", "`", ["\\`"]]], globalVariable: [["$", { length: 1, regex: /[\W]/ }, null, true]], instanceVariable: [["@", { length: 1, regex: /[\W]/ }, null, true]] }, identFirstLetter: /[A-Za-z_]/, identAfterFirstLetter: /\w/, namedIdentRules: { follows: [[{ token: "keyword", values: ["class", "def"] }, a.util.whitespace], [{ token: "keyword", values: ["class"] }, a.util.whitespace, { token: "ident" }, a.util.whitespace, { token: "operator", values: ["<", "<<"] }, a.util.whitespace]], precedes: [[a.util.whitespace, { token: "operator", values: ["::"] }], [a.util.whitespace, { token: "operator", values: ["."] }, a.util.whitespace, { token: "ident", values: ["new"] }, a.util.whitespace, { token: "punctuation", values: ["("] }]] }, operators: ["?", "...", "..", ".", "::", ":", "[]", "+=", "+", "-=", "-", "**=", "*=", "**", "*", "/=", "/", "%=", "%", "&&=", "&=", "&&", "&", "||=", "|=", "||", "|", "^=", "^", "~", "\\", "<=>", "<<=", "<<", "<=", "<", ">>=", ">>", ">=", ">", "!~", "!=", "!", "=>", "===", "==", "=~", "="], contextItems: { heredocQueue: [] } });
})(undefined["Sunlight"]);(function (a, e) {
  if (a === e || a.registerLanguage === e) {
    throw "Include sunlight.js before including language files";
  }function c(g) {
    var f = /^T([A-Z0-9]\w*)?$/;return function (h) {
      return !f.test(h.tokens[h.index].value) && g(h);
    };
  }var d = ["boolean", "byte", "char", "double", "float", "int", "long", "short"],
      b = d.concat(["extends"]);a.registerLanguage("java", { keywords: ["abstract", "assert", "boolean", "break", "byte", "case", "catch", "char", "class", "const", "continue", "default", "do", "double", "else", "enum", "extends", "final", "finally", "float", "for", "goto", "if", "implements", "import", "instanceof", "int", "interface", "long", "native", "new", "package", "private", "protected", "public", "return", "short", "static", "strictfp", "super", "switch", "synchronized", "this", "throw", "throws", "transient", "try", "void", "volatile", "while", "null", "false", "true"], scopes: { string: [['"', '"', a.util.escapeSequences.concat(['\\"'])], ["'", "'", ["'", "\\\\"]]], comment: [["//", "\n", null, true], ["/*", "*/"]], annotation: [["@", { length: 1, regex: /[\s\(]/ }, null, true]] }, identFirstLetter: /[A-Za-z_]/, identAfterFirstLetter: /\w/, namedIdentRules: { custom: [c(function (j) {
        var h = j.index,
            i,
            g = false,
            f = [0, 0];while ((i = j.tokens[--h]) !== e) {
          if (i.name === "keyword" && i.value === "class") {
            return false;
          }if (i.name === "operator") {
            switch (i.value) {case "<":case "<<":
                f[0] += i.value.length;break;case ">":case ">>":
                if (f[0] === 0) {
                  return false;
                }f[1] += i.value.length;break;case ".":case "?":case "&":
                break;default:
                return false;}continue;
          }if (i.name === "keyword" && a.util.contains(b, i.value) || i.name === "default" || i.name === "punctuation" && i.value === ",") {
            continue;
          }if (i.name === "ident") {
            g = true;continue;
          }break;
        }if (!g || f[0] === 0) {
          return false;
        }h = j.index;while ((i = j.tokens[++h]) !== e) {
          if (i.name === "operator" && (i.value === ">" || i.value === ">>")) {
            return true;
          }if (i.name === "keyword" && a.util.contains(b, i.value) || i.name === "operator" && a.util.contains(["<", "<<", ">", ">>"], i.value) || i.name === "punctuation" && i.value === "," || i.name === "ident" || i.name === "default") {
            continue;
          }return false;
        }return false;
      }), c(function (i) {
        var h = a.util.getPreviousNonWsToken(i.tokens, i.index),
            g,
            f;if (h !== e) {
          if (h.name === "ident" || h.name === "keyword" && a.util.contains(d.concat(["void"]), h.value) || h.name === "operator" && h.value === ".") {
            return false;
          }
        }h = a.util.getNextNonWsToken(i.tokens, i.index);if (!h || h.name !== "operator" || h.value !== "<") {
          return false;
        }g = i.index;f = [0, 0];while ((h = i.tokens[++g]) !== e) {
          if (h.name === "operator") {
            switch (h.value) {case "<":
                f[0]++;break;case "<<":
                f[0] += 2;break;case ">":
                f[1]++;break;case ">>":
                f[1] += 2;break;case "?":case "&":
                break;default:
                return false;}if (f[0] > 0 && f[0] === f[1]) {
              break;
            }continue;
          }if (h.name === "default" || h.name === "ident" || h.name === "keyword" && a.util.contains(b, h.value) || h.name === "punctuation" && h.value === ",") {
            continue;
          }return false;
        }if (f[0] !== f[1]) {
          return false;
        }h = i.tokens[++g];if (!h || h.name !== "default" && h.name !== "ident") {
          return false;
        }if (h.name === "default") {
          h = i.tokens[++g];if (!h || h.name !== "ident") {
            return false;
          }
        }return true;
      }), c(function (i) {
        var f = a.util.getNextNonWsToken(i.tokens, i.index),
            h,
            g,
            j;if (f && f.name === "operator" && f.value === ".") {
          return false;
        }g = i.index;j = i.tokens[g];while ((h = i.tokens[--g]) !== e) {
          if (h.name === "keyword" && (h.value === "new" || h.value === "import" || h.value === "instanceof")) {
            return true;
          }if (h.name === "default") {
            continue;
          }if (h.name === "ident") {
            if (j && j.name === "ident") {
              return false;
            }j = h;continue;
          }if (h.name === "operator" && h.value === ".") {
            if (j && j.name !== "ident") {
              return false;
            }j = h;continue;
          }break;
        }return false;
      }), function () {
        var f = [[a.util.whitespace, { token: "punctuation", values: [")"] }, a.util.whitespace, { token: "ident" }], [a.util.whitespace, { token: "punctuation", values: [")"] }, a.util.whitespace, { token: "keyword", values: ["this"] }]];return c(function (j) {
          var i,
              h,
              k,
              g = function (m) {
            for (var l = 0; l < f.length; l++) {
              if (a.util.createProceduralRule(j.index + 1, 1, f[l], false)(m)) {
                return true;
              }
            }return false;
          }(j.tokens);if (!g) {
            return false;
          }h = j.index;while (i = j.tokens[--h]) {
            if (i.name === "punctuation" && i.value === "(") {
              k = a.util.getPreviousNonWsToken(j.tokens, h);if (k && k.name === "keyword") {
                return false;
              }return true;
            }
          }return false;
        });
      }(), c(function (h) {
        var g,
            k = [[{ token: "ident" }, a.util.whitespace, { token: "keyword", values: ["extends", "implements"] }, a.util.whitespace], [{ token: "keyword", values: ["class", "interface", "enum", "public", "private", "protected", "static", "final"] }, a.util.whitespace], [{ token: "keyword", values: ["extends"] }, { token: "default" }, { token: "ident" }, { token: "default" }, { token: "operator", values: ["&"] }, { token: "default" }]],
            f = [[a.util.whitespace, { token: "punctuation", values: ["["] }, a.util.whitespace, { token: "punctuation", values: ["]"] }], [{ token: "default" }, { token: "ident" }]],
            j = [{ opener: { token: "keyword", values: ["implements", "throws"] }, closer: { token: "punctuation", values: ["{"] } }];for (g = 0; g < k.length; g++) {
          if (a.util.createProceduralRule(h.index - 1, -1, k[g], false)(h.tokens)) {
            return true;
          }
        }for (g = 0; g < f.length; g++) {
          if (a.util.createProceduralRule(h.index + 1, 1, f[g], false)(h.tokens)) {
            return true;
          }
        }for (g = 0; g < j.length; g++) {
          if (a.util.createBetweenRule(h.index, j[g].opener, j[g].closer, false)(h.tokens)) {
            return true;
          }
        }return false;
      })] }, operators: ["++", "+=", "+", "--", "-=", "-", "*=", "*", "/=", "/", "%=", "%", "&&", "||", "|=", "|", "&=", "&", "^=", "^", ">>>=", ">>>", ">>=", ">>", "<<=", "<<", "<=", "<", ">=", ">", "==", "!=", "!", "~", "?", ":", ".", "="] });
})(undefined["Sunlight"]);(function (a, b) {
  if (a === b || a.registerLanguage === b) {
    throw "Include sunlight.js before including language files";
  }a.registerLanguage("brainfuck", { customTokens: { increment: { values: [">"], boundary: "" }, decrement: { values: ["<"], boundary: "" }, incrementPointer: { values: ["+"], boundary: "" }, decrementPointer: { values: ["-"], boundary: "" }, write: { values: ["."], boundary: "" }, read: { values: [","], boundary: "" }, openLoop: { values: ["["], boundary: "" }, closeLoop: { values: ["]"], boundary: "" } } });
})(undefined["Sunlight"]);(function (a, b) {
  if (a === b || a.registerLanguage === b) {
    throw "Include sunlight.js before including language files";
  }a.registerLanguage("nginx", { scopes: { string: [['"', '"', a.util.escapeSequences.concat(['\\"'])], ["'", "'", ["\\'", "\\\\"]]], comment: [["#", "\n", null, true]], variable: [["$", { length: 1, regex: /[\W]/ }, null, true]], label: [["@", { length: 1, regex: /[\W]/ }, null, true]], ssiCommand: [["<!--#", "-->"]] }, customParseRules: [function () {
      var c = a.util.createHashMap(["server", "location", "upstream", "http", "mail", "types", "map", "split-clients", "geo", "limit_except"], "\\b", false);return function (f) {
        var e = a.util.matchWord(f, c, "context", true),
            d,
            g;if (!e) {
          return null;
        }g = e.value.length;while ((d = f.reader.peek(g++)) !== f.reader.EOF) {
          if (/\{$/.test(d)) {
            f.reader.read(e.value.length - 1);return e;
          }if (/;$/.test(d)) {
            break;
          }
        }return null;
      };
    }(), function (d) {
      var j = d.reader.current(),
          f,
          i,
          h = false,
          g = j,
          k,
          c,
          l = d.reader.getLine(),
          e = d.reader.getColumn();if (/[\s\n]/.test(j)) {
        return null;
      }i = d.count() - 1;while ((f = d.token(i--)) !== d.reader.EOF) {
        if (f.name === "regexLiteral" || f.name === "punctuation" && (f.value === "{" || f.value === "}" || f.value === ";")) {
          return null;
        }if (f.name === "operator" && a.util.contains(["^~", "~", "~*"], f.value)) {
          c = a.util.getPreviousWhile(d.getAllTokens(), i, function (m) {
            return m.name === "default" || m.name === "comment";
          });if (c.name === "context" && c.value === "location") {
            h = true;break;
          }
        } else {
          if (f.name === "keyword" && f.value === "server_name") {
            if (j !== "~") {
              return null;
            }h = true;break;
          }
        }
      }if (!h) {
        return null;
      }while ((k = d.reader.peek()) !== d.reader.EOF) {
        if (/[\s;\n]/.test(k)) {
          break;
        }g += d.reader.read();
      }return d.createToken("regexLiteral", g, l, e);
    }, function () {
      var c = a.util.createHashMap(["daemon", "env", "debug_points", "error_log", "include", "lock_file", "master_process", "pid", "ssl_engine", "timer_resolution", "user", "worker_cpu_affinity", "worker_priority", "worker_processes", "worker_rlimit_core", "worker_rlimit_nofile", "worker_rlimit_sigpending", "working_directory", "accept_mutext_delay", "accept_mutex", "debug_connection", "devpoll_changes", "devpoll_events", "kqueue_changes", "kqueue_events", "epoll_events", "multi_accept", "rtsig_signo", "rtsig_overflow_events", "rtsig_overflow_text", "rtsig_overflow_threshold", "use", "worker_connections", "aio", "alias", "chunked_transfer_encoding", "client_body_in_file_only", "client_body_in_single_buffer", "client_body_buffer_size", "client_body_temp_path", "client_body_timeout", "client_header_buffer_size", "client_header_timeout", "client_max_body_size", "default_type", "directio", "error_page", "if_modified_since", "internal", "keepalive_timeout", "keepalive_requests", "large_client_header_buffers", "limit_except", "limit_rate_after", "limit_rate", "listen", "location", "log_not_found", "log_subrequest", "msie_padding", "msie_refresh", "open_file_cache_errors", "open_file_cache_min_uses", "open_file_cache_valid", "open_file_cache", "optimize_server_names", "port_in_redirect", "post_action", "recursive_error_pages", "resolver_timeout", "resolver", "root", "satisfy_any", "satisfy", "send_timeout", "sendfile", "server_name", "server_name_in_redirect", "server_names_hash_max_size", "server_names_hash_bucket_size", "server_tokens", "server", "tcp_nodelay", "tcp_nopush", "try_files", "types", "underscores_in_headers", "allow", "deny", "auth_basic_user_file", "auth_basic", "autoindex_exact_size", "autoindex_localtime", "autoindex", "ancient_browser_value", "ancient_browser", "modern_browser_value", "modern_browser", "charset_map", "override_charset", "source_charset", "charset", "empty_gif", "fastcgi_bind", "fastcgi_buffer_size", "fastcgi_buffers", "fastcgi_cache_key", "fastcgi_cache_path", "fastcgi_cache_methods", "fastcgi_cache_min_uses", "fastcgi_cache_use_stale", "fastcgi_cache_valid", "fastcgi_cache", "fastcgi_connect_timeout", "fastcgi_index", "fastcgi_hide_header", "fastcgi_ignore_client_abort", "fastcgi_ignore_headers", "fastcgi_intercept_errors", "fastcgi_max_temp_file_size", "fastcgi_no_cache", "fastcgi_next_upstream", "fastcgi_param", "fastcgi_pass_header", "fastcgi_pass", "fastcgi_read_timeout", "fastcgi_redirect_errors", "fastcgi_send_timeout", "fastcgi_split_path_info", "fastcgi_store_access", "fastcgi_store", "fastcgi_temp_path", "geo", "gzip_buffers", "gzip_comp_level", "gzip_disable", "gzip_http_version", "gzip_min_length", "gzip_proxied", "gzip_types", "gzip_vary", "gzip", "add_header", "expires", "index", "limit_req_log_level", "limit_req_zone", "limit_req", "limit_zone", "limit_conn_log_level", "limit_conn", "access_log", "log_format", "open_log_file_cache", "map_hash_max_size", "map_hash_bucket_size", "map", "memcached_pass", "memcached_connect_timeout", "memcached_read_timeout", "memcached_send_timeout", "memcached_buffer_size", "memcached_next_upstream", "proxy_bind", "proxy_buffer_size", "proxy_buffering", "proxy_buffers", "proxy_busy_buffers_size", "proxy_cache_bypass", "proxy_cache_key", "proxy_cache_methods", "proxy_cache_min_uses", "proxy_cache_path", "proxy_cache_use_stale", "proxy_cache_valid", "proxy_cache", "proxy_connect_timeout", "proxy_headers_hash_bucket_size", "proxy_headers_hash_max_size", "proxy_hide_header", "proxy_ignore_client_abort", "proxy_ignore_headers", "proxy_intercept_errors", "proxy_max_temp_file_size", "proxy_method", "proxy_next_upstream", "proxy_no_cache", "proxy_pass_header", "proxy_pass_request_body", "proxy_pass_request_headers", "proxy_pass", "proxy_read_timeout", "proxy_redirect_errors", "proxy_redirect", "proxy_send_lowat", "proxy_send_timeout", "proxy_set_body", "proxy_set_header", "proxy_ssl_session_reuse", "proxy_store_access", "proxy_store", "proxy_temp_file_write_size", "proxy_temp_path", "proxy_upstream_fail_timeout", "proxy_upstream_max_fails", "valid_referers", "break", "if", "return", "rewrite", "set", "uninitialized_variable_warn", "scgi_bind", "scgi_buffer_size", "scgi_buffers", "scgi_busy_buffers_size", "scgi_cache_bypass", "scgi_cache_key", "scgi_cache_methods", "scgi_cache_min_uses", "scgi_cache_path", "scgi_cache_use_stale", "scgi_cache_valid", "scgi_cache", "scgi_connect_timeout", "scgi_hide_header", "scgi_ignore_client_abort", "scgi_ignore_headers", "scgi_intercept_errors", "scgi_max_temp_file_size", "scgi_next_upstream", "scgi_no_cache", "scgi_param", "scgi_pass_header", "scgi_pass_request_body", "scgi_pass_request_headers", "scgi_pass", "scgi_read_timeout", "scgi_send_timeout", "scgi_store_access", "scgi_store", "scgi_temp_file_write_size", "scgi_temp_path", "split-clients", "ssi", "ssi_silent_errors", "ssi_types", "ssi_value_length", "ip_hash", "server", "upstream", "userid_domain", "userid_expires", "userid_name", "userid_p3p", "userid_path", "userid_service", "userid", "uwsgi_bind", "uwsgi_buffer_size", "uwsgi_buffers", "uwsgi_busy_buffers_size", "uwsgi_cache_bypass", "uwsgi_cache_key", "uwsgi_cache_methods", "uwsgi_cache_min_uses", "uwsgi_cache_path", "uwsgi_cache_use_stale", "uwsgi_cache_valid", "uwsgi_cache", "uwsgi_connect_timeout", "uwsgi_hide_header", "uwsgi_ignore_client_abort", "uwsgi_ignore_headers", "uwsgi_intercept_errors", "uwsgi_max_temp_file_size", "uwsgi_modifier1", "uwsgi_modifier2", "uwsgi_next_upstream", "uwsgi_no_cache", "uwsgi_param", "uwsgi_pass_header", "uwsgi_pass_request_body", "uwsgi_pass_request_headers", "uwsgi_pass", "uwsgi_read_timeout", "uwsgi_send_timeout", "uwsgi_store_access", "uwsgi_store", "uwsgi_string", "uwsgi_temp_file_write_size", "uwsgi_temp_path", "add_before_body", "add_after_body", "addition_types", "perl_modules", "perl_require", "perl_set", "perl", "flv", "geoip_country", "geoip_city", "google_perftools_profiles", "gzip_static", "gzip_http_version", "gzip_proxied", "image_filter_buffer", "image_filter_jpeg_quality", "image_filter_transparency", "image_filter", "random_index", "set_real_ip_from", "real_ip_header", "secure_link_secret", "secure_link_md5", "secure_link", "ssl_certificate_key", "ssl_client_certificate", "ssl_certificate", "ssl_dhparam", "ssl_ciphers", "ssl_crl", "ssl_prefer_server_ciphers", "ssl_protocols", "ssl_verify_client", "ssl_verify_depth", "ssl_session_cache", "ssl_session_timeout", "ssl_engine", "ssl", "stub_status", "sub_filter_once", "sub_filter_types", "sub_filter", "dav_access", "dav_methods", "create_full_put_path", "xml_entities", "xslt_stylesheet", "xslt_types", "auth", "imap_capabilities", "imap_client_buffer", "listen", "pop3_auth", "pop3_capabilities", "protocol", "server", "server_name", "smtp_auth", "smtp_capabilities", "so_keepalive", "timeout", "auth_http", "auth_http_header", "auth_http_timeout", "proxy_buffer", "proxy_pass_error_message", "proxy_timeout", "proxy", "xclient", "starttls", "echo_duplicate", "echo_flush", "echo_sleep", "echo_blocking_sleep", "echo_reset_timer", "echo_read_request_body", "echo_location_async", "echo_location", "echo_subrequest_async", "echo_subrequest", "echo_foreach_split", "echo_end", "echo_request_body", "echo_exec", "echo_before_body", "echo_after_body", "echo", "default", "output_buffers"], "[\\s;]", false);return function (e) {
        var d = a.util.matchWord(e, c, "keyword", true),
            f;if (!d) {
          return null;
        }f = a.util.getPreviousWhile(e.getAllTokens(), e.count(), function (g) {
          return g.name === "default" || g.name === "comment";
        });if (!f || f.name === "punctuation" && a.util.contains(["{", "}", ";"], f.value)) {
          e.reader.read(d.value.length - 1);return d;
        }return null;
      };
    }()], identFirstLetter: /[A-Za-z_-]/, identAfterFirstLetter: /[\w-]/, operators: ["~*", "~", "^~", "=", "::", ":"] });
})(undefined["Sunlight"]);(function (a, d) {
  if (a === d || a.registerLanguage === d) {
    throw "Include sunlight.js before including language files";
  }var c = ["int", "char", "void", "long", "signed", "unsigned", "double", "bool", "typename", "class", "short", "wchar_t", "struct"],
      b = ["int", "char", "void", "long", "signed", "unsigned", "double", "bool", "typename", "class", "short", "wchar_t"];a.registerLanguage("cpp", { keywords: ["and", "default", "noexcept", "template", "and_eq", "delete", "not", "this", "alignof", "double", "not_eq", "thread_local", "asm", "dynamic_cast", "nullptr", "throw", "auto", "else", "operator", "true", "bitand", "enum", "or", "try", "bitor", "explicittodo", "or_eq", "typedef", "bool", "export", "private", "typeid", "break", "externtodo", "protected", "typename", "case", "false", "public", "union", "catch", "float", "register", "using", "char", "for", "reinterpret_cast", "unsigned", "char16_t", "friend", "return", "void", "char32_t", "goto", "short", "wchar_t", "class", "if", "signed", "virtual", "compl", "inline", "sizeof", "volatile", "const", "int", "static", "while", "constexpr", "long", "static_assert", "xor", "const_cast", "mutable", "static_cast", "xor_eq", "continue", "namespace", "struct", "decltype", "new", "switch"], customTokens: { constant: { values: ["EXIT_SUCCESS", "EXIT_FAILURE", "SIG_DFL", "SIG_IGN", "SIG_ERR", "SIGABRT", "SIGFPE", "SIGILL", "SIGINT", "SIGSEGV", "SIGTERM"], boundary: "\\b" }, basicType: { values: ["ptrdiff_t", "size_t", "nullptr_t", "max_align_t"], boundary: "\\b" }, ellipsis: { values: ["..."], boundary: "" } }, scopes: { string: [['"', '"', a.util.escapeSequences.concat(['\\"'])]], "char": [["'", "'", ["\\'", "\\\\"]]], comment: [["//", "\n", null, true], ["/*", "*/"]], preprocessorDirective: [["#", "\n", null, true]] }, customParseRules: [], identFirstLetter: /[A-Za-z_]/, identAfterFirstLetter: /\w/, namedIdentRules: { custom: [function () {
        var e = [[a.util.whitespace, { token: "operator", values: ["*", "**"] }, { token: "default" }, { token: "ident" }, a.util.whitespace, { token: "punctuation", values: [";"] }], [{ token: "default" }, { token: "operator", values: ["&"] }, a.util.whitespace, { token: "ident" }]];return function (i) {
          var h,
              g,
              f = function (k) {
            for (var j = 0; j < e.length; j++) {
              if (a.util.createProceduralRule(i.index + 1, 1, e[j], false)(k)) {
                return true;
              }
            }return false;
          }(i.tokens);if (!f) {
            return false;
          }g = i.index;while (h = i.tokens[--g]) {
            if (h.name === "punctuation" && (h.value === ";" || h.value === "{")) {
              return true;
            }if (h.name === "operator" && h.value === "=") {
              return false;
            }
          }return false;
        };
      }(), function () {
        var e = [[a.util.whitespace, { token: "punctuation", values: [")"] }, a.util.whitespace, { token: "ident" }], [{ token: "operator", values: ["*", "**"] }, a.util.whitespace, { token: "punctuation", values: [")"] }, a.util.whitespace, { token: "operator", values: ["&"], optional: true }, { token: "ident" }]];return function (i) {
          var h,
              g,
              j,
              f = function (l) {
            for (var k = 0; k < e.length; k++) {
              if (a.util.createProceduralRule(i.index + 1, 1, e[k], false)(l)) {
                return true;
              }
            }return false;
          }(i.tokens);if (!f) {
            return false;
          }g = i.index;while (h = i.tokens[--g]) {
            if (h.name === "punctuation" && h.value === "(") {
              j = a.util.getPreviousNonWsToken(i.tokens, g);if (j && j.name === "keyword") {
                return false;
              }return true;
            }
          }return false;
        };
      }(), function (i) {
        var g = i.index,
            h,
            j = a.util.getPreviousNonWsToken(i.tokens, i.index),
            f = false,
            e;if (!j || j.name === "keyword") {
          return false;
        }e = [0, 0];while ((h = i.tokens[--g]) !== d) {
          if (h.name === "keyword" && h.value === "class") {
            return false;
          }if (h.name === "operator") {
            switch (h.value) {case "<":case "<<":
                e[0] += h.value.length;break;case ">":case ">>":
                if (e[0] === 0) {
                  return false;
                }e[1] += h.value.length;break;case ".":
                break;default:
                return false;}continue;
          }if (h.name === "keyword" && a.util.contains(b, h.value) || h.name === "default" || h.name === "punctuation" && h.value === ",") {
            continue;
          }if (h.name === "ident") {
            f = true;continue;
          }break;
        }if (!f || e[0] === 0) {
          return false;
        }g = i.index;while ((h = i.tokens[++g]) !== d) {
          if (h.name === "operator" && (h.value === ">" || h.value === ">>")) {
            return true;
          }if (h.name === "keyword" && a.util.contains(b, h.value) || h.name === "operator" && a.util.contains(["<", "<<", ">", ">>"], h.value) || h.name === "punctuation" && h.value === "," || h.name === "ident" || h.name === "default") {
            continue;
          }return false;
        }return false;
      }, function (h) {
        var g = a.util.getPreviousNonWsToken(h.tokens, h.index),
            f,
            e;if (g !== d) {
          if (g.name === "ident" || g.name === "keyword" && a.util.contains(c.concat(["string", "object", "void"]), g.value) || g.name === "operator" && g.value === ".") {
            return false;
          }
        }g = a.util.getNextNonWsToken(h.tokens, h.index);if (!g || g.name !== "operator" || g.value !== "<") {
          return false;
        }f = h.index;e = [0, 0];while ((g = h.tokens[++f]) !== d) {
          if (g.name === "operator") {
            switch (g.value) {case "<":
                e[0]++;break;case "<<":
                e[0] += 2;break;case ">":
                e[1]++;break;case ">>":
                e[1] += 2;break;default:
                return false;}if (e[0] === e[1]) {
              break;
            }continue;
          }if (g.name === "default" || g.name === "ident" || g.name === "keyword" && a.util.contains(b, g.value) || g.name === "punctuation" && g.value === ",") {
            continue;
          }return false;
        }if (e[0] !== e[1]) {
          return false;
        }g = h.tokens[++f];if (!g || g.name !== "default" && g.name !== "ident") {
          return false;
        }if (g.name === "default") {
          g = h.tokens[++f];if (!g || g.name !== "ident") {
            return false;
          }
        }return true;
      }, function (g) {
        var h = a.util.getPreviousNonWsToken(g.tokens, g.index),
            f,
            e;if (!h || h.name !== "keyword" || h.value !== "class") {
          return false;
        }e = g.index;while (f = g.tokens[++e]) {
          if (f.name === "punctuation" && f.value === "{") {
            return true;
          }if (f.name === "operator" && a.util.contains([">", ">>"], f.value)) {
            return false;
          }
        }return false;
      }], follows: [[{ token: "keyword", values: ["enum", "struct", "union"] }, a.util.whitespace]], precedes: [[{ token: "default" }, { token: "ident" }], [a.util.whitespace, { token: "operator", values: ["*", "**"] }, { token: "default" }, { token: "ident" }, a.util.whitespace, { token: "operator", values: ["=", ","] }], [a.util.whitespace, { token: "operator", values: ["*", "**"] }, { token: "default" }, { token: "operator", values: ["&"] }, a.util.whitespace, { token: "ident" }, a.util.whitespace, { token: "operator", values: ["=", ","] }], [a.util.whitespace, { token: "operator", values: ["::"] }]] }, operators: ["==", "=", "+=", "++", "+", "->*", "->", "-=", "--", "-", "**", "*=", "*", "/=", "/", "%=", "%", "!=", "!", ">>=", ">>", ">=", ">", "<<=", "<<", "<=", "<", "&=", "&&", "&", "|=", "||", "|", "~", "^=", "^", ".*", ".", "?", "::", ":", ","] });
})(undefined["Sunlight"]);(function (a, b) {
  if (a === b || a.registerLanguage === b) {
    throw "Include sunlight.js before including language files";
  }a.registerLanguage("6502asm", { keywords: ["BCC", "BCS", "BEQ", "BMI", "BNE", "BPL", "BVC", "BVS", "CMP", "CPX", "CPY", "CLC", "CLD", "CLI", "CLV", "SEC", "SED", "SEI", "DEX", "DEY", "INX", "INY", "TAX", "TAY", "TXA", "TYA", "BRK", "NOP", "RTI", "RTS", "ASL", "LSR", "ROL", "ROR", "ADC", "AND", "BIT", "DEC", "EOR", "INC", "JMP", "JSR", "LDA", "LDX", "LDY", "ORA", "SBC", "STA", "STX", "STY", "PHA", "PHP", "PLA", "PLP", "TSX", "TXS"], scopes: { string: [['"', '"']], comment: [[";", "\n", null, true]] }, operators: [">>", "<<", ">=", "<=", "==", "!=", "&&", "||", "~", "-", "<", ">", "*", "/", "%", "+", "-", "=", "&", "^", "|", "?"], identFirstLetter: /[A-Za-z]/, identAfterFirstLetter: /\w/, customTokens: { illegalOpcode: { values: ["SLO", "RLA", "SRE", "RRA", "SAX", "LAX", "DCP", "ISC", "ANC", "ALR", "ARR", "XAA", "AXS", "AHX", "SHY", "SHX", "TAS", "LAS"], boundary: "\\b" }, pseudoOp: { values: ["BYTE", "WORD", "DS", "ORG", "RORG", "ALIGN", "MAC", "ENDM", "SUBROUTINE"], boundary: "\\b" } }, customParseRules: [function (f) {
      var j = f.reader.current(),
          c = f.reader.getLine(),
          g = f.reader.getColumn(),
          h = 0,
          e = 0,
          d,
          i;if (j !== "#") {
        return null;
      }d = f.reader.peek();i = j;while (h > 0 || e > 0 || !/\s/.test(d)) {
        if (d === ")" && h > 0) {
          h--;
        }if (d === "]" && e > 0) {
          e--;
        }if (d === "(") {
          h++;
        }if (d === "[") {
          e++;
        }i += f.reader.read();d = f.reader.peek();
      }return f.createToken("constant", i, c, g);
    }, function () {
      var c = ["BCC", "BCS", "BEQ", "BMI", "BNE", "BPL", "BVC", "BVS", "JMP", "JSR"];return function (g) {
        var i,
            f,
            e,
            d = g.reader.getLine(),
            h = g.reader.getColumn();if (!/[A-Za-z]/.test(g.reader.current())) {
          return null;
        }i = a.util.getPreviousNonWsToken(g.getAllTokens(), g.count());if (!i || i.name !== "keyword" || !a.util.contains(c, i.value, true)) {
          if (g.count() > 0 && !/\n$/.test(g.defaultData.text)) {
            return null;
          }
        }f = g.reader.current();while ((e = g.reader.peek()) !== g.reader.EOF) {
          if (!/\w/.test(e)) {
            break;
          }f += g.reader.read();
        }return g.createToken("label", f, d, h);
      };
    }()], caseInsensitive: true, numberParser: function numberParser(e) {
      var h = e.reader.current(),
          g,
          c = e.reader.getLine(),
          f = e.reader.getColumn(),
          d;if (!/\d/.test(h)) {
        if (h !== "$" && h !== "%") {
          return null;
        }g = h + e.reader.read();
      } else {
        g = h;if (e.reader.peek() === ".") {
          g += e.reader.read();
        }
      }while ((d = e.reader.peek()) !== e.reader.EOF) {
        if (!/[A-Fa-f0-9]/.test(d)) {
          break;
        }g += e.reader.read();
      }return e.createToken("number", g, c, f);
    } });
})(undefined["Sunlight"]);(function (c, f) {
  if (c === f || c.registerLanguage === f) {
    throw "Include sunlight.js before including language files";
  }function e(g) {
    var i = g.token(g.count() - 1),
        h = null;if (g.defaultData.text !== "") {
      h = g.createToken("default", g.defaultData.text);
    }if (!h) {
      h = i;
    }if (h === f) {
      return true;
    }if (c.util.contains(["keyword", "ident", "number", "variable", "specialVariable"], i.name)) {
      return false;
    }if (i.name === "punctuation" && !c.util.contains(["(", "{", "[", ",", ";"], i.value)) {
      return false;
    }return true;
  }function b(h) {
    var i = "",
        g;while ((g = h.reader.peek()) !== h.reader.EOF && /\s/.test(g)) {
      i += h.reader.read();
    }return i;
  }function a(h, g, n) {
    var k = g,
        p = g,
        m = c.util.contains(["[", "(", "{"], k),
        j,
        l = k,
        i,
        o = 1;switch (g) {case "[":
        p = "]";break;case "(":
        p = ")";break;case "{":
        p = "}";break;}while (h.reader.peek() !== h.reader.EOF) {
      j = h.reader.peek(2);if (j === "\\" + p || j === "\\\\") {
        l += h.reader.read(2);continue;
      }i = h.reader.read();if (i === k && m) {
        o++;
      } else {
        if (i === p && --o <= 0) {
          if (m || n) {
            l += i;
          }break;
        }
      }l += i;
    }return l;
  }function d(i, g) {
    var h = i.reader.peek(g);while (h.length === g && /\s$/.test(h)) {
      h = i.reader.peek(++g);
    }if (/[\w]$/.test(h)) {
      return false;
    }i.reader.read(g);return { delimiter: i.reader.current(), value: h.substring(0, h.length - 1) };
  }c.registerLanguage("perl", { keywords: ["caller", "die", "dump", "eval", "exit", "goto", "last", "next", "redo", "return", "sub", "wantarray", "break", "continue", "given", "when", "default", "import", "local", "my", "our", "state", "do", "no", "package", "require", "use", "bless", "dbmclose", "dbmopen", "ref", "tied", "untie", "tie", "if", "elsif", "else", "unless", "while", "foreach", "for", "until", "not", "or", "and"], customTokens: { "function": { values: ["chomp", "chop", "chr", "crypt", "hex", "index", "length", "oct", "ord", "rindex", "sprintf", "substr", "pos", "quotemeta", "split", "study", "abs", "atan2", "cos", "exp", "hex", "int", "log", "oct", "rand", "sin", "sqrt", "srand", "pop", "push", "shift", "splice", "unshift", "grep", "join", "map", "reverse", "sort", "delete", "each", "exists", "keys", "values", "binmode", "closedir", "close", "eof", "fileno", "flock", "format", "getc", "print", "printf", "readdir", "rewinddir", "say", "seekdir", "seek", "select", "syscall", "sysread", "sysseek", "tell", "telldir", "truncate", "warn", "write", "pack", "syswrite", "unpack", "vec", "chdir", "chmod", "chown", "chroot", "fcntl", "glob", "ioctl", "link", "lstat", "mkdir", "open", "opendir", "readlink", "rename", "rmdir", "stat", "symlink", "sysopen", "umask", "unlink", "utime", "defined", "dump", "eval", "formline", "reset", "scalar", "undef", "alarm", "exec", "fork", "getpgrp", "getppid", "getpriority", "kill", "pipe", "setpgrp", "setpriority", "sleep", "system", "wait", "waitpid", "accept", "bind", "connect", "getpeername", "getsockname", "getsockopt", "listen", "recv", "send", "setsockopt", "shutdown", "socket", "socketpair", "msgctl", "msgget", "msgrcv", "msgsnd", "semctl", "semget", "semop", "shmctl", "shmget", "shmread", "shmwrite", "endgrent", "endhostent", "endnetent", "endpwent", "getgrent", "getgrgid", "getgrnam", "getlogin", "getpwent", "getpwnam", "getpwuid", "setgrent", "setpwent", "endprotoent", "endservent", "gethostbyaddr", "gethostbyname", "gethostent", "getnetbyaddr", "getnetbyname", "getnetent", "getprotobyname", "getprotobynumber", "getprotoent", "getservbyname", "getservbyport", "getservent", "sethostent", "setnetent", "setprotoent", "setservent", "gmtime", "localtime", "times", "time", "lcfirst", "lc", "lock", "prototype", "readline", "readpipe", "read", "ucfirst", "uc"], boundary: "\\b" }, specialVariable: { values: ["$.", "$<", "$_", "$/", "$!", "$ARG", "$&", "$a", "$b", "$MATCH", "$PREMATCH", "${^MATCH}", "${^PREMATCH}", "$POSTMATCH", "$'", "$LAST_PAREN_MATCH", "$+", "$LAST_SUBMATCH_RESULT", "$^N", "$INPUT_LINE_NUMBER", "$NR", "$.", "$INPUT_RECORD_SEPARATOR", "$RS", "$OUTPUT_AUTOFLUSH", "$OFS", "$,", "@LAST_MATCH_END", "@+", "%LAST_PAREN_MATCH", "%+", "$OUTPUT_RECORD_SEPARATOR", "$ORS", "$LIST_SEPARATOR", '$"', "$SUBSCRIPT_SEPARATOR", "$SUBSEP", "$;", "$FORMAT_PAGE_NUMBER", "$%", "$FORMAT_LINES_PER_PAGE", "$=", "$FORMAT_LINES_LEFT", "$-", "@LAST_MATCH_START", "@-", "%-", "$FORMAT_NAME", "$~", "$FORMAT_TOP_NAME", "$FORMAT_LINE_BREAK_CHARACTERS", "$:", "$FORMAT_FORMFEED", "$^L", "$ACCUMULATOR", "$^A", "$CHILD_ERROR", "$?", "${^CHILD_ERROR_NATIVE}", "${^ENCODING}", "$OS_ERROR", "$ERRNO", "$!", "%OS_ERROR", "%ERRNO", "%!", "$EXTENDED_OS_ERROR", "$^E", "$EVAL_ERROR", "$@", "$PROCESS_ID", "$PID", "$$", "$REAL_USER_ID", "$UID", "$<", "$EFFECTIVE_USER_ID", "$EUID", "$>", "$REAL_GROUP_ID", "$GID", "$(", "$EFFECTIVE_GROUP_ID", "$EGID", "$)", "$PROGRAM_NAME", "$0", "$[", "$]", "$COMPILING", "$^C", "$DEBUGGING", "$^D", "${^RE_DEBUG_FLAGS}", "${^RE_TRIE_MAXBUF}", "$SYSTEM_FD_MAX", "$^F", "$^H", "%^H", "$INPLACE_EDIT", "$^I", "$^M", "$OSNAME", "$^O", "${^OPEN}", "$PERLDB", "$^P", "$LAST_REGEXP_CODE_RESULT", "$^R", "$EXCEPTIONS_BEING_CAUGHT", "$^S", "$BASETIME", "$^T", "${^TAINT}", "${^UNICODE}", "${^UTF8CACHE}", "${^UTF8LOCALE}", "$PERL_VERSION", "$^V", "$WARNING", "$^W", "${^WARNING_BITS}", "${^WIN32_SLOPPY_STAT}", "$EXECUTABLE_NAME", "$^X", "ARGV", "$ARGV", "@ARGV", "ARGVOUT", "@F", "@INC", "@ARG", "@_", "%INC", "%ENV", "$ENV", "%SIG", "$SIG", "$^", "$#array"], boundary: "\\W" } }, scopes: { string: [['"', '"', c.util.escapeSequences.concat(['\\"'])], ["'", "'", ["\\'", "\\\\"]]], comment: [["#", "\n", null, true]], variable: [["$#", { length: 1, regex: /[\W]/ }, null, true], ["$", { length: 1, regex: /[\W]/ }, null, true], ["@", { length: 1, regex: /[\W]/ }, null, true], ["%", { length: 1, regex: /[\W]/ }, null, true]] }, customParseRules: [function (h) {
      var l,
          o,
          g,
          n = false,
          m = "",
          k,
          p = h.reader.getLine(),
          i = h.reader.getColumn(),
          j;if (!e(h)) {
        return null;
      }l = h.reader.current();o = h.reader.peek();if (l === "/" || l === "?") {
        g = l;
      } else {
        if (l === "m" || l === "y" || l === "s") {
          if (!(k = d(h, 1))) {
            return null;
          }m = l + k.value;g = k.delimiter;n = l === "y" || l === "s";
        } else {
          if ((l === "t" || l === "q") && o === "r") {
            if (!(k = d(h, 2))) {
              return null;
            }n = l === "t";m = l + k.value;g = k.delimiter;
          } else {
            return null;
          }
        }
      }m += a(h, g, !n);if (n) {
        m += b(h);j = c.util.contains(["[", "(", "{"], g);if (j) {
          k = d(h, 1);if (k) {
            m += k.value;g = k.delimiter;
          }
        }m += a(h, g, true);
      }while (h.reader.peek() !== h.reader.EOF) {
        if (!/[A-Za-z]/.test(h.reader.peek())) {
          break;
        }m += h.reader.read();
      }return h.createToken("regexLiteral", m, p, i);
    }, function (i) {
      var l = "q",
          k = 1,
          h,
          g = i.reader.getLine(),
          j = i.reader.getColumn();if (i.reader.current() !== "q") {
        return null;
      }h = i.reader.peek();if (h === "q" || h === "w" || h == "x") {
        k++;
      }if (/[A-Za-z0-9]$/.test(i.reader.peek(k))) {
        return null;
      }l += i.reader.read(k - 1) + a(i, i.reader.read(), true);return i.createToken("rawString", l, g, j);
    }, function (i) {
      var g,
          p = i.reader.getLine(),
          j = i.reader.getColumn(),
          n = "<<",
          k = "",
          m,
          h = "",
          o,
          l;if (i.reader.current() !== "<" || i.reader.peek() !== "<") {
        return null;
      }g = c.util.getPreviousNonWsToken(i.getAllTokens(), i.count() - 1);if (g && (g.name === "ident" || g.name === "number" || g.name === "string")) {
        return null;
      }i.reader.read(2);m = i.reader.current();if (m === "-") {
        i.reader.read();n += m;m = i.reader.current();
      }if (c.util.contains(['"', "'", "`"], m)) {
        h = m;
      } else {
        k = m;
      }n += m;while ((o = i.reader.peek()) !== i.reader.EOF) {
        if (o === "\n" || h === "" && /\W/.test(o)) {
          break;
        }if (o === "\\") {
          l = i.reader.peek(2);if (h !== "" && c.util.contains(["\\" + h, "\\\\"], l)) {
            n += l;k += i.reader.read(2);continue;
          }
        }n += i.reader.read();if (h !== "" && o === h) {
          break;
        }k += o;
      }i.items.heredocQueue.push(k);return i.createToken("heredocDeclaration", n, p, j);
    }, function (i) {
      var l = [],
          m,
          h,
          j,
          k,
          g;if (i.items.heredocQueue.length === 0) {
        return null;
      }if (i.defaultData.text.replace(/[^\n]/g, "").length === 0) {
        return null;
      }k = i.reader.current();while (i.items.heredocQueue.length > 0 && i.reader.peek() !== i.reader.EOF) {
        m = i.items.heredocQueue.shift();h = i.reader.getLine(), j = i.reader.getColumn();while (i.reader.peek() !== i.reader.EOF) {
          g = i.reader.peek(m.length + 2);if (g === "\n" + m || g === "\n" + m + "\n") {
            k += i.reader.read(m.length + 2);break;
          }k += i.reader.read();
        }l.push(i.createToken("heredoc", k, h, j));k = "";
      }return l.length > 0 ? l : null;
    }, function (j) {
      var l = "=",
          h = j.reader.getLine(),
          k = j.reader.getColumn(),
          g = false,
          i;if (j.reader.current() !== "=" || !j.reader.isSol()) {
        return null;
      }while ((i = j.reader.peek()) !== j.reader.EOF) {
        if (!g && j.reader.peek(5) === "\n=cut") {
          g = true;l += j.reader.read(5);continue;
        }if (g && i === "\n") {
          break;
        }l += j.reader.read();
      }return j.createToken("docComment", l, h, k);
    }], identFirstLetter: /[A-Za-z_]/, identAfterFirstLetter: /\w/, namedIdentRules: { follows: [[{ token: "keyword", values: ["sub"] }, { token: "default" }], [{ token: "operator", values: ["\\&"] }, c.util.whitespace]] }, operators: ["++", "+=", "+", "--", "-=", "-", "**=", "**", "*=", "*", "//=", "/=", "//", "/", "%=", "%", "=>", "=~", "==", "=", "!", "!~", "!=", "~", "~~", "\\&", "\\", "&&=", "&=", "&&", "&", "||=", "||", "|=", "|", "<<=", "<=>", "<<", "<=", "<", ">>=", ">>", ">=", ">", "^=", "^", "?", "::", ":", "...", ".=", "..", ".", ",", "x=", "x", "lt", "gt", "le", "ge", "eq", "ne", "cmp"], contextItems: { heredocQueue: [] } });
})(undefined["Sunlight"]);(function (a, b) {
  if (a === b || a.registerLanguage === b) {
    throw "Include sunlight.js before including language files";
  }a.registerLanguage("vb", { keywords: ["AddHandler", "AddressOf", "Alias", "AndAlso", "And", "As", "Boolean", "ByRef", "Byte", "ByVal", "Call", "Case", "Catch", "CBool", "CByte", "CChar", "CDate", "CDbl", "CDec", "Char", "CInt", "Class", "CLng", "CObj", "Const", "Continue", "CSByte", "CShort", "CSng", "CStr", "CType", "CUInt", "CULng", "CUShort", "Date", "Decimal", "Declare", "Default", "Delegate", "Dim", "DirectCast", "Double", "Do", "Each", "ElseIf", "Else", "EndStatement", "EndIf", "End", "Enum", "Erase", "Error", "Event", "Exit", "False", "Finally", "ForEach", "For", "Friend", "Function", "GetType", "GetXMLNamespace", "Get", "Global", "GoSub", "GoTo", "Handles", "If", "Implements", "Imports", "Inherits", "Integer", "Interface", "In", "IsNot", "Is", "Let", "Lib", "Like", "Long", "Loop", "Me", "Module", "Mod", "MustInherit", "MustOverride", "MyBase", "MyClass", "Namespace", "Narrowing", "New", "Next", "Nothing", "NotInheritable", "NotOverridable", "Not", "Object", "Of", "On", "Operator", "Option", "Optional", "OrElse", "Or", "Out", "Overloads", "Overridable", "Overrides", "ParamArray", "Partial", "Private", "Property", "Protected", "Public", "RaiseEvent", "ReadOnly", "ReDim", "RemoveHandler", "Resume", "Return", "SByte", "Select", "Set", "Shadows", "Shared", "Short", "Single", "Static", "Step", "Stop", "String", "Structure", "Sub", "SyncLock", "Then", "Throw", "To", "True", "TryCast", "Try", "TypeOf", "UInteger", "ULong", "UShort", "Using", "Variant", "Wend", "When", "While", "Widening", "WithEvents", "With", "WriteOnly", "Xor"], customTokens: { reservedWord: { values: ["Aggregate", "Ansi", "Assembly", "Auto", "Binary", "Compare", "Custom", "Distinct", "Equals", "Explicit", "From", "Group By", "Group Join", "Into", "IsFalse", "IsTrue", "Join", "Key", "Mid", "Off", "Order By", "Preserve", "Skip", "Skip While", "Strict", "Take While", "Take", "Text", "Unicode", "Until", "Where"], boundary: "\\b" } }, scopes: { string: [['"', '"', a.util.escapeSequences.concat(['\\"'])]], comment: [["'", "\n", null, true], ["REM", "\n", null, true]], compilerDirective: [["#", "\n", null, true]] }, customParseRules: [function (d) {
      var h = "xmlDocCommentMeta",
          g = "xmlDocCommentContent",
          f,
          c,
          e;if (d.reader.current() !== "'" || d.reader.peek(2) !== "''") {
        return null;
      }f = [d.createToken(h, "'''", d.reader.getLine(), d.reader.getColumn())];e = { line: 0, column: 0, value: "", name: null };d.reader.read(2);while ((c = d.reader.peek()) !== d.reader.EOF) {
        if (c === "<" && e.name !== h) {
          if (e.value !== "") {
            f.push(d.createToken(e.name, e.value, e.line, e.column));
          }e.line = d.reader.getLine();e.column = d.reader.getColumn();e.name = h;e.value = d.reader.read();continue;
        }if (c === ">" && e.name === h) {
          e.value += d.reader.read();f.push(d.createToken(e.name, e.value, e.line, e.column));e.name = null;e.value = "";continue;
        }if (c === "\n") {
          break;
        }if (e.name === null) {
          e.name = g;e.line = d.reader.getLine();e.column = d.reader.getColumn();
        }e.value += d.reader.read();
      }if (e.name === g) {
        f.push(d.createToken(e.name, e.value, e.line, e.column));
      }return f.length > 0 ? f : null;
    }, function (d) {
      var c = d.reader.getLine(),
          f = d.reader.getColumn(),
          e,
          g = "[";if (d.reader.current() !== "[") {
        return null;
      }e = d.reader.read();while (e !== d.reader.EOF) {
        g += e;if (e === "]") {
          break;
        }e = d.reader.read();
      }return d.createToken("escapedKeyword", g, c, f);
    }, function () {
      var c = a.util.createHashMap(["New", "GetType"], "\\b");return function (e) {
        var d = a.util.matchWord(e, c, "keyword"),
            f;if (!d) {
          return null;
        }f = a.util.getPreviousNonWsToken(e.getAllTokens(), e.count());if (f && (f.name === "operator" && f.value === "." || f.name === "keyword" && f.value === "Sub")) {
          d.name = "ident";
        }return d;
      };
    }()], identFirstLetter: /[A-Za-z_]/, identAfterFirstLetter: /\w/, namedIdentRules: { custom: [function (h) {
        var g,
            c = a.util.getNextNonWsToken(h.tokens, h.index),
            e = h.index,
            d = [0, 0],
            f = -1;if (c && c.name === "operator" && (c.value === "=" || c.value === ".")) {
          return false;
        }while ((g = h.tokens[--e]) !== b) {
          if (g.name === "operator") {
            if (g.value === "<") {
              d[0]++;
            } else {
              if (g.value === ">") {
                d[1]++;
              }
            }
          } else {
            if (g.name === "keyword" && a.util.contains(["Public", "Class", "Protected", "Private", "Friend"], g.value)) {
              break;
            }
          }
        }if (d[0] === 0 || d[0] === d[1]) {
          return false;
        }e = h.index;while ((g = h.tokens[++e]) !== b) {
          if (g.name === "operator") {
            if (g.value === "<") {
              d[0]++;
            } else {
              if (g.value === ">") {
                f = e;d[1]++;
              }
            }
          } else {
            if (g.name === "keyword" && a.util.contains(["Public", "Class", "Protected", "Private", "Friend", "ByVal"], g.value)) {
              break;
            }
          }
        }if (f < 0 || d[0] !== d[1]) {
          return false;
        }g = a.util.getNextNonWsToken(h.tokens, f);if (g && (g.name === "keyword" || g.name === "ident")) {
          return true;
        }return false;
      }, function (e) {
        var d,
            c = e.index,
            f = 1;if (!a.util.createProceduralRule(e.index - 1, -1, [{ token: "punctuation", values: [","] }, a.util.whitespace])(e.tokens)) {
          return false;
        }while (d = e.tokens[--c]) {
          if (d.name === "punctuation" && d.value === "(") {
            f--;if (f === 0) {
              d = e.tokens[--c];if (d && d.name === "keyword" && a.util.contains(["CType", "DirectCast", "TryCast"], d.value)) {
                return true;
              }return false;
            }
          } else {
            if (d.name === "punctuation" && d.value === ")") {
              f++;
            }
          }
        }return false;
      }, function (e) {
        var f = a.util.getPreviousNonWsToken(e.tokens, e.index),
            d,
            c = e.index;if (f && f.name === "operator" && f.value === ".") {
          return false;
        }while (d = e.tokens[--c]) {
          if (d.name === "keyword") {
            switch (d.value) {case "Class":case "New":
                break;case "Implements":
                return true;default:
                return false;}
          } else {
            if (d.name === "default" && d.value.indexOf(a.util.eol) >= 0) {
              return false;
            }
          }
        }return false;
      }, function (e) {
        var d,
            c = e.index,
            f = function () {
          while (d = e.tokens[--c]) {
            if (d.name === "punctuation") {
              switch (d.value) {case "(":case ")":
                  return false;case "{":
                  d = a.util.getPreviousNonWsToken(e.tokens, c);if (!d || d.name !== "keyword" || d.value !== "As") {
                    return false;
                  }return true;}
            } else {
              if (d.name === "keyword" && a.util.contains(["Public", "Protected", "Friend", "Private", "End"], d.value)) {
                return false;
              }
            }
          }return false;
        }();if (!f) {
          return false;
        }c = e.index;while (d = e.tokens[++c]) {
          if (d.name === "punctuation") {
            switch (d.value) {case "}":
                return true;case "(":case ")":case ";":
                return false;}
          }
        }return false;
      }], follows: [[{ token: "keyword", values: ["Of", "As", "Class", "Implements", "Inherits", "New", "AddressOf", "Interface", "Structure", "Event", "Module", "Enum"] }, { token: "default" }], [{ token: "keyword", values: ["GetType"] }, a.util.whitespace, { token: "punctuation", values: ["("] }, a.util.whitespace]] }, numberParser: function numberParser(f) {
      var i = f.reader.current(),
          h,
          d = f.reader.getLine(),
          g = f.reader.getColumn(),
          c = true,
          e;if (i === "&" && /[Hh][A-Fa-f0-9]/.test(f.reader.peek(2))) {
        h = i + f.reader.read(2);c = false;
      } else {
        if (/\d/.test(i)) {
          h = i;
        } else {
          if (i !== "." || !/\d/.test(f.reader.peek())) {
            return null;
          }h = i + f.reader.read();c = false;
        }
      }while ((e = f.reader.peek()) !== f.reader.EOF) {
        if (!/[A-Za-z0-9]/.test(e)) {
          if (e === "." && c && /\d$/.test(f.reader.peek(2))) {
            h += f.reader.read();c = false;continue;
          }break;
        }h += f.reader.read();
      }return f.createToken("number", h, d, g);
    }, operators: [".", "<>", "=", "&=", "&", "*=", "*", "/=", "/", "\\=", "\\", "^=", "^", "+=", "+", "-=", "-", ">>=", ">>", "<<=", "<<", "<=", ">=", "<", ">"] });
})(undefined["Sunlight"]);(function (a, b) {
  if (a === b || a.registerLanguage === b) {
    throw "Include sunlight.js before including language files";
  }a.registerLanguage("httpd", { scopes: { string: [['"', '"', ['\\"', "\\\\"]]], comment: [["#", "\n", null, true]], environmentVariable: [["${", "}"], ["%{", "}"]] }, customParseRules: [function () {
      var c = a.util.createHashMap(["AuthnProviderAlias", "Directory", "DirectoryMatch", "Files", "FilesMatch", "IfDefine", "IfModule", "IfVersion", "Limit", "LimitExcept", "Location", "LocationMatch", "ProxyMatch", "Proxy", "VirtualHost", "IfDefine"], "\\b", false);return function (f) {
        var e = a.util.getPreviousNonWsToken(f.getAllTokens(), f.count()),
            d,
            g;if (!e || e.name !== "operator" || e.value !== "<" && e.value !== "</") {
          return false;
        }e = a.util.matchWord(f, c, "context", true);if (!e) {
          return null;
        }g = e.value.length;while ((d = f.reader.peek(g++)) !== f.reader.EOF) {
          if (/>$/.test(d)) {
            f.reader.read(e.value.length - 1);return e;
          }if (/\n$/.test(d)) {
            break;
          }
        }return null;
      };
    }(), function (e) {
      var j = e.reader.current(),
          i,
          g,
          h,
          d,
          c = e.reader.getLine(),
          f = e.reader.getColumn();if (/[\s\n]/.test(j)) {
        return null;
      }i = e.getAllTokens();g = a.util.getPreviousNonWsToken(i, e.count());if (!g) {
        return null;
      }if (g.name !== "keyword" || g.value !== "RewriteRule") {
        g = a.util.getPreviousNonWsToken(i, e.count() - 1);if (!g || g.name !== "keyword" || g.value !== "RewriteCond") {
          return null;
        }
      }h = j;while ((d = e.reader.peek()) !== e.reader.EOF) {
        if (/[\s\n]/.test(d)) {
          break;
        }h += e.reader.read();
      }return e.createToken("regexLiteral", h, c, f);
    }, function () {
      var c = a.util.createHashMap(["AcceptFilter", "AcceptMutex", "AcceptPathInfo", "AccessFileName", "Action", "AddAltByEncoding", "AddAltByType", "AddAlt", "AddCharset", "AddDefaultCharset", "AddDescription", "AddEncoding", "AddHandler", "AddIconByEncoding", "AddIconByType", "AddIcon", "AddInputFilter", "AddLanguage", "AddModuleInfo", "AddOutputFilterByType", "AddOutputFilter", "AddType", "AliasMatch", "Alias", "AllowCONNECT", "AllowEncodedSlashes", "AllowOverride", "Allow", "Anonymous_LogEmail", "Anonymous_MustGiveEmail", "Anonymous_NoUserID", "Anonymous_VerifyEmail", "Anonymous", "AuthBasicAuthoritative", "AuthBasicProvider", "AuthDBDUserPWQuery", "AuthDBDUserRealmQuery", "AuthDBMGroupFile", "AuthDBMType", "AuthDBMUserFile", "AuthDefaultAuthoritative", "AuthDigestAlgorithm", "AuthDigestDomain", "AuthDigestNcCheck", "AuthDigestNonceFormat", "AuthDigestNonceLifetime", "AuthDigestProvider", "AuthDigestQop", "AuthDigestShmemSize", "AuthGroupFile", "AuthLDAPBindAuthoritative", "AuthLDAPBindDN", "AuthLDAPBindPassword", "AuthLDAPCharsetConfig", "AuthLDAPCompareDNOnServer", "AuthLDAPDereferenceAliases", "AuthLDAPGroupAttributeIsDN", "AuthLDAPGroupAttribute", "AuthLDAPRemoteUserAttribute", "AuthLDAPRemoteUserIsDN", "AuthLDAPUrl", "AuthName", "AuthType", "AuthUserFile", "AuthzDBMAuthoritative", "AuthzDBMType", "AuthzDefaultAuthoritative", "AuthzGroupFileAuthoritative", "AuthzLDAPAuthoritative", "AuthzOwnerAuthoritative", "AuthzUserAuthoritative", "BalancerMember", "BrowserMatch", "BrowserMatchNoCase", "BufferedLogs", "CacheDefaultExpire", "CacheDirLength", "CacheDirLevels", "CacheDisable", "CacheEnable", "CacheFile", "CacheIgnoreCacheControl", "CacheIgnoreHeaders", "CacheIgnoreNoLastMod", "CacheIgnoreQueryString", "CacheIgnoreURLSessionIdentifiers", "CacheLastModifiedFactor", "CacheLockMaxAge", "CacheLockPath", "CacheLock", "CacheMaxExpire", "CacheMaxFileSize", "CacheMinFileSize", "CacheNegotiatedDocs", "CacheRoot", "CacheStoreNoStore", "CacheStorePrivate", "CGIMapExtension", "CharsetDefault", "CharsetOptions", "CharsetSourceEnc", "CheckCaseOnly", "CheckSpelling", "ChrootDir", "ContentDigest", "CookieDomain", "CookieExpires", "CookieLog", "CookieName", "CookieStyle", "CookieTracking", "CoreDumpDirectory", "CustomLog", "DavDepthInfinity", "DavGenericLockDB", "DavLockDB", "DavMinTimeout", "Dav", "DBDExptime", "DBDKeep", "DBDMax", "DBDMin", "DBDParams", "DBDPersist", "DBDPrepareSQL", "DBDriver", "DefaultIcon", "DefaultLanguage", "DefaultType", "DeflateBufferSize", "DeflateCompressionLevel", "DeflateFilterNote", "DeflateMemLevel", "DeflateWindowSize", "Deny", "DirectoryIndex", "DirectorySlash", "DocumentRoot", "DumpIOInput", "DumpIOLogLevel", "DumpIOOutput", "EnableExceptionHook", "EnableMMAP", "EnableSendfile", "ErrorDocument", "ErrorLog", "Example", "ExpiresActive", "ExpiresByType", "ExpiresDefault", "ExtendedStatus", "ExtFilterDefine", "ExtFilterOptions", "FallbackResource", "FileETag", "FilterChain", "FilterDeclare", "FilterProtocol", "FilterProvider", "FilterTrace", "ForceLanguagePriority", "ForceType", "ForensicLog", "GprofDir", "GracefulShutDownTimeout", "Group", "HeaderName", "Header", "HostnameLookups", "IdentityCheckTimeout", "IdentityCheck", "ImapBase", "ImapDefault", "ImapMenu", "Include", "IndexHeadInsert", "IndexIgnore", "IndexOptions", "IndexOrderDefault", "IndexStyleSheet", "ISAPIAppendLogToErrors", "ISAPIAppendLogToQuery", "ISAPICacheFile", "ISAPIFakeAsync", "ISAPILogNotSupported", "ISAPIReadAheadBuffer", "KeepAliveTimeout", "KeepAlive", "LanguagePriority", "LDAPCacheEntries", "LDAPCacheTTL", "LDAPConnectionTimeout", "LDAPOpCacheEntries", "LDAPOpCacheTTL", "LDAPSharedCacheFile", "LDAPSharedCacheSize", "LDAPTrustedClientCert", "LDAPTrustedGlobalCert", "LDAPTrustedMode", "LDAPVerifyServerCert", "LimitInternalRecursion", "LimitRequestBody", "LimitRequestFields", "LimitRequestFieldSize", "LimitRequestLine", "LimitXMLRequestBody", "ListenBacklog", "Listen", "LoadFile", "LoadModule", "LockFile", "LogFormat", "LogLevel", "MaxClients", "MaxKeepAliveRequests", "MaxMemFree", "MaxRequestsPerChild", "MaxRequestsPerThread", "MaxSpareServers", "MaxSpareThreads", "MaxThreads", "MCacheMaxObjectCount", "MCacheMaxObjectSize", "MCacheMaxStreamingBuffer", "MCacheMinObjectSize", "MCacheRemovalAlgorithm", "MCacheSize", "MetaDir", "MetaFiles", "MetaSuffix", "MimeMagicFile", "MinSpareServers", "MinSpareThreads", "MMapFile", "ModMimeUsePathInfo", "MultiviewsMatch", "NameVirtualHost", "NoProxy", "NWSSLTrustedCerts", "NWSSLUpgradeable", "Options", "Order", "PassEnv", "PidFile", "ProtocolEcho", "Protocol", "ProxyBadHeader", "ProxyBlock", "ProxyDomain", "ProxyErrorOverride", "ProxyFtpDirCharset", "ProxyIOBufferSize", "ProxyMaxForwards", "ProxyPassInterpolateEnv", "ProxyPassMatch", "ProxyPassReverse", "ProxyPassReverseCookieDomain", "ProxyPassReverseCookiePath", "ProxyPass", "ProxyPreserveHost", "ProxyReceiveBufferSize", "ProxyRemoteMatch", "ProxyRemote", "ProxyRequests", "ProxySCGIInternalRedirect", "ProxySCGISendfile", "ProxySet", "ProxyStatus", "ProxyTimeout", "ProxyVia", "ReadmeName", "ReceiveBufferSize", "RedirectMatch", "RedirectPermanent", "RedirectTemp", "Redirect", "RemoveCharset", "RemoveEncoding", "RemoveHandler", "RemoveInputFilter", "RemoveLanguage", "RemoveOutputFilter", "RemoveType", "RequestHeader", "RequestReadTimeout", "Require", "RewriteBase", "RewriteCond", "RewriteEngine", "RewriteLock", "RewriteLogLevel", "RewriteLog", "RewriteMap", "RewriteOptions", "RewriteRule", "RLimitCPU", "RLimitMEM", "RLimitNPROC", "Satisfy", "ScoreBoardFile", "ScriptAliasMatch", "ScriptAlias", "ScriptInterpreterSource", "ScriptLogBuffer", "ScriptLogLength", "ScriptLog", "ScriptSock", "Script", "SecureListen", "SeeRequestTail", "SendBufferSize", "ServerAdmin", "ServerAlias", "ServerLimit", "ServerName", "ServerPath", "ServerRoot", "ServerSignature", "ServerTokens", "SetEnvIfNoCase", "SetEnvIf", "SetEnv", "SetHandler", "SetInputFilter", "SetOutputFilter", "SSIEnableAccess", "SSIEndTag", "SSIErrorMsg", "SSIETag", "SSILastModified", "SSIStartTag", "SSITimeFormat", "SSIUndefinedEcho", "SSLCACertificateFile", "SSLCACertificatePath", "SSLCADNRequestFile", "SSLCADNRequestPath", "SSLCARevocationFile", "SSLCARevocationPath", "SSLCertificateChainFile", "SSLCertificateFile", "SSLCertificateKeyFile", "SSLCipherSuite", "SSLCryptoDevice", "SSLEngine", "SSLFIPS", "SSLHonorCipherOrder", "SSLInsecureRenegotiation", "SSLMutex", "SSLOptions", "SSLPassPhraseDialog", "SSLProtocol", "SSLProxyCACertificateFile", "SSLProxyCACertificatePath", "SSLProxyCARevocationFile", "SSLProxyCARevocationPath", "SSLProxyCheckPeerCN", "SSLProxyCheckPeerExpire", "SSLProxyCipherSuite", "SSLProxyEngine", "SSLProxyMachineCertificateFile", "SSLProxyMachineCertificatePath", "SSLProxyProtocol", "SSLProxyVerify", "SSLProxyVerifyDepth", "SSLRandomSeed", "SSLRenegBufferSize", "SSLRequireSSL", "SSLRequire", "SSLSessionCacheTimeout", "SSLSessionCache", "SSLStrictSNIVHostCheck", "SSLUserName", "SSLVerifyClient", "SSLVerifyDepth", "StartServers", "StartThreads", "Substitute", "SuexecUserGroup", "Suexec", "ThreadLimit", "ThreadsPerChild", "ThreadStackSize", "TimeOut", "TraceEnable", "TransferLog", "TypesConfig", "UnsetEnv", "UseCanonicalName", "UseCanonicalPhysicalPort", "UserDir", "User", "VirtualDocumentRootIP", "VirtualDocumentRoot", "VirtualScriptAliasIP", "VirtualScriptAlias", "Win32DisableAcceptEx", "XBitHack", "ServerType"], "\\b", true);return function (d) {
        if (!d.reader.isSolWs()) {
          return false;
        }return a.util.matchWord(d, c, "keyword");
      };
    }()], identFirstLetter: /[A-Za-z_]/, identAfterFirstLetter: /[\w]/, operators: ["</", "<", ">", "\\"] });
})(undefined["Sunlight"]);(function (c, d) {
  if (c === d || c.registerLanguage === d) {
    throw "Include sunlight.js before including language files";
  }var b = "[\\s\\(\\)]";function a(g, e) {
    var f = c.util.createHashMap(g, b, false);return function (i) {
      var h = c.util.getPreviousNonWsToken(i.getAllTokens(), i.count());if (!h) {
        return null;
      }if (h.name !== "punctuation" || h.value !== "(" && (h.name !== "operator" || h.value !== "#'")) {
        return null;
      }return c.util.matchWord(i, f, e);
    };
  }c.registerLanguage("lisp", { scopes: { string: [['"', '"']], comment: [[";", "\n", null, true]], keywordArgument: [[":", { regex: /[\s\)\(]/, length: 1 }, null, true]] }, customTokens: { keyword: { values: ["always", "appending", "append", "as", "collecting", "collect", "counting", "count", "doing", "do", "finally", "for", "if", "initially", "maximize", "maximizing", "minimize", "minimizing", "named", "nconcing", "nconc", "never", "repeat", "return", "summing", "sum", "thereis", "unless", "until", "when", "while", "with", "into", "in"], boundary: "[^\\w-]" }, globalVariable: { values: ["*applyhook*", "*break-on-signals*", "*break-on-warnings*", "*compile-file-pathname*", "*compile-file-truename*", "*compile-print*", "*compile-verbose*", "*debug-io*", "*debugger-hook*", "*gensym-counter*", "*terminal-io*", "*default-pathname-defaults*", "*error-output*", "*evalhook*", "*features*", "*load-pathname*", "*load-print*", "*load-truename*", "*load-verbose*", "*macroexpand-hook*", "*modules*", "*package*", "*print-array*", "*print-base*", "*print-case*", "*print-circle*", "*print-escape*", "*print-gensym*", "*print-length*", "*print-level*", "*print-lines*", "*print-miser-width*", "*print-pprint-dispatch*", "*print-pretty*", "*print-radix*", "*print-readably*", "*print-right-margin*", "*query-io*", "*random-state*", "*read-base*", "*read-default-float-format*", "*read-eval*", "*read-suppress*", "*readtable*", "*standard-input*", "*standard-output*", "*suppress-series-warnings*", "*trace-output*", "***", "**", "*", "+++", "++", "+", "-", "///", "//", "/"], boundary: b }, constant: { values: ["array-dimension-limit", "array-rank-limit", "array-total-size-limit", "call-arguments-limit", "char-bits-limit", "char-code-limit", "char-control-bit", "char-font-limit", "char-hyper-bit", "char-meta-bit", "char-super-bit", "double-float-epsilon", "double-float-negative-epsilon", "internal-time-units-per-second", "lambda-list-keywords", "lambda-parameters-limit", "least-negative-double-float", "least-negative-long-float", "least-negative-normalized-double-float", "least-negative-normalized-long-float", "least-negative-normalized-short-float", "least-negative-normalized-single-float", "least-negative-short-float", "least-negative-single-float", "least-positive-double-float", "least-positive-long-float", "least-positive-normalized-double-float", "least-positive-normalized-long-float", "least-positive-normalized-short-float", "least-positive-normalized-single-float", "least-positive-short-float", "least-positive-single-float", "long-float-epsilon", "long-float-negative-epsilon", "most-negative-double-float", "most-negative-fixnum", "most-negative-long-float", "most-negative-short-float", "most-negative-single-float", "most-positive-double-float", "most-positive-fixnum", "most-positive-long-float", "most-positive-short-float", "most-positive-single-float", "multiple-values-limit", "nil", "pi", "short-float-epsilon", "short-float-negative-epsilon", "single-float-epsilon", "single-float-negative-epsilon", "t"], boundary: b }, declarationSpecifier: { values: ["off-line-port", "optimizable-series-function", "propagate-alterability"], boundary: b } }, customParseRules: [function (g) {
      var e,
          h = 0,
          f;if (g.reader.current() !== "#") {
        return null;
      }while ((e = g.reader.peek(++h)) !== g.reader.EOF && e.length === h) {
        if (!/\d$/.test(e)) {
          if (/[AR]$/i.test(e)) {
            break;
          }return null;
        }
      }if (e.length !== h) {
        return null;
      }f = g.createToken("operator", "#" + e, g.reader.getLine(), g.reader.getColumn());g.reader.read(e.length);return f;
    }, function (g) {
      var i,
          f,
          j,
          e = g.reader.getLine(),
          h = g.reader.getColumn();if (g.defaultData.text !== "" || /\s/.test(g.reader.current())) {
        return null;
      }i = g.getAllTokens()[g.count() - 1];if (!i || i.name !== "operator" || i.value !== "#\\") {
        return null;
      }j = g.reader.current();while ((f = g.reader.peek()) !== g.reader.EOF) {
        if (/[\s\(\)]/.test(f)) {
          break;
        }j += g.reader.read();
      }return g.createToken("ident", j, e, h);
    }, function (h) {
      var g,
          j = "*",
          f,
          e = h.reader.getLine(),
          i = h.reader.getColumn();if (h.reader.current() !== "*") {
        return null;
      }g = c.util.getPreviousNonWsToken(h.getAllTokens(), h.count());if (g && g.name === "punctuation" && g.value === "(") {
        return null;
      }if (/[\s\*\)\(]/.test(h.reader.peek())) {
        return null;
      }while ((f = h.reader.peek()) !== h.reader.EOF) {
        j += h.reader.read();if (f === "*") {
          break;
        }
      }return h.createToken("variable", j, e, i);
    }, function () {
      var e = new RegExp(b);return function (i) {
        var h,
            g,
            k,
            f = i.reader.getLine(),
            j = i.reader.getColumn();if (i.defaultData.text !== "" || e.test(i.reader.current())) {
          return null;
        }h = i.getAllTokens()[i.count() - 1];if (!h || h.name !== "operator" || h.value !== "#'") {
          return null;
        }k = i.reader.current();while ((g = i.reader.peek()) !== i.reader.EOF) {
          if (e.test(g)) {
            break;
          }k += i.reader.read();
        }return i.createToken("function", k, f, j);
      };
    }(), a(["arithmetic-error", "cell-error", "condition", "control-error", "division-by-zero", "end-of-file", "error", "file-error", "floating-point-overflow", "floating-point-underflow", "package-error", "program-error", "restart", "series", "series-element-type", "serious-condition", "simple-condition", "simple-error", "simple-type-error", "simple-warning", "storage-condition", "stream-error", "type-error", "unbound-variable", "undefined-function", "warning"], "type"), a(["block", "catch", "compiler-let", "declare", "eval-when", "flet", "function", "generic-flet", "generic-labels", "go", "if", "let*", "let", "load-time-value", "locally", "multiple-value-call", "multiple-value-prog1", "progn", "progv", "quote", "return-from", "setq", "symbol-macrolet", "tagbody", "the", "throw", "unwind-protect", "with-added-methods"], "specialForm"), a(["and", "assert", "call-method", "case", "ccase", "check-type", "compiler-let", "cond", "ctypecase", "decf", "declaim", "defclass", "defgeneric", "define-compiler-macro", "define-condition", "define-declaration", "define-method-combination", "define-modify-macro", "define-setf-method", "defmacro", "defmethod", "defpackage", "defstruct", "deftype", "defun", "defvar", "destructuring-bind", "do*", "do-all-symbols", "do-external-symbols", "do-symbols", "dolist", "dotimes", "do", "ecase", "encapsulated", "etypecase", "formatter", "gathering", "generic-function", "handler-bind", "handler-case", "ignore-errors", "in-package", "incf", "iterate", "locally", "loop-finish", "loop", "mapping", "multiple-value-bind", "multiple-value-list", "multiple-value-setq", "next-in", "nth-value", "or", "pop", "pprint-exit-if-list-exhausted", "pprint-logical-block", "pprint-pop", "print-unreadable-object", "producing", "prog*", "prog1", "prog2", "prog", "psetf", "psetq", "pushnew", "push", "remf", "restart-bind", "restart-case", "return", "rotatef", "setf", "shiftf", "step", "terminate-producing", "time", "trace", "typecase", "unless", "untrace", "when", "with-accessors", "with-compilation-unit", "with-condition-restarts", "with-hash-table-iterator", "with-input-from-string", "with-open-file", "with-open-stream", "with-output-to-string", "with-package-iterator", "with-simple-restart", "with-slots", "with-standard-io-syntax", "defparameter"], "macro"), a(["*", "+", "-", "/", "1+", "1-", "<=", "<", ">=", ">", "=", "lambda", "abort", "abs", "acons", "acosh", "acos", "add-method", "adjoin", "adjust-array", "adjustable-array-p", "alpha-char-p", "alphanumericp", "alter", "append", "applyhook", "apply", "apropos-list", "apropos", "aref", "arithmetic-error-operands", "arithmetic-error-operation", "array-dimensions", "array-dimension", "array-element-type", "array-has-fill-pointer-p", "array-in-bounds-p", "array-rank", "array-row-major-index", "array-total-size", "arrayp", "ash", "asinh", "asin", "assoc-if", "assoc-if-not", "assoc", "atanh", "atan", "atom", "augment-environment", "bit-andc1", "bit-andc2", "bit-and", "bit-eqv", "bit-ior", "bit-nand", "bit-nor", "bit-not", "bit-orc1", "bit-orc2", "bit-vector-p", "bit-xor", "bit", "boole", "both-case-p", "boundp", "break", "broadcast-stream-streams", "butlast", "byte-position", "byte-size", "byte", "caaaar", "caaadr", "caaar", "caadar", "caaddr", "caadr", "caar", "cadaar", "cadadr", "cadar", "caddar", "cadddr", "caddr", "cadr", "call-next-method", "car", "catenate", "cdaaar", "cdaadr", "cdaar", "cdadar", "cdaddr", "cdadr", "cdar", "cddaar", "cddadr", "cddar", "cdddar", "cddddr", "cdddr", "cddr", "cdr", "ceiling", "cell-error-name", "cerror", "change-class", "char-bits", "char-bit", "char-code", "char-downcase", "char-equal", "char-font", "char-greaterp", "char-int", "char-lessp", "char-name", "char-not-equal", "char-not-greaterp", "char-not-lessp", "char-upcase", "char/=", "char<=", "char<", "char=", "char>=", "char>", "char", "characterp", "character", "choose-if", "choose", "chunk", "cis", "class-name", "class-of", "clear-input", "close", "clrhash", "code-char", "coerce", "collect-alist", "collect-and", "collect-append", "collect-file", "collect-first", "collect-fn", "collect-hash", "collect-last", "collect-length", "collect-max", "collect-min", "collect-nconc", "collect-nth", "collect-or", "collect-plist", "collect-sum", "collecting-fn", "collect", "commonp", "compile-file", "compile-file-pathname", "compiled-function-p", "compiler-macro-function", "compiler-macroexpand", "compiler-macroexpand-1", "compile", "complement", "complexp", "complex", "compute-applicable-methods", "compute-restarts", "concatenated-stream-streams", "concatenate", "conjugate", "consp", "constantp", "cons", "continue", "copy-alist", "copy-list", "copy-pprint-dispatch", "copy-readtable", "copy-seq", "copy-symbol", "copy-tree", "cosh", "cos", "cotruncate", "count-if", "count-if-not", "count", "declaration-information", "decode-float", "decode-universal-time", "delete-duplicates", "delete-file", "delete-if", "delete-if-not", "delete-package", "delete", "denominator", "deposit-field", "describe-object", "describe", "digit-char-p", "digit-char", "directory-namestring", "directory", "disassemble", "documentation", "dpb", "dribble", "echo-stream-input-stream", "echo-stream-output-stream", "ed", "eighth", "elt", "enclose", "encode-universal-time", "endp", "enough-namestring", "ensure-generic-function", "eql", "eq", "equalp", "equal", "error", "evalhook", "eval", "evenp", "every", "expand", "export", "expt", "exp", "fboundp", "fdefinition", "ffloor", "fifth", "file-author", "file-error-pathname", "file-length", "file-namestring", "file-position", "file-string-length", "file-write-date", "fill-pointer", "fill", "find-all-symbols", "find-class", "find-if-not", "find-if", "find-method", "find-package", "find-restart", "find-symbol", "find", "finish-output", "first", "float-digits", "float-precision", "float-radix", "float-sign", "floatp", "float", "floor", "format", "fourth", "funcall", "function-information", "function-keywords", "function-lambda-expression", "functionp", "f", "gatherer", "gcd", "generator", "gensym", "gentemp", "get-decoded-time", "get-internal-real-time", "get-internal-run-time", "get-output-stream-string", "get-properties", "get-setf-method-multiple-value", "get-setf-method", "get-universal-time", "getf", "gethash", "get", "graphic-char-p", "hash-table-count", "hash-table-p", "hash-table-rehash-size", "hash-table-rehash-threshold", "hash-table-size", "hash-table-test", "host-namestring", "identity", "imagpart", "import", "in-package", "initialize-instance", "input-stream-p", "inspect", "int-char", "integer-decode-float", "integer-length", "integerp", "interactive-stream-p", "intern", "intersection", "invalid-method-error", "invoke-debugger", "invoke-restart", "isqrt", "keywordp", "last", "latch", "lcm", "ldb-test", "ldb", "ldiff", "length", "lisp-implementation-type", "lisp-implementation-version", "list*", "list-all-packages", "list-length", "listen", "listp", "list", "load-logical-pathname-translations", "load", "logandc1", "logandc2", "logand", "logbitp", "logcount", "logeqv", "logical-pathname-translations", "logical-pathname", "logior", "lognand", "lognor", "lognot", "logorc1", "logorc2", "logtest", "logxor", "log", "long-site-name", "lower-case-p", "machine-instance", "machine-type", "machine-version", "macro-function", "macroexpand-1", "macroexpand", "make-array", "make-broadcast-stream", "make-char", "make-concatenated-stream", "make-condition", "make-dispatch-macro-character", "make-echo-stream", "make-hash-table", "make-instances-obsolete", "make-instance", "make-list", "make-load-form-saving-slots", "make-load-form", "make-package", "make-pathname", "make-random-state", "make-sequence", "make-string-input-stream", "make-string-output-stream", "make-string", "make-symbol", "make-synonym-stream", "make-two-way-stream", "makunbound", "map-fn", "map-into", "mapcan", "mapcar", "mapcon", "mapc", "maphash", "maplist", "mapl", "map", "mask-field", "mask", "max", "member-if", "member-if-not", "member", "merge-pathnames", "merge", "method-combination-error", "method-qualifiers", "mingle", "minusp", "min", "mismatch", "mod", "muffle-warning", "name-char", "namestring", "nbutlast", "nconc", "next-method-p", "next-out", "nintersection", "ninth", "no-applicable-method", "no-next-method", "notany", "notevery", "not", "nreconc", "nreverse", "nset-difference", "nset-exclusive-or", "nstring-capitalize", "nstring-downcase", "nstring-upcase", "nsublis", "nsubst", "nsubst-if-not", "nsubst-if", "nsubstitute-if-not", "nsubstitute-if", "nsubstitute", "nthcdr", "nth", "null", "numberp", "numerator", "nunion", "oddp", "open-stream-p", "open", "output-stream-p", "package-error-package", "package-name", "package-nicknames", "package-shadowing-symbols", "package-use-list", "package-used-by-list", "packagep", "pairlis", "parse-integer", "parse-macro", "parse-namestring", "pathname-device", "pathname-directory", "pathname-host", "pathname-match-p", "pathname-name", "pathname-type", "pathname-version", "pathnamep", "pathname", "peek-char", "phase", "plusp", "position-if-not", "position-if", "positions", "position", "pprint-dispatch", "pprint-fill", "pprint-indent", "pprint-linear", "pprint-newline", "pprint-tabular", "pprint-tab", "previous", "prin1", "print-object", "probe-file", "proclaim", "provide", "random-state-p", "random", "rassoc-if-not", "rassoc-if", "rassoc", "rationalize", "rationalp", "rational", "read-byte", "read-char-no-hang", "read-char", "read-delimited-list", "read-from-string", "read-line", "read", "read-preserving-whitespace", "readtable-case", "readtablep", "realpart", "realp", "reduce", "reinitialize-instance", "remhash", "remove-duplicates", "remove-method", "remove", "remprop", "rem", "rename-file", "rename-package", "replace", "require", "restart-name", "rest", "result-of", "revappend", "reverse", "room", "round", "row-major-aref", "rplaca", "rplacd", "sbit", "scale-float", "scan-alist", "scan-file", "scan-fn-inclusive", "scan-fn", "scan-hash", "scan-lists-of-lists-fringe", "scan-lists-of-lists", "scan-multiple", "scan-plist", "scan-range", "scan-sublists", "scan-symbols", "scan", "schar", "search", "second", "series", "set-char-bit", "set-difference", "set-dispatch-macro-character", "set-exclusive-or", "set-macro-character", "set-pprint-dispatch", "set-syntax-from-char", "set", "seventh", "shadow", "shadowing-import", "shared-initialize", "short-site-name", "signal", "signum", "simple-bit-vector-p", "simple-condition-format-arguments", "simple-condition-format-string", "simple-string-p", "simple-vector-p", "sinh", "sin", "sixth", "sleep", "slot-boundp", "slot-exists-p", "slot-makunbound", "slot-missing", "slot-unbound", "slot-value", "software-type", "software-version", "some", "sort", "special-form-p", "split-if", "split", "sqrt", "stable-sort", "standard-char-p", "store-value", "stream-element-type", "stream-error-stream", "stream-external-format", "streamp", "string-capitalize", "string-char-p", "string-downcase", "string-equal", "string-greaterp", "string-left-trim", "string-lessp", "string-not-equal", "string-not-greaterp", "string-not-lessp", "string-right-trim", "string-trim", "string-upcase", "string/=", "string<", "string<=", "string=", "string>", "string>=", "stringp", "string", "sublis", "subseq", "subseries", "subsetp", "subst-if-not", "subst-if", "substitute-if-not", "substitute-if", "substitute", "subst", "subtypep", "svref", "sxhash", "symbol-function", "symbol-name", "symbol-package", "symbol-plist", "symbol-value", "symbolp", "synonym-stream-symbol", "tailp", "tanh", "tan", "tenth", "terpri", "third", "to-alter", "translate-logical-pathname", "translate-pathname", "tree-equal", "truename", "truncate", "two-way-stream-input-stream", "two-way-stream-output-stream", "type-error-datum", "type-error-expected-type", "type-of", "typep", "unexport", "unintern", "union", "unread-char", "until-if", "until", "unuse-package", "update-instance-for-different-class", "update-instance-for-redefined-class", "upgraded-array-element-type", "upgraded-complex-part-type", "upper-case-p", "use-package", "use-value", "user-homedir-pathname", "values-list", "values", "variable-information", "vector-pop", "vector-push-extend", "vector-push", "vectorp", "vector", "warn", "wild-pathname-p", "write-byte", "write-char", "write-string", "write-to-string", "write", "y-or-n-p", "yes-or-no-p", "zerop"], "function")], identFirstLetter: /[A-Za-z]/, identAfterFirstLetter: /[\w-]/, namedIdentRules: { custom: [function () {
        var e = ["defmacro", "defmethod", "defpackage", "defstruct", "deftype", "defun", "defvar", "define-compiler-macro", "define-condition", "define-declaration", "define-method-combination", "define-modify-macro", "define-setf-method"];return function (g) {
          var h = c.util.getPreviousNonWsToken(g.tokens, g.index),
              f = g.tokens[g.index].value;if (h && h.name === "macro" && c.util.contains(e, h.value)) {
            g.items.userDefinedFunctions.push(f);
          }return c.util.contains(g.items.userDefinedFunctions, f);
        };
      }()] }, contextItems: { userDefinedFunctions: [] }, operators: ["=>", "#B", "#b", "#O", "#o", "#X", "#x", "#C", "#c", "#S", "#s", "#P", "#p", "#.", "#:", "#\\", "#'", "#", "'", "...", "..", "."] });
})(undefined["Sunlight"]);(function (a, b) {
  if (a === b || a.registerLanguage === b) {
    throw "Include sunlight.js before including language files";
  }a.registerLanguage("sln", { keywords: ["Project", "EndProject", "GlobalSection", "Global", "EndGlobalSection", "EndGlobal"], customTokens: { sectionName: { values: ["preSolution", "postSolution"], boundary: "\\b" } }, scopes: { string: [['"', '"', ['\\"', "\\\\"]]], comment: [["#", "\n", null, true]], guid: [["{", "}"]], formatDeclaration: [["Microsoft Visual Studio Solution File, Format Version", "\n", null, true]] }, identFirstLetter: /[A-Za-z_\.]/, identAfterFirstLetter: /[\w-\.]/, namedIdentRules: { follows: [[{ token: "keyword", values: ["GlobalSection"] }, a.util.whitespace, { token: "punctuation", values: ["("] }, a.util.whitespace]] }, operators: ["=", "|"] });
})(undefined["Sunlight"]);(function (a, b) {
  if (a === b || a.registerLanguage === b) {
    throw "Include sunlight.js before including language files";
  }a.registerLanguage("batch", { caseInsensitive: true, scopes: { string: [['"', '"', ['\\"', "\\\\"]]], comment: [["REM", "\n", null, true], ["::", "\n", null, true]], variable: [["%", { regex: /[^\w%]/, length: 1 }, null, true]] }, customParseRules: [function (e) {
      var g,
          d,
          h = "",
          c,
          f;if (!e.reader.isSolWs() || e.reader.current() !== ":" || e.reader.peek() === ":") {
        return null;
      }g = e.createToken("operator", ":", e.reader.getLine(), e.reader.getColumn());while (d = e.reader.peek()) {
        if (/\s/.test(d)) {
          break;
        }h += e.reader.read();if (!c) {
          c = e.reader.getLine();f = e.reader.getColumn();
        }
      }if (h === "") {
        return null;
      }return [g, e.createToken("label", h, c, f)];
    }, function (e) {
      var h = a.util.createProceduralRule(e.count() - 1, -1, [{ token: "keyword", values: ["goto"] }, { token: "operator", values: [":"], optional: true }], true),
          d,
          g,
          c = e.reader.getLine(),
          f = e.reader.getColumn();if (!h(e.getAllTokens())) {
        return null;
      }g = e.reader.current();while (d = e.reader.peek()) {
        if (/[\W]/.test(d)) {
          break;
        }g += e.reader.read();
      }return e.createToken("label", g, c, f);
    }, function () {
      var c = a.util.createHashMap(["assoc", "attrib", "break", "bcdedit", "cacls", "call", "cd", "chcp", "chdir", "chkdsk", "chkntfs", "cls", "cmd", "color", "comp", "compact", "convertfcopy", "date", "del", "dir", "diskcomp", "diskcopy", "diskpart", "doskey", "driverquery", "echo", "endlocal", "erase", "exit", "fc", "findstr", "find", "format", "for", "fsutil", "ftype", "goto", "gpresult", "graftabl", "help", "icacls", "if", "label", "md", "mkdir", "mklink", "mode", "more", "move", "openfiles", "path", "pause", "popd", "print", "prompt", "pushd", "rd", "recover", "rename", "ren", "replace", "rmdir", "robocopy", "setlocal", "set", "schtasks", "sc", "shift", "shutdown", "sort", "start", "subst", "systeminfo", "tasklist", "taskkill", "time", "title", "tree", "type", "verify", "ver", "vol", "xcopy", "wmic", "lfnfor", "do", "else", "errorlevel", "exist", "in", "not", "choice", "com1", "con", "prn", "aux", "nul", "lpt1", "exit", "eof", "off", "on", "equ", "neq", "lss", "leq", "gtr", "geq"], "\\b", true);return function (f) {
        var e = a.util.matchWord(f, c, "keyword", true),
            g,
            d;if (!e) {
          return null;
        }if (!f.reader.isSolWs()) {
          d = f.count();while (g = f.token(--d)) {
            if (g.name === "keyword" && a.util.contains(["echo", "title", "set"], g.value)) {
              return null;
            }if (g.name === "operator" && g.value === "=") {
              return null;
            }if (g.name === "operator" && g.value === "|") {
              break;
            }if (g.name === "default" && g.value.indexOf("\n") >= 0) {
              break;
            }
          }
        }f.reader.read(e.value.length - 1);return e;
      };
    }()], identFirstLetter: /[A-Za-z_\.]/, identAfterFirstLetter: /[\w-]/, operators: ["&&", "||", "&", ":", "/", "==", "|", "@", "*", ">>", ">", "<", "==!", "!", "=", "+"] });
})(undefined["Sunlight"]);(function (a, b) {
  if (a === b || a.registerLanguage === b) {
    throw "Include sunlight.js before including language files";
  }a.registerLanguage("haskell", { keywords: ["as", "case", "of", "class", "datafamily", "datainstance", "data", "default", "derivinginstance", "deriving", "do", "forall", "foreign", "hiding", "if", "then", "else", "import", "infix", "infixl", "infixr", "instance", "let", "in", "mdo", "module", "newtype", "proc", "qualified", "rec", "typefamily", "typeinstance", "type", "where"], customParseRules: [function (e) {
      var d = e.reader.peek(),
          g = 2,
          c = e.reader.getLine(),
          f = e.reader.getColumn();if (e.reader.current() !== "'" && d !== "'") {
        return null;
      }if (d && d === "\\") {
        g++;
      }if (!/'$/.test(e.reader.peek(g))) {
        return null;
      }return e.createToken("char", "'" + e.reader.read(g), c, f);
    }, function (e) {
      var d,
          h = 0,
          i,
          g,
          c = e.reader.getLine(),
          f = e.reader.getColumn();if (!/[A-Za-z_]/.test(e.reader.current())) {
        return null;
      }while ((d = e.reader.peek(++h)) && d.length === h) {
        if (!/[\w']$/.test(d)) {
          break;
        }
      }i = e.reader.current() + d.substring(0, d.length - 1);g = e.token(e.count() - 1);if (g && g.name === "keyword" && a.util.contains(["class", "newtype", "data", "type"], g.value)) {
        e.items.userDefinedFunctions.push(i);e.reader.read(i.length - 1);return e.createToken("ident", i, c, f);
      }if (e.reader.isSolWs()) {
        while ((d = e.reader.peek(++h)) && d.length === h) {
          if (!/\s$/.test(d)) {
            if (!/::$/.test(e.reader.peek(++h))) {
              return null;
            }e.items.userDefinedFunctions.push(i);e.reader.read(i.length - 1);return e.createToken("ident", i, c, f);
          }
        }
      }return null;
    }], customTokens: { "function": { values: ["abs", "acosh", "acos", "all", "and", "any", "appendFile", "asinh", "asin", "asTypeOf", "atan2", "atanh", "atan", "break", "catch", "ceiling", "compare", "concatMap", "concat", "const", "cosh", "cos", "curry", "cycle", "decodeFloat", "divMod", "div", "dropWhile", "drop", "either", "elem", "encodeFloat", "enumFromThenTo", "enumFromThen", "enumFromTo", "enumFrom", "error", "even", "exponent", "exp", "fail", "filter", "flip", "floatDigits", "floatRadix", "floatRange", "floor", "fmap", "foldl1", "foldl", "foldr1", "foldr", "fromEnum", "fromInteger", "fromIntegral", "fromRational", "fst", "gcd", "getChar", "getContents", "getLine", "head", "id", "init", "interact", "ioError", "isDenormalized", "isIEEE", "isInfinite", "isNaN", "isNegativeZero", "iterate", "last", "lcm", "length", "lex", "lines", "logBase", "log", "lookup", "mapM_", "mapM", "map", "maxBound", "maximum", "max", "maybe", "minBound", "minimum", "min", "mod", "negate", "notElem", "not", "null", "odd", "or", "otherwise", "pi", "pred", "print", "product", "properFraction", "putChar", "putStrLn", "putStr", "quotRem", "quot", "readFile", "readIO", "readList", "readLn", "readParen", "readsPrec", "reads", "realToFrac", "read", "recip", "rem", "repeat", "replicate", "return", "reverse", "round", "scaleFloat", "scanl1", "scanl", "scanr1", "scanr", "sequence_", "sequence", "seq", "showChar", "showList", "showParen", "showsPrec", "showString", "shows", "show", "significand", "signum", "sinh", "sin", "snd", "splitAt", "sqrt", "subtract", "succ", "sum", "tail", "takeWhile", "take", "tanh", "tan", "toEnum", "toInteger", "toRational", "truncate", "uncurry", "undefined", "unlines", "until", "unwords", "unzip3", "unzip", "userError", "words", "writeFile", "zip3", "zipWith3", "zipWith", "zip"], boundary: "\\b" }, "class": { values: ["Bounded", "Enum", "Eq", "Floating", "Fractional", "Functor", "Integral", "Monad", "Num", "Ord", "Read", "RealFloat", "RealFrac", "Real", "Show"], boundary: "\\b" }, type: { values: ["Bool", "Char", "Double", "Either", "FilePath", "Float", "Integer", "Int", "IOError", "IO", "Maybe", "Ordering", "ReadS", "ShowS", "String", "False", "True", "LT", "GT", "EQ", "Nothing", "Just", "Left", "Right"], boundary: "\\b" } }, scopes: { string: [['"', '"', a.util.escapeSequences.concat(['\\"'])]], comment: [["--", "\n", null, true], ["{-", "-}"]], infixOperator: [["`", "`", ["\\`"]]] }, identFirstLetter: /[A-Za-z_]/, identAfterFirstLetter: /[\w']/, namedIdentRules: { custom: [function (c) {
        return a.util.contains(c.items.userDefinedFunctions, c.tokens[c.index].value);
      }] }, contextItems: { userDefinedFunctions: [] }, operators: ["::", ":", "=>", "==", "=", "@", "[|", "|]", "\\\\", "\\", "/=", "/", "++", "+", "-<<", "-<", "->", "-", "&&", "!!", "!", "''", "'", "??", "?", "#", "<-", "<=", "<", ">@>", ">>=", ">>", ">=", ">", "^^", "^", "**", "*", "||", "|", "~", "_", "..", "."] });
})(undefined["Sunlight"]);(function (a, b) {
  if (a === b || a.registerLanguage === b) {
    throw "Include sunlight.js before including language files";
  }a.registerLanguage("erlang", { keywords: ["after", "andalso", "and", "band", "begin", "bnot", "bor", "bsl", "bsr", "bxor", "case", "catch", "cond", "div", "end", "fun", "if", "let", "not", "of", "orelse", "or", "query", "receive", "rem", "try", "when", "xor", "true", "false"], customParseRules: [function (c) {
      var k = c.reader.getLine(),
          g = c.reader.getColumn(),
          j,
          i = 0,
          h,
          d = false,
          f = 1,
          e;if (!/[A-Za-z_]/.test(c.reader.current())) {
        return null;
      }while ((j = c.reader.peek(++i)) && j.length === i) {
        if (!/[\w@]$/.test(j)) {
          break;
        }
      }h = c.reader.current() + j.substring(0, j.length - 1);i--;while ((j = c.reader.peek(++i)) && j.length === i) {
        if (!/\s$/.test(j)) {
          if (/\($/.test(j)) {
            d = true;
          }break;
        }
      }if (!d && !/^[A-Z_]/.test(h)) {
        return null;
      }c.reader.read(h.length - 1);i = 1;if (d) {
        while ((j = c.reader.peek(++i)) && j.length === i) {
          e = j.charAt(j.length - 1);if (f === 0) {
            while ((j = c.reader.peek(++i)) && j.length === i) {
              if (!/\s$/.test(j)) {
                if (/->$/.test(c.reader.peek(i + 1))) {
                  c.items.userDefinedFunctions.push(h);return c.createToken("userDefinedFunction", h, k, g);
                }break;
              }
            }break;
          }if (e === "(") {
            f++;
          } else {
            if (e === ")") {
              f--;
            }
          }
        }return c.createToken("function", h, k, g);
      }return c.createToken("ident", h, k, g);
    }], customTokens: { moduleAttribute: { values: ["-module", "-export", "-import", "-compile", "-vsn", "-behaviour", "-record", "-include", "-define", "-file", "-type", "-spec", "on_load"], boundary: "\\b" }, macroDirective: { values: ["-undef", "-ifdef", "-ifndef", "-else", "-endif"], boundary: "\\b" } }, scopes: { string: [['"', '"', a.util.escapeSequences.concat(['\\"'])]], quotedAtom: [["'", "'", ["\\'", "\\\\"]]], comment: [["%", "\n", null, true]], "char": [["$", { regex: /[^\w\\]/, length: 1 }, null, true]], macro: [["?", { regex: /[^\w?]/, length: 1 }, null, true]] }, identFirstLetter: /[A-Za-z_]/, identAfterFirstLetter: /[\w@]/, namedIdentRules: { custom: [function (c) {
        return a.util.contains(c.items.userDefinedFunctions, c.tokens[c.index].value);
      }], precedes: [[{ token: "operator", values: [":"] }]] }, contextItems: { userDefinedFunctions: [] }, operators: ["<-", "<", "||", "=:=", "=/=", "==", "=<", "=", "*", "<<", ",", ">=", ">>", ">", ":", "#", "!", "++", "+", "->", "--", "-", "/=", "/"] });
})(undefined["Sunlight"]);(function (a, b) {
  if (a === b || a.registerLanguage === b) {
    throw "Include sunlight.js before including language files";
  }a.registerLanguage("diff", { doNotParse: /(?!x)x/, scopes: { header: [["---", "\n", null, true], ["+++", "\n", null, true], ["***", "\n", null, true]], added: [["+", "\n", null, true]], removed: [["-", "\n", null, true]], modified: [["!", "\n", null, true]], unchanged: [[" ", "\n", null, true]], rangeInfo: [["@@", "\n", null, true]], mergeHeader: [["Index:", "\n", null, true], ["=", "\n", null, true]] }, customTokens: { noNewLine: { values: ["\\ No newline at end of file"], boundary: "\\b" } } });
})(undefined["Sunlight"]);(function (a, b) {
  if (a === b || a.registerLanguage === b) {
    throw "Include sunlight.js before including language files";
  }if (!a.isRegistered("xml")) {
    throw "Scala requires the XML language to be registered";
  }a.registerLanguage("scala", { keywords: ["abstract", "case", "catch", "class", "def", "do", "else", "extends", "false", "final", "finally", "forSome", "for", "if", "implicit", "import", "lazy", "match", "new", "null", "object", "override", "package", "private", "protected", "return", "sealed", "super", "this", "throw", "trait", "try", "true", "type", "val", "var", "while", "with", "yield"], embeddedLanguages: { xml: { switchTo: function switchTo(c) {
          var d;if (c.reader.current() !== "<" || !/[\w!?]/.test(c.reader.peek())) {
            return false;
          }if (c.defaultData.text !== "") {
            return true;
          }d = c.token(c.count() - 1);return d && d.name === "punctuation" && a.util.contains(["(", "{"], d.value);
        }, switchBack: function switchBack(c) {
          var d = c.token(c.count() - 1);if (!d) {
            return false;
          }if (d.name === "tagName") {
            if (!c.items.literalXmlOpenTag) {
              c.items.literalXmlOpenTag = d.value;
            }
          } else {
            if (d.name === "operator") {
              switch (d.value) {case "<":
                  c.items.literalXmlNestingLevel++;break;case "</":case "/>":
                  c.items.literalXmlNestingLevel--;break;}
            }
          }if (c.items.literalXmlOpenTag && c.items.literalXmlNestingLevel === 0 && (d.value === ">" || d.value === "/>")) {
            return true;
          }return false;
        } } }, scopes: { string: [['"""', '"""'], ['"', '"', ["\\\\", '\\"']]], "char": [["'", "'", ["\\\\", "\\'"]]], quotedIdent: [["`", "`", ["\\`", "\\\\"]]], comment: [["//", "\n", null, true], ["/*", "*/"]], annotation: [["@", { length: 1, regex: /\W/ }, null, true]] }, identFirstLetter: /[A-Za-z]/, identAfterFirstLetter: /\w/, customParseRules: [function (e) {
      var c = e.reader.getLine(),
          f = e.reader.getColumn();if (e.reader.current() !== "'") {
        return false;
      }var d = /^(\w+)(?!')/i.exec(e.reader.peekSubstring());if (!d) {
        return false;
      }e.reader.read(d[1].length);return e.createToken("symbolLiteral", "'" + d[1], c, f);
    }, function (e) {
      var g,
          d,
          h = e.reader.current(),
          c = e.reader.getLine(),
          f = e.reader.getColumn();if (e.defaultData.text === "") {
        return false;
      }if (!/[A-Za-z]/.test(e.reader.current())) {
        return false;
      }g = e.token(e.count() - 1);if (e.defaultData.text === "" || !g || g.name !== "keyword" || !a.util.contains(["class", "type", "trait", "object"], g.value)) {
        return false;
      }while (d = e.reader.peek()) {
        if (!/\w/.test(d)) {
          break;
        }h += e.reader.read();
      }e.items.userDefinedTypes.push(h);return e.createToken("ident", h, c, f);
    }], namedIdentRules: { custom: [function () {
        var c = ["Nil", "Nothing", "Unit", "Pair", "Map", "String", "List", "Int", "Seq", "Option", "Double", "AnyRef", "AnyVal", "Any", "ScalaObject", "Float", "Long", "Short", "Byte", "Char", "Boolean"];return function (e) {
          var d = a.util.getNextNonWsToken(e.tokens, e.index);if (d && d.name === "operator" && d.value === ".") {
            return false;
          }return a.util.contains(c, e.tokens[e.index].value);
        };
      }(), function (c) {
        return a.util.contains(c.items.userDefinedTypes, c.tokens[c.index].value);
      }, function (f) {
        var c = a.util.getNextNonWsToken(f.tokens, f.index),
            e,
            d,
            g;if (c && c.name === "operator" && c.value === ".") {
          return false;
        }d = f.index;g = f.tokens[d];while ((e = f.tokens[--d]) !== b) {
          if (e.name === "keyword" && e.value === "new") {
            return true;
          }if (e.name === "default") {
            continue;
          }if (e.name === "ident") {
            if (g && g.name === "ident") {
              return false;
            }g = e;continue;
          }if (e.name === "operator" && e.value === ".") {
            if (g && g.name !== "ident") {
              return false;
            }g = e;continue;
          }break;
        }return false;
      }, function () {
        var d = [[{ token: "keyword", values: ["class", "object", "extends", "new", "type", "trait"] }, { token: "default" }], [{ token: "operator", values: [":"] }, a.util.whitespace], [{ token: "operator", values: ["#"] }], [{ token: "keyword", values: ["type"] }, { token: "default" }, { token: "ident" }, a.util.whitespace, { token: "operator", values: ["="] }, a.util.whitespace]],
            c = [{ opener: { token: "punctuation", values: ["["] }, closer: { token: "punctuation", values: ["]"] } }];return function (f) {
          var e;if (/^[A-Z]([A-Z0-9]\w*)?$/.test(f.tokens[f.index].value)) {
            return false;
          }for (e = 0; e < d.length; e++) {
            if (a.util.createProceduralRule(f.index - 1, -1, d[e], false)(f.tokens)) {
              return true;
            }
          }for (e = 0; e < c.length; e++) {
            if (a.util.createBetweenRule(f.index, c[e].opener, c[e].closer, false)(f.tokens)) {
              return true;
            }
          }return false;
        };
      }()] }, contextItems: { literalXmlOpenTag: null, literalXmlNestingLevel: 0, userDefinedTypes: [] }, operators: ["++", "+=", "+", "--", "-=", "->", "-", "*=", "*", "^=", "^^", "^", "~>", "~", "!=", "!", "&&", "&=", "&", "||", "|=", "|", ">>>", ">>=", ">>", ">", "<<=", "<<", "<~", "<=", "<%", "<", "%>", "%=", "%", "::", ":<", ":>", ":", "==", "=", "@", "#", "_", "."] });a.globalOptions.enableScalaXmlInterpolation = false;a.bind("beforeHighlight", function (c) {
    if (c.language.name === "scala") {
      this.options.enableScalaXmlInterpolation = true;
    }
  });a.bind("afterHighlight", function (c) {
    this.options.enableScalaXmlInterpolation = false;
  });
})(undefined["Sunlight"]);(function (a, b) {
  if (a === b || a.registerLanguage === b) {
    throw "Include sunlight.js before including language files";
  }a.registerLanguage("actionscript", { keywords: ["default xml namespace", "use namespace", "break", "case", "catch", "continue", "default", "do", "else", "finally", "for", "if", "in", "label", "return", "super", "switch", "throw", "try", "while", "with", "dynamic", "final", "internal", "native", "override", "private", "protected", "public", "static", "class", "const", "extends", "function", "get", "implements", "interface", "namespace", "package", "set", "var", "import", "include", "false", "null", "this", "true", "typeof", "void", "as", "instanceof", "is", "new"], customTokens: { varArgs: { values: ["...rest"], boundary: "[\\W]" }, constant: { values: ["Infinity", "NaN", "undefined"], boundary: "\\b" }, globalObject: { values: ["ArgumentError", "arguments", "Array", "Boolean", "Class", "Date", "DefinitionError", "Error", "EvalError", "Function", "int", "Math", "Namespace", "Number", "Object", "QName", "RangeError", "ReferenceError", "RegExp", "SecurityError", "String", "SyntaxError", "TypeError", "uint", "URIError", "Vector", "VerifyError", "XMLList", "XML"], boundary: "\\b" } }, scopes: { string: [['"', '"', a.util.escapeSequences.concat(['\\"'])], ["'", "'", a.util.escapeSequences.concat(["\\'", "\\\\"])]], comment: [["//", "\n", null, true], ["/*", "*/"]], xmlAttribute: [["@", "\\b"]] }, customParseRules: [function () {
      var c = a.util.createHashMap(["Array", "Boolean", "decodeURIComponent", "decodeURI", "encodeURIComponent", "encodeURI", "escape", "int", "isFinite", "isNaN", "isXMLName", "Number", "Object", "parseFloat", "parseInt", "String", "trace", "uint", "unescape", "Vector", "XML", "XMLList"], "\\b", false);return function (f) {
        var g, e, d, h;if (!/[A-Za-z]/.test(f.reader.current())) {
          return null;
        }g = f.token(f.count() - 1);if (g && (g.name === "keyword" && g.value === "new" || g.name === "operator" && g.value === ":")) {
          return null;
        }e = a.util.matchWord(f, c, "globalFunction", true);if (!e) {
          return null;
        }h = e.value.length;while ((d = f.reader.peek(h)) && d.length === h) {
          if (!/\s$/.test(d)) {
            if (a.util.last(d) === "(") {
              e.line = f.reader.getLine();e.column = f.reader.getColumn();f.reader.read(e.value.length - 1);return e;
            }break;
          }
        }return null;
      };
    }(), function (e) {
      var d = e.reader.peek(),
          j,
          i = "/",
          c = e.reader.getLine(),
          g = e.reader.getColumn(),
          h,
          f;if (e.reader.current() !== "/" || d === "/" || d === "*") {
        return null;
      }j = function () {
        var l = e.token(e.count() - 1),
            k = null;if (e.defaultData.text !== "") {
          k = e.createToken("default", e.defaultData.text);
        }if (!k) {
          k = l;
        }if (k === b) {
          return true;
        }if (k.name === "default" && k.value.indexOf("\n") > -1) {
          return true;
        }if (a.util.contains(["keyword", "ident", "number"], l.name)) {
          return false;
        }if (l.name === "punctuation" && !a.util.contains(["(", "{", "[", ",", ";"], l.value)) {
          return false;
        }return true;
      }();if (!j) {
        return null;
      }while (e.reader.peek() !== e.reader.EOF) {
        h = e.reader.peek(2);if (h === "\\/" || h === "\\\\") {
          i += e.reader.read(2);continue;
        }i += f = e.reader.read();if (f === "/") {
          break;
        }
      }while (e.reader.peek() !== e.reader.EOF) {
        if (!/[A-Za-z]/.test(e.reader.peek())) {
          break;
        }i += e.reader.read();
      }return e.createToken("regexLiteral", i, c, g);
    }], identFirstLetter: /[A-Za-z_]/, identAfterFirstLetter: /\w/, namedIdentRules: { custom: [function (f) {
        var c = a.util.getNextNonWsToken(f.tokens, f.index),
            e,
            d,
            g;if (c && c.name === "operator" && c.value === ".") {
          return false;
        }d = f.index;g = f.tokens[d];while ((e = f.tokens[--d]) !== b) {
          if (e.name === "keyword" && a.util.contains(["new", "is", "instanceof", "import"], e.value)) {
            return true;
          }if (e.name === "default") {
            continue;
          }if (e.name === "ident") {
            if (g && g.name === "ident") {
              return false;
            }g = e;continue;
          }if (e.name === "operator" && e.value === ".") {
            if (g && g.name !== "ident") {
              return false;
            }g = e;continue;
          }break;
        }return false;
      }], follows: [[{ token: "keyword", values: ["class", "extends"] }, { token: "default" }], [{ token: "operator", values: [":"] }, a.util.whitespace]], between: [{ opener: { token: "keyword", values: ["implements"] }, closer: { token: "punctuation", values: ["{"] } }] }, operators: ["++", "+=", "+", "--", "-=", "-", "*=", "*", "/=", "/", "%=", "%", "&&=", "&&", "||=", "||", "|=", "|", "&=", "&", "^=", "^", ">>>=", ">>>", ">>=", ">>", "<<=", "<<", "<=", "<", ">=", ">", "===", "==", "!==", "!=", "!", "~", "::", "?", ":", ".", "="] });
})(undefined["Sunlight"]);(function (a, b) {
  if (a === b || a.registerLanguage === b) {
    throw "Include sunlight.js before including language files";
  }a.registerLanguage("powershell", { scopes: { string: [['"', '"', ['\\"', "\\\\"]], ["'", "'", ["\\'", "\\\\"]]], comment: [["#", "\n", null, true]] }, customParseRules: [function () {
      var d = ["-not", "-band", "-bor", "bnot", "-replace", "-ireplace", "-creplace", "-and", "-or", "-isnot", "-is", "-as", "-F", "-lt", "-le", "-gt", "-ge", "-eq", "-ne", "-contains", "-notcontains", "-like", "-notlike", "-match", "-notmatch"],
          c = ["elseif", "begin", "function", "for", "foreach", "return", "else", "trap", "while", "using", "do", "data", "dynamicparam", "class", "define", "until", "end", "break", "if", "throw", "param", "continue", "finally", "in", "switch", "exit", "filter", "from", "try", "process", "var", "catch"];return function (g) {
        var f,
            i = g.reader.current(),
            e = g.reader.getLine(),
            h = g.reader.getColumn(),
            j;if (!/[A-Za-z_-]/.test(g.reader.current()) || !/[\w-]/.test(g.reader.peek())) {
          return null;
        }while (f = g.reader.peek()) {
          if (!/[\w-]/.test(f)) {
            break;
          }i += g.reader.read();
        }j = a.util.contains(d, i) ? "specialOperator" : a.util.contains(c, i) ? "keyword" : i.charAt(0) === "-" ? "switch" : "ident";return g.createToken(j, i, e, h);
      };
    }(), function () {
      var c = /[!@#%&,\.\s]/,
          d = ["$$", "$?", "$^", "$_", "$ARGS", "$CONSOLEFILENAME", "$ERROR", "$EVENT", "$EVENTSUBSCRIBER", "$EXECUTIONCONTEXT", "$FALSE", "$FOREACH", "$HOME", "$HOST", "$INPUT", "$LASTEXITCODE", "$MATCHES", "$MYINVOCATION", "$NESTEDPROMPTLEVEL", "$NULL", "$PID", "$PROFILE", "$PSBOUNDPARAMETERS", "$PSCMDLET", "$PSCULTURE", "$PSDEBUGCONTEXT", "$PSHOME", "$PSSCRIPTROOT", "$PSUICULTURE", "$PSVERSIONTABLE", "$PWD", "$SENDER", "$SHELLID", "$SOURCEARGS", "$SOURCEEVENTARGS", "$THIS", "$TRUE"];return function (g) {
        var f,
            i = "$",
            e = g.reader.getLine(),
            h = g.reader.getColumn();if (g.reader.current() !== "$" || c.test(g.reader.peek())) {
          return null;
        }while (f = g.reader.peek()) {
          if (c.test(f)) {
            break;
          }i += g.reader.read();
        }return g.createToken(a.util.contains(d, i.toUpperCase()) ? "specialVariable" : "variable", i, e, h);
      };
    }()], namedIdentRules: { custom: [function (c) {
        var d = c.tokens[c.index - 1];if (!d) {
          return true;
        }if (d.name === "default" && d.value.indexOf(a.util.eol) >= 0) {
          d = c.tokens[c.index - 2];if (d && d.name === "operator" && d.value === "`") {
            return false;
          }return true;
        }d = a.util.getPreviousNonWsToken(c.tokens, c.index);if (d && (d.name === "operator" && d.value === "=" || d.name === "punctuation" && d.value === "{")) {
          return true;
        }return false;
      }, function (d) {
        var c = a.util.getNextNonWsToken(d.tokens, d.index),
            e;if (c && c.name === "operator" && c.value === ".") {
          return false;
        }e = a.util.createBetweenRule(d.index, { token: "punctuation", values: ["["] }, { token: "punctuation", values: ["]"] });if (!e(d.tokens)) {
          return false;
        }return true;
      }] }, operators: ["@(", "::", "..", ".", "=", "!=", "!", "|", ">>", ">", "++", "+=", "+", "`", "*=", "*", "/=", "/", "--", "-=", "-", "%{", "%=", "%", "${", "&"] });
})(undefined["Sunlight"]);(function (a, b) {
  if (a === b || a.registerLanguage === b) {
    throw "Include sunlight.js before including language files";
  }a.registerLanguage("objective-c", { keywords: ["and", "default", "noexcept", "template", "and_eq", "delete", "not", "this", "alignof", "double", "not_eq", "thread_local", "asm", "dynamic_cast", "nullptr", "throw", "auto", "else", "operator", "true", "bitand", "enum", "or", "try", "bitor", "explicittodo", "or_eq", "typedef", "bool", "export", "private", "typeid", "break", "externtodo", "protected", "typename", "case", "false", "public", "union", "catch", "float", "register", "using", "char", "for", "reinterpret_cast", "unsigned", "char16_t", "friend", "return", "void", "char32_t", "goto", "short", "wchar_t", "if", "signed", "virtual", "compl", "inline", "sizeof", "volatile", "const", "int", "static", "while", "constexpr", "long", "static_assert", "xor", "const_cast", "mutable", "static_cast", "xor_eq", "continue", "namespace", "struct", "decltype", "new", "switch", "id", "self", "nil", "super", "in", "out", "inout", "bycopy", "byval", "oneway", "SEL", "BOOL", "YES", "NO", "@interface", "@implementation", "@end", "@class", "@private", "@public", "@package", "@protected", "@protocol", "@optional", "@required", "@property", "@synthesize", "@dynamic", "@selector", "@try", "@catch", "@finally", "@throw", "@synchronized", "@encode", "__attribute__", "__weak", "__strong"], customTokens: { constant: { values: ["EXIT_SUCCESS", "EXIT_FAILURE", "SIG_DFL", "SIG_IGN", "SIG_ERR", "SIGABRT", "SIGFPE", "SIGILL", "SIGINT", "SIGSEGV", "SIGTERM"], boundary: "\\b" } }, scopes: { string: [['"', '"', a.util.escapeSequences.concat(['\\"'])], ['@"', '"', ["\\\\", '\\"']]], "char": [["'", "'", ["\\'", "\\\\"]]], comment: [["//", "\n", null, true], ["/*", "*/"]], preprocessorDirective: [["#", "\n", null, true]] }, customParseRules: [function (c) {
      var m, l, i, e, j, h, d, g, k, f;if (!c.language.identFirstLetter.test(c.reader.current())) {
        return null;
      }l = 0;while ((m = c.reader.peek(++l)) && m.length === l) {
        if (!c.language.identAfterFirstLetter.test(a.util.last(m))) {
          break;
        }
      }i = c.reader.current() + m.substring(0, m.length - 1);l = l - 1;e = false;while ((m = c.reader.peek(++l)) && m.length === l) {
        if (!/\s$/.test(m)) {
          j = /([\]:])$/.exec(m);if (j === null) {
            return null;
          }e = j[1] === ":" && !/::$/.test(c.reader.peek(l + 1));break;
        }
      }h = 0;d = 0;k = c.count();f = 1;while (g = c.token(--k)) {
        if (f > 1 && !e) {
          return null;
        }if (g.name === "punctuation") {
          switch (g.value) {case ";":case "{":case "}":
              return null;case "(":
              h--;break;case ")":
              h++;break;case "[":
              if (d === 0 && h === 0) {
                if (f >= 1) {
                  g = c.createToken(e && f > 1 ? "messageArgumentName" : "messageDestination", i, c.reader.getLine(), c.reader.getColumn());c.reader.read(i.length - 1);return g;
                }return null;
              }d--;break;case "]":
              d++;break;}
        }if (d === 0 && h === 0 && g.name === "default") {
          f++;
        }
      }return null;
    }, function () {
      var c = a.util.createHashMap(["getter", "setter", "readonly", "readwrite", "assign", "retain", "copy", "nonatomic"], "\\b");return function (f) {
        var e = a.util.matchWord(f, c, "keyword", true),
            g,
            d;if (!e) {
          return null;
        }d = f.count();while (g = f.token(--d)) {
          if (g.name === "punctuation") {
            if (g.value === "(") {
              g = a.util.getPreviousNonWsToken(f.getAllTokens(), d);if (!g || g.name !== "keyword" || g.value !== "@property") {
                return null;
              }e.line = f.reader.getLine();e.column = f.reader.getColumn();f.reader.read(e.value.length - 1);return e;
            } else {
              if (g.value === ";") {
                return null;
              }
            }
          }
        }return null;
      };
    }()], identFirstLetter: /[A-Za-z_]/, identAfterFirstLetter: /\w/, namedIdentRules: { custom: [function (d) {
        var e = /^(NS|CG).+$/,
            c = a.util.getNextNonWsToken(d.tokens, d.index);return e.test(d.tokens[d.index].value) && (!c || c.name !== "punctuation" || c.value !== "(");
      }, function (d) {
        var c = a.util.getNextNonWsToken(d.tokens, d.index);return c && c.name === "messageDestination" && (c.value === "class" || c.value === "alloc");
      }, function (e) {
        var d, c, f;if (!a.util.createProceduralRule(e.index + 1, 1, [{ token: "default" }, { token: "ident" }])(e.tokens)) {
          return false;
        }if (a.util.createProceduralRule(e.index + 1, 1, [{ token: "default" }, { token: "ident" }, a.util.whitespace, { token: "operator", value: ":" }])(e.tokens)) {
          return false;
        }c = e.index;f = 0;while (d = e.tokens[--c]) {
          if (d.name === "punctuation") {
            switch (d.value) {case "[":
                return false;case "{":case ",":
                return true;case "(":
                if (f === 0) {
                  return true;
                }f++;break;case ")":
                f--;break;}
          }
        }return true;
      }, function () {
        var c = [[a.util.whitespace, { token: "operator", values: ["*", "**"] }, a.util.whitespace, { token: "ident" }, a.util.whitespace, { token: "punctuation", values: [";"] }], [a.util.whitespace, { token: "operator", values: ["&", "*", "**"] }, a.util.whitespace, { token: "ident" }]];return function (i) {
          var e, f, d, h, g;e = function (k) {
            var j;for (j = 0; j < c.length; j++) {
              if (a.util.createProceduralRule(i.index + 1, 1, c[j], false)(k)) {
                return true;
              }
            }return false;
          }(i.tokens);if (!e) {
            return false;
          }f = false;d = false;g = i.index;while (h = i.tokens[--g]) {
            if (h.name === "punctuation" && (h.value === ";" || h.value === "{")) {
              return f || !d;
            }if (h.name === "operator" && h.value === "=") {
              d = true;
            } else {
              if (h.name === "keyword" && h.value === "@property") {
                f = true;
              }
            }
          }return false;
        };
      }(), function () {
        var c = [[a.util.whitespace, { token: "punctuation", values: [")"] }, a.util.whitespace, { token: "ident" }], [a.util.whitespace, { token: "punctuation", values: [")"] }, a.util.whitespace, { token: "punctuation", values: ["["] }], [a.util.whitespace, { token: "operator", values: ["*", "**"] }, a.util.whitespace, { token: "punctuation", values: [")"] }, a.util.whitespace, { token: "operator", values: ["&"], optional: true }, { token: "ident" }], [a.util.whitespace, { token: "operator", values: ["*", "**"] }, a.util.whitespace, { token: "punctuation", values: [")"] }, a.util.whitespace, { token: "operator", values: ["&"], optional: true }, { token: "punctuation", values: ["["] }]];return function (g) {
          var f, e, h, d;d = function (k) {
            var j;for (j = 0; j < c.length; j++) {
              if (a.util.createProceduralRule(g.index + 1, 1, c[j], false)(k)) {
                return true;
              }
            }return false;
          }(g.tokens);if (!d) {
            return false;
          }e = g.index;while (f = g.tokens[--e]) {
            if (f.name === "punctuation" && f.value === "(") {
              h = a.util.getPreviousNonWsToken(g.tokens, e);if (h) {
                if (h.name === "ident") {
                  return false;
                }if (h.name === "keyword" && a.util.contains(["if", "while"], h.value)) {
                  return false;
                }
              }return true;
            }
          }return false;
        };
      }(), function (g) {
        var e = g.index,
            f,
            d,
            c,
            h;h = a.util.getPreviousNonWsToken(g.tokens, g.index);if (!h || h.name === "keyword") {
          return false;
        }d = false;c = [0, 0];while ((f = g.tokens[--e]) !== b) {
          if (f.name === "operator") {
            switch (f.value) {case "<":case "<<":
                c[0] += f.value.length;continue;case ">":case ">>":
                if (c[0] === 0) {
                  return false;
                }c[1] += f.value.length;continue;case ".":case "::":case "*":
                continue;}
          }if (f.name === "default" || f.name === "punctuation" && f.value === ",") {
            continue;
          }if (f.name === "ident" || f.name === "keyword" && a.util.contains(["id", "static_cast"], f.value)) {
            d = true;continue;
          }break;
        }if (!d || c[0] === 0) {
          return false;
        }e = g.index;while ((f = g.tokens[++e]) !== b) {
          if (f.name === "operator" && (f.value === ">" || f.value === ">>")) {
            return true;
          }if (f.name === "operator" && a.util.contains(["<", "<<", ">", ">>", "::", "*"], f.value) || f.name === "punctuation" && f.value === "," || f.name === "ident" || f.name === "default") {
            continue;
          }return false;
        }return false;
      }, function (f) {
        var e = a.util.getPreviousNonWsToken(f.tokens, f.index),
            d,
            c;if (e !== b) {
          if (e.name === "ident" || e.name === "operator" && e.value === ".") {
            return false;
          }
        }e = a.util.getNextNonWsToken(f.tokens, f.index);if (!e || e.name !== "operator" || e.value !== "<") {
          return false;
        }d = f.index;c = [0, 0];while ((e = f.tokens[++d]) !== b) {
          if (e.name === "operator") {
            switch (e.value) {case "<":
                c[0]++;break;case "<<":
                c[0] += 2;break;case ">":
                c[1]++;break;case ">>":
                c[1] += 2;break;default:
                return false;}if (c[0] === c[1]) {
              break;
            }continue;
          }if (e.name === "default" || e.name === "ident" || e.name === "punctuation" && e.value === ",") {
            continue;
          }return false;
        }if (c[0] !== c[1]) {
          return false;
        }e = f.tokens[++d];if (!e || e.name !== "default" && e.name !== "ident") {
          return false;
        }if (e.name === "default") {
          e = f.tokens[++d];if (!e || e.name !== "ident") {
            return false;
          }
        }return true;
      }], follows: [[{ token: "keyword", values: ["@interface", "@protocol", "@implementation"] }, { token: "default" }]], precedes: [[{ token: "operator", values: ["::"] }], [a.util.whitespace, { token: "operator", values: ["*", "**"] }, { token: "default" }, { token: "ident" }, a.util.whitespace, { token: "operator", values: ["=", ","] }], [a.util.whitespace, { token: "operator", values: ["*", "**"] }, a.util.whitespace, { token: "operator", values: ["&"] }, a.util.whitespace, { token: "ident" }, a.util.whitespace, { token: "operator", values: ["=", ","] }]] }, operators: ["==", "=", "+=", "++", "+", "->*", "->", "-=", "--", "-", "**", "*=", "*", "/=", "/", "%=", "%", "!=", "!", ">>=", ">>", ">=", ">", "<<=", "<<", "<=", "<", "&=", "&&", "&", "|=", "||", "|", "~", "^=", "^", ".*", ".", "?", "::", ":", ","] });
})(undefined["Sunlight"]);(function (a, b) {
  if (a === b || a.registerLanguage === b) {
    throw "Include sunlight.js before including language files";
  }a.registerLanguage("lua", { keywords: ["and", "break", "do", "elseif", "else", "end", "false", "for", "function", "if", "in", "local", "nil", "not", "or", "repeat", "return", "then", "true", "until", "while"], scopes: { string: [['"', '"', ['\\"', "\\\\"]], ["'", "'", ["\\'", "\\\\"]]], comment: [["--[[", "]]"], ["--", "\n", null, true]] }, customTokens: { globalVariable: { values: ["_G", "_VERSION"], boundary: "\\b" } }, customParseRules: [function () {
      var c = a.util.createHashMap(["assert", "collectgarbage", "dofile", "error", "getfenv", "getmetatable", "ipairs", "load", "loadfile", "loadstring", "next", "pairs", "pcall", "print", "rawequal", "rawget", "rawset", "select", "setfenv", "setmetatable", "tonumber", "tostring", "type", "unpack", "xpcall", "module", "require"], "\\b");return function (d) {
        var e = d.token(d.count() - 1);if (e && e.name === "operator" && e.value === ".") {
          return null;
        }return a.util.matchWord(d, c, "function");
      };
    }(), function () {
      var c = a.util.createHashMap(["close", "flush", "lines", "read", "seek", "setvbuf", "write"], "\\b");return function (d) {
        var e = d.token(d.count() - 1);if (!e || e.name !== "operator" || e.value !== ":") {
          return null;
        }return a.util.matchWord(d, c, "function");
      };
    }(), function (e) {
      var h = 0,
          d,
          g = 0,
          i,
          c = e.reader.getLine(),
          f = e.reader.getColumn(),
          j;if (e.reader.current() !== "[") {
        return null;
      }while ((d = e.reader.peek(++g)) && d.length === g) {
        if (!/=$/.test(d)) {
          if (!/\[$/.test(d)) {
            return null;
          }h = d.length - 1;break;
        }
      }i = "[" + d;e.reader.read(d.length);j = "]" + new Array(h + 1).join("=") + "]";while (d = e.reader.peek()) {
        if (d === "]" && e.reader.peek(j.length) === j) {
          i += e.reader.read(j.length);break;
        }i += e.reader.read();
      }return e.createToken("verbatimString", i, c, f);
    }], identFirstLetter: /[A-Za-z_]/, identAfterFirstLetter: /\w/, namedIdentRules: { custom: [function () {
        var c = ["coroutine", "package", "string", "table", "math", "io", "os", "debug"];return function (e) {
          var d;if (!a.util.contains(c, e.tokens[e.index].value)) {
            return false;
          }d = a.util.getNextNonWsToken(e.tokens, e.index);return d && (d.name !== "operator" || d.value !== ":");
        };
      }()], follows: [[{ token: "keyword", values: ["function"] }, { token: "default" }]] }, operators: ["+", "-", "*", "/", "%", "^", "#", "==", "~=", "=", "<=", "<", ">=", ">", ":", "...", "..", "."] });
})(undefined["Sunlight"]);