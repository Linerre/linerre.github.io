import { Post } from './templates.tsx';

// pass over to Lume
export default (data: Lume.Data, helpers: Lume.Helpers) => {
  const { title, date, children, footnotes } = data;
  return (<Post title={title} date={date} children={children} footnotes={footnotes} />);
}
