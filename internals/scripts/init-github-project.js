#!/usr/bin/env node

require('shelljs/global');
const inquirer = require('inquirer');
const fs = require('fs');

inquirer.prompt([{
    type: 'input',
    name: 'name',
    message: 'What is your project name?',
    default: 'my-boilerplate-project',
    validate: (value) => /.+/.test(value) ? true : 'The name is required'
  }, {
    type: 'input',
    name: 'description',
    message: 'What is your project description?',
    default: 'a project created with react-boilerplate',
    validate: (value) => /.+/.test(value) ? true : 'The description is required'
  }, {
    type: 'input',
    name: 'author',
    message: 'Who is your the project author?',
    default: 'Jane Doe',
    validate: (value) => /.+/.test(value) ? true : 'The author is required'
  }, {
    type: 'confirm',
    name: 'createRepo',
    message: 'Do you want to create a Github repo?',
    default: true
  }, {
    type: 'input',
    when: (answers) => answers.createRepo,
    name: 'username',
    message: 'What is your Github username?',
    validate: (value) => /.+/.test(value) ? true : 'username is required'
  }])
  .then((answers) => {
    let createRepo = answers.createRepo;
    let username = answers.username;
    delete answers.createRepo;
    delete answers.username;

    //create github repo
    if (createRepo) {
      let body = JSON.stringify({
        name: answers.name,
        description: answers.description
      });
      exec(`curl -s --user "${username}" --request POST --data '${body}' https://api.github.com/user/repos`, (err, stdout, stderr) => {
        if (err) {
          throw err;
        }

        console.log('\n\nGibhub repository created\n');
        
        const repoInfo = JSON.parse(stdout);
        answers.url = repoInfo.ssh_url;
        rewritePackageJSON(answers, username);
      });

    }
    else {
      rewritePackageJSON(answers);
    }
  });

function rewritePackageJSON(projectData, username) {
  fs.readFile('package.json', 'utf8', (err, data) => {
    if (err) {
      throw err;
    }

    // update the properties in package.json
    projectData.version = "0.0.1";
    for (const property in projectData) {
      let value = projectData[property];
      let replace = new RegExp(`"${property}": ".+"`);
      data = data.replace(replace, `"${property}": "${value}"`);
    }

    // write the new package.json
    fs.writeFile('package.json', data, 'utf8', (err) => {
      if (err) {
        throw err;
      }
      console.log('updated package.json\n');

      // add the Github remote if it was created
      if (projectData.url) {
        exec(`git remote add origin ${projectData.url}`);
      }

      // commit the changes to package.json
      exec('git commit -am "Updated package.json project details"')
    });
  });
}
