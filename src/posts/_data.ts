import { Page } from 'lume/core/file.ts';

export function url(page: Page) {
    const filename = page.sourcePath;
    const match = filename.match(/(\d{4})-(\d{2})-(\d{2})-(.+)\.md$/);
    if (match) {
        const [, year, month, day, title] = match;
        return `/${year}/${month}/${day}/${title}.html`;
    }
    return page.data.url;
}
