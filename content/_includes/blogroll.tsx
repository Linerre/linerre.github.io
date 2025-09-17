import { Blogroll, IBItem } from './templates.tsx';

// Page passed over to Lume
export default (data: Lume.Data, helpers: Lume.Helpers) => {
  return (
    <Blogroll items={data.rollList} />
  );
}
