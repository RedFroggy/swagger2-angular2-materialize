interface Window {
    vkbeautify:VkBeautify;
    x2js:X2JS;
    Chart:Chart;
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

//Override Chart types
declare var Chart: {
    new (context: CanvasRenderingContext2D): Chart;
    defaults: {
        global: ChartSettings;
    },
    Line(context: CanvasRenderingContext2D, data:{data: LinearChartData, options?: LineChartOptions}): LinearInstance;
    Bar(context: CanvasRenderingContext2D, data:{data: LinearChartData, options?: BarChartOptions}): LinearInstance;
};

declare module 'vkbeautify' {
    export = vkbeautify;
}

