import chalk from "chalk";
import {L} from "@/utils/log.js";
import {readConf} from "@/utils/conf.js";
import {TplConf} from "@/tpl/commands/tplInitial.js";
import * as path from "path";
import {pathExists} from "fs-extra";
import {execa} from "execa";

const commandName = 'tpl';

export async function editTemplate(template: string) {
  const cnf = await readConf(commandName) as TplConf;
  const templatePath = path.join(cnf.templateLib, template)

  console.log('templatePath ->', templatePath);

  if (!await pathExists(templatePath)) {
    L(chalk.red.bold(`模板 ${template} 不存在存在, 请使用 tpl new ${template} 创建改模版`));
  } else {
    L(chalk.green(`编辑模板: ${template}`));

    const manifestPath = path.join(templatePath, 'manifest.json');

    console.log('env.EDITOR', process.env.EDITOR);

    const editor = process.env.EDITOR;
    if (!editor) {
      console.log('请配置环境变量 EDITOR');
    }

    const res = await execa(editor as string, [manifestPath]);

    console.log(`编辑 ${manifestPath}`, res)

    // await ensureFile(manifestPath);
    //
    // await writeJson(manifestPath, {name: template, version: '1'});
  }
}