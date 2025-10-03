import { Page } from 'lume/types.ts';
import { IBItem } from './types.ts';

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
              <a href="/"> { site_name } </a>
              <a href="mailto:zlinerre@gmail.com">
                <FooterIcon name="email" />
              </a>
              <a href="https://github.com/Linerre">
                <FooterIcon name="github" />
              </a>
              <a href="https://x.com/giftboiling">
                <FooterIcon name="twitter" />
              </a>
              <a href="/feed.xml">
                <FooterIcon name="rss" />
              </a>
            </div>
            <a href="/pages/about.html">About</a>
            <a href="/pages/blogroll.html">Blogroll</a>
            <a href="/pages/links.html">Links</a>
            {/* <a href="/pages/wiki.html">Wiki</a> */}
          </nav>
        </header>

        <main>
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}

function yyyy_mm_dd(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function Time({ date, className = undefined }: {
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

function Footer() {
  return (
    <footer>
      <p>
        <a href="/feed.xml">
          <FooterIcon name="rss" />
          Subscribe
        </a>
        <a href="mailto:zlinerre@gmail.com">
          <FooterIcon name="email" />
          Contact
        </a>
        <a href="https://github.com/Linerre">
          <FooterIcon name="github" />
          Linerre
        </a>
        <a href="https://x.com/giftboiling">
          <FooterIcon name="twitter" />
          Errelin
        </a>
      </p>
    </footer>
  );
}

function FooterIcon({ name }: { name: string }) {
  return (
    <svg>
      <use href={`/img/icons.svg#${name}`} />
    </svg>
  );
}

function Footnote({ footnotes }: { footnotes: any[] }) {
  if (footnotes && footnotes.length > 0) {
      return (
        <aside role="note" class="footnotes">
          <hr/>
          <ol>
            {footnotes.map((note) => {
              return (
                <li key={note.id} id={note.id}>
                  {{ __html: note.content }}
                  <a href={`#${note.refId}`} class="footnote-backref">↩</a>
                </li>
              );
            })}
          </ol>
        </aside>
      );
  } else {
    return null;
  }
}

export function Post({title, date, children, footnotes}: {
  title: string,
  date: Date,
  children: any,
  footnotes: any[],
}) {

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
        <Footnote footnotes={footnotes} />
      </article>

    </Base>
  );
}

export function PostList({posts}: {posts: Page[]}) {
  const postList = posts.map((post) => {
    const { title, date, column, summary, url } = post;
    return (
      <li key={title}>
        <div className="meta">
          <Time date={date} />
          {column && <span>{column}</span>}
        </div>
        <h2><a href={url}>{title}</a></h2>
        {post.summary && <p>{summary}</p>}
      </li>
    );
  });

  return (
    <Base>
      <ul className="post-list">
        { postList }
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
      <Footnote footnotes={footnotes} />
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

export function Blogroll({items}: {items: IBItem[]}) {
  const rollList = items.map((item) => {
    const { date, title, author, url, domain, qorc } = item;
    return (
      <li key={title}>
        <h2>
          <a href={`${url}`}>{ title }</a>
        </h2>
        <span class="meta">
          <Time date={date} />, {domain}
        </span>
        {qorc && <p> {qorc} </p>}
        {author && <span class="author">by {author}</span>}
      </li>
    );
  });

  return (
    <Base>
      <p>Worth reading and re-reading.</p>
      <ul className="blogroll-list">
        { rollList }
      </ul>
    </Base>
  );
}
