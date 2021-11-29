import * as chalk from "chalk";
import * as os from 'os';
import {ensureFile, pathExists, readJson, writeJson} from "fs-extra";
import {confFilePath} from "@/utils/conf";
import {L} from "@/utils/log";
import {useCmd} from "@/utils/di";

const homeDir = os.homedir();

export async function touchConf() {
  const commandName = useCmd();
  const touchConfPath = confFilePath(commandName);

  L(chalk.green.bold(`检查配置文件: ${touchConfPath}`));

  if (!await pathExists(touchConfPath)) {
    L(chalk.yellow.bold('配置文件不存在，创建之'))
    await ensureFile(touchConfPath);
    await writeJson(touchConfPath, {version: '1', templateLib: `${homeDir}/tpl/templateLib`});
  }

  L(JSON.stringify(await readJson(touchConfPath), null, 2));

  L(chalk.green.bold('Done.'))
}