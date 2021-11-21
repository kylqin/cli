import * as os from 'os';
import {ensureFile, pathExists, readFile, readJson, writeJson} from "fs-extra";
import {envStr} from "./env-string";
import untildify = require("untildify");
import Dict = NodeJS.Dict;

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

  const cnf = JSON.parse(eContent);

  for (const [v, setV] of confGen(cnf, v => typeof v === 'string')) {
    setV(untildify(v));
  }

  return cnf;
}

export function readConfRaw(commandName: string) {
  return readJson(confFilePath(commandName));
}

export function writeConf(commandName: string, conf: Record<string, any>) {
  return writeJson(confFilePath(commandName), conf);
}

function* confGen(cnf: Dict<any>, filter: (v: any, k?: string) => boolean = () => true) {
  const setV = (p: Dict<any>, k: string) => (v: any) => p[k] = v;
  const setVA = (p: any[], i: number) => (v: any) => p[i] = v;

  function* rec(c: Dict<any>): Generator<[any, (v: any) => void]> {
    // console.log('c ->', c);
    for (const [key, value] of Object.entries(c)) {
      if (filter(value, key)) {
        if (Array.isArray(value)) {
          for (const [index, subValue] of value.entries()) {
            if (typeof subValue === 'object') {
              for (const toYield of rec(subValue)) {
                yield toYield;
              }
            } else {
              yield [subValue, setVA(value, index)];
            }
          }
        }

        if (value !== null && typeof value === 'object') {
          for (const toYield of rec(value)) {
            yield toYield;
          }
        }

        yield [value, setV(c, key)];
      }
    }
  }

  // console.log('cnf --->', cnf);

  for (const toYield of rec(cnf)) {
    yield toYield;
  }
}