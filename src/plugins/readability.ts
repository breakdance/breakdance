import { JSDOM } from 'jsdom';
import { Readability } from '@mozilla/readability';

export const parseHtml = (html: string) => {
  const dom = new JSDOM(html);
  const reader = new Readability(dom.window.document);
  return reader.parse();
};

export const readable = (html: string) => {
  const article = parseHtml(html);
  return article?.content;
};

const html = '<html><body><article>Your content here</article></body></html>';
const article = parseHtml(html);
console.log(article?.content);
