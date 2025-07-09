to intialise the git in local
1) git init
2) git add .
3) git commit -m "messgae"
4) from github create the new repository

once you created the rep on github after that github will redirect on the page where you can see following commands

if you want to clone the github project
**or create a new repository on the command line**
echo "# NDJavaProject" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:nd198/NDJavaProject.git
git push -u origin main

// if you want to connect you local app to connect with github then execute the following commands
**…or push an existing repository from the command line**
git remote add origin git@github.com:nd198/NDJavaProject.git
git branch -M main
git push -u origin main


# What is version Control
version control also known as source control, is tracking and managing software code changes
famous VCS
1) Git
2) Apache subversion
3) piper(used by google)

**Git VCS commands**
git log --oneline - show the logs histry in short

git blame <file path> - we can check the entire history of the file , like who commits , time and all of the user id and there email

git reset --hard <commit id> :- it will revert back the code to the given commit id.

git rebase - history will mantained because, first it will find the common ancestor and undo the code then go till the latest commit and then commit the code one by one

git merge - we will loose the history

git stash

# GitHub(developed by microsoft)
it's git server
other server - Gitlab, Bitbucket

