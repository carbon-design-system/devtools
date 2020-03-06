# Contributing

## Our contribution model

We pride ourselves in open and inclusive design and development. If you're wondering more about our contribution process, you're in the right place. First off, thank you for your interest! This project is made possible by several community members who have invested their own time to give back to the community.

## Code of conduct

We value all of our community members, and thus want to foster a positive contributing environment. Please take a look at our [code of conduct](https://github.ibm.com/james.dow/ibm-dotcom-devtools/blob/dev/.github/CODE_OF_CONDUCT.md) before engaging in our workspaces.

## Prerequisites

Before contributing, you should make sure you have the following tools installed:

- [Node.js](https://nodejs.org/en/download/) v10 or above here or follow their
  installation through a package manager
  [here](https://nodejs.org/en/download/package-manager/))
  - If you're on macOS, we recommend using
    [`nvm`](https://github.com/nvm-sh/nvm) to help manage different versions of
    Node.js [nvm](https://github.com/nvm-sh/nvm/blob/master/README.md) as your
    version manager for Node.
- Git
- [Yarn](https://yarnpkg.com/en/docs/install)

You'll also need a code editor to make changes. There are many to
choose from but some popular options are
[VSCode](https://code.visualstudio.com/), [Atom](https://atom.io), and
[Sublime](https://www.sublimetext.com/).

With that all in place, you're ready to start contributing!

## Start contributing

### 1. Fork the repo:

Go to
[IBM.com Devtools repository](https://github.com/james-dow/ibm-dotcom-devtools) on GitHub and click the `Fork` button in the top-right corner. This will create a copy of the repo associated with your account.

### 2. Clone your fork:

1.  Go to your [GitHub Repositories](https://github.com/settings/repositories).
2.  Click on `[your_github_username]/ibm-dotcom-devtools`.
3.  Click on the `Clone or Download` button and copy the URL from the
    `Clone with SSH` option. It should start with `git@github.com...`

In your terminal:

```sh
git clone git@github.com:[your_github_username]/ibm-dotcom-devtools.git
cd ibm-dotcom-devtools
```

See [GitHub docs](https://help.github.com/articles/fork-a-repo/) for more
details.

### 3. Add upstream remotes

When you clone your forked repo, running `git remote -v` will show that the `origin` is pointing to your forked repo by default.

Now you need to add the `james-dow/ibm-dotcom-devtools` repo as your upstream remote branch:

```sh
# Add the upstream remote to your repo
git remote add upstream git@github.com:james-dow/ibm-dotcom-devtools.git

# Verify the remote was added
git remote -v
```

Your terminal should output something like this:

```sh
origin  [your forked repo] (fetch)
origin  [your forked repo] (push)
upstream    git@github.com:james.dow/ibm-dotcom-devtools.git (fetch)
upstream    git@github.com:james.dow/ibm-dotcom-devtools.git (push)
```

### 4. Work in a branch

When contributing, your work should always be done in a branch off of your repo, this is also how you will submit your pull request when your work is done.

To create a new branch, ensure you are in your forked branch in your terminal and run:

```sh
git pull origin master
git checkout -b {your-branch-name}
```

### 5. Build and start the development server

From the root directory of your fork, run:

```sh
# To install the project's dependies
yarn install --offline

# To build the production ready files:
yarn build

# To watch the project files in development:
yarn watch
```

### 6. Make a pull request

**Note:** Before you make a pull request,
[search](https://github.ibm.com/james-dow/ibm-dotcom-devtools/issues) the issues to see if a similar issue has already been submitted. If a similar issue has been submitted, assign yourself or ask to be assigned to the issue by posting a comment. If the issue does not exist, please make a new issue. Issues give us context about what you are contributing and expedite the process to getting your contributions merged. It's a win for everybody :tada:

When you're at a good stopping place and you're ready for feedback from other contributors and maintainers, **push your commits to your fork**:

To do so, go to your terminal and run:

```sh
git add .
git commit -m "<type>(<scope>): YOUR  COMMIT MESSAGE HERE"
```

#### Commit tip

> **Writing commit messages**
>
> - `<type>` indicates the type of commit that's being made. This can be:
>   `feat`, `fix`, `perf`, `docs`, `chore`, `style`, `refactor`
> - `<scope>` The scope could be anything specifying place of the commit change
>   or the thing(s) that changed.

After your changes are commited, run:

```sh
git push -u origin { YOUR_BRANCH_NAME }
```

In your browser, navigate to [james-dow/ibm-dotcom-devtools](https://github.ibm.com/james-dow/ibm-dotcom-devtools) and click the button that reads `Compare & pull request`. Write a title and description then click `Create pull request`

- [How to write the perfect pull request](https://github.com/blog/1943-how-to-write-the-perfect-pull-request)

### 9. Updating a pull request

Stay up to date with the activity in your pull request. Maintainers will be reviewing your work and making comments, asking questions and suggesting changes to be made before they merge your code.

When you need to make a change, use the same method detailed above except you no longer need to run `git push -u origin { YOUR_BRANCH_NAME }` just `git push`.

Once all revisions to your pull request are complete, maintainers will squash and merge your commits for you.

## FAQ

### Who can contribute?

Anyone! We mean it.

- **Development:** If coding is your thing, you can help us by contributing bug fixes or community components.
- **Design:** Design contributions can vary from visual assets, UX interactions, motion design and more.
- **Content:** Our documentation is just as important as our design and code assets. Whether it's updating our current docs, or adding new ones, anyone can contribute.
- **Research:** If you're a researcher and have findings that you think could improve the users' experience, you're in the right place. This kind of contribution is most effective if coupled with design and development forces, which would be presented in a GitHub issue and subsequent PR.
- **Report bugs.** Even if you don't have the time to contribute a bug fix,
opening an issue alone makes a big difference! Be sure to completely fill out
the issue template to best help us understand what is going wrong.

### What is the contribution process?

1. **Issue:** Check repo for an _existing_ issue related to your contribution first. If none exist, open a new issue. We reserve the right to close any issues that haven't been filled out properly according to the issue template.
2. **Development environment:** If you haven't already, fork and clone whichever repo you want to contribute to. Then, create a new branch and add your contribution in it.
4. **Pull request:** Submit a PR. Be sure to fill out the template properly.
5. **Approval:** Get PR approved by design and developers, or make any necessary changes for approval. This process may be quick or take a few iterations of feedback-update.
6. **Documentation:** After design and dev have approved and merged PR, update any documentation if necessary. One of the best examples for this is if you're contributing to component work which has documentation related to your contribution.

Here are some contribution quick tips:

- **Do** check repos for existing issues.
- **Do** fill out the required template for contributions entirely; this
  pertains to both issues and PRs.
- **Do** add or update tests for any contributions that require it.
- **Do** follow existing coding and writing styles.
- **Do** follow proper commit messages syntax.
- **Do not** include unrelated changes in the same PR.
- **Do not** create one massive PR if it can be broken up into smaller PRs.