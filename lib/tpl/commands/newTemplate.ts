import {green, red} from "chalk";
import {ensureFile, pathExists, writeJson} from "fs-extra";
import {L} from "@/utils/log";
import {readConf} from "@/utils/conf";
import {TplConf, TplManifest} from "@/tpl/types";
import {templateManifestPathInLib, templatePath} from "@/tpl/conf-template";

const commandName = 'tpl';

export async function newTemplate(template: string) {
  const cnf = await readConf(commandName) as TplConf;
  const tplPath = templatePath(cnf.templateLib, template)

  if (!await pathExists(tplPath)) {
    L(green(`新建模板: ${template}`));

    const manifestPath = templateManifestPathInLib(cnf.templateLib, template);

    await ensureFile(manifestPath);

    const defaultManifest: TplManifest = {name: template, version: '1', cloneType: 'files'};

    await writeJson(manifestPath, defaultManifest);
  } else {
    L(red.bold(`模板 ${template} 已经存在`));
  }
}