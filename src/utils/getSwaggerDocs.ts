import { readFile } from 'fs/promises';
import { join } from 'path';
import * as yaml from 'js-yaml';

interface ApiDocument {
  openapi: string;
  info: {
    title: string;
    version: string;
  };
  paths: Record<string, any>;
}

export const getSwaggerDoc = async () => {
  const apiYamlFile = await readFile(
    join(__dirname, '..', '..', 'doc', 'api.yaml'),
    'utf8',
  );
  return yaml.load(apiYamlFile) as ApiDocument;
};
