import FileBasedRouter from './FilebasedRouter';

const Err = () => {
  return <div>Error</div>;
};

export const App = () => {
  return <FileBasedRouter custom404={Err} />;
};
