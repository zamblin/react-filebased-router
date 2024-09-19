import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  RouteObject,
} from 'react-router-dom';

const PAGES = import.meta.glob('/src/pages/**/[a-z[]*.tsx', { eager: true });

interface GenerateRoutesOptions {
  custom404?: React.ComponentType;
}

const generateRoutes = ({
  custom404,
}: GenerateRoutesOptions = {}): RouteObject[] => {
  const routes: RouteObject[] = [];

  console.log('Available pages:', Object.keys(PAGES));

  for (const path of Object.keys(PAGES)) {
    const fileName = path.match(/\/src\/pages\/(.*)\.tsx$/)?.[1];
    if (!fileName) {
      continue;
    }

    let normalizedPathName = fileName.replace(/\/index/, '');

    // Handle dynamic routes
    normalizedPathName = normalizedPathName.replace(/\[([^\]]+)\]/g, ':$1');

    const routePath =
      fileName === 'index' ? '/' : `/${normalizedPathName.toLowerCase()}`;

    console.log(`Creating route: ${routePath} -> ${path}`);

    routes.push({
      path: routePath,
      element: React.createElement((PAGES[path] as any).default),
      loader: (PAGES[path] as any).loader,
      action: (PAGES[path] as any).action,
      errorElement: (PAGES[path] as any).ErrorBoundary
        ? React.createElement((PAGES[path] as any).ErrorBoundary)
        : undefined,
    });
  }

  // Add the 404 route
  const notFoundPage = Object.keys(PAGES).find((path) =>
    path.endsWith('/404.tsx')
  );

  const notFoundElement = custom404
    ? React.createElement(custom404)
    : notFoundPage
    ? React.createElement((PAGES[notFoundPage] as any).default)
    : React.createElement(() => <div>Not Found</div>);

  routes.push({
    path: '*',
    element: notFoundElement,
  });

  console.log('Generated routes:', routes);

  return routes;
};

interface FileBasedRouterProps {
  basename?: string;
  custom404?: React.ComponentType;
}

const FileBasedRouter: React.FC<FileBasedRouterProps> = ({
  basename = '/',
  custom404,
}) => {
  const routes = generateRoutes({ custom404 });
  const router = createBrowserRouter(routes, { basename });

  return <RouterProvider router={router} />;
};

export default FileBasedRouter;
