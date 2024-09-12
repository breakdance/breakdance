import constants from '../constants';

const {
  CHAR_ELLIPSIS,
  CHAR_FORWARD_SLASH,
  CHAR_THREE_DOTS,
  CHAR_EM_DASH,

  RE_ELLIPSIS,
  RE_SLASHES
} = constants;

export const smartQuotes = (str: string, options: { replaceSmartQuotes?: boolean } = {}): string => {
  if (options.replaceSmartQuotes !== false) {
    str = str.replace(/(&ldquo;|&rdquo;|&#822[01];|\u201C|\u201D|[“”])/g, '"');
    str = str.replace(/(&lsquo;|&rsquo;|&#8217;|&apos;|\u2019|[‘’])/g, '\'');
  }
  return str;
};

export const ellipsis = (str: string, options: { unsmarty?: boolean } = {}): string => {
  const ellipsis = options.unsmarty ? CHAR_THREE_DOTS : CHAR_ELLIPSIS;
  return str.replace(RE_ELLIPSIS, ellipsis);
};

export const slashes = (str: string): string => {
  return str.replace(RE_SLASHES, CHAR_FORWARD_SLASH);
};

export const angles = (str: string, options: { unsmarty?: boolean } = {}): string => {
  if (!options.unsmarty) return str;
  return str
    .replace(/[⟨‹]/g, '<')
    .replace(/[›⟩]/g, '>')
    .replace(/[«»]/g, '"');
};

export const chars = (str: string, options: { replaceSmartQuotes?: boolean, unsmarty?: boolean } = {}): string => {
  str = slashes(str);
  str = smartQuotes(str, options);
  str = ellipsis(str, options);
  str = angles(str, options);
  return str
    .replace(/(\u2014|&#x2014;|&#8212;|&mdash;)/g, CHAR_EM_DASH)
    .replace(/&ndash;/g, '–')
    .replace(/&amp;/g, '&')
    .replace(/&middot;/g, '·')
    .replace(/&rsaquo;/g, '›')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&le;/g, '≤')
    .replace(/&ge;/g, '≥');
};

const replace = {
  smartQuotes,
  ellipsis,
  slashes,
  angles,
  chars
};

export default replace;