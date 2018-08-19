// https://www.npmjs.com/package/simple-git

require('dotenv').config();
const fs = require('fs');
const gitP = require('simple-git/promise');
const git = require('simple-git');

const GIT_USER = process.env.GIT_USER;
const GIT_PASS = process.env.GIT_PASS;
const GIT_REPO = process.env.GIT_REPO;
const GIT_CLONE = process.env.GIT_CLONE;
const ORIGIN = `https://${GIT_USER}:${GIT_PASS}@${GIT_REPO}`;
const UPSTREAM = `${GIT_CLONE}`;
const LOCAL_REPO = UPSTREAM.split("/").pop();
const MASTER = 'master';
const DEV_BRANCH = process.env.GIT_BRANCH;
const REPO_EXIST = fs.existsSync(`./${LOCAL_REPO}`);

if (!REPO_EXIST){
console.log(`Repository '${LOCAL_REPO}' doesn't exist, creating it\n`);

gitClone()
  .then(() => {
    console.log('1');
    return new Promise(function(resolve, reject) {
      git(`./${LOCAL_REPO}`).removeRemote('origin', () => {
        console.log('Origin remote deleted');
        resolve();
      })
    })
  })
  .then(() => {
    console.log('2');
    return new Promise(function(resolve, reject) {
       git(`./${LOCAL_REPO}`).addRemote('origin', ORIGIN, () => {
        console.log(`Created a new remote "origin" pointing to ${ORIGIN}`);
        resolve();
      })
    })
  })
  .then(() => {
    console.log('3');
    return new Promise(function(resolve, reject) {
      git(`./${LOCAL_REPO}`).addRemote('upstream', UPSTREAM, () => {
        console.log(`Created a new remote "upstream" pointing to ${UPSTREAM}`)
        resolve();
      })
    })
  })
  .then(() => {
    console.log('4');
    return new Promise(function(resolve, reject) {
      git(`./${LOCAL_REPO}`).getRemotes(true, (err, res) => {
        console.log(res);
        resolve();
      }) 
    })
  })
  .then(() => {
    console.log('5');
    return new Promise(function(resolve, reject) {
      git(`./${LOCAL_REPO}`).pull('upstream', MASTER, '--recurse-submodules', () => {
        console.log(`Git pull --recurse-submodules from ${UPSTREAM}`);
        resolve();
      })
    })
  })
  .then(() => {
    console.log('6');
    return new Promise(function(resolve, reject) {
      git(`./${LOCAL_REPO}`).push('origin', MASTER, () => {
        console.log(`Git push to origin/${MASTER} at ${ORIGIN}`);
        resolve();
      }) 
    })
  })
  .then(() => {
    console.log('7');
    return new Promise(function(resolve, reject) {
      git(`./${LOCAL_REPO}`).checkoutLocalBranch(`${DEV_BRANCH}`, () => {
        console.log(`Creating new branch '${DEV_BRANCH}' at origin/${MASTER} at ${ORIGIN}`);
        resolve();
      })
    })
  })
  .then(() => {
    console.log('8');
    return new Promise(function(resolve, reject) {
      git(`./${LOCAL_REPO}`).branch((err, res) => {
        console.log(res);
        resolve();
      })
    })
  })
  .then(() => {
    console.log('9');
    return new Promise(function(resolve, reject) {
      git(`./${LOCAL_REPO}`).checkout(DEV_BRANCH)
      resolve();
    })
  })
  .then(() => {
    console.log('10');
    return new Promise(function(resolve, reject) {
      fs.appendFile(`./${LOCAL_REPO}/TESTV.txt`, 'Test content!', (err) => {
              if (err) throw err;
              console.log('Saved!');
              resolve();
            })
      })
  })
  .then(() => {
    console.log('11');
    return new Promise(function(resolve, reject) {
      git(`./${LOCAL_REPO}`).add('./*');
      resolve();
      })
  })
  .then(() => {
    console.log('12');
    return new Promise(function(resolve, reject) {
      git(`./${LOCAL_REPO}`).status((err, res) => {
        console.log(res);
        resolve();
      })
    })
  })
  .then(() => {
    console.log('13');
    return new Promise(function(resolve, reject) {
      git(`./${LOCAL_REPO}`).commit(() => {
        console.log('First commit');
        resolve();
      })
    })
  })
  .then(() => {
    console.log('14');
    return new Promise(function(resolve, reject) {
      git(`./${LOCAL_REPO}`).status((err, res) => {
        console.log(res);
        resolve();
      })
    })
  })
  .then(() => {
    console.log('15');
    return new Promise(function(resolve, reject) {
      git(`./${LOCAL_REPO}`).push('origin', DEV_BRANCH, () => {
        console.log(`Git push to origin/${DEV_BRANCH} at ${ORIGIN}`);
        resolve();
      })
    })
  })
  .catch((err) => console.error('\nERROR \n', err));
} 
else {

// IF ROPO EXIST
console.log(`Updating repository '${LOCAL_REPO}\n'`);

gitCheckout(MASTER)
  .then(() => {
    console.log('1');
    return new Promise(function(resolve, reject) {
      git(`./${LOCAL_REPO}`).pull('upstream', MASTER, '--recurse-submodules', () => {
        console.log(`Git pull --recurse-submodules from ${UPSTREAM}`);
        resolve();
      })
    })
  })
  .then(() => {
    console.log('2');
    return new Promise(function(resolve, reject) {
      git(`./${LOCAL_REPO}`).add('./*');
      resolve();
      })
  })
  .then(() => {
    console.log('3');
    return new Promise(function(resolve, reject) {
      git(`./${LOCAL_REPO}`).status((err, res) => {
        console.log(res);
        resolve();
      })
    })
  })
  .then(() => {
    console.log('4');
    return new Promise(function(resolve, reject) {
      git(`./${LOCAL_REPO}`).commit(`Last update from the upstream repo at ${UPSTREAM}`, resolve())
    })
  })
  .then(() => {
    console.log('5');
    return new Promise(function(resolve, reject) {
      git(`./${LOCAL_REPO}`).status((err, res) => {
        console.log(res);
        resolve();
      })
    })
  })
  .then(() => {
    console.log('6');
    return new Promise(function(resolve, reject) {
      git(`./${LOCAL_REPO}`).push('origin', MASTER, () => {
        console.log(`Git push to origin/${MASTER} at ${ORIGIN}`);
        resolve();
      }) 
    })
  })
  .then(() => {
    console.log('7');
    return new Promise(function(resolve, reject) {
      git(`./${LOCAL_REPO}`).checkout(DEV_BRANCH)
      resolve();
    })
  })
  .then(() => {
    console.log('LOG');
    return new Promise(function(resolve, reject) {
      git(`./${LOCAL_REPO}`).status((err, res) => {
        console.log(res);
        resolve();
      })
    })
  })
  .then(() => {
    console.log('8');
    return new Promise(function(resolve, reject) {
      git(`./${LOCAL_REPO}`).mergeFromTo(MASTER , DEV_BRANCH, () => {
      console.log(`Merged ${MASTER} to ${DEV_BRANCH}`);
      resolve();
      })
    })
  })
  .then(() => {
    console.log('9');
    return new Promise(function(resolve, reject) {
      git(`./${LOCAL_REPO}`).add('./*');
      resolve();
      })
  })
  .then(() => {
    console.log('10');
    return new Promise(function(resolve, reject) {
      git(`./${LOCAL_REPO}`).status((err, res) => {
        console.log(res);
        resolve();
      })
    })
  })
  .then(() => {
    console.log('11');
    return new Promise(function(resolve, reject) {
      git(`./${LOCAL_REPO}`).commit('Merged last update from the upstream repository', resolve())
      })
  })
  .then(() => {
    console.log('12');
    return new Promise(function(resolve, reject) {
      git(`./${LOCAL_REPO}`).status((err, res) => {
        console.log(res);
        resolve();
      })
    })
  })
  .then(() => {
    console.log('13');
    return new Promise(function(resolve, reject) {
      git(`./${LOCAL_REPO}`).pull('origin', DEV_BRANCH, () => {
        console.log(`Git pull from 'origin' ${DEV_BRANCH}`);
        resolve();
      })
    })
  })
  .then(() => {
    console.log('14');
    return new Promise(function(resolve, reject) {
      git(`./${LOCAL_REPO}`).push('origin', DEV_BRANCH, () => {
        console.log(`Git push to origin/${DEV_BRANCH} at ${ORIGIN}`);
        resolve();
      }) 
    })
  })
  .catch((err) => console.error('\nERROR \n', err));
}


function gitClone() {
  return new Promise(
      (resolve, reject) => {
        gitP().silent(true)
          .clone(UPSTREAM, [
            ['--recursive']
          ])
          .then(() => {
            console.log(`Successfully cloned ${UPSTREAM} to ${__dirname}\\${LOCAL_REPO} \n`)
            resolve();
          })
      });
}

function gitCheckout(destination) {
  return new Promise(
      (resolve, reject) => {
        git(`./${LOCAL_REPO}`).checkout(destination)
        resolve();
      });
}
