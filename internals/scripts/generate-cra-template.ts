import shell from 'shelljs';
import chalk from 'chalk';
import path from 'path';

shell.echo(chalk.green('Generating template folder...'));

process.chdir(path.join(__dirname, '../..'));

const craAppName = 'generated-cra-template';

const copyToTemplate = (path: string, isRecursive?: boolean) => {
  if(isRecursive){
    shell.cp('-r', path, `template/${path}`);
  } else {
    shell.cp(path, `template/${path}`);
  }
}

// Clean already generated one
shell.rm('-rf', 'template');
shell.rm('-rf', `${craAppName}`);

shell.mkdir('template');

copyToTemplate('public', true);
copyToTemplate('src', true);
copyToTemplate('.env.local');
copyToTemplate('.eslintrc.js');
copyToTemplate('.gitattributes');
copyToTemplate('.gitignore');
copyToTemplate('.npmrc');
copyToTemplate('.nvmrc');
copyToTemplate('.prettierignore');
copyToTemplate('.prettierrc');
copyToTemplate('.stylelintrc');
copyToTemplate('tsconfig.json');

shell.mv('template/.gitignore', 'template/gitignore');

shell.echo(chalk.green('Done'));

shell.exec(`npx create-react-app ${craAppName} --template file:.`)

shell.rm('-rf', 'template');