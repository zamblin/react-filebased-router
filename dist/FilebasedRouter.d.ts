import { default as React } from 'react';
interface FileBasedRouterProps {
    basename?: string;
    custom404?: React.ComponentType | React.ReactElement;
}
declare const FileBasedRouter: React.FC<FileBasedRouterProps>;
export default FileBasedRouter;
