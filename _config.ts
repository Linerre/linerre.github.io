import lume from "lume/mod.ts";
import code_highlight from "lume/plugins/code_highlight.ts";
import nunjucks from "lume/plugins/nunjucks.ts";

const site = lume({
    src: "./src",
    server: {
        port: 8090,
    },
    prettyUrls: false, // Disable pretty urls
});

site.use(code_highlight());
site.use(nunjucks());

export default site;
