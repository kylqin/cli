import {program} from "commander";

import {tplInitial} from '@/tpl/commands/tplInitial.js';
import {touchConf} from '@/tpl/commands/touchConf.js';
import {newTemplate} from '@/tpl/commands/newTemplate.js';
import {editTemplate} from '@/tpl/commands/editTemplate.js';
import {generate} from '@/tpl/commands/generate.js';

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
  .action(newTemplate);

program
  .command('edit <template>')
  .description('编辑模板')
  .action(editTemplate);

program
  .command('g <template>')
  .description('从模板生成')
  .action(generate);


program.parse();
