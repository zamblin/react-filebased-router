import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  RouteObject,
} from 'react-router-dom';

interface PageModule {
  default: React.ComponentType;
  loader?: () => Promise<any>;
  action?: () => Promise<any>;
  ErrorBoundary?: React.ComponentType;
}

declare const import_meta: {
  glob: (
    path: string,
    options: { eager: boolean }
  ) => Record<string, PageModule>;
};

const pages = import.meta.glob<PageModule>('./pages/**/*.tsx', { eager: true });

const routes: RouteObject[] = [];

for (const path of Object.keys(pages)) {
  const fileName = path.match(/\.\/pages\/(.*)\.tsx$/)?.[1];
  if (!fileName) {
    continue;
  }

  const normalizedPathName = fileName.includes('$')
    ? fileName.replace('$', ':')
    : fileName.replace(/\/index/, '');

  routes.push({
    path: fileName === 'index' ? '/' : `/${normalizedPathName.toLowerCase()}`,
    element: React.createElement(pages[path].default),
    loader: pages[path]?.loader,
    action: pages[path]?.action,
    errorElement: pages[path]?.ErrorBoundary
      ? React.createElement(pages[path].ErrorBoundary!)
      : undefined,
  });
}

const router = createBrowserRouter(routes);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
