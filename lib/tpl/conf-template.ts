import path from "path";
import {readJson} from "fs-extra";

export function templateManifestPathInLib(templateLib: string, template: string) {
  return path.join(templateLib, template, 'manifest.json');
}

export async function templateManifestInLib(templateLib: string, template: string) {
  return readJson(path.join(templateLib, template, 'manifest.json'));
}
