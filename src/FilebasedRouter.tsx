/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  RouteObject,
} from "react-router-dom";

const PAGES = import.meta.glob("/src/pages/**", { eager: true });

interface GenerateRoutesOptions {
  custom404?: React.ComponentType | React.ReactElement;
}

const generateRoutes = ({
  custom404,
}: GenerateRoutesOptions = {}): RouteObject[] => {
  const routes: RouteObject[] = [];

  console.log("Found files:", Object.keys(PAGES));

  for (const path of Object.keys(PAGES)) {
    const fileName = path
      .match(/\/src\/pages\/(.*)\.(tsx|jsx)$/)?.[1]
      .toLowerCase();
    if (!fileName) continue;

    // Handle Router Groups ( /(trash)/test1.tsx, /(trash)/test2.tsx )
    let routePath = fileName.replaceAll(/\((.*)\)\//g, "");

    // Handle Dynamic Routes ( /[path1]/[path2] )
    routePath = routePath.replaceAll(/\[([^\]]+)\]/g, ":$1");

    // Handle Index Routes ( /path/index )
    routePath = routePath.replaceAll("index", "");

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
    path.endsWith("/404.tsx")
  );

  const notFoundElement = custom404
    ? React.isValidElement(custom404)
      ? custom404
      : React.createElement(custom404 as React.ComponentType)
    : notFoundPage
    ? React.createElement((PAGES[notFoundPage] as any).default)
    : React.createElement(() => <div>Not Found</div>);

  routes.push({
    path: "*",
    element: notFoundElement,
  });
  console.log("Generated routes:", routes);
  return routes;
};

interface FileBasedRouterProps {
  basename?: string;
  custom404?: React.ComponentType | React.ReactElement;
}

const FileBasedRouter: React.FC<FileBasedRouterProps> = ({
  basename = "/",
  custom404,
}) => {
  const routes = generateRoutes({ custom404 });
  const router = createBrowserRouter(routes, { basename });

  return <RouterProvider router={router} />;
};

export default FileBasedRouter;
