import {green, red} from "chalk";
import * as path from "path";
import {ensureFile, pathExists} from "fs-extra";
import execa from "execa";
import {useCnf} from "@/utils/di";
import {L} from "@/utils/log";
import {templateManifestPathInLib} from "@/tpl/conf-template";
import {TplConf} from "@/tpl/commands/tplInitial";

export async function editTemplate(template: string) {
  const cnf = useCnf<TplConf>();
  const templatePath = path.join(cnf.templateLib, template)

  if (await pathExists(templatePath)) {
    L(green(`新建模板: ${template}`));

    const manifestPath = templateManifestPathInLib(cnf.templateLib, template);

    await ensureFile(manifestPath);

    const editorExeName = process.env.EDITOR;
    if (!editorExeName) {
      L(red.bold(`请配置 EDITOR 环境变量`));
      return;
    }

    await execa(editorExeName, [manifestPath]);

  } else {
    L(red.bold(`模板 ${template} 不存在, 请使用 tpl new ${template} 创建该模板`));
  }
}