http://rogerdudler.github.io/git-guide/
https://github.com/git-tips/tips
https://itnext.io/become-a-git-pro-in-just-one-blog-a-thorough-guide-to-git-architecture-and-command-line-interface-93fbe9bdb395

/*SETUP BEFORE RUNNING THE SCRIPT*/

mkdir test
cd test\
Initialize a repo on github
create a .env file with your credentials
start the script

/* FIRST TIME CLONNING AND REPOSITORY INITIALIZATION */

git clone https://github.com/EOS-Mainnet/eos.git --recursive
cd eos
* add files we want to remove to the .gitignore file, create it if not exist
git remote rename origin upstream
git remote add origin https://github.com/JAVince/eos2
git pull upstream master --recurse-submodules //Change master for the version or tag you want
git push origin master
git checkout origin/master -b eosTitan
* On local machine, remove rc.md files and empty properties in "ricardian_contract":"" / "ricardian_clauses":[] in abi files
Need to change or add file to be able to commit to the new branch
git add .
git status
git commit -am "First commit"
git status
git push origin eosTitan
./eosio_build.sh

/* IF REPOSITORY EXIST */

git checkout master
git pull upstream master --recurse-submodules
git add .
git status
git commit -am "Updated to last version"
git status
git push origin master
git checkout eosTitan
git add .
git commit -am "Commit before merge"
git pull origin eosTitan
git push origin eosTitan
git merge master -m "Merged with last master update"
git push origin eosTitan
./eosio_build.sh
