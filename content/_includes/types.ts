// Blogroll
export interface IBItem {
  date: Date,
  title: string,
  url: string,
  domain: string,
  // quote or comment
  qorc?: string,
  authors?: string[],
}
