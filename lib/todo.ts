import {program} from "commander";

import {list} from './commands/list';
import {add} from './commands/add';
import {markDone} from './commands/markDone';


program
  .command('l')
  .description('List all the TODO tasks')
  .action(list);

program
  .command('a <task>')
  .description('Add a new TODO task')
  .action(add);

program
  .command('d')
  .description('Mark tasks done')
  .option('-t, --tasks <tasks...>', 'The tasks to mark done. If not specified, all tasks will be marked done.')
  .action(markDone);

program.parse();