import { Page } from 'lume/types.ts';

function sectionWrapper(pages: Page[]) {
  for (const page of pages) {
    const doc = page.document;
    if(!doc) continue;

    const h2s = doc.querySelectorAll('article h2');
    Array.from(h2s).reverse().forEach((h2) => {
      const section = doc.createElement('section');
      const parent = h2.parentNode!;

      // collect sibling paras
      const nexts: Node[] = [];
      let nextSibling = h2.nextSibling;

      while(nextSibling && nextSibling.nodeName !== 'H2'
        && nextSibling.nodeName !== 'SECTION') {
        nexts.push(nextSibling);
        nextSibling = nextSibling.nextSibling;
      }

      parent.insertBefore(section, h2);
      section.appendChild(h2);
      nexts.forEach(next => {
        section.appendChild(next);
      });

      const h2attrs = Array.from(h2.attributes);
      h2attrs.forEach(attr => {
        section.setAttribute(attr.name, attr.value);
        h2.removeAttribute(attr.name);
      })
    });
  }
}

export default function () {
  return (site: Site) => {
    site.process([".html"], sectionWrapper);
  }
}
