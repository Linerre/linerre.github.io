import lume from "lume/mod.ts";
import plugins from "./src/plugins.ts";

const site = lume({
    src: "./content",
    cssFile: "/css/main.css",
    server: {
        port: 8090,
    },
    prettyUrls: false,
});

site.use(plugins());

export default site;
