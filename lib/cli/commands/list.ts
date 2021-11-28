import {join} from "path";
import {readdir} from "fs-extra";
import {green} from "chalk";
import {L} from "@/utils/log";

export async function list() {
  const commandsPath = join(__dirname, '../..');
  const list = await readdir(commandsPath);

  const allCommands = list.filter(c => c !== 'utils');

  L(green(allCommands.join('\n')))
}