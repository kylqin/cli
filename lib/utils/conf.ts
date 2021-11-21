import * as os from 'os';
import {ensureFile, pathExists, readFile, readJson, writeJson} from "fs-extra";
import {envStr} from "./env-string";

const homeDir = os.homedir();

export function confFilePath(commandName: string) {
  return `${homeDir}/config/${commandName}/config.json`;
}

export function confFileExists(commandName: string) {
  return pathExists(confFilePath(commandName));
}

export function ensureConfFile(commandName: string) {
  return ensureFile(confFilePath(commandName));
}

export async function readConf(commandName: string) {
  const content = await readFile(confFilePath(commandName), {encoding: 'utf-8'});
  const eContent = envStr(content);
  return JSON.parse(eContent);
}

export function readConfRaw(commandName: string) {
  return readJson(confFilePath(commandName));
}

export function writeConf(commandName: string, conf: Record<string, any>) {
  return writeJson(confFilePath(commandName), conf);
}