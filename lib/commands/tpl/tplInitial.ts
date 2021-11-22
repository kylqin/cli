import {confFileExists, confFilePath, ensureConfFile, readConf, writeConf} from "@/utils/conf";
import {green} from "chalk";
import * as os from "os";
import {ensureDir, pathExists} from "fs-extra";
import * as path from "path";
import * as inquirer from "inquirer";
import {Question} from "inquirer";
import {L} from "@/utils/log";
import untildify = require("untildify");

interface TplInitialOptions {
  templateLib?: string
}

export interface TplConf {
  version: '1',
  templateLib: string
}

const commandName = 'tpl';

export async function tplInitial(options: TplInitialOptions) {
  // console.log('options ->', options)
  const opts = await processOptions(options)
  // console.log('opts ->', opts)

  const confPath = confFilePath(commandName);

  /// 创建 conf 文件
  if (!await confFileExists(commandName)) {
    L(green(`Creating tpl config file: ${confPath}...`));
    await ensureConfFile(commandName);

    await writeConf(commandName, {version: '1', templateLib: opts.templateLib!})
  }

  const cnf = await readConf(commandName) as TplConf;
  cnf.templateLib = untildify(cnf.templateLib);

  if (!await pathExists(cnf.templateLib)) {
    L(green(`Creating tpl template lib directory: ${cnf.templateLib}...`));

    await ensureDir(path.join(cnf.templateLib, 'templates'));
  }
}

async function processOptions(options: TplInitialOptions): Promise<TplInitialOptions> {
  const questions: Question[] = []
  if (!options.templateLib) {
    questions.push({
      name: 'templateLib',
      message: 'Please choice the template library path',
      default: path.join(os.homedir(), 'tpl', 'templateLib')
    });
  }

  const answers = await inquirer.prompt(questions);

  return {...options, ...answers};
}

