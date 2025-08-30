import jsx from "lume/plugins/jsx.ts";
import code_highlight from "lume/plugins/code_highlight.ts";
import sitemap from "lume/plugins/sitemap.ts";
import metas from "lume/plugins/metas.ts";
import icons from "lume/plugins/icons.ts";
import { merge } from "lume/core/utils/object.ts";
import feed, { Options as FeedOptions } from "lume/plugins/feed.ts";
import toc from "lume_markdown_plugins/toc.ts";
import footnotes from "lume_markdown_plugins/footnotes.ts";
import "lume/types.ts";

const BASE_FONT_URL: string = "https://fonts.google.com/share?selection.family=";
const ELECTROLIZE: string = "Electrolize";
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
            .add([".css"])
            .add("fonts")
            .add("img")
            .preprocess([".md"], (pages) => {
            for (const page of pages) {
                page.data.excerpt ??= (page.data.content as string).split(
                    /<!--\s*more\s*-->/i,
                )[0];
            }
        });
    };
}
