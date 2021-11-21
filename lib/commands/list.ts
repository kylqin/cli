import Conf from "conf";
import * as chalk from "chalk";
import {L} from "../utils/log";

const conf = new Conf();

export interface TodoItem {
  text: string,
  done: boolean
}

export function list() {
  const todoList = conf.get('todo-list') as (TodoItem[] | undefined);

  if (todoList && todoList.length) {
    L(chalk.blue.bold('Tasks in green are done. Tasks in yellow are still not done.'))

    for (const [index, todo] of todoList.entries()) {
      if (todo.done) {
        L(chalk.greenBright(`${index}. ${todo.text}`));
      } else {
        L(chalk.yellowBright(`${index}. ${todo.text}`));
      }
    }
  } else {
    L(chalk.red.bold('You don\'t have any tasks yet.'))
  }
}