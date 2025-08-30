import { Page as PageData } from 'lume/core/file.ts';

const site_name = 'errenil';
const site_url = 'https://Linerre.github.io';
const blurb = 'Errenil notes & thoughts';

function Base({ children, metas, path}: {
    children: any,
    metas: any
    path: string,
}) {
    return (
        <html lang="en-US">
            <head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content= {blurb} />
                <title>errenil</title>
                <link rel="icon" href="/favicon.png" type="image/png" />
                <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
                <link
                    rel="alternate"
                    type="application/rss+xml"
                    title="matklad"
                    href={`${site_url}/feed.xml`}
                />
                <link rel="canonical" href={`${site_url}${path}`} />
                <link rel="stylesheet" href="/main.css" />
            </head>
            <body>
                <header>
                    <nav>
                        <a class="sitename" href="/"> { site_name } </a>
                        <a href="/about.html">About</a>
                        <a href="/links.html">Links</a>
                    </nav>
                </header>

                <main>
                    {children}
                </main>

                <footer>
                </footer>
            </body>
        </html>
    );
}

function Time({ date, className = undefined }: {
    date: Date,
    className?: string
}) {
  const human = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
  const machine = yyyy_mm_dd(date);
  return <time class={className} datetime={machine}>{human}</time>;
}

function yyyy_mm_dd(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function PostList({posts}: {posts: PageData[]}) {
    const post_list = posts.map((post: PageData) => {
        return (
            <li key={post.url}>
                <Time className="meta" date={post.date} />
                <h2><a href={post.url}>{post.title}</a></h2>
            </li>
        );
    });

    return (
        <Base>
            <ul className="post-list">
                { post_list }
            </ul>
        </Base>
    );
}
