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
import hs from 'npm:highlight.js/lib/languages/haskell';
import py from 'npm:highlight.js/lib/languages/python';
import rs from 'npm:highlight.js/lib/languages/rust';
import ts from 'npm:highlight.js/lib/languages/typescript';
import clj from 'npm:highlight.js/lib/languages/clojure';
import 'lume/types.ts';

// import clj from './languages/clojure.js';
import precode from './plugins/precode.ts';
import section from './plugins/section.ts';

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
      clojure: clj,
      haskell: hs,
      python: py,
      rust: rs,
      typescript: ts
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
    site.use(metas())
      .use(sitemap())
      .use(feed(options.feed))
      .use(jsx())
      .use(toc())
      .use(footnotes())
      .use(codeHighlight(options.hljs))
      .use(precode())
      .use(section())
      .add('pages')
      .add('css')
      .add('fonts')
      .add('img')
      .add(['.js'])
      .ignore("src");
  };

  site.hooks.addMarkdownItPlugin(attrs, {rule: ['block']});
}
