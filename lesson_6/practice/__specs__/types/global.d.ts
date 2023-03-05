/* eslint-disable @typescript-eslint/no-empty-interface */

declare const reporter: {
    description(description: string): this;
    severity(severity: Severity): this;
    epic(epic: string): this;
    feature(feature: string): this;
    story(story: string): this;
    startStep(name: string): this;
    endStep(status?: Status): this;
    addArgument(name: string): this;
    addEnvironment(name: string, value: string): this;
    addAttachment(name: string, buffer: unknown, type: string): this;
    addLabel(name: string, value: string): this;
    addParameter(paramName: string, name: string, value: string): this;
};

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
interface Window {}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
interface StoreJsStorage {
    clearAll: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    each: (callback: (val: string, key: string) => any) => void;
    name: string;
    read: (key: string) => string | null;
    remove: (key: string) => void;
    write: (key: string, data: string) => void;
}
