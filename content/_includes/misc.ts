export const Category = 'post' | 'prose';

export type Post = {
    title: string;
    date: Date;
    slug: string;
    year: number;
    month: numbe;
    day: number;
    url: string;
    src: string;
    category: Category;
};

async function collect_posts(): Promise<Post[]> {
    const posts: Post[] = [];

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
                url: `/${year}/${month}/${day}/${slug}.html`,
                src: `/posts/${year}-${month}-${day}-${slug}.md`,
                category: 'post',
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
