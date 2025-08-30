// Set up the site before lume init it
import plugins, { Options } from "./plugins.ts";
import "lume/types.ts";
export type { Options } from "./plugins.ts";

export default function (options: Partial<Options> = {}) {
  return (site: Lume.Site) => {
    // Configure the site
    site.use(plugins(options));

    // Add remote files
    const files = [
      "_includes/layouts/base.vto",
      "_includes/layouts/post.vto",
      "posts/_data.yml",
      "_data.yml",
      "main.css",
    ];

    for (const file of files) {
      site.remoteFile(file, import.meta.resolve(`./src/${file}`));
    }
  };
}
