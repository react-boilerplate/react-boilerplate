# Octobot go-script-bash template and plugins

This repository contains the base GO scripts for any projects developed by Octobot, 
based on the framework [go-script-bash](https://github.com/mbland/go-script-bash).

[GO scripts](https://www.thoughtworks.com/insights/blog/praise-go-script-part-i) 
are base scripts to perform the routine tasks for a projects and brings normalization
through projects as well as an easy on boarding guide for new members to start
working on the project.

This are based on a development architecture using a Docker environment based on
a Compose setup as defined by a `docker-compose-dev.yml` file in the project root.
This can be changed through setting the environment variable `_OBOT_COMPOSE_FILE_DEV`
correctly. Please review the `octobot-docker` plugin for more information on this.

## Usage in a project

To use in a project, just take the latest version and copy it to the root. 
Some customization at the `/go` script is necessary to include project variables
and define certain configuration specifics for each project.

Next, you will need to set the specific for your project. All of the scripts
are project-agnostic and should perform the tasks with none or little changes.

Project specific code fragments are to be located at the `lib/` directory. In particular,
the projects using this will require the user to customize the following files 
in the lib directory according to the project internal characteristics:
- `lib/project-variables` : Configuration variables. 
- `lib/project-data` : Data management procedures, such as those necessary to 
perform clean, load and save operations on databases.
- `lib/project-build` : Build procedures for the project components.
- `lib/project-deploy` : Deploy procedures for project components.
- `lib/project-test` : Verification and test procedures for project components.

Generic examples are provided in this repo for each one, specifying the minimum 
necessary functions to be developed by *your project*.


