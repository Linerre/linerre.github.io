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

// Process pre and code elements
function cleanPreCodeClass(pages: Page[]): void {
  for (const page of pages) {
    const doc = page.document;
    if (!doc) continue;

    for (const code of doc.querySelectorAll('code')) {
      code.removeAttribute('class');
    }

    for (const span of doc.querySelectorAll('code span')) {
      for (const cls of span.classList)
        if (cls.includes('language-'))
          span.classList.remove(cls);
    }

    for (const pre of doc.querySelectorAll('pre')) {
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
