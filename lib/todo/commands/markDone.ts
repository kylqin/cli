import Conf from "conf";
import {TodoItem} from "@/todo/commands/list.js";
import * as chalk from "chalk";
import {L} from "@/utils/log.js";

interface MarkDoneOptions {
  tasks: string[]
}

const conf = new Conf();

export function markDone({tasks}: MarkDoneOptions) {
  let todoList = conf.get('todo.js-list') as (TodoItem[] | undefined);

  if (todoList) {
    todoList = todoList.map((task, index) => {
      if (tasks) {
        if (tasks.includes(index.toString())) {
          task.done = true;
        }
      } else {
        task.done = true;
      }
      return task;
    });

    conf.set('todo.js-list', todoList);
  }

  L(chalk.green.bold('Tasks have been marked done successfully!'));
}