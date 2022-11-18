# Web Common

There are four packages in web-common project:

- sui

  Components library for REInvent.

- preview storybook:

  https://CompanyName.gitlab.io/space-on-demand1/switch-web-components

- design:

  https://www.figma.com/file/RF8IWdBs6aqTUAMWONDn97/Switch-Portal-Design-Sys-V-1.0

## Start Development

- go to specific package

```shell
cd packages/${package1}
```

- For sui

```shell
yarn storybook
```

- For other package

```shell
todo
```

## Build dist files

Run build command to generate lib files. We will put lib files to npm package registry after we publish to npm.

````shell
# For sui
npm run build:lib

## Testing in other project

### Using psync (Only work in mac)

- Install psync

```shell
npm install -g @fmfe/psync
````

- Sync modified files

```shell
psync --dir=$PWD --dir=${absolute-path-to-other-project}
```

Maybe we need to re-run `npm start` in other job, cause webpack will ignore node_modules change.

After we change source code, we NEED to run `npm run build:lib` every time to generate new lib files to sync.

- Rollback to origin version (in other project)

```shell
yarn install --force
```

### Using Prerelease

Sometimes, we need to test modified package on some real env. Such as we do some change on `portal-api`, and want to test on remote (not only local machine). Consider to use below code

```shell
npx lerna version prerelease --include-merged-tags --yes
```

It will use `alpha` as `preid` for new published packages. Then you can run

```shell
npm install @@CompanyName/portal-api@alpha
```

in dependency packages.

## Publish to npm private registry

We only publish package in `main` branch use `npx lerna publish from-package --yes` and `master` branch only accept merge request.

### Following below steps for new version publish:

- Create a MR about new updates
- Someone approval this MR
- Use `npx lerna version [patch | minor | major] --include-merged-tags true` to generate a new version and tag
- Finally, merge this branch to `main`
- then trigger the publish job in CI/CD pipeline.

### manual: run script after build:

```
npx lerna version [patch | minor | major] --include-merged-tags true
npx lerna publish
```

## Use package in other project

example:

```
https://gitlab.com/CompanyName/space-on-demand1/admin-portal/-/commit/a3174b734fd8f6b63b7dd5ce1e664392b0e45cfb
```

### Add .npmrc

```
@CompanyName:registry=https://gitlab.com/api/v4/projects/xxxxxx/packages/npm/
```

Create .npmrc in project root. Set package scope `@CompanyName` use `https://gitlab.com/api/v4/projects/xxxxxx/packages/npm/` as package registry.

### Config authToken for registry

- Create auth token in gitlab

Follow [this guide](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html#creating-a-personal-access-token) to create a access token. In order to fetch and download gitlab private NPM packages, the token need (api / read_api / read_registry) scope.

- Set auth token for registry

```shell
npm config set //gitlab.com/api/v4/projects/xxxxxx/packages/npm/:_authToken "TOKEN_CREATED_IN_LAST_STEP"
```

### Config auth token for CI

Open `.gitlab-ci.yml` in project root, add following script in install script

```shell
npm config set //gitlab.com/api/v4/projects/xxxxxx/packages/npm/:_authToken ${CI_JOB_TOKEN}
```
