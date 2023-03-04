const errorsBlacklist = [
    'Encountered two children with the same key',
    'Google API initialization failed',
    'It looks like you\'re using a version of react-dom that supports the "act"',
    'target Element not found',
    'Warning: componentWillMount has been renamed',
    'Warning: componentWillReceiveProps has been renamed',
    'Warning: componentWillUpdate has been renamed',
    'Warning: Each child in a list should have a unique "key" prop.',
    'Warning: The tag <  LazyLoad> is unrecognized in this browse',
    'Warning:',
    "Warning: Can't perform a React state update on an unmounted component",
    "Can't get ga client id",
    'You are currently using minified code outside of NODE_ENV === "production".',
];

const isStringInBlacklist = (message: string): boolean =>
    typeof message === 'string' && !!errorsBlacklist.find(it => message.includes(it));

export const isMessageBlacklisted = (message: string[]): boolean => !!message.find(isStringInBlacklist);
