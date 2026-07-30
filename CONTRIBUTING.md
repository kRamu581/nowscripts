# Contributing to NowScripts

First off, thank you for considering contributing to NowScripts! It's people like you that make open source such a great community.

## Where do I go from here?

If you've noticed a bug or have a feature request, make sure to check our [Issues](https://github.com/kRamu81/nowscripts/issues) to see if someone else in the community has already created a ticket. If not, go ahead and make one!

## Fork & create a branch

If this is something you think you can fix, then fork NowScripts and create a branch with a descriptive name.

A good branch name would be (where issue #325 is the ticket you're working on):

```sh
git checkout -b issue/325/add-new-dashboard
```

## Implementation guidelines

- Ensure that any new UI components follow the existing design system (Tailwind CSS classes, Lucide React icons).
- Add comments to any complex logic.
- Ensure your code doesn't break the existing build (`npm run build`).

## Make a Pull Request

At this point, you should switch back to your master branch and make sure it's up to date with NowScripts' master branch:

```sh
git remote add upstream https://github.com/kRamu81/nowscripts.git
git checkout main
git pull upstream main
```

Then update your feature branch from your local copy of main, and push it!

```sh
git checkout issue/325/add-new-dashboard
git rebase main
git push --set-upstream origin issue/325/add-new-dashboard
```

Finally, go to GitHub and make a Pull Request.

## Keeping your Pull Request updated

If a maintainer asks you to "rebase" your PR, they're saying that a lot of code has changed, and that you need to update your branch so it's easier to merge.

Thank you!
