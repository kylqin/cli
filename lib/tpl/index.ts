import {program} from "commander";

import {tplInitial} from '@/tpl/commands/tplInitial';
import {touchConf} from '@/tpl/commands/touchConf';
import {newTemplate} from '@/tpl/commands/newTemplate';
import {generateWithTemplate} from '@/tpl/commands/generateWithTemplate';

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
