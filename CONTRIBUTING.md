# How we work on Skeined

This is the branching + release playbook. Follow it and the right things deploy to the
right places automatically. No manual builds, no cPanel uploads — ever.

## The three kinds of branches

| Branch | Purpose | Deploys to | Who pushes here |
| --- | --- | --- | --- |
| `main` | Production. Always live, always stable. | **skeined.com** | Nobody directly — only via Pull Request from `develop`. |
| `develop` | Integration / staging. The next release in progress. | **staging.skeined.com** | Nobody directly — only via Pull Request from feature branches. |
| `feat/*`, `fix/*`, `chore/*`, `docs/*` | One change at a time. Short-lived. | Nothing (CI build check only). | You. Freely. |

Both `main` and `develop` are **protected**: no direct pushes, no force-push, no deletion,
and the CI **build** check must pass before a Pull Request can merge.

## Branch naming

Pick the prefix that matches the work, then a short kebab-case description:

- `feat/waitlist-referral` — a new feature or section
- `fix/hero-button-mobile` — a bug fix
- `chore/bump-deps` — tooling, config, dependencies
- `docs/update-privacy-copy` — copy or documentation

## Everyday flow: making a change

```bash
# 1. Start from the latest develop
git checkout develop
git pull

# 2. Branch off for your change
git checkout -b feat/hero-new-headline

# 3. Do the work, committing as you go
git add -A
git commit -m "feat: punchier hero headline"

# 4. Push and open a Pull Request INTO develop
git push -u origin feat/hero-new-headline
gh pr create --base develop --fill

# 5. CI runs the build check. When it's green, merge:
gh pr merge --squash --delete-branch
```

The moment it merges, `develop` deploys to **staging.skeined.com**. Go look at it there.

## Releasing to production

When staging looks good and you want it live for customers:

```bash
gh pr create --base main --head develop --title "Release: <what changed>" --fill
# CI runs again; when green:
gh pr merge --merge   # (use a merge commit for releases, not squash)
```

Merging into `main` deploys to **skeined.com**. Done.

> Tip: You can also open PRs from the GitHub website (the "Compare & pull request"
> button). The CLI just skips the clicking.

## Hotfixes (something's broken in production, fix it NOW)

```bash
git checkout main && git pull
git checkout -b fix/urgent-thing
# ...fix, commit, push...
gh pr create --base main --fill      # straight to main for emergencies
gh pr merge --squash --delete-branch
# then bring the fix back into develop so it isn't lost:
git checkout develop && git pull
git merge main && git push
```

## Rules of thumb

- **One change = one branch = one PR.** Keep them small; they review and deploy faster.
- **Never commit directly to `main` or `develop`.** GitHub will block it anyway.
- **Preview on staging before production.** That's the whole point of `develop`.
- **Delete branches after merge** (`--delete-branch` does it for you). Keep the repo tidy.
