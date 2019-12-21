<h1 align="center">
  <font size="10">✨🗺✨</font><br/>
  Blueprints
</h1>

Blueprints are Git branches, that contain boilerplate code for all kinds of technologies and features. You can merge them together to start a new project. Their structure is optimized for avoiding difficult merge conflicts.

🏷 Blueprints follow a naming scheme (e.g. `node/react/master`), that shows the relationships between them and also indicate how changes are merged from one blueprint to another.

🚀 Blueprints outline development workflows taking **CI/CD** and **DevOps Best Practices** into account.

📘 Blueprints document architecture, onboarding instructions and follow-up customization tasks.

🔄 Projects created by merging blueprints together will be able to receive updates from those blueprints later.

# ⚗️ How to use

Start a new Git repository:

```sh
git init foo
cd foo
```

Fetch the blueprints:

```sh
git remote add blueprints <blueprints-repo-url>
git fetch blueprints
```

List available blueprints (`-r` = remote branches):

```sh
git branch -r
```

Craft something by merging blueprints into the new repository:

```sh
git merge blueprints/foo/master
git merge blueprints/bar/master
```

There is an alternative way to merging if you don't want to inherit a blueprint's commit history:

```sh
git co blueprints/foo/master
git reset <local-branch>
git co <local-branch>
git add -A
git commit
```

Refer to the `README.md` in your new repository to continue.
You can also list follow-up customization tasks by searching for `TODO` comments in the code:

```sh
grep -r "TODO" .
```

# 🔱 Structure

Blueprint branches are Git branches, that have a hierarchical structure encoded in their branch name. Here are some examples:

            ┏━━━━━━━━━━━━━┓
            ┃   master    ┃
            ┗━━━━━━━━━━━━━┛
                   ┃
            ┏━━━━━━━━━━━━━┓
            ┃ node/master ┃
            ┗━━━━━━━━━━━━━┛
                   ┃
             ┏━━━━━┻━━━━━━━━━━┓
             ┃                ┃
    ┏━━━━━━━━━━━━━━━━━━━┓┏━━━━━━━━━━━━━━━━━┓
    ┃node/angular/master┃┃node/react/master┃
    ┗━━━━━━━━━━━━━━━━━━━┛┗━━━━━━━━━━━━━━━━━┛
                                ┃
                  ┏━━━━━━━━━━━━━┻━━━━━━━━┓
                  ┃                      ┃
    ┏━━━━━━━━━━━━━━━━━━━━━━━┓┏━━━━━━━━━━━━━━━━━━━━━━┓
    ┃node/react/redux/master┃┃node/react/rxjs/master┃
    ┗━━━━━━━━━━━━━━━━━━━━━━━┛┗━━━━━━━━━━━━━━━━━━━━━━┛

This naming scheme shows the dependencies between the branches. For example, `node/react/master` is based on `node/master`, which means, that changes to `node/master` should always be merged into `node/react/master`.

Here is a shell command to find direct children of the current branch (e.g. `foo/master` -> `foo/*/master`):

```sh
git rev-parse --abbrev-ref --branches | grep -e "$(git rev-parse --abbrev-ref HEAD | sed 's/\(.*\)\/\(.*\)/\1/')/[^\/]*/master"
```

The `.../master` suffix indicates the most stable version of a blueprint. However it is also possible to have other branches like `.../feature-xy` or `.../develop` on the same level making it possible to have feature branches for modifying a blueprint.

Most blueprint branches are based on one parent branch. However it is also possible to have branches, which implement the combination of two blueprint branches if their combination requires some effort.

Here is an example:

              ┏━━━━━━━━━━━━━┓
              ┃ node/master ┃
              ┗━━━━━━━━━━━━━┛
                     ┃
             ┏━━━━━━━┻━━━━━━━━┓
             ┃                ┃
    ┏━━━━━━━━━━━━━━━━━┓┏━━━━━━━━━━━━━━━━━┓
    ┃node/react/master┃┃node/redux/master┃
    ┗━━━━━━━━━━━━━━━━━┛┗━━━━━━━━━━━━━━━━━┛
            ┃                    ┃
            ┗━━┳━━━━━━━━━━━━━━━━━┛
               ┃
    ┏━━━━━━━━━━━━━━━━━━━━━━━┓
    ┃node/react/redux/master┃
    ┗━━━━━━━━━━━━━━━━━━━━━━━┛

Those branches will receive changes from both of their parents.

# 🌸 Contributing

## Modify a blueprint

### Feature branch

To modify a blueprint `foo/master`, create a feature branch under `foo/` with a short name, that summarizes the change (e.g. `foo/extend-with-xyz`). Implement your change within this branch and open a merge request / pull request against `foo/master`.

### Recursive merge cascade

If a blueprint is changed, all child blueprints also need to be updated to keep them consistent. So if `foo/master` changes, those changes need to be merged into `foo/bar/master` as well. This can be done by creating a feature branch based on the child's master branch and merging the parent's feature branch into it.

Create a feature branch `foo/bar/extend-with-xyz` based on `foo/bar/master` and check it out:

```sh
git co -b foo/bar/extend-with-xyz foo/bar/master
```

Merge the parent's feature branch `foo/extend-with-xyz` into it:

```sh
git merge foo/extend-with-xyz
```

Now solve merge conflicts and open another merge request / pull request against `foo/bar/master`.

This updating step needs to be applied recursively to all children of `foo/bar/master` as well.

## Create a new blueprint

Think carefully if your contribution justifies the creation of a new blueprint.

Too many fine-grained blueprints will lead to a lot of merging and an increasing risk of difficult merge conflicts. Too few monolithic blueprints however limit reusability and decoupling.

Create a new blueprint `foo/bar/master` by branching it from its parent `foo/master`:

```sh
git co -b foo/bar/master foo/master
```

## Rename a blueprint / restructure the hierarchy

Rename local branch:

```sh
git branch -m <old-name> <new-name>
```

Rename remote branch:

```sh
git push <remote-name> --delete <old-name>
git branch <old-name> --set-upstream-to=origin/<new-name>
```
