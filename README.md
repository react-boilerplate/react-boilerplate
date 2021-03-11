# React boilerplate Octobot

Base template for ReactJs projects forked from [react-boilerplate](https://github.com/react-boilerplate/react-boilerplate)

## Requirements

To run this project you'll need to have [NVM](https://github.com/nvm-sh/nvm) installed, which is a version manager for Node.

To verify if you meet all the requirements please run `./go check`.

## Branching Strategy

This project works based on the git flow strategy. Please install and use git flow tools to have a more orderly handling of branches and tags.

## Development Environment

To start a development environment, run ./go check to see if you have all necessary dependencies installed. If so, perform the initialization through ./go init and finally run ./go start to launch the dev server.
It contains VisualStudio Code configuration specific for this project. This includes linting tools, please review Octobot's Playbook editor configuration for guidance.

## Testing

- Run `./go test`.

Tests can also run with the following commands in `/app`:

- `npm run test` will run tests until either all tests pass or the first one fails. Test execution will stop after the first failure. This is the command executed when running `./go test` in the project's root folder.
- `npm run test-dev` will run all tests and will not stop when a test fails.
