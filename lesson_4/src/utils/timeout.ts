export const timeout = (ms: number): Promise<void> => {
    return new Promise(
        (resolve): NodeJS.Timeout =>
            setTimeout(() => {
                resolve();
            }, ms)
    );
};
