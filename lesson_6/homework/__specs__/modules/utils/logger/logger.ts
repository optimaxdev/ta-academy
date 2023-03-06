/* eslint-disable */
import { isMessageBlacklisted } from '@Utils/logger/blackList';
import { isUselessMessageEvent } from '@Utils/logger/uselessMessages';
import * as log4js from 'log4js';

const isSimpleMessage = (message: string | undefined | null): boolean =>
    typeof message === 'string' || typeof message === 'undefined' || message === null;

const parseToJson = (message: string): string =>
    JSON.stringify(message, null, 2)
        .split('\n')
        .map((it, index) => (index === 0 ? it : `  ${it}`))
        .join('\n');

const tryToParseToJson = (message: string): string => {
    try {
        return parseToJson(message);
    } catch {
        return message;
    }
};

const transformMessageToAdorableState = (message: string): string =>
    isSimpleMessage(message) ? message : tryToParseToJson(message);

const formatMessages = (messages: string[]): string[] =>
    messages.map(transformMessageToAdorableState).map(it => `  ${it}`);

const customStdoutAppender: log4js.AppenderModule = {
    configure: (config, layouts) => {
        const layout = config.layout ? layouts.layout(config.layout.type, config.layout) : layouts.coloredLayout;

        const generator: log4js.AppenderFunction = loggingEvent => {
            const messages = loggingEvent.data;

            if (isMessageBlacklisted(messages)) return;

            if (isUselessMessageEvent(loggingEvent)) return;

            loggingEvent.data = formatMessages(loggingEvent.data);

            process.stdout.write(`${layout(loggingEvent)}\n`);
        };
        return generator;
    },
};

log4js.configure({
    appenders: {
        out: {
            type: customStdoutAppender,
            layout: {
                type: 'pattern',
                pattern: '[%d] %[[%p] %c%] %x{file}:%l%n%m',
                tokens: {
                    file: logEvent => {
                        const regex = /(__specs__\/.*)/gm;
                        // noinspection TypeScriptUnresolvedVariable
                        const regexResult = regex.exec(logEvent.fileName);
                        // noinspection TypeScriptUnresolvedVariable
                        return (regexResult && regexResult[1]) || logEvent.fileName;
                    },
                },
            },
        },
    },
    categories: {
        default: {
            appenders: ['out'],
            level: 'mark',
            enableCallStack: true,
        },
    },
});

log4js.getLogger().level = 'ALL';

const consoleLogger = log4js.getLogger('Console');
console.warn = consoleLogger.warn.bind(consoleLogger);
console.trace = consoleLogger.trace.bind(consoleLogger);
console.log = consoleLogger.info.bind(consoleLogger);
console.error = consoleLogger.error.bind(consoleLogger);
