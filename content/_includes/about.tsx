import { About } from './templates.tsx';


// pass over to Lume
export default (data: Lume.Data, helpers: Lume.Helpers) => {
    const { children, footnotes } = data;
    return (<About children={children} footnotes={footnotes} />);
}
