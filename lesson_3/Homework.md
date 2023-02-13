# Lesson 3 - Create pull request

- Checkout to new branch

```sh
git checkout -B my_new_branch
```

- Make some changes
- Commit changed files

```sh
git add .
```

```sh
git commit -m 'feat: i make some changes'
```

- Push & publish new branch

```sh
git push --set-upstream origin my_new_branch
```

- Goto [ta-academy](https://github.com/optimaxdev/ta-academy) `Code` page
- Click `Compare & pull request`
  ![pull request](/images/pull_request_create.png)
- Fill `Title` & click "Create pull request"
  ![open PR](/images/open_pull_request.png)
