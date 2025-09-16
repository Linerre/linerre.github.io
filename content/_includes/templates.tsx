import { Page } from 'lume/types.ts';

const site_name = 'errenil';
const site_url = 'https://Linerre.github.io';
const blurb = 'Errenil notes & thoughts';

function Base({ children, metas, path, extra_css }: {
  children: any,
  metas: any
  path: string,
  extra_css?: string,
}) {
  return (
    <html lang="en-US">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content= {blurb} />
        <title>errenil</title>
        <link rel="icon" href="/img/cat86.gif" type="image/gif" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="errenil"
          href={`${site_url}/feed.xml`}
        />
        <link rel="canonical" href={`${site_url}${path}`} />
        <link rel="stylesheet" href="/css/main.css" />
        {extra_css && <link rel="stylesheet" href={`/css/${extra_css}`} />}
      </head>
      <body>
        <header>
          <nav>
            <div class="sitename">
              <a  href="/"> { site_name } </a>
              <a href="mailto:zlinerre@gmail.com">
                <FooterIcon name="email" />
              </a>
              <a href="https://github.com/Linerre">
                <FooterIcon name="github" />
              </a>
              <a href="/feed.xml">
                <FooterIcon name="rss" />
              </a>
            </div>
            <a href="/pages/about.html">About</a>
            <a href="/pages/links.html">Links</a>
            <a href="/pages/blogroll.html">Blogroll</a>
            <a href="/pages/wiki.html">Wiki</a>
          </nav>
        </header>

        <main>
          {children}
        </main>
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

function FooterIcon({ name }: { name: string }) {
  return (
    <svg>
      <use href={`/img/icons.svg#${name}`} />
    </svg>
  );
}

export function Post({title, date, children, footnotes}: {
  title: string,
  date: Date,
  children: any,
  footnotes: any[],
}) {

  // see: https://github.com/lumeland/markdown-plugins/blob/main/footnotes/demo/_includes/default.vto
  const ft_block = (footnotes: any[]) => {
    if (footnotes && footnotes.length > 0) {
      return (
        <aside role="note" class="footnotes">
          <ol>
            {footnotes.map((note) => {
              <li key={note.id} id={ note.id }>
                { note.content }
                <a href={`#${note.refId}`}
                  class="footnote-backref">↩
                </a>
              </li>
            })}
          </ol>
        </aside>
      );
    }
    return null;
  };

  return (
    <Base>

      <article
        class="post"
        data-pagefind-body
        data-title={title}
        data-pagefind-index-attrs="data-title" >
        <header>
          <h1 class="post-title">{ title }</h1>
          <Time className="meta" date={date} />
        </header>
        { children }
        {ft_block(footnotes)}
      </article>

    </Base>
  );
}

export function PostList({posts}: {posts: Page[]}) {
  const post_list = posts.map((post) => {
    return (
      <li key={post.title}>
        <Time className="meta" date={post.date} />
        <h2><a href={post.url}>{post.title}</a></h2>
        {post.summary && <p>{post.summary}</p>}
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

export function About({children, footnotes}: {
  children: any,
  footnotes: any[]
}) {
  return (
    <Base>
      { children }
    </Base>
  );
}

export function Blogroll({children, footnotes}: {
  children: any,
  footnotes: any[]
}) {
  return (
    <Base>
      { children }
    </Base>
  );
}

export function Links({children}: {children: any}) {
  return (
    <Base>
      { children }
    </Base>
  )
}
