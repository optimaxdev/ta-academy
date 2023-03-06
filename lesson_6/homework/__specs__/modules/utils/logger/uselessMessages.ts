import type { LoggingEvent } from 'log4js';

const getFileName = (e: LoggingEvent): string | undefined =>
    'fileName' in e && typeof e['fileName'] === 'string' && e['fileName'];

const isJustEmptyObject = (e: LoggingEvent): boolean =>
    e.data.length === 1 && typeof e.data[0] === 'object' && Object.keys(e.data[0]).length === 0;

const emptyObjectFilterWithFileName = (fileName: string) => (e: LoggingEvent) =>
    getFileName(e)?.includes(fileName) && isJustEmptyObject(e);

const uselessMessageFilters: ((e: LoggingEvent) => boolean)[] = [
    emptyObjectFilterWithFileName('redux-saga-core'),
    emptyObjectFilterWithFileName('react-query/lib/core/query.js'),
    emptyObjectFilterWithFileName('io-6de156f3'),
    e =>
        getFileName(e)?.includes('scroller.js') &&
        e.data.length &&
        typeof e.data[0] === 'string' &&
        e.data[0].includes('target Element not found'),
];

export const isUselessMessageEvent = (e: LoggingEvent): boolean => {
    try {
        return !!uselessMessageFilters.find(isUselessMessage => isUselessMessage(e));
    } catch {
        return false;
    }
};
