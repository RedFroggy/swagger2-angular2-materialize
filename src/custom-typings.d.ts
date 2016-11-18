interface Window {
    vkbeautify: VkBeautify;
    Chart: Chart;
    x2js: X2JS;
    hljs: any;
    moment: any;
}

interface Chart {
    Line(ctx: any, config: {data: any, options: any}): any;
    Bar(ctx: any, config: {data: any, options: any}): any;
}

interface VkBeautify {
 json(message: any, depth: number): any;
 xml(message: any): any;
}

interface X2JS {
    js2xml(data: any): string;
}

declare let vkbeautify: VkBeautify;
declare let x2js: X2JS;
declare let hljs: any;
declare let Chart: Chart;
declare let enableProdMode: Function;

declare module 'vkbeautify' {
    export = vkbeautify;
}

