# Switch Web Projects Introduction
## Projects:
- Admin Portal 
- Space Partner Portal 
- Switch for Business Portal 
- Common Packages (Components & Variables & Utils) 
- Switch Home Website & Webview Pages
- Switch Email Template
- Switch PDF Templates
- Switch CMS
- Switch Wechat Mini Program (deprecated)
- Common Page(Base on iframe)

## Prepare:
- Node.js version >= 14.17.0
- Yarn
- A code editor (VSCode is a nice one, and some extensions are recommended like `Code Spell Checker`, `Prettier`, `vscode-styled-components`…)
- REI Web Architecture
- Git Flow
Develop:
- Copy project from Gitlab
- If the common package (`@CompanyName/*`) is listed in the package.json of the project, please following the package doc, create a personal access token and run ` npm config set //gitlab.com/api/v4/projects/xxxxxx/packages/npm/:_authToken "TOKEN_YOU_CREATED" `
- Go to the project and run `yarn` to install node modules.
- Sync lokalise translation (if needed): create .env.local in project, put your lokalise token (profile) into it, run `yarn lang:sync`.
- After dependencies are installed, run `yarn start` to start app. (If the command code is incorrect, please check the scripts in package.json)
- Open http://localhost:3000, the app should be running.



## Accounts:
- Admin portal: ask backend (env-develop/test/staging)
- SP portal: ask backend or create by yourself on home website
- SFB portal: ask backend or create by yourself on home website 
## Additional Notes:
- Before submitting the Merge Request to staging branch, please rebase feature branch with the staging branch. Such as “git pull --rebase origin staging” (or master)
- Before releasing tags, please merge master branch changes to staging (or rebase staging with master) if there are any changes that are not contained in staging such as hotfix and so on.
- For long term maintenance, please limit the amount of Merge Request’s commits that are submitted to the staging branch. You can either use Gitlab’s auto squash or combine commits by self.
- Common components: please write *.stories.tsx for each new component.
