var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/parser.ts
import cheerio from "cheerio";

// src/utils.ts
import colors from "ansi-colors";
import diacritics from "diacritics-map";

// src/constants.ts
var BULLETS = ["-", "*", "+"];
var RE_ALL_WHITESPACE = /\s+/g;
var RE_BOM = /^\ufeff/;
var RE_CODE_TAG = /(?:`{3,4}|<code>)\s*([\s\S]+?)\s*(?:`{3,4}|<\/code>)/;
var RE_DIACRITICS = /[À-ž]/g;
var RE_LANGUAGE = /(?:lang(?:uage)?|highlight|source|brush:\s*)-?(.+)$/;
var RE_LANGUAGE_DATA_KEY = /data-lang(uage)?/;
var RE_LEADING_WHITESPACE = /^[ \t]*/gm;
var RE_NEWLINES = /\r*\n/g;
var RE_NON_BREAKING_SPACE = /(&#xA0;|&#160;|&nbsp;)/gi;
var RE_QUOTES = /^["' ]+|["' ]+$/g;
var RE_TABS = /\t/g;
var RE_ZERO_WIDTH_SPACE = /\u200b/g;
var RE_INVISIBLE = /(?:(?:^|-)(?:nav|hidden|banner)(?:-|$)|navbar)/;

// src/utils.ts
var define = /* @__PURE__ */ __name((obj, key, value = obj[key], enumerable = false) => {
  Reflect.defineProperty(obj, key, { enumerable, value });
}, "define");
var pick = /* @__PURE__ */ __name((node, options = {}) => {
  if (node.attribs && options.pick) {
    const query = options.pick;
    if (query === node.type) return true;
    const name = query.slice(1);
    const char = query[0];
    const type = { ".": "class", "#": "id" };
    let ele = node.attribs[type[char]];
    if (!ele) return false;
    if (typeof ele === "string") {
      ele = ele.split(" ");
    }
    if (char && name && type[char]) {
      return ele.includes(name);
    }
    if (node.type === query) {
      throw new Error(`Cannot find: "${query}"`);
    }
  }
}, "pick");
var attributes = /* @__PURE__ */ __name((hash, keys) => {
  if (keys === true) keys = [];
  if (typeof keys === "string") {
    keys = [keys];
  }
  if (!hash) {
    return "";
  }
  const attribs = [];
  for (const key of Object.keys(hash)) {
    if (keys && keys.length && !keys.includes(key)) continue;
    const value = String(hash[key]).replace(RE_QUOTES, "").replace(/\s+/g, " ");
    attribs.push(`${key}="${value}"`);
  }
  return attribs.join(" ");
}, "attributes");
var replaceDiacritics = /* @__PURE__ */ __name((str) => {
  return str.replace(RE_DIACRITICS, (ch) => diacritics[ch] || ch);
}, "replaceDiacritics");
var langMap = /* @__PURE__ */ __name((lang, options = {}) => {
  if (!lang) return "";
  if (options.normalizeLanguage === false) {
    return lang;
  }
  lang = lang.toLowerCase();
  switch (lang) {
    case "js":
    case "javascript":
      return "js";
    case "md":
    case "mdown":
    case "mkdown":
    case "markdown":
      return "md";
    default: {
      return lang;
    }
  }
}, "langMap");
var mapCheerioKeys = /* @__PURE__ */ __name((node) => {
  if (node.mapped === true) return node;
  if (node.name) {
    node.type = node.name;
    delete node.name;
  }
  if (node.data && !node.value) {
    node.value = node.data;
    delete node.data;
  }
  if (node.children) {
    node.nodes = node.children.map((n) => {
      n = mapCheerioKeys(n);
      define(n, "siblings", node.children);
      return n;
    });
    delete node.children;
  }
  if (node.attribs && typeof node.attribs.class === "string") {
    node.attribs.class = node.attribs.class.split(" ");
  }
  node.stringify = () => stringify(node);
  define(node, "root");
  define(node, "parent");
  define(node, "prev");
  define(node, "next");
  define(node, "mapped", true);
  return node;
}, "mapCheerioKeys");
var mapKeys = /* @__PURE__ */ __name((node) => {
  return mapCheerioKeys(node);
}, "mapKeys");
var unindent = /* @__PURE__ */ __name((input) => {
  if (!input) return "";
  const lines = input.split("\n").filter((line) => line.trim() !== "").join("\n");
  const match = lines.match(RE_LEADING_WHITESPACE);
  if (!match) return input;
  const fewest = Math.min(...match.map((indent) => indent.length));
  if (fewest > 0) {
    return input.replace(new RegExp(`^[ 	]{${fewest}}`, "gm"), "");
  }
  return input;
}, "unindent");
var removeEmptyEndLines = /* @__PURE__ */ __name((str) => {
  if (!str) return "";
  const last = /* @__PURE__ */ __name((arr) => arr[arr.length - 1], "last");
  const lines = str.split("\n");
  while (lines.length && typeof lines[0] === "string" && lines[0].trim() === "") {
    lines.shift();
  }
  while (lines.length && typeof last(lines) === "string" && last(lines).trim() === "") {
    lines.pop();
  }
  return lines.join("\n");
}, "removeEmptyEndLines");
var getLanguage = /* @__PURE__ */ __name((node, options) => {
  if (!node || !node.attribs) return "";
  if (options.normalizeLanguage === false) {
    return "";
  }
  for (const key of Object.keys(node.attribs)) {
    const value = node.attribs[key];
    if (typeof value !== "string") {
      continue;
    }
    if (RE_LANGUAGE_DATA_KEY.test(key)) {
      return langMap(value, options);
    }
    const match = RE_LANGUAGE.exec(value);
    if (match) {
      return langMap(match[1], options);
    }
  }
  return "";
}, "getLanguage");
var unquote = /* @__PURE__ */ __name((str) => str ? str.replace(RE_QUOTES, "") : "", "unquote");
var enquote = /* @__PURE__ */ __name((str) => `"${unquote(str)}"`, "enquote");
var slugify = /* @__PURE__ */ __name((input, options = {}) => {
  if (!input) return "";
  if (options.slugify === false) return input;
  if (typeof options.slugify === "function") {
    return options.slugify(input, options);
  }
  let str = input.split("_").join("-");
  str = colors.unstyle(str);
  str = str.toLowerCase();
  str = str.normalize("NFKD").replace(/[\u0300-\u036F]/g, "");
  str = str.split(/ /).join("-");
  str = str.split(/\t/).join("--");
  str = str.split(/[|$&`~=\\/@+*!?({[\]})<>=.,;:'"^]/).join("");
  str = str.split(/[。？！，、；：“”【】（）〔〕［］﹃﹄“ ”‘’﹁﹂—…－～《》〈〉「」]/).join("");
  str = replaceDiacritics(str);
  if (options.num) {
    return `${str}-${options.num}`;
  }
  return str;
}, "slugify");
var isObject = /* @__PURE__ */ __name((val) => {
  return val !== null && typeof val === "object" && !Array.isArray(val);
}, "isObject");
var visit = /* @__PURE__ */ __name((node, fn, shouldMapKeys = true) => {
  if (!node) return node;
  const visited = /* @__PURE__ */ new WeakSet();
  const visitNode = /* @__PURE__ */ __name((n) => {
    if (visited.has(n)) return n;
    visited.add(n);
    if (shouldMapKeys !== false) mapKeys(n);
    const value = fn(n);
    if (value === false) return n;
    if (n.nodes || n.childNodes) {
      return mapVisit(n, fn, shouldMapKeys);
    }
    return n;
  }, "visitNode");
  return visitNode(node);
}, "visit");
var mapVisit = /* @__PURE__ */ __name((node, fn, shouldMapKeys = true) => {
  if (!node) return node;
  if (shouldMapKeys !== false) mapKeys(node);
  const visited = /* @__PURE__ */ new WeakSet();
  for (const child of node.nodes || node.childNodes || []) {
    if (visited.has(child)) continue;
    visited.add(child);
    if (!child.parent) {
      define(child, "parent", node);
    }
    const value = visit(child, fn, shouldMapKeys);
    if (value === false) {
      break;
    }
  }
  return node;
}, "mapVisit");
var find = /* @__PURE__ */ __name((nodes, type) => nodes ? nodes.find((n) => n.type === type) : void 0, "find");
var filter = /* @__PURE__ */ __name((nodes, type) => nodes ? nodes.filter((n) => n.type === type) : [], "filter");
var stringify = /* @__PURE__ */ __name((node, options = {}) => {
  if (!node) return "";
  const { attribs = false, omit = ["code"] } = options;
  const output = node.value ? [node.value] : [];
  let prefix = "";
  let attr = "";
  if (node.type === "pre") {
    return node.html || node.innerHtml || node.value;
  }
  if (omit.includes(node.type)) {
    if (node.nodes) {
      return node.nodes.map((n) => stringify(n, options)).join("");
    }
    return "";
  }
  if (node.attribs && attribs) {
    attr = attributes(node.attribs, attribs).trim();
  }
  const open = attr ? node.type + " " + attr : node.type;
  if (node.type === "!doctype") {
    let key = Object.keys(node.attribs)[0] || "";
    if (key) key = " " + key;
    prefix = `<!DOCTYPE${key}>`;
  }
  if (node.selfClosing === true) {
    if (options.type === "html") {
      output.push(`<${open}>`);
    } else {
      output.push(["br", "hr"].includes(node.type) ? `<${open}>` : "");
    }
  } else if (node.open === true && node.nodes) {
    const inner = node.nodes.map((n) => stringify(n, options)).join("");
    if (inner.trim()) {
      if (!prefix && options.wrap !== false) {
        output.push(`<${open}>${inner}</${node.type}>`);
      } else {
        output.push(inner);
      }
    }
  }
  return prefix + output.join(" ");
}, "stringify");

// src/parser.ts
var parse = /* @__PURE__ */ __name((input, options = {}) => {
  const str = input.trim().replace(RE_NON_BREAKING_SPACE, " ").replace(RE_ZERO_WIDTH_SPACE, "").replace(RE_TABS, "  ");
  const lines = str.replace(RE_BOM, "").split(RE_NEWLINES).map((line) => {
    if (line.trim() === "") return "";
    return line;
  });
  const output = options.unindent !== false ? unindent(lines.join("\n")) : lines.join("\n");
  const ast = cheerio.parseHTML(output, { normalizeWhitespace: false, ...options });
  let root = ast[0].root;
  visit(root, (node) => {
    const isMatch = pick(node, options);
    if (isMatch === true) {
      root = node;
      return false;
    }
  });
  return root;
}, "parse");

// src/Compiler.ts
import Events from "events";
import condense from "condense-newlines";
import entities2 from "entities";

// src/plugins/Plugins.ts
var Plugin = class {
  static {
    __name(this, "Plugin");
  }
  constructor(handlers) {
    this.handlers = /* @__PURE__ */ new Map();
    if (handlers) {
      for (const [type, handler] of Object.entries(handlers)) {
        this.add(type, handler);
      }
    }
  }
  add(type, handler) {
    this.handlers.set(type, handler);
    return this;
  }
  get(type) {
    return this.handlers.get(type);
  }
  handle(name, node, compiler) {
    const handler = this.get(node.type);
    if (typeof handler === "function") {
      handler(name, node, compiler);
    }
  }
};
var Plugins = class {
  static {
    __name(this, "Plugins");
  }
  constructor(plugins, options) {
    this.options = { ...options };
    this.registry = /* @__PURE__ */ new Map();
    if (plugins) {
      for (const [key, plugin] of Object.entries(plugins)) {
        this.add(key, new Plugin(plugin));
      }
    }
  }
  add(name, plugin) {
    if (this.options.plugins?.includes(name)) {
      this.registry.set(name, plugin);
    }
  }
  get(name) {
    return this.registry.get(name);
  }
  handle(name, node, compiler) {
    for (const plugin of this.registry.values()) {
      plugin.handle(name, node, compiler);
    }
  }
};

// src/plugins/index.ts
var plugins_exports = {};
__export(plugins_exports, {
  openai: () => openai_exports
});

// src/plugins/openai.ts
var openai_exports = {};
__export(openai_exports, {
  div: () => div
});
var div = /* @__PURE__ */ __name((name, node) => {
  if (!name.endsWith(":before")) return;
  const names = [
    "param-name",
    "param-type",
    "param-reqd",
    "param-default",
    "param-optl",
    "param-row-header"
  ];
  if (node.attribs?.class?.some((name2) => names.includes(name2))) {
    node.inline = true;
    for (const child of node.nodes) {
      child.inline = true;
    }
  }
  if (node.attribs?.class?.includes("param-row-header")) {
    for (const child of node.nodes) {
      if (child.attribs?.class?.includes("api-ref-anchor-link")) {
        continue;
      }
      if (child.nodes) {
        for (const grandChild of child.nodes) {
          if (grandChild.type === "text") {
            switch (child.attribs.class[0]) {
              case "param-name":
                if (grandChild.value && !grandChild.value.includes("Name:")) {
                  grandChild.value = `

- Name: \`${grandChild.value}\``;
                }
                break;
              case "param-default":
                if (grandChild.value && !grandChild.value.includes("Default:")) {
                  grandChild.value = `
- Default: \`${grandChild.value}\``;
                }
                console.log("param-default", grandChild.value);
                break;
              case "param-type":
                if (grandChild.value && !grandChild.value.includes("Type:")) {
                  grandChild.value = `
- Type: \`${grandChild.value}\``;
                }
                break;
              case "param-optl":
              case "param-reqd":
                if (grandChild.value && !grandChild.value.includes("**")) {
                  grandChild.value = ` **${grandChild.value}**`;
                }
                break;
              default: {
                console.error("UNAHNDLED", child.attribs.class);
                break;
              }
            }
          }
        }
      } else {
        child.value = "";
      }
    }
  }
}, "div");

// src/tags.ts
var tags_exports = {};
__export(tags_exports, {
  block: () => block,
  embedded: () => embedded,
  flow: () => flow,
  form: () => form,
  heading: () => heading,
  inline: () => inline,
  metadata: () => metadata,
  other: () => other,
  phrasing: () => phrasing,
  selfClosing: () => selfClosing,
  svgElements: () => svgElements,
  voidElements: () => voidElements
});
var block = [
  "address",
  "blockquote",
  "div",
  "dl",
  "fieldset",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "hr",
  "noscript",
  "o",
  "p",
  "pre",
  "table",
  "ul"
];
var metadata = ["base", "command", "link", "meta", "noscript", "script", "style", "template", "title"];
var flow = [
  "a",
  "abbr",
  "address",
  "article",
  "aside",
  "audio",
  "b",
  "bdi",
  "bdo",
  "blockquote",
  "br",
  "button",
  "canvas",
  "cite",
  "code",
  "command",
  "data",
  "datalist",
  "del",
  "details",
  "dfn",
  "div",
  "dl",
  "em",
  "embed",
  "fieldset",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "header",
  "hgroup",
  "hr",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "keygen",
  "label",
  "main",
  "map",
  "mark",
  "math",
  "menu",
  "meter",
  "nav",
  "noscript",
  "object",
  "ol",
  "output",
  "p",
  "pre",
  "progress",
  "q",
  "ruby",
  "s",
  "samp",
  "script",
  "section",
  "select",
  "small",
  "span",
  "strong",
  "sub",
  "sup",
  "svg",
  "table",
  "template",
  "textarea",
  "time",
  "ul",
  "var",
  "video",
  "wbr"
];
var heading = ["h1", "h2", "h3", "h4", "h5", "h6", "hgroup"];
var embedded = ["audio", "canvas", "embed", "iframe", "img", "math", "object", "svg", "video"];
var inline = [
  "a",
  "abbr",
  "acronym",
  "b",
  "bdo",
  "big",
  "br",
  "button",
  "cite",
  "code",
  "dfn",
  "em",
  "i",
  "img",
  "input",
  "kbd",
  "label",
  "map",
  "object",
  "q",
  "samp",
  "script",
  "select",
  "small",
  "span",
  "strong",
  "sub",
  "sup",
  "textarea",
  "text",
  "tt",
  "var"
];
var phrasing = [
  "abbr",
  "audio",
  "b",
  "bdo",
  "br",
  "button",
  "canvas",
  "cite",
  "code",
  "command",
  "data",
  "datalist",
  "dfn",
  "em",
  "embed",
  "i",
  "iframe",
  "img",
  "input",
  "kbd",
  "keygen",
  "label",
  "mark",
  "math",
  "meter",
  "noscript",
  "object",
  "output",
  "progress",
  "q",
  "ruby",
  "samp",
  "script",
  "select",
  "small",
  "span",
  "strong",
  "sub",
  "sup",
  "svg",
  "textarea",
  "time",
  "var",
  "video",
  "wbr"
];
var form = [
  "button",
  "fieldset",
  "input",
  "keygen",
  "label",
  "meter",
  "object",
  "output",
  "progress",
  "select",
  "textarea"
];
var other = [
  "acronym",
  "applet",
  "basefont",
  "big",
  "body",
  "caption",
  "center",
  "colgroup",
  "dd",
  "dialog",
  "dir",
  "dt",
  "figcaption",
  "font",
  "frame",
  "frameset",
  "head",
  "html",
  "legend",
  "li",
  "noframes",
  "optgroup",
  "option",
  "picture",
  "rp",
  "rt",
  "strike",
  "summary",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "tr",
  "tt",
  "u"
];
var svgElements = ["circle", "ellipse", "line", "path", "polygon", "polyline", "rect", "stop", "use"];
var voidElements = [
  "area",
  "base",
  "br",
  "col",
  "command",
  "embed",
  "hr",
  "img",
  "input",
  "keygen",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
];
var selfClosing = [...svgElements, ...voidElements];

// src/visitors.ts
import url2 from "url";
import path2 from "path";
import entities from "entities";

// src/helpers/reflinks.ts
import url from "url";
import path from "path";
var rename = /* @__PURE__ */ __name((ctx = {}, state = {}, options = {}) => {
  let { type = "href", title = "", href = "" } = ctx;
  const maxLen = options.reflinkMaxLen || 15;
  const links = state.reflinks[type] || (state.reflinks[type] = []);
  const result = { ref: "", title, href, reflink: "" };
  const stem = path.basename(href, path.extname(href));
  const segs = stem.split(/[- _]/);
  while (segs.length > 1 && segs.join("").length > maxLen) {
    segs.shift();
  }
  const name = slugify(segs.join(""), options);
  let i = 1;
  if (title) {
    result.title = unquote(title);
    title = enquote(result.title);
  }
  const key = `${href} ${title}`.trim();
  const link = links.find((l2) => l2.key === key);
  if (link) {
    return link;
  }
  const n = /* @__PURE__ */ __name((i2 = "") => i2 ? "-" + i2 : "", "n");
  const p = /* @__PURE__ */ __name((i2 = "") => result.ref = name + n(i2), "p");
  const l = /* @__PURE__ */ __name((i2 = "") => `[${p(i2)}]: ${key}`.trim(), "l");
  result.reflink = l();
  result.key = key;
  while (links.some((ele) => ele.ref === result.ref)) {
    result.reflink = l(++i);
  }
  if (result.ref) {
    links.push(result);
  }
  return result;
}, "rename");
var number = /* @__PURE__ */ __name((ctx = {}, state = {}, options = {}) => {
  let { type = "href", title = "", href = "" } = ctx;
  const prefix = options.reflinkPrefix || type;
  const links = state.reflinks[type] || (state.reflinks[type] = []);
  const result = { ref: "", title, href, reflink: "" };
  let i = links.length + 1;
  if (title) {
    result.title = unquote(title);
    title = enquote(result.title);
  }
  const key = `${href} ${title}`.trim();
  const p = /* @__PURE__ */ __name(() => result.ref = `${prefix}-${i}`, "p");
  const l = /* @__PURE__ */ __name(() => `[${p(i)}]: ${key}`.trim(), "l");
  result.reflink = l(i);
  while (links.some((ele) => ele.ref === result.ref)) {
    result.reflink = l(++i);
  }
  links.push(result);
  return result;
}, "number");
var format = /* @__PURE__ */ __name((type, href, title, compiler) => {
  if (typeof href !== "string") {
    throw new TypeError("expected href to be a string");
  }
  const { options, state } = compiler;
  state.reflinks[type] = state.reflinks[type] || [];
  if (typeof options.url === "function") {
    href = options.url(href, state);
  } else if (href && options.domain && !/(?:^#|(:?\/\/))/.test(href)) {
    href = url.resolve(options.domain, href);
  } else if (href === "#" && state.title) {
    href = `#${slugify(state.title, options)}`;
  } else if (href[0] === "#") {
    href = `#${slugify(href.slice(1), options)}`;
  }
  if (href && options.reflinks && !/(^#|mailto:)/.test(href)) {
    if (options.reflinks === "numbered") {
      href = number({ type, title, href }, state, options);
    } else {
      href = rename({ type, title, href }, state, options);
    }
  } else {
    href = { ref: (href.trim() + " " + title).trim() };
  }
  return href;
}, "format");

// src/visitors.ts
var decrypt = /* @__PURE__ */ __name((node) => {
  try {
    let s, i, j, r, c;
    const a = node.attribs["data-cfemail"];
    if (a) {
      s = "";
      r = parseInt(a.substr(0, 2), 16);
      for (j = 2; a.length - j; j += 2) {
        c = parseInt(a.substr(j, 2), 16) ^ r;
        s += String.fromCharCode(c);
      }
      return s;
    }
  } catch (e) {
  }
}, "decrypt");
var isSelfClosing = /* @__PURE__ */ __name((node) => {
  return voidElements.includes(node.type);
}, "isSelfClosing");
var isInlineTag = /* @__PURE__ */ __name((node) => {
  return Boolean(node) && inline.includes(node.type);
}, "isInlineTag");
var isBetweenInlineTags = /* @__PURE__ */ __name((node) => {
  return node.type === "text" && isInlineTag(node.prev) && isInlineTag(node.next);
}, "isBetweenInlineTags");
var createTable = /* @__PURE__ */ __name(() => {
  const table = { align: [], rows: [] };
  const align = {
    default: "---",
    center: ":---:",
    right: "---:",
    left: ":---"
  };
  table.alignments = align;
  table.alignment = (type) => align[type] || align.default;
  return table;
}, "createTable");
var init = /* @__PURE__ */ __name((compiler) => {
  const options = compiler.options;
  const bullets = options.bullets || BULLETS;
  const mapVisit2 = compiler.mapVisit.bind(compiler);
  const toValue = /* @__PURE__ */ __name((node) => node.value ? String(node.value) : "", "toValue");
  const keepEmpty = /* @__PURE__ */ __name((node) => {
    const tags = [].concat(options.keepEmpty || []);
    return tags.includes(node.type);
  }, "keepEmpty");
  const newlinesToSpace = /* @__PURE__ */ __name((str, condense2 = false) => {
    if (options.whitespace === "pre") return str;
    const output = str ? str.replace(/(?<!>)\r*\n/g, " ") : "";
    if (condense2 === true) {
      return output.replace(/(?<!>)\s+/g, " ");
    }
    return output;
  }, "newlinesToSpace");
  const isInsideHeading = /* @__PURE__ */ __name(() => {
    const { h1, h2, h3, h4, h5, h6 } = compiler.state.tags;
    return h1 && h2 && h3 && h4 && h5 && h6;
  }, "isInsideHeading");
  const condenseSpaces = /* @__PURE__ */ __name((str) => {
    if (options.whitespace === "pre") return str;
    return str ? str.replace(/[^\S\n]+/g, " ") : "";
  }, "condenseSpaces");
  const trim = /* @__PURE__ */ __name((str) => {
    if (options.whitespace === "pre") return str;
    const { kbd, pre } = compiler.state.tags;
    if (kbd > 0 || pre > 0) return str;
    return str ? str.trim() : "";
  }, "trim");
  const space = /* @__PURE__ */ __name((str) => options.whitespace !== "pre" && /\w/.test(str) ? " " : "", "space");
  const find2 = /* @__PURE__ */ __name((node, type) => {
    if (node.type === type) return node;
    if (node.nodes) {
      return node.nodes.find((n) => find2(n, type));
    }
  }, "find");
  const hasType = /* @__PURE__ */ __name((node, type) => {
    if (node.type === type) return true;
    if (!node.nodes) return false;
    return node.nodes.some((n) => hasType(n, type));
  }, "hasType");
  const hasTypes = /* @__PURE__ */ __name((node, types) => types.some((type) => hasType(node, type)), "hasTypes");
  const some = /* @__PURE__ */ __name((node, fn) => {
    if (fn(node)) return true;
    if (!node.nodes) return false;
    return node.nodes.some((n) => some(n, fn));
  }, "some");
  const isInside = /* @__PURE__ */ __name((node, type) => {
    let parent = node.parent;
    const types = [].concat(type);
    while (parent && parent.type !== "root") {
      if (types.includes(parent.type)) {
        return true;
      }
      parent = parent.parent;
    }
    return false;
  }, "isInside");
  const isInsideAny = /* @__PURE__ */ __name((tagNames = []) => {
    const isInside2 = /* @__PURE__ */ __name((obj) => {
      for (const key of Object.keys(obj)) {
        const value = obj[key];
        if (isObject(value)) {
          if (isInside2(value)) return true;
          continue;
        }
        if (value && tagNames.includes(key)) {
          return true;
        }
      }
      return false;
    }, "isInside");
    return isInside2(compiler.state);
  }, "isInsideAny");
  const identity = /* @__PURE__ */ __name((node, nospace) => {
    const lastChar = compiler.state.output.slice(-1);
    const value = mapVisit2(node);
    const inner = trim(value, node);
    if (inner !== "") {
      if (inner.includes(`${node.type}>`)) {
        return inner;
      }
      const ws = nospace ? "" : space(lastChar);
      return `${ws}<${node.type}>${inner}</${node.type}>`;
    }
    return "";
  }, "identity");
  const wrapChars = /* @__PURE__ */ __name((node, chars) => {
    const isInside2 = compiler.state[node.type] > 0;
    const lastChar = compiler.state.output.slice(-1);
    let inner = mapVisit2(node);
    if (isInside2) chars = "";
    if (inner.startsWith(chars) && inner.endsWith(chars)) {
      chars = "";
    }
    let left = chars;
    let right = chars;
    if (compiler.state.tags.code > 1) {
      left = `<${node.type}>`;
      right = `</${node.type}>`;
    }
    if (inner.trim() !== "") {
      if (!/`/.test(inner)) {
      }
      if (options.whitespace === true) {
        inner = inner.replace(RE_ALL_WHITESPACE, " ");
      }
      return `${space(lastChar)}${left}${trim(inner)}${right}`;
    }
    return inner ? " " : "";
  }, "wrapChars");
  const heading2 = /* @__PURE__ */ __name((prefix, node) => {
    const { a, blockquote, li, table } = compiler.state.tags;
    if (a || blockquote || li || table) {
      return wrapChars(node, "**");
    }
    let value = toValue(node);
    if (value && !/<[a-z]/i.test(value)) {
      return trim(`${trim(prefix)} ${trim(value)}`);
    }
    if (options.domain && /wikipedia/.test(options.domain)) {
      const visit2 = /* @__PURE__ */ __name((node2, fn) => {
        fn(node2);
        if (node2.nodes) {
          node2.nodes.forEach((n) => visit2(n, fn));
        }
      }, "visit");
      visit2(node, (child) => {
        if (child.type === "span") {
          const a2 = child.nodes.find((ch) => ch.type === "a");
          if (a2 && a2.nodes.some((ch) => ch.value === "edit")) {
            child.nodes[0].nodes[0].value = "";
            child.nodes[child.nodes.length - 1].nodes[0].value = "";
            a2.attribs = {};
            a2.nodes = [];
          }
        }
      });
    }
    if (!value || some(node, (child) => child.nodeType !== 3)) {
      value = mapVisit2(node);
    }
    let output = condenseSpaces(newlinesToSpace(trim(value)));
    if (options.whitespace !== "pre") output += "\n\n";
    return `${trim(prefix)} ${output}`;
  }, "heading");
  const toUrl = /* @__PURE__ */ __name((str, options2 = {}) => {
    if (!str) return "";
    if (str === true) return;
    if (options2.domain && str.startsWith("./")) {
      str = str.slice(2);
    }
    let base = options2.base || options2.url;
    if (base) {
      if (base.slice(-1) !== "/") {
        const basename = path2.basename(base);
        const segs = str.split("/");
        if (segs[0] !== basename) {
          base += "/";
        }
      }
      return url2.resolve(base, str);
    }
    const obj = url2.parse(str);
    if (str[0] !== "#") {
      const opts = options2.domain ? url2.parse(options2.domain) : {};
      for (const key of Object.keys(opts)) {
        if (!obj[key]) {
          obj[key] = opts[key];
        }
      }
    }
    if (compiler.state.base) {
      for (const key of Object.keys(obj)) {
        if (!obj[key]) obj[key] = compiler.state.base[key];
      }
    }
    if (obj.pathname === "/" && str.slice(-1) !== "/") {
      obj.pathname = "";
    }
    return url2.format(obj);
  }, "toUrl");
  compiler.handler("directive", mapVisit2);
  compiler.handler("!doctype", mapVisit2);
  compiler.handler("comment", (node) => {
    const value = toValue(node);
    if (options.comments === true && trim(value) !== "") {
      return `<!-- ${trim(value.replace(/(<!-+|-+>)/g, ""))} -->`;
    }
    return "";
  });
  compiler.handler("html", mapVisit2);
  compiler.handler("text", (node) => {
    const { last } = compiler.state;
    const { blockquote, code, pre } = compiler.state.tags;
    let value = toValue(node);
    if (pre || code || options.whitespace === "pre") return value;
    if (options.whitespace === true) {
      value = value.replace(RE_ALL_WHITESPACE, " ");
    }
    if (!blockquote) {
      value = value.replace(/\n[^\S\n]+$/gm, "\n");
    }
    if (last && /\s/.test(last.slice(-1))) {
      value = value.replace(/^\s+/, "");
    }
    if (value.trim() === "") {
      if (isInsideAny(flow) || !isInsideAny(compiler.known)) {
        return value.replace(/\n\n*[^\S\n]+/gm, "\n");
      }
    }
    return value;
  });
  compiler.handler("root", mapVisit2).handler("head", mapVisit2).handler("link", () => "").handler("meta", () => "").handler("style", () => "").handler("title", (node) => {
    if (!compiler.state.title) {
      const title = node.nodes ? mapVisit2(node) : toValue(node);
      compiler.state.title = trim(condenseSpaces(title));
      if (options.title === true) {
        return `# ${title}`;
      }
    }
    return "";
  }).handler("base", (node) => {
    if (node.attribs && node.attribs.href && !options.domain) {
      compiler.state.base = url2.parse(node.attribs.href);
    }
    return "";
  });
  compiler.handler("noscript", () => "").handler("script", () => "");
  compiler.handler("address", identity).handler("aside", () => "").handler("article", mapVisit2).handler("body", mapVisit2).handler("main", mapVisit2).handler("nav", mapVisit2).handler("section", mapVisit2).handler("footer", (node) => {
    if (!node.parent || node.parent.type !== "body") {
      return mapVisit2(node);
    }
  });
  compiler.handler("h1", (node) => {
    const h1 = heading2("# ", node);
    const value = h1.slice(2);
    if (!compiler.state.title) {
      compiler.state.title = value;
    }
    if (!compiler.state.h1) {
      compiler.state.h1 = value;
    }
    return `

${h1}`;
  }).handler("h2", (node) => `

${heading2("##", node)}`).handler("h3", (node) => `

${heading2("###", node)}`).handler("h4", (node) => `

${heading2("####", node)}`).handler("h5", (node) => `

${heading2("#####", node)}`).handler("h6", (node) => `

${heading2("######", node)}`).handler("header", (node) => mapVisit2(node) + "\n\n").handler("hgroup", mapVisit2);
  compiler.handler("div", (node) => {
    let allInline = node.inline === true;
    visit(node, (child) => {
      if (child === node) return;
      if (!isInside(child, ["pre", "code"])) {
        if (child.value && isBetweenInlineTags(child)) {
          child.value = child.value.replace(/\s+/, " ");
        }
        if (child.inline === true) {
          allInline = true;
        }
      }
    });
    const output = mapVisit2(node);
    if (allInline === true) {
      return output;
    }
    return `
${output}
`;
  });
  compiler.handler("figure", mapVisit2);
  compiler.handler("figcaption", mapVisit2);
  compiler.handler("p", (node) => {
    const value = trim(mapVisit2(node));
    const output = newlinesToSpace(value, true);
    return `

${output}

`;
  });
  compiler.handler("hr", (node) => "\n\n***\n\n");
  compiler.handler("br", (node) => {
    return !isInsideHeading() ? "<br>\n" : "<br>";
  });
  compiler.handler("wbr", () => "<wbr>");
  compiler.handler("pre", (node) => {
    const insideTable = compiler.state.tags.table > 0;
    const code = node.nodes[0].type === "code" ? node.nodes[0] : null;
    let output = "";
    const stringify2 = /* @__PURE__ */ __name((node2, options2, code2 = true) => {
      let output2 = "";
      if (node2.value) {
        output2 += node2.value;
      }
      if (node2.nodes) {
        for (const child of node2.nodes) {
          output2 += stringify2(child);
        }
      }
      if (output2 === ">") output2 = "&gt;";
      if (output2 === '">') output2 = '"&gt;';
      if (output2 === "<") output2 = "&lt;";
      if (output2 === "</") output2 = "&lt;/";
      if (node2.type === "code" && code2 === false) {
        return output2;
      }
      const attribs = attributes(node2.attribs);
      const attr = attribs ? " " + attribs : "";
      let close = isSelfClosing(node2) ? "" : `</${node2.type}>`;
      let open = `<${node2.type}${attr}>`;
      if (node2.type === "!doctype") {
        open = `<${node2.value}>`;
        close = "";
        output2 = "";
      }
      if (node2.type !== "text" && node2.type !== "pre") {
        return `${open}${output2}${close}`;
      }
      return output2;
    }, "stringify");
    if (code) {
      if (options.literalPre === true) {
        output = stringify2(code, options, false);
      } else {
        visit(code, (child) => {
          if (child === code) return;
          const value = decrypt(child);
          if (value) {
            child.value = value;
            delete child.attribs;
            delete child.nodes;
          }
          if (child.value) {
            output += child.value;
          }
        });
      }
    } else if (options.visitPre === true) {
      output = mapVisit2(node);
    } else {
      output = stringify2(node, options);
    }
    const opts = { ...options, attribs: true, omit: ["code"] };
    let lang = code && getLanguage(code, opts) || getLanguage(node, opts);
    let inner = output;
    const json = (() => {
      if (lang && lang !== "json") return;
      try {
        return JSON.parse(output);
      } catch (err) {
      }
    })();
    if (json) {
      lang = "json";
      inner = JSON.stringify(json, null, 2);
    }
    if (!lang && /((?<!\w)(require\(|\.then\()|var |const )/.test(inner)) {
      inner = entities.decodeHTML(inner);
      lang = "js";
    }
    if (!lang && /^\s*curl /.test(inner)) {
      lang = "sh";
    }
    const fence = /(?<!\\)```/.test(inner) ? "````" : "```";
    let res = removeEmptyEndLines(inner);
    if (!json && options.unindentPre === true) {
      res = unindent(res);
    }
    if (insideTable) {
      return `<pre>${res}</pre>`;
    }
    const block2 = [fence + lang, res, fence].join("\n");
    return `

${block2}

`;
  });
  compiler.handler("code", (node) => {
    const prev = compiler.state.output;
    const inner = mapVisit2(node);
    if (!inner || !inner.trim()) {
      return "";
    }
    if (compiler.state.tags.pre > 0) {
      const lang = getLanguage(node);
      return `${lang}
${entities.decodeHTML(inner)}
`;
    }
    let open = inner.includes("`") ? "``" : "`";
    let close = inner.includes("`") ? "``" : "`";
    let output;
    if (compiler.state.tags.code > 1) {
      open = "<code>";
      close = "</code>";
    }
    if (node.nodes[0].type === "a") {
      output = inner;
    }
    if (node.nodes.length === 1 && node.nodes[0].type === "a") {
      output = `**${inner}**`;
    } else {
      output = entities.decodeHTML(inner);
      output = `${open}${output}${close}`;
    }
    if (prev && !/[-([<\s]/.test(prev.slice(-1))) {
      output = " " + output;
    }
    return output;
  });
  compiler.handler("kbd", identity);
  compiler.handler("samp", identity);
  compiler.handler("var", identity);
  compiler.handler("q", identity);
  compiler.handler("blockquote", (node) => {
    let count = 1;
    let parent = node.parent;
    while (parent && parent.type !== "root") {
      if (parent.type === "blockquote") count++;
      parent = parent.parent;
    }
    const angles = ">".repeat(count) + " ";
    const output = angles + trim(mapVisit2(node));
    if (options.whitespace === "pre") {
      return output;
    }
    const result = "\n" + output.replace(/[^\S\r\n]+/g, " ").replace(/\r*\n+[^\S\r\n]*/g, "\n") + "\n";
    return result;
  });
  compiler.handler("cite", (node) => {
    return `<cite>${trim(mapVisit2(node))}</cite>`;
  });
  compiler.handler("ol", (node) => {
    compiler.state.ol.push({ items: [] });
    compiler.state.types.push(node.type);
    mapVisit2(node);
    compiler.state.types.pop();
    const list = compiler.state.ol.pop();
    const indent = "  ".repeat(compiler.state.types.length);
    const items = [];
    for (let i = 0; i < list.items.length; i++) {
      const item = list.items[i];
      const n = options.keepListItemNumbers ? i + 1 : "1";
      if (item.trim() !== "") {
        items.push(`${indent}${n}. ${item.trim()}`);
      }
    }
    let output = "\n" + items.join("\n");
    if (options.whitespace !== "pre") {
      output = output.replace(/\n[^\S\n]*\n+/gm, "\n");
    }
    let result = output + "\n";
    if (compiler.state.types.length === 0) {
      result += "\n";
    }
    return result;
  });
  compiler.handler("ul", (node) => {
    compiler.state.ul.push({ items: [] });
    compiler.state.types.push(node.type);
    mapVisit2(node);
    compiler.state.types.pop();
    const list = compiler.state.ul.pop();
    const bullet = bullets[compiler.state.ul.length % bullets.length] + " ";
    const indent = "  ".repeat(compiler.state.types.length);
    const textIndent = "  ".repeat(compiler.state.types.length + 1);
    const items = [];
    for (let i = 0; i < list.items.length; i++) {
      const item = list.items[i].replace(/\n+/g, "\n");
      if (item.trim() !== "") {
        items.push(`${indent}${bullet}${item}`);
      }
    }
    let output = "\n" + items.join("\n");
    if (options.whitespace !== "pre") {
      output = output.replace(/\n[^\S\n]*\n+/gm, "\n");
    }
    let result = output + "\n";
    if (compiler.state.types.length === 2) {
      result += "\n";
    }
    result = result.replace(/^[^\S\n]*(\w)/gm, textIndent + "$1");
    return result + "\n";
  });
  compiler.handler("li", (node) => {
    const type = compiler.state.types[compiler.state.types.length - 1];
    let output = mapVisit2(node).replace(/^\s+/, "");
    if (!hasTypes(node, ["ul", "ol"])) {
      output = output.replace(/\n/g, " ").replace(/\s+/g, " ");
    }
    if (output.trim() === "") {
      return "";
    }
    const match = RE_CODE_TAG.exec(output);
    if (match) {
      const maxLen = options.maxInlineCodeLength || 90;
      const prefix = output.slice(0, match.index).trim();
      const len = prefix.length + match[1].length;
      if (len > maxLen) {
        const spaces = " ".repeat(type === "ol" ? 3 : 2);
        const lines = [
          prefix,
          spaces + "```",
          spaces + match[1],
          spaces + "```"
        ];
        output = lines.join("\n");
      } else {
        output = `${prefix} \`${match[1]}\``;
      }
    } else {
    }
    output = output.split("\n").map((line) => line.replace(/\s+$/, "")).join("\n");
    if (!type) {
      const { ol, ul } = compiler.state;
      const bullet = bullets[ul.length % 3] + " ";
      const indent = "  ".repeat(ul.length + ol.length);
      return `${indent}${bullet}${output.trim()}`;
    }
    const lists = compiler.state[type];
    const list = lists[lists.length - 1];
    list.items.push(output.trim());
    return "";
  });
  compiler.handler("dl", (node) => {
    compiler.state.dl.push({ items: [] });
    let { indent = "", parent } = node;
    if (parent && parent.indent && (parent.type === "dd" || parent.type === "dl")) {
      indent = node.indent = parent.indent + "  ";
    } else {
      let parent2 = node.parent;
      let depth = 1;
      while (parent2 && parent2.type !== "root") {
        if (["dl", "dd"].includes(parent2.type)) depth++;
        parent2 = parent2.parent;
      }
      indent = node.indent = "  ".repeat(depth);
    }
    mapVisit2(node);
    const last = compiler.state.dl.pop();
    let list = last.items.map((line) => indent + line).join("\n");
    if (options.whitespace !== "pre") {
      list = list.replace(/\n[^\S\n]*\n+(?!\s*<dt)/gm, "\n");
    }
    const lines = list.split("\n");
    const arr = [];
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const prev = lines[i - 1];
      const next = lines[i + 1];
      if (next && line.trim() === "") {
        if ((!prev || /^\s*<d[dl]/.test(prev)) && next.trim().startsWith("<dd")) {
          continue;
        }
      }
      arr.push(line);
    }
    list = arr.join("\n");
    return `
<dl>
${list}
</dl>
`;
  });
  compiler.handler("dt", (node) => {
    const dl = compiler.state.dl[compiler.state.dl.length - 1];
    if (dl.items.length) {
      dl.items.push("");
    }
    dl.items.push(identity(node, true));
    return "";
  });
  compiler.handler("dd", (node) => {
    const { nodes, parent } = node;
    const siblings = parent.nodes;
    const rest = siblings.slice(siblings.indexOf(node) + 1);
    const dl = compiler.state.dl[compiler.state.dl.length - 1];
    let inner = trim(mapVisit2(node));
    let indent = node.indent = "";
    if (parent.indent && (parent.type === "dd" || parent.type === "dl")) {
      indent = node.indent = parent.indent + "  ";
    }
    if (nodes.some((n) => hasTypes(n, ["dl", "dd"]))) {
      const lines = inner.split("\n");
      const last = indent + lines.pop();
      inner = indent + lines.join("\n") + "\n" + last;
      inner = "\n" + inner + "\n" + indent.slice(2);
    } else {
      inner = inner.replace(RE_ALL_WHITESPACE, " ");
    }
    dl.items.push(`<dd>${inner}</dd>`);
    if (rest.some((n) => ["dd", "dt", "dl"].includes(n.type))) {
      dl.items.push("");
    }
    return "";
  });
  compiler.handler("table", (node) => {
    const renderTable = /* @__PURE__ */ __name((node2, newlines = "\n\n") => {
      const table = createTable();
      const align = table.alignments;
      compiler.state.tables.push(table);
      let output = mapVisit2(node2);
      compiler.state.tables.pop();
      const max = table.rows.reduce((a, r) => Math.max(a, r.cols.length), 0);
      let hasHeader = table.rows.some((row) => row.type === "header");
      if (table.colgroup) {
        table.rows[0].type = "header";
        hasHeader = true;
      }
      if (!hasHeader) {
        if (options.firstRowAsHeader) {
          table.rows[0].type = "header";
        } else {
          table.rows.unshift({ type: "header", cols: [] });
        }
      }
      const columns = /* @__PURE__ */ __name((row) => {
        if (row.every((col) => col.trim() === "")) return "";
        return row.length ? `| ${row.join(" | ")} |
` : "";
      }, "columns");
      const fillers = {
        align: /* @__PURE__ */ __name(() => align.default, "align"),
        header: /* @__PURE__ */ __name((i) => options.tableHeader ? options.tableHeader(i) : "-", "header"),
        row: /* @__PURE__ */ __name(() => "", "row")
      };
      let header = filter(table.rows, "header");
      if (header.length > 1) {
        table.align = table.align.slice(0, max);
        const thead = [];
        for (let i = 0; i < header.length; i++) {
          for (let j = 0; j < header[i].cols.length; j++) {
            const col = header[i].cols[j];
            if (thead[j] === void 0) {
              thead.push("");
            } else {
              thead[j] += "<br>";
            }
            thead[j] += col;
          }
        }
        header = [{ type: "header", cols: thead }];
      }
      if (table.rows.length > 1) {
        table.rows.splice(1, 0, { type: "align", cols: table.align });
      }
      const rows = [
        ...header,
        find(table.rows, "align"),
        ...filter(table.rows, "row"),
        ...filter(table.rows, "footer")
      ];
      for (const row of rows.filter(Boolean)) {
        const filler = fillers[row.type] || fillers.row;
        while (row.cols.length < max) {
          row.cols.push(filler(row.cols.length));
        }
        output += columns(row.cols);
      }
      if (!/\w/.test(output)) {
        return "";
      }
      return `${newlines}${output}${newlines}`;
    }, "renderTable");
    const getTables = /* @__PURE__ */ __name((n, tables = []) => {
      if (n !== node && n.type === "table") {
        tables.push(n);
      }
      if (n.nodes) {
        n.nodes.forEach((child) => getTables(child, tables));
      }
      return tables;
    }, "getTables");
    if (options.unNestTables === true) {
      const tables = getTables(node);
      if (tables.length) {
        for (let i = 0; i < tables.length; i++) {
          tables[i] = renderTable(tables[i], "\n");
        }
        return tables.join("\n");
      }
    }
    return renderTable(node);
  });
  compiler.handler("thead", mapVisit2);
  compiler.handler("tbody", mapVisit2);
  compiler.handler("tfoot", mapVisit2);
  compiler.handler("tr", (node) => {
    if (!compiler.state.tables.length) {
      compiler.state.tables.push(createTable());
    }
    const table = compiler.state.tables[compiler.state.tables.length - 1];
    const row = { type: "row", cols: [] };
    if (node.attribs.align) {
      row.align = node.attribs.align;
      if (!table.aligned) {
        table.align.push(table.alignment(row.align));
      }
    }
    if (compiler.state.tags.thead > 1) {
      row.type = "header";
    }
    if (compiler.state.tags.tfoot > 1) {
      row.type = "footer";
    }
    table.rows.push(row);
    mapVisit2(node);
    return "";
  });
  compiler.handler("th", (node) => {
    const table = compiler.state.tables[compiler.state.tables.length - 1];
    let row = table.rows[table.rows.length - 1];
    if (!row) {
      row = { type: "row", cols: [] };
      table.rows.push(row);
    }
    if (!table.rows.some((r) => r.type === "header")) {
      row.type = "header";
    }
    if (compiler.state.tags.thead > 0) {
      table.aligned = true;
      switch (node.attribs.align) {
        case "center":
          table.align.push(":---:");
          break;
        case "left":
          table.align.push(":---");
          break;
        case "right":
          table.align.push("---:");
          break;
        default:
          table.align.push("---");
          break;
      }
    }
    let col = trim(mapVisit2(node)).replace(/\s+/gm, " ");
    if (col && node.attribs.scope === "row") {
      col = `**${col.replace(/^[*]+|[*]+$/g, "")}**`;
    }
    row.cols.push(col);
    return "";
  });
  compiler.handler("td", (node) => {
    const prev = compiler.state.output;
    const table = compiler.state.tables[compiler.state.tables.length - 1];
    const col = trim(mapVisit2(node)).replace(/\s+/g, " ");
    if (table && table.rows) {
      const row = table.rows[table.rows.length - 1];
      if (row && row.cols) {
        row.cols.push(col);
        return "";
      }
      return `| ${col} |`;
    }
    return `${col} | `;
  });
  compiler.handler("caption", (node) => identity(node) + "\n\n");
  compiler.handler("colgroup", (node) => {
    const table = compiler.state.tables[compiler.state.tables.length - 1];
    table.colgroup = { span: Number(node.attribs.span || 0), cols: [] };
    return mapVisit2(node);
  });
  compiler.handler("col", (node) => {
    const table = compiler.state.tables[compiler.state.tables.length - 1];
    table.colgroup.cols.push({ span: Number(node.attribs.span || 0) });
    return mapVisit2(node);
  });
  compiler.handler("span", mapVisit2);
  compiler.handler("a", (node) => {
    const inner = node.nodes ? trim(mapVisit2(node)) : trim(toValue(node));
    let text = condenseSpaces(newlinesToSpace(inner));
    const keep = [].concat(options.keepEmpty || []);
    const { href } = node.attribs;
    const classIncludes = /* @__PURE__ */ __name((node2, value) => {
      if (node2.attribs && node2.attribs.class) {
        return node2.attribs.class.includes(value);
      }
      return false;
    }, "classIncludes");
    if (node.value === void 0 && node.nodes) {
      if (some(node, (n) => n.type === "i" && classIncludes(node, "icon-"))) {
        return "";
      }
    }
    if (!text.trim() && (!keep.length || !keep.includes("a"))) {
      return "";
    }
    if (text) {
      text = entities.decodeHTML(text.replace(RE_ALL_WHITESPACE, " "));
    }
    if (href && !compiler.state.links.includes(href)) {
      compiler.state.links.push(href);
    }
    let title = trim(node.attribs.title);
    if (title) {
      title = title.replace(/"/g, "&quot;");
      title = ` "${title.replace(RE_ALL_WHITESPACE, " ")}"`;
    }
    const link = toUrl(trim(href), options);
    const slug = /* @__PURE__ */ __name((str) => {
      if (str[0] === "#") {
        return `#${slugify(str.slice(1), options)}`;
      }
      return slugify(str);
    }, "slug");
    if (!link) {
      if (node.attribs.name && (text || keep.includes("a"))) {
        return `<a name="${node.attribs.name}">${text}</a>`;
      }
      return "";
    }
    if (compiler.state.tags.code || compiler.state.tags.pre) {
      if (node.parent.type !== "code" || compiler.state.tags.pre) {
        if (title) title = ` title=${title.trim()}`;
        return `<a href="${link}"${title}>${text}</a>`;
      }
    }
    let ref = trim(trim(link) + " " + trim(title));
    if (options.reflinks === false) {
      return `[${text}](${ref})`;
    }
    if (options.reflinks === true) {
      ({ ref } = format("href", link, title, compiler));
    }
    if (ref[0] !== "#" && !/(^\/|:\/\/)/.test(ref)) {
      return `[${text}][${ref}] `;
    }
    if (options.reflinks === void 0 && ref[0] === "#") {
      ref = slug(ref);
    }
    return `[${text}](${ref})`;
  });
  compiler.handler("em", (node) => wrapChars(node, "_"));
  compiler.handler("i", (node) => wrapChars(node, "_"));
  compiler.handler("strong", (node) => wrapChars(node, "**"));
  compiler.handler("b", (node) => wrapChars(node, "**"));
  compiler.handler("small", (node) => trim(identity(node))).handler("sub", (node) => trim(identity(node))).handler("sup", (node) => trim(identity(node)));
  compiler.handler("u", identity);
  compiler.handler("ins", (node) => wrapChars(node, "++"));
  compiler.handler("del", (node) => wrapChars(node, "~~"));
  compiler.handler("strike", (node) => wrapChars(node, "~~"));
  compiler.handler("s", (node) => wrapChars(node, "~~"));
  compiler.handler("abbr", (node) => {
    const title = node.attribs && node.attribs.title ? ` title="${node.attribs.title}"` : "";
    return `<abbr${title}>${trim(mapVisit2(node))}</abbr>`;
  });
  compiler.handler("bdi", identity);
  compiler.handler("bdo", identity);
  compiler.handler("dfn", identity);
  compiler.handler("mark", (node) => {
    let attr = trim(attributes(node.attribs, ["title"]));
    if (attr) attr = " " + attr;
    return `<mark${attr}>${mapVisit2(node)}</mark>`;
  });
  compiler.handler("time", (node) => identity(node));
  compiler.handler("area", () => "").handler("audio", () => "").handler("canvas", () => "").handler("embed", () => "").handler("iframe", () => "").handler("map", () => "").handler("object", () => "").handler("param", () => "").handler("source", () => "").handler("track", () => "").handler("video", () => "");
  compiler.handler("img", (node) => {
    let { alt, src, title } = node.attribs;
    alt = trim(alt);
    title = trim(title) ? " " + enquote(trim(title)) : "";
    src = toUrl(src, options);
    if (src) {
      return `![${alt}](${src}${title})`;
    }
    return "";
  });
  compiler.handler("button", () => "").handler("datalist", () => "").handler("fieldset", mapVisit2).handler("form", () => "").handler("input", () => "").handler("keygen", () => "").handler("label", mapVisit2).handler("legend", mapVisit2).handler("meter", () => "").handler("optgroup", mapVisit2).handler("option", mapVisit2).handler("output", mapVisit2).handler("progress", () => "").handler("select", mapVisit2).handler("textarea", mapVisit2);
  compiler.handler("svg", () => "").handler("circle", () => "").handler("ellipse", () => "").handler("line", () => "").handler("path", () => "").handler("polygon", () => "").handler("polyline", () => "").handler("rect", () => "").handler("stop", () => "").handler("use", () => "");
  compiler.handler("command", () => "").handler("details", identity).handler("menu", mapVisit2).handler("menuitem", mapVisit2);
  compiler.handler("ruby", () => "").handler("rb", () => "").handler("rp", () => "").handler("rt", () => "").handler("rtc", () => "");
  compiler.handler("acronym", identity).handler("applet", () => "").handler("basefont", () => "").handler("big", mapVisit2).handler("center", mapVisit2).handler("data", () => "").handler("dialog", () => "").handler("dir", () => "").handler("font", (node) => newlinesToSpace(mapVisit2(node))).handler("frame", () => "").handler("frameset", () => "").handler("math", () => "").handler("noframes", () => "").handler("picture", () => "").handler("summary", mapVisit2).handler("template", () => "").handler("tt", () => "");
  return compiler;
}, "init");

// src/Compiler.ts
var initState = /* @__PURE__ */ __name(() => ({
  indent: 0,
  literal: 0,
  tags: { dl: 0, dd: 0 },
  ol: [],
  ul: [],
  dl: [],
  dd: [],
  table: -1,
  tables: [],
  types: [],
  links: [],
  reflinks: {},
  output: ""
}), "initState");
var Compiler = class extends Events {
  static {
    __name(this, "Compiler");
  }
  constructor(options) {
    super();
    this.options = { ...options };
    this.visitors = /* @__PURE__ */ new Map();
    this.seenTypes = /* @__PURE__ */ new Set();
    this.seen = /* @__PURE__ */ new Set();
    this.started = !this.options.start;
    const omit = [].concat(this.options.omit || ["button", "alert", "nav", "navbar", "navbar-nav", "navbar-item", "navbar-brand"]);
    this.omit = omit.map((name) => name.replace(/^[#.]/, ""));
    this.rename = this.options.rename || {};
    if (typeof this.options.rename === "string") {
      const segs = this.options.rename.split(",");
      this.rename = {};
      for (const seg of segs) {
        const [key, value] = seg.split(":");
        this.rename[key] = value;
      }
    }
    this.data = { meta: {} };
    this.stash = [""];
    this.stack = [];
    this.count = 0;
    this.state = initState();
    this.plugins = new Plugins(plugins_exports, this.options);
    init(this);
    this.addHandlers(this);
  }
  addHandlers(compiler, options) {
    const opts = options || this.options;
    if (opts.visitors) {
      for (const type of Object.keys(opts.visitors)) {
        const value = opts.visitors[type];
        if (value === false) {
          this.handler(type, () => "");
        } else {
          this.handler(type, value);
        }
      }
    }
  }
  preprocess(node) {
    if (typeof this.options.preprocess === "function") {
      node = this.options.preprocess.call(this, node);
    }
    return node;
  }
  postprocess(value, node) {
    if (typeof this.options.postprocess === "function") {
      value = this.options.postprocess.call(this, value, node);
    }
    return value;
  }
  append(value = "", node) {
    this.emit("append", value, node);
    this.state.output += value;
    this.state.last = value;
    this.stash.push(value);
  }
  increment(node) {
    this.state.tags[node.type] = this.state.tags[node.type] || 0;
    this.state.tags[node.type]++;
    this.stack.push(node.type);
  }
  decrement(node) {
    const { tags } = this.state;
    tags[node.type] = tags[node.type] || 0;
    tags[node.type] = Math.max(tags[node.type] - 1, 0);
    this.stack.pop();
  }
  isOmitted(node, names = []) {
    if (Array.isArray(names) && names.length) {
      if (names.some((name) => RE_INVISIBLE.test(name))) {
        return true;
      }
      return this.omit.some((name) => names.includes(name));
    }
    return this.omit.some((name) => node.type === name);
  }
  handler(name, fn) {
    this.visitors.set(name, fn);
    return this;
  }
  isStartingNode(node) {
    if (this.options.start === void 0) {
      return true;
    }
    return node.type === this.options.start;
  }
  isStoppingNode(node) {
    if (!this.options.stop) return false;
    return pick(node, { pick: this.options.stop });
  }
  renameNode(node) {
    if (this.rename.hasOwnProperty(node.type)) {
      node.type = this.rename[node.type];
    }
  }
  handle(node, filter2) {
    if (node.seen) return;
    this.seenTypes.add(node.type);
    node.seen = true;
    this.renameNode(node);
    node.output = "";
    this.plugins.handle("render:before", node, this);
    if (this.isStartingNode(node)) {
      this.started = true;
    }
    if (this.stopped || this.isStoppingNode(node)) {
      this.stopped = true;
      this.plugins.handle("render:after", node, this);
      return node.output;
    }
    if (typeof filter2 === "function" && filter2(node) === false) {
      this.plugins.handle("render:after", node, this);
      return node.output;
    }
    const ele = this.preprocess(node);
    const fn = this.visitors.get(ele.type);
    if (typeof fn !== "function") {
      if (ele.selfClosing === true || !this.known.has(ele.type)) return "";
      throw new Error(`No visitors are registered for "${ele.type}"`);
    }
    this.increment(ele);
    node.output = this.postprocess(fn.call(this, ele), ele);
    if (!this.started) {
      node.output = "";
    }
    this.append(node.output, ele);
    this.decrement(ele);
    this.plugins.handle("render:after", node, this);
    return node.output;
  }
  mapVisit(node, filter2) {
    if (!node.nodes) {
      return this.handle(node);
    }
    this.plugins.handle("render:before", node, this);
    this.increment(node);
    this.emit("open", node);
    this.output = "";
    for (const child of node.nodes) {
      this.output += this.handle(child, filter2) || "";
    }
    this.emit("close", node);
    this.decrement(node);
    this.plugins.handle("render:after", node, this);
    return this.output;
  }
  compile(tree) {
    return this.mapVisit(mapKeys(tree));
  }
  render(node, options = {}) {
    const opts = { ...this.options, ...options };
    this.addHandlers(this, opts);
    this.plugins.handle("render:before", node, this);
    node.output = this.compile(node);
    node.output = removeEmptyEndLines(node.output);
    node.output = node.output.replace(/^\s+(?=(\[.*?\]|\*{2}[^*]|_{2}[^_]))/gm, "");
    if (!node.output.includes("`")) {
      node.output = entities2.decodeHTML(node.output);
    }
    if (options.condenseNewlines !== false) {
      node.output = condense(node.output, opts);
    }
    if (options.trailingNewline !== false && node.output.slice(-1) !== "\n") {
      node.output += "\n";
    }
    for (const key of Object.keys(this.state.reflinks)) {
      node.output += "\n\n";
      const reflinks = this.state.reflinks[key];
      if (Array.isArray(reflinks) && reflinks.length) {
        for (const ele of reflinks) {
          if (node.output.includes(`[${ele.ref}]`)) {
            node.output += `
${ele.reflink}`;
          }
        }
      }
    }
    this.plugins.handle("render:after", node, this);
    return node.output;
  }
  get known() {
    if (!this._known) this._known = new Set(knownTags());
    return this._known;
  }
  // Using a getter to ensure that the `this` context is correct
  static get render() {
    return (tree, options) => new this(options).render(tree);
  }
};
function knownTags() {
  const known = [];
  for (const key of Object.keys(tags_exports)) {
    for (const ele of Object.keys(tags_exports[key])) {
      if (!known.includes(ele)) {
        known.push(ele);
      }
    }
  }
  return known.sort();
}
__name(knownTags, "knownTags");

// index.ts
var parse2 = /* @__PURE__ */ __name((input, options = {}) => {
  const ast = parse(input, options);
  return ast.picked || ast;
}, "parse");
var render = /* @__PURE__ */ __name((input, options = {}) => {
  return Compiler.render(parse2(input, options), options);
}, "render");
var breakdance = /* @__PURE__ */ __name((input, options = {}) => {
  return render(input, options);
}, "breakdance");
var Breakdance = class {
  static {
    __name(this, "Breakdance");
  }
  constructor(options = {}) {
    this.options = options;
  }
  parse(input, options) {
    return parse2(input, { ...this.options, ...options });
  }
  render(input, options) {
    return render(input, { ...this.options, ...options });
  }
  static parse(input, options) {
    return parse2(input, options);
  }
  static render(input, options) {
    return render(input, options);
  }
};
var breakdance_default = Breakdance;
export {
  Breakdance,
  Compiler,
  breakdance,
  breakdance_default as default,
  parse2 as parse,
  render
};
//# sourceMappingURL=index.mjs.map