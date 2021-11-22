import {program} from "commander";

import {tplInitial} from '@/commands/tpl/tplInitial';
import {touchConf} from '@/commands/tpl/touchConf';
import {newTemplate} from '@/commands/tpl/newTemplate';
import {generateWithTemplate} from '@/commands/tpl/generateWithTemplate';

program
  .command('init')
  .description('初始化 tpl 工具')
  .option('-l, --template-lib <templateLib>', '模板目录')
  .action(tplInitial)

program
  .command('touch-conf')
  .description('检查配置文件，如果没有则创建它')
  .action(touchConf);

program
  .command('new <template>')
  .description('新建一个模板')
  .action(newTemplate)

program
  .command('g <template>')
  .description('从模板生成')
  .action(generateWithTemplate)


program.parse();
