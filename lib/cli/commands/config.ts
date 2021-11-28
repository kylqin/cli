import {green} from "chalk";
import {readConfRaw} from "@/utils/conf";
import {L} from "@/utils/log";

export async function config(command: string) {
  const cnf = await readConfRaw(command);

  L(green(JSON.stringify(cnf, null, 2)));
}