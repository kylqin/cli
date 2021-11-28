import {green} from "chalk";
import {confFilePath, readConfRaw} from "@/utils/conf";
import {L} from "@/utils/log";
import execa from "execa";

interface CliConfCmdOptions {
  edit: boolean,
  path: boolean
}

export async function config(command: string, options: CliConfCmdOptions) {
  if (options.path) {
    const cfp = confFilePath(command);
    L(green(cfp));
  } else if (options.edit) {
    const cfp = confFilePath(command);
    const rr = await execa('code', [cfp]);

    console.log(rr);
  } else {
    const cnf = await readConfRaw(command);

    L(green(JSON.stringify(cnf, null, 2)));
  }
}