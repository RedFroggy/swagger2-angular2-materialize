interface Window {
    vkbeautify:VkBeautify;
    x2js:X2JS;
    Chart:any;
    moment:any;
    hljs:any;
}

interface VkBeautify {
 json(message:any,depth:number);
 xml(message:any);
}

interface X2JS {
    js2xml(data:any):string;
}

declare var vkbeautify: VkBeautify;
declare var x2js:X2JS;

declare module 'vkbeautify' {
    export = vkbeautify;
}

