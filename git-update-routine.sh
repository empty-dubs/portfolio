#!/bin/bash
#Switches to master branch, pulls in latest changes, 
#switches back to dev branch, and merges master into dev branch

git checkout master
git pull
git checkout desktop-master
git merge master
