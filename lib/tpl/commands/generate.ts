import {L} from "@/utils/log.js";
import chalk from "chalk";

export function generate(template: string) {
  L(chalk.blue(`生成[${template}]`));
  // TODO:
  // 1. 解析参数
  // 2. 复制文件
  // 3. 替换模板参数
}