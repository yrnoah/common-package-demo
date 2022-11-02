# common-package-demo

# Notice
## svg images usage
to solve build svg file issue that webpack can not recognize react svg component, there are several steps should be done to use svg icons in the project:
  1. Copy the svg file from figma;
  2. Put them into the folder `/src/images/`;
  3. run the cmd `yarn convert-icons` in terminal;
  4. the script will auto generate the react component into `/src/icons` and export from `/src/icons/index.ts`;
  5. import icons from `/src/icons` in other ts/tsx files;

## zIndex
do not use large number like `999` to set zIndex in styles, please manage them in `/src/styles/zindex.less`, and run cmd `yarn translateLess zindex number`.
# Link Node Modules
link your local sui to another local project:

```tsx
// package cd sui
yarn link
// in portal project
yarn link "xxxx/sui"
// resolve node_modules path
// add alias config in the craco.config.js of portal project
 webpack: {
    alias: {
      "styled-components": path.resolve(
        __dirname,
        "node_modules",
        "styled-components"
      ),
      react: path.resolve(__dirname, "node_modules", "react"),
      "react-dom": path.resolve(__dirname, "node_modules", "react-dom"),
    }
 }

// unlink
yarn unlink "xxxx/sui"
yarn install --force
```
