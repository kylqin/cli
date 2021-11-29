import {Stats} from "fs";
import {blue} from "chalk";
import {prompt, Question} from "inquirer";
import {L} from "@/utils/log";
import {useCnf} from "@/utils/di";
import {TplConf} from "@/tpl/types";
import {templateManifestInLib} from "@/tpl/conf-template";
import {TplGenerateProcessOptionsResult, TplManifest} from "../types";
import {isTemplateManifestName, templatePath} from "../conf-template";
import klaw from "klaw";
import {join} from "path";
import { mkdirpSync, copyFileSync } from "fs-extra";

export async function generate(template: string, name: string, dstPath: string) {
  const cnf = useCnf<TplConf>();
  const answers = await processOptions(template, name, dstPath, cnf);

  L(blue(`生成[${answers.template}]`));

  // console.log(answers);
  const rr = await copyFiles(cnf, answers);

  console.log('rr ->', rr);
}

async function processOptions(template: string, name: string, dstPath: string, cnf: TplConf): Promise<TplGenerateProcessOptionsResult> {
  const questions: Question[] = [];

  if (!template) {
    questions.push({
      name: 'template',
      type: 'choice',
      message: '请选择模板',
    });
  }

  if (!name) {
    questions.push({
      name: 'name',
      message: '请输入要生成目标的名称',
      default: 'demo'
    });
  }

  if (!dstPath) {
    questions.push({
      name: 'dstPath',
      message: '请输入要生成目标的目录路径',
      default: '.'
    });
  }

  const answers = await prompt<Partial<TplGenerateProcessOptionsResult>>(questions);

  const moreQuestions: Question[] = [];

  let manifest: TplManifest;
  if (template || answers.template) {
    manifest = await templateManifestInLib(cnf.templateLib, template || answers.template!);

    // console.log("manifest ->", manifest);

    if (Array.isArray(manifest.questions)) {
      moreQuestions.push(...manifest.questions);

      const moreAnswers = await prompt<Record<string, any>>(moreQuestions);

      // console.log(moreAnswers);
      return {template, name, dstPath, ...answers, manifest, answers: moreAnswers};
    }
  } else {
    throw new Error(`没有名为 ${template} 的模板`);
  }

  return {template, name, dstPath, manifest, ...answers};
}

interface CopyAction {
  srcName: string;
  srcPath: string;
  dstName: string;
  dstPath: string;
  stats: Stats;
}

async function copyFiles(cnf: TplConf, options: TplGenerateProcessOptionsResult) {

  console.log('copy files from', cnf.templateLib, options.template, '; to', options.dstPath);

  const copyActions: CopyAction[] = [];

  const tplPath = templatePath(cnf.templateLib, options.template);
  const filter = (filename: string): [boolean, string] => {
    const rfn = filename.slice(tplPath.length + 1);
    // console.log('filter ->', filename, rfn);
    return [rfn !== '' && !isTemplateManifestName(rfn), rfn];
    // return true;
  }

  const transformContext = { template: options.template, name: options.name, ...options.answers } as Record<string, string | number>;

  const absoluteDstPath = join(process.env.PWD!, options.dstPath);

  for await (const f of klaw(tplPath)) {
    const [isValid, srcName] = filter(f.path);
    if (isValid) {
      console.log('FILE ===>', f.path);
      const dstName = transformDstPathName(srcName, transformContext);
      copyActions.push({
        srcName: srcName,
        srcPath: f.path,
        dstName: dstName,
        dstPath: absoluteDstPath,
        stats: f.stats
      });
    }
  }

  mkdirpSync(absoluteDstPath);

  // return copyActions;
  for (const action of copyActions) {
    applyCopyAction(action);
  }
}


function transformDstPathName(pathName: string, context: Record<string, string | number>) {
  let pn = pathName;
  for (const [key, value] of Object.entries(context)) {
    pn = pn.replace(new RegExp(`__${key}__`, 'g'), value + '');
  }
  return pn;
}

function applyCopyAction(action: CopyAction) {
  // console.log(action.srcName, ' ==> ', action.dstName);

  if (action.stats.isDirectory()) {
    mkdirpSync(join(action.dstPath, action.dstName));
  } else {
    copyFileSync(action.srcPath, join(action.dstPath, action.dstName));
  }
}