import { timeout } from '@Utils/timeout';

type FunctionToWaitFor<T> = () => T | Promise<T>;

export type WaitForOptions = {
    timeout: number;
    interval: number;
};

const defaultValues: WaitForOptions = {
    interval: 1000,
    timeout: 10000,
};

const isNotEmptyArray = (result: unknown): boolean => Array.isArray(result) && !!result.length;
const notArrayAndTruthy = (result: unknown): boolean => !Array.isArray(result) && !!result;

/**
 * Waits for callback to be eather truthy or not empty array
 *
 * Defaults:
 *
 * timeout: 10000ms
 *
 * interval: 1000ms
 *
 * Example:
 * ```js
 * await waitFor(() => component.getAllSubcomponents(), {
 *   timeout: 20000,
 *   interval: 500
 * })
 * ```
 */
export const waitFor = async <T>(
    func: FunctionToWaitFor<T>,
    options?: Partial<WaitForOptions>
): Promise<T> => {
    const optionsWithDefaults = {
        ...defaultValues,
        ...options,
    };
    const endTime = Date.now() + optionsWithDefaults.timeout;

    while (Date.now() < endTime) {
        const result = await func();
        if (isNotEmptyArray(result) || notArrayAndTruthy(result)) {
            return result;
        }
        await timeout(optionsWithDefaults.interval);
    }

    throw new Error('Timed out.');
};
