import {program} from "commander";

import {list} from '@/cli/commands/list';
import {config} from '@/cli/commands/config';

program
  .command('ls')
  .description('列出所有 cli 命令')
  .action(list);

program
  .command('conf <command>')
  .description('查看/编辑 cli 命令的配置信息')
  .action(config);

program.parse();
