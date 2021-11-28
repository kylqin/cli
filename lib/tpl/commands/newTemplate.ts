import chalk from "chalk";
import {L} from "@/utils/log.js";
import {readConf} from "@/utils/conf.js";
import {TplConf} from "@/tpl/commands/tplInitial.js";
import * as path from "path";
import fse from "fs-extra";

const commandName = 'tpl';

export async function newTemplate(template: string) {
  const cnf = await readConf(commandName) as TplConf;
  const templatePath = path.join(cnf.templateLib, template)

  console.log('templatePath ->', templatePath);

  if (!await fse.pathExists(templatePath)) {
    L(chalk.green(`新建模板: ${template}`));

    const manifestPath = path.join(templatePath, 'manifest.json');

    await fse.ensureFile(manifestPath);

    await fse.writeJson(manifestPath, {name: template, version: '1'});
  } else {
    L(chalk.red.bold(`模板 ${template} 已经存在`));
  }
}