module.exports = {
  hooks: {
    "pre-commit": "lerna run --concurrency 1 --stream precommit --since HEAD --exclude-dependents",
    "commit-msg": "commitlint -E HUSKY_GIT_PARAMS",
  },
};
