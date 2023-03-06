import * as log4js from 'log4js';
import prettyFormat, { plugins } from 'pretty-format';

export const debug = (): void => {
    const formattedDom = prettyFormat(document.body, {
        plugins: [plugins.DOMElement, plugins.DOMCollection],
        printFunctionName: false,
        highlight: true,
    });
    log4js.getLogger('DOM Debug').mark(`\n${formattedDom}`);
};
