System.config({
    transpiler: 'typescript',
    typescriptOptions: { emitDecoratorMetadata: true },
    packages: {'app': {defaultExtension: 'ts'}}
});
System.import('app/boot').then(null, console.error.bind(console));

hljs.initHighlightingOnLoad();
window.vkbeautify = new vkbeautify();