import React, {Suspense, useEffect} from 'react';
import nProgress from 'nprogress';
import AppRouter from './routing/AppRouter';

const RouteFallback = () => {
  useEffect(() => {
    nProgress.start();
    return () => {
      nProgress.done();
      nProgress.remove();
    };
  }, []);
  return null;
};

function App() {
  return (
    <div className="App">
      <Suspense fallback={<RouteFallback />}>
        <AppRouter />
      </Suspense>
    </div>
  )
}

export default App
