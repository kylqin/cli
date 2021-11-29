import {green, red} from "chalk";
import {ensureFile, pathExists} from "fs-extra";
import execa from "execa";
import {useCnf} from "@/utils/di";
import {L} from "@/utils/log";
import {TplConf} from "@/tpl/types";
import {templateManifestPathInLib, templatePath} from "@/tpl/conf-template";

export async function editTemplate(template: string) {
  const cnf = useCnf<TplConf>();
  const tplPath = templatePath(cnf.templateLib, template)

  if (await pathExists(tplPath)) {
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