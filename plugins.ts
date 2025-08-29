import code_highlight from "lume/plugins/code_highlight.ts";
import nunjucks from "lume/plugins/nunjucks.ts";
import sitemap from "lume/plugins/sitemap.ts";
import feed, { Options as FeedOptions } from "lume/plugins/feed.ts";
import icons from "lume/plugins/icons.ts";
import anchor from "npm:markdown-it-anchor";
import { footnote } from "npm:@mdit/plugin-footnote";
import { merge } from "lume/core/utils/object.ts";

import "lume/types.ts";

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
        site.use(sitemap())
            .use(feed(options.feed))
            .add([".css"])
            .preprocess([".md"], (pages) => {
            for (const page of pages) {
                page.data.excerpt ??= (page.data.content as string).split(
                    /<!--\s*more\s*-->/i,
                )[0];
            }
        });

        site.hooks.addMarkdownItPlugin(footnote);
        site.hooks.addMarkdownItPlugin(anchor, {level: 2});
    };
}
