import {blue} from "chalk";
import {L} from "@/utils/log";
import {useCnf} from "@/utils/di";
import {TplConf} from "@/tpl/commands/tplInitial";

export async function generate(template: string) {
  const cnf = useCnf<TplConf>();
  L(blue(`生成[${template}]`), cnf);
}