import lume from "lume/mod.ts";
import plugins from "./plugins.ts";

const site = lume({
    src: "./src",
    cssFile: "/main.css",
    server: {
        port: 8090,
    },
    prettyUrls: false,
});

site.use(plugins());

export default site;
