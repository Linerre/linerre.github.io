import jsx from 'lume/plugins/jsx.ts';
import codeHighlight from 'lume/plugins/code_highlight.ts';
import sitemap from 'lume/plugins/sitemap.ts';
import metas from 'lume/plugins/metas.ts';
import icons from 'lume/plugins/icons.ts';
import { merge } from 'lume/core/utils/object.ts';
import feed, { Options as FeedOptions } from 'lume/plugins/feed.ts';
import { attrs } from 'npm:@mdit/plugin-attrs';
import toc from 'lume_markdown_plugins/toc.ts';
import footnotes from 'lume_markdown_plugins/footnotes.ts';
import 'lume/types.ts';

import { removeClass } from './processor.ts';

import clojure from 'npm:highlight.js/lib/languages/clojure';
import haskell from 'npm:highlight.js/lib/languages/haskell';
import python from 'npm:highlight.js/lib/languages/python';
import rust from 'npm:highlight.js/lib/languages/rust';
import typescript from 'npm:highlight.js/lib/languages/typescript';

const BASE_FONT_URL: string = 'https://fonts.google.com/share?selection.family=';
const ELECTROLIZE: string = 'Electrolize';
export const defaults: Options = {
    feed: {
        output: ["/feed.xml", "/feed.json"],
        query: "type=post",
        info: {
            title: "=metas.site",
            description: "=metas.description",
        },
        items: {
            title: "=title",
        },
    },
    hljs: {
        languages: {
            'clojure': clojure,
            'haskell': haskell,
            'python': python,
            'rust': rust,
            'typescript': typescript
        },
        options: {
            classPrefix: "hl-",
        },
    },
};

// configure the site
export default function (userOptions?: Options) {
    const options = merge(defaults, userOptions);


    return (site: Lume.Site) => {
        site.hooks.addMarkdownItPlugin(attrs, {rule: ['block']});

        site.use(metas())
            .use(sitemap())
            .use(feed(options.feed))
            .use(jsx())
            .use(toc())
            .use(footnotes())
            .use(codeHighlight(options.hljs))
            .add('pages')
            .add('css')
            .add('fonts')
            .add('img')
            .add(['.js'])
            .ignore("src")
            .process([".html"], (pages) => {
            for (const page of pages) {
                for (const code of page.document.querySelectorAll('code')) {
                    removeClass(code, 'hljs');
                }
            }
        });
    };
}
