import { generateTemplateFolder } from './generate-template-folder';

generateTemplateFolder({
  forTesting: process.env.NODE_ENV === 'test' || process.env.CI === 'true',
});
