import { Post } from './templates.tsx';

// pass over to Lume
export default (data: Lume.Data, helpers: Lume.Helpers) => {
    const { title, children, footnotes } = data;
    return (<Post title={title} children={children} footnotes={footnotes} />);
}
