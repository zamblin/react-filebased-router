# react-filebased-router

<p align="center">
    <img src="https://github.com/user-attachments/assets/82cce4b2-33fb-4755-9b84-82df328fc7cf" alt="icon" width="200"/>
</p>

### Install
installing with npm :
```
npm i react-filebased-router
```

installing with yarn :
```
yarn add react-filebased-router
```

Property	Description	Type	Default
### Property
| Property | Description | Type | Default |
| :---------: | :-------- | :-------- | :-------- |
| basename | Sets the base path for the router. This value is added to all routes.  | string | '/' |
| custom404 | Allows you to set a custom 404 page component. This component will be used when a 404 page is needed.  | React.ComponentType or React.ReactElement | <div>Not Found</div> |

### Example

```tsx
/* App.tsx */
import FileBasedRouter from 'react-filebased-router';

export const App = () => {
  return <FileBasedRouter />;
};
```
After configuring `App.tsx` as above, you should have the following file structure.
```
src
│
├── App.tsx
├── FileBasedRouter.tsx
├── index.tsx
│
└── pages
    ├── index.tsx
    ├── login.tsx
    │
    ├── community
    │   ├── index.tsx
    │   └── [id].tsx
    │
    └── [username]
        ├── index.tsx
        └── profile.tsx
```
The file structure like the one above will be matched as follows.
| URL Path                     | File Path                        |
|------------------------------|----------------------------------|
| `{baseurl}`                  | `pages/index.tsx`               |
| `{baseurl}/login`           | `pages/login.tsx`               |
| `{baseurl}/community`       | `pages/community/[id].tsx`      |
| `{baseurl}/community/{id}`  | `pages/community/index.tsx`     |
| `{baseurl}/{username}`      | `pages/[username]/index.tsx`    |
| `{baseurl}/{username}/profile` | `pages/[username]/profile.tsx` |
