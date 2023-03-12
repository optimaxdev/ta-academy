export const parseFormData = (data: { _streams: string[] }): Record<string, unknown> => {
    const object = {};
    if (typeof data !== 'undefined') {
        for (let i = 0; i < data._streams.length; i += 3) {
            const regex = /name="(.*)"/gm;
            object[regex.exec(data._streams[i])[1]] = data._streams[i + 1];
        }
    }
    return object;
};
