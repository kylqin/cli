import {green, red} from "chalk";
import execa from "execa";
import {confFilePath, readConfRaw} from "@/utils/conf";
import {L} from "@/utils/log";
import {useCnf} from "@/utils/di";
import {CliConf} from "@/cli/types";

interface CliConfCmdOptions {
  edit: boolean,
  path: boolean
}

export async function config(command: string, options: CliConfCmdOptions) {
  const cmd = command ?? 'cli';
  if (options.path) {
    const cfp = confFilePath(cmd);
    L(green(cfp));
  } else if (options.edit) {
    const cfp = confFilePath(cmd);
    const cnf = useCnf<CliConf>();
    if (cnf.editor) {
      const rr = await execa(cnf.editor, [cfp]);
    } else if (process.env.EDITOR) {
      const rr = await execa(process.env.EDITOR, [cfp]);
      L(green(`可在 \`${cfp}\` 中设置 editor 配置默认的编辑器`))
    } else {
      L(red(`请在 \`${cfp}\` 中设置 editor, 或设置 EDITOR 环境变量`))
    }
  } else {
    const cnf = await readConfRaw(cmd);
    L(green(JSON.stringify(cnf, null, 2)));
  }
}