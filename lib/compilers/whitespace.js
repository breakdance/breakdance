'use strict';

var isPunctuation = require('is-punctuation');
var isWhitespace = require('is-whitespace');
var wordRegex = require('word-regex');

// if (needsSpace(this.output.slice(-1))) {
//   this.emit(' ');
// }

// if ( && !/[.?!:;,`*_]/.test(firstChar)) {
//   return this.emit(val, node);
// }

// var endingChar = /[\w>`*_).?!:;,\]]/.test(lastChar);
// if (!hasTrailingSpace) {
//   console.log(endingChar)
//   if (endingChar && firstChar) {
//     this.emit(' ');
//   }

//   // this.emit(' ');
// }

// if (/[-?!:;,`*_()\]]/.test(firstChar)) {
//   this.output = this.output.replace(/\s+$/, '');
// }

/**
 * a => ending character
 * b => starting character
 */

// test after closing "`"
// var re = /(?=`[^`]+)`[^\W\ss_]/;
// var re = /`[^\W\ss_]/;

exports.needsSpace = function(a, b) {
  var aa = a.slice(-1);
  var bb = b.charAt(0);
  var alphaRe = /[a-z0-9]/i;

  // if (alphaRe.test(aa) && alphaRe.test(bb)) {
  //   return true;
  // }

  // console.log(aa, bb)

  // var needsSpace = /[a-z0-9>`*_.?!:;,\])}]/i.test(lastChar);
  // var punctuationRe = /[`*_.?!:;,\])}>]/i;
  // console.log([a.slice(-10), b])
  if (bb === '.' && /\w/.test(b.charAt(1)) && aa !== '\n') {
    return true;
  }

  if (isEndingChar(bb)) {
    return false;
  }

  // console.log('CHAR:', [a.charAt(a.length - 2)])
  if (aa === '`' && !/\s/.test(a.charAt(a.length - 2))) {
    return true;
  }

  if (/[*_]/.test(aa) && /\w/.test(bb)) {
    return true;
  }

  if (isOpeningChar(aa)) {
    return false;
  }

  if (isTightSeparator(aa) || isTightSeparator(bb)) {
    return false;
  }

  if ((isLooseSeparator(aa) || isLooseSeparator(bb)) && !/\s/.test(aa)) {
    return true;
  }

  if (/\s/.test(aa) && isStartingChar(bb)) {
    return false;
  }

  if (isWrappingChar(aa) && isStartingChar(bb)) {
    return true;
  }

  if (isEndingChar(aa) && !/<br>$/.test(a) && !/\s/.test(bb) && !isEndingChar(bb)) {
    return true;
  }

  if ((isStartingChar(bb) ||isWrappingChar(bb) || isWrappingChar(aa)) && !isStartingChar(aa)) {
    return true;
  }

  if (isWordChar(aa) && isWordChar(bb)) {
    return true;
  }

  if (/\W/.test(bb) && !isStartingChar(bb) && !isOpeningChar(bb) && !isEndingChar(bb) && !isSpecialChar(bb) && !isSeparator(bb) && !isStartingChar(aa)) {
    return true;
  }

  // if (!isOperator())

  return false;
};

function isWrappingChar(str) {
  return /[*_"'`]/.test(str);
}

function isStartingChar(str) {
  return /[$@#~]/.test(str) || isOpeningChar(str);
}

function isOpeningChar(str) {
  return /[<([{]/.test(str);
}

function isClosingChar(str) {
  return /[\])}>]/.test(str);
}

function isEndingChar(str) {
  return /[%!?.,;:]/.test(str) || isClosingChar(str);
}

function isWordChar(str) {
  return wordRegex().test(str);
}

function isSpecialChar(str) {
  return /[‘’“”،、‹›«»†‡°″¡¿※#№\‱¶′‴§‖¦]/.test(str);
}

function isOperator(str) {
  return /[=+÷×‰&^~|]/.test(str);
}

function isSeparator(str) {
  return isLooseSeparator(str) || isTightSeparator(str);
}

function isTightSeparator(str) {
  return /[-‒−–—―\\\/⁄]/.test(str);
}

function isLooseSeparator(str) {
  return /[\s·•|]/.test(str);
}
