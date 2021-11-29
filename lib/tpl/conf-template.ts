import path from "path";
import {readJson} from "fs-extra";

const TEMPLATES_DIR = 'templates';
const MANIFEST_FILE = 'manifest.json';

export function isTemplateManifestName(filename: string) {
  return filename === MANIFEST_FILE;
}

export function templatesDirPath(templateLib: string): string {
  return path.join(templateLib, TEMPLATES_DIR);
}

export function templatePath(templateLib: string, template: string): string {
  return path.join(templateLib, TEMPLATES_DIR, template);
}

export function templateManifestPathInLib(templateLib: string, template: string) {
  return path.join(templateLib, TEMPLATES_DIR, template, MANIFEST_FILE);
}

export async function templateManifestInLib(templateLib: string, template: string) {
  return readJson(path.join(templateLib, TEMPLATES_DIR, template, MANIFEST_FILE));
}
