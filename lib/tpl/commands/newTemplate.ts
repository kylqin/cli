import * as chalk from "chalk";
import {red} from "chalk";
import {L} from "@/utils/log";
import {readConf} from "@/utils/conf";
import {TplConf} from "@/tpl/commands/tplInitial";
import * as path from "path";
import {ensureFile, pathExists, writeJson} from "fs-extra";

const commandName = 'tpl';

export async function newTemplate(template: string) {
  const cnf = await readConf(commandName) as TplConf;
  const templatePath = path.join(cnf.templateLib, template)

  console.log('templatePath ->', templatePath);

  if (!await pathExists(templatePath)) {
    L(chalk.green(`新建模板: ${template}`));

    const manifestPath = path.join(templatePath, 'manifest.json');

    await ensureFile(manifestPath);

    await writeJson(manifestPath, {name: template, version: '1'});
  } else {
    L(red.bold(`模板 ${template} 已经存在`));
  }
}