import {program} from "commander";

import {provideCnf} from "@/utils/di";
import {readConf} from "@/utils/conf";
import {TplConf, tplInitial} from '@/tpl/commands/tplInitial';
import {touchConf} from '@/tpl/commands/touchConf';
import {newTemplate} from '@/tpl/commands/newTemplate';
import {generate} from '@/tpl/commands/generate';
import {editTemplate} from "@/tpl/commands/editTemplate";

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
  .command('edit <template>')
  .description('编辑模板配置')
  .action(editTemplate)

program
  .command('g <template>')
  .description('从模板生成')
  .action(generate)

readConf('tpl')
  .then(cnf => {
    provideCnf<TplConf>(cnf);

    program.parse();
  });