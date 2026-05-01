#!/bin/bash
#Switches to master branch, pulls in latest changes, 
#switches back to dev branch, and merges master into dev branch

git checkout main
git pull
git checkout desktop-master
git merge main
