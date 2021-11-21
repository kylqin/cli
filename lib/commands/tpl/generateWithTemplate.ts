import {L} from "../../utils/log";
import {blue} from "chalk";

export function generateWithTemplate(template: string) {
  L(blue(`生成[${template}]`));
}