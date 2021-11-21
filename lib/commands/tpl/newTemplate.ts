import * as chalk from "chalk";
import {L} from "../../utils/log";

export function newTemplate(template: string) {
  L(chalk.green(`新建模板: ${template}`));
}