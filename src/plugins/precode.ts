// Provide processors to process `pre` and `code` tags
import { Page } from 'lume/types.ts';

interface Options {
  parentName: string;
  childName: string;
  addClassName?: string;
  removeClassName?: string;
}

function removeClass(ele: Element, cls: string | string[]): void {
  if (typeof cls === 'string') {
    if (ele.classList.contains(cls)) {
      ele.classList.remove(cls);
    }
  } else {
    for (const c of cls) {
      if (ele.classList.contains(cls)) {
        ele.classList.remove(cls);
      }
    }
  }
}

function removeAllAttrs(ele: Element): void {
  const attrs = ele.getAttributeNames();
  attrs.forEach(attr => {
    ele.removeAttribute(attr);
  });
}


function markFnCallAndDocString(code: Element): void {
  let found = false;
  for (const child of code.children) {
    if (child.classList.contains('function'))
      child.classList.add('call');

    if (child.classList.contains('defname')
      && child.nextElementSibling
      && child.nextElementSibling.classList.contains('string'))
      child.nextElementSibling.classList.add('doc')
  }
}

// Process pre and code elements
function cleanPreCodeClass(pages: Page[]): void {
  for (const page of pages) {
    const doc = page.document;
    if (!doc) continue;

    for (const code of doc.querySelectorAll('code')) {
      if (code.classList.contains('language-clojure'))
        markFnCallAndDocString(code);

      code.removeAttribute('class');
    }

    for (const pre of doc.querySelectorAll('pre')) {
      removeAllAttrs(pre);
      const figure = doc.createElement('figure');
      const { classList } = figure;
      classList.add('code-block');
      pre.parentNode.insertBefore(figure, pre);
      figure.appendChild(pre);
    }
  }
}

export default function (site: Site) {
  return (site: Site) => {
    site.process([".html"], cleanPreCodeClass);
  }
}
