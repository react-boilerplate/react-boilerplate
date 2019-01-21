import inquirer = require("inquirer");

interface NodePlopAPI{
    getGenerator(name:string):PlopGenerator;
    setGenerator(name:string, config:PlopGenerator):PlopGenerator;

    setPrompt(name: string, prompt: inquirer.PromptModule): void;
    setWelcomeMessage(message:string):void;
    getWelcomeMessage():string;
    getGeneratorList():{name:string,description:string}[];
    setPartial(name:string, str:string):void;
    getPartial(name:string):string,
    getPartialList():string[];
    setHelper(name:string,fn:Function):void;
    getHelper(name:string):Function;
    getHelperList():string[];
    setActionType(name:string, fn:Function):Function;
    getActionType(name:string):Function;
    getActionTypeList():string[];

    setPlopfilePath(filePath:string):void;
    getPlopfilePath():string;
    getDestBasePath():string;

    // plop.load functionality
    load(target:string[] | string,loadCfg:PlopCfg, includeOverride:boolean):void;
    setDefaultInclude(inc:object):void;
    getDefaultInclude():object;

    renderString(template:string, data:any):String;//set to any matching handlebars declaration

    // passthroughs for backward compatibility
    addPrompt(name:string, prompt:inquirer.PromptModule): void;
    addPartial(name:string, str:string):void;
    addHelper(name:string,fn:Function):void;
}

interface PlopGenerator{
    description:string;
    prompts:inquirer.Question[];
    actions:ActionConfig[];
}
interface ActionConfig{
    type:string;
    force:boolean;
    data:object;
    abortOnFail:boolean;
}

interface PlopCfg{
    force:boolean;
    destBasePath:string;
}

declare function nodePlop(plopfilePath:string, plopCfg:PlopCfg):NodePlopAPI;
export = nodePlop;
