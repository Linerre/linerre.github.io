import { Page } from 'lume/core/file.ts';
import { PostList } from './templates.tsx';

async function collect_posts(): Promise<any[]> {
    const posts = [];

    try {
        for await (const entry of Deno.readDir("./src/posts/")) {
            if (!entry.name.endsWith(".md")) continue;

            const match = entry.name.match(/^(\d{4})-(\d{2})-(\d{2})-(.+)\.md$/);
            if (!match) continue;

            const [, year, month, day, slug] = match;
            const filePath = `./src/posts/${entry.name}`;

            const content = await Deno.readTextFile(filePath);
            const lines = content.split('\n');
            const firstLine = lines[0] || '';

            const title = firstLine.replace(/^#\s*/, '').trim() || slug.replace(/-/g, ' ');

            const date = new Date(Date.UTC(parseInt(year), parseInt(month) - 1, parseInt(day)));

            posts.push({
                title,
                date,
                slug,
                year: parseInt(year),
                month: parseInt(month),
                day: parseInt(day),
                // path: `/${y}/${m}/${d}/${slug}.html`,
                url: `/${year}/${month}/${day}/${slug}.html`,
                data: {
                    title,
                    date,
                    url: `/${year}/${month}/${day}/${slug}/`,
                    type: 'post'
                }
            });
        }
    } catch (error) {
        console.error("Error collecting posts:", error);
        return [];
    }

    // Sort by date descending
    posts.sort((a, b) => b.date.getTime() - a.date.getTime());

    return posts;
}


// pass over to Lume
export default async (data: Lume.Data, helpers: Lume.Helpers) => {
    const posts = await collect_posts();
    return (<PostList posts={posts} />);
}
