interface Window {
    vkbeautify:VkBeautify;
}

interface VkBeautify {
 json(message:any,depth:number);
 xml(message:any);
}

declare var vkbeautify: VkBeautify;

declare module 'vkbeautify' {
    export = vkbeautify;
}
