import { createCRAProject } from './create-cra-project';
import path from 'path';

process.chdir(path.join(__dirname, '../..'));

createCRAProject();
