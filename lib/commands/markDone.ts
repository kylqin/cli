import Conf from "conf";
import {TodoItem} from "@/commands/list";
import * as chalk from "chalk";
import {L} from "@/utils/log";

interface MarkDoneOptions {
  tasks: string[]
}

const conf = new Conf();

export function markDone({tasks}: MarkDoneOptions) {
  let todoList = conf.get('todo-list') as (TodoItem[] | undefined);

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

    conf.set('todo-list', todoList);
  }

  L(chalk.green.bold('Tasks have been marked done successfully!'));
}