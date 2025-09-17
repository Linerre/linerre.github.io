import { Links } from './templates.tsx';

// pass over to Lume
export default (data: Lume.Data, helpers: Lume.Helpers) => {
  const { children } = data;
  return (<Links children={children} />);
}
