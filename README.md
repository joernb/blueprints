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

The `.../master` suffix indicates the most stable version of a blueprint. However it is also possible to have other branches like `.../feature-xy` or `.../develop` on the same level.

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

## Extend a blueprint

To extend a blueprint `foo/master`, create a feature branch under `foo/` with a short name, that summarizes the change (e.g. `foo/extend-with-xyz`). Implement your change within this branch, open a merge request / pull request against `foo/master` and wait for approval.

Now the new change in `foo/master` needs to be merged into all dependent branches. For a dependent branch called `foo/bar/master`, create a branch called `foo/bar/extend-with-xyz` and do the merge within this branch.

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
