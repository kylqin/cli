import {Question} from "inquirer";

export interface TplConf {
  version: '1',
  templateLib: string
}

export interface TplManifest {
  version: string;
  name: string;
  cloneType: "files" | "folder";
  questions?: Question[];
}

export interface TplGenerateProcessOptionsResult {
  template: string;
  name: string;
  dstPath: string;
  manifest: {
    [key: string]: any;
  };
  answers?: {
    [key: string]: string;
  };
}