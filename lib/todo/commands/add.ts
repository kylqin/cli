import Conf from "conf";
import {TodoItem} from "@/todo/commands/list";
import * as chalk from "chalk";
import {L} from "@/utils/log";

const conf = new Conf();

export function add(task: string) {
  // get the current todo-list
  let todoList = conf.get('todo-list') as (TodoItem[] | undefined);

  if (!todoList) {
    todoList = [];
  }

  todoList.push({
    text: task,
    done: false
  });

  conf.set('todo-list', todoList);

  L(chalk.green.bold('Task has been added successfully!'));
}