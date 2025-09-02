import { Page } from 'lume/types.ts';
import { PostList } from './templates.tsx';

// pass over to Lume
export default async (data: Lume.Data, helpers: Lume.Helpers) => {
    const { search } = data;
    const posts = search.pages("type=post", "date=desc");
    return (<PostList posts={posts} />);
}
