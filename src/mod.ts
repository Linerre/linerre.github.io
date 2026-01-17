import jsx from 'lume/plugins/jsx.ts';
import sitemap from 'lume/plugins/sitemap.ts';
import metas from 'lume/plugins/metas.ts';
import icons from 'lume/plugins/icons.ts';
import { merge } from 'lume/core/utils/object.ts';
import feed, { Options as FeedOptions } from 'lume/plugins/feed.ts';
import { attrs } from 'npm:@mdit/plugin-attrs';
import toc from 'lume_markdown_plugins/toc.ts';
import footnotes from 'lume_markdown_plugins/footnotes.ts';
import prism from "lume/plugins/prism.ts";
import "npm:prismjs@1.30.0/components/prism-haskell.js";
import "npm:prismjs@1.30.0/components/prism-python.js";
import "npm:prismjs@1.30.0/components/prism-rust.js";
import "npm:prismjs@1.30.0/components/prism-typescript.js";
import "npm:prismjs@1.30.0/components/prism-c.js";
import "npm:prismjs@1.30.0/components/prism-bash.js";
import "npm:prismjs@1.30.0/components/prism-json.js";
import './plugins/langs/clojure.js';
import 'lume/types.ts';

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
      .use(prism())
      // .use(codeHighlight(options.hljs))
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
