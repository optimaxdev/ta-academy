import { delay } from '@Utils/delay';

type FunctionToWaitFor<T> = () => T | Promise<T>;

type WaitForOptions = {
    timeout?: number;
    interval?: number;
};

const isNotEmptyArray = (result: unknown): boolean => Array.isArray(result) && !!result.length;
const notArrayAndTruthy = (result: unknown): boolean => !Array.isArray(result) && !!result;

export const waitFor = async <T>(func: FunctionToWaitFor<T>, options?: WaitForOptions): Promise<T> => {
    const endTime = Date.now() + (options?.timeout ?? 10000);

    while (Date.now() < endTime) {
        const result = await func();
        if (isNotEmptyArray(result) || notArrayAndTruthy(result)) {
            return result;
        }
        await delay(options?.interval ?? 1000);
    }

    throw new Error('Timed out.');
};
