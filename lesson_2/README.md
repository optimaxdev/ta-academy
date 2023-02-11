# Lesson 2 - Initial setup


### Install all programms
 - [VSCode](https://code.visualstudio.com/) 
 - [GIT CLI](https://git-scm.com/downloads)
 - [Node](https://nodejs.org/en/) download the LTS version
 - [Yarn v1](https://classic.yarnpkg.com/en/docs/install) - You can scroll to `Alternatives` section to install it without npm

### VSCode setup
 - Install plugins: 
	- Eslint
	- Prettier
	- Playwright

### Git setup:
 - [Generate new ssh key with](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent): 
```sh 
ssh-keygen -t ed25519 -C "your_email@example.com" 
```
 - [Add ssh key to your git account](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account)
	- Copy your ssh key file contents (`~/.ssh/id_ed25519.pub` by default)
	- [Open git's `keys` page](https://github.com/settings/keys)
	- Click `New SSH key`, fill `Title` & `Key`
 - Set `email` & `username`: 
```sh
git config --global user.email "example@example.com"
git config --global user.name "FIRST_NAME LAST_NAME"
```
