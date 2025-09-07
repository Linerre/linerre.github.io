import { Page } from 'lume/types.ts';

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

function wrapWith(ele: Element, wrapper: Element): void {

}

// Remove the undesired `hljs` and `language-x*` classes
export function cleanPreCodeClass(pages: Page[]): void {
    for (const page of pages) {
        for (const code of page.document.querySelectorAll('code')) {
            code.removeAttribute('class');
        }


        for (const span of page.document.querySelectorAll('code span')) {
            for (const cls of span.classList)
                if (cls.includes('language-'))
                    span.classList.remove(cls);

            // let lineSpan = page.document.createElement('span');
            // const { classList } = lineSpan;
            // classList.add('line');
            // span.parentNode.insertBefore(lineSpan, span);
            // lineSpan.appendChild(span);
        }
    }
}

export function wrapPreWithFigure(pages: Page[]): void {
    for (const page of pages) {
        for (const pre of page.document.querySelectorAll('pre')) {
            let figure = page.document.createElement('figure');
            const { classList } = figure;
            classList.add('code-block');
            pre.parentNode.insertBefore(figure, pre);
            figure.appendChild(pre);
        }
    }
}
