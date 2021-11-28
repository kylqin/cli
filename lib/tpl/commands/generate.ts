import {L} from "@/utils/log";
import {blue} from "chalk";

export function generate(template: string) {
  L(blue(`生成[${template}]`));
}