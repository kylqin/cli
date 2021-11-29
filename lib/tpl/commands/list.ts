import {readdir} from "fs-extra";
import {green} from "chalk";
import {useCnf} from "@/utils/di";
import {L} from "@/utils/log";
import {TplConf} from "@/tpl/types";
import {templatesDirPath} from "@/tpl/conf-template";

export async function list() {
  const cnf = useCnf<TplConf>();

  const tpls = await readdir(templatesDirPath(cnf.templateLib));

  L(green(tpls.join('\n')));
}