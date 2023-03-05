/* eslint-disable @typescript-eslint/no-empty-interface */

import { fireEvent, logDOM } from '@testing-library/react';
import { waitFor } from '@Utils/waitFor';

import { format } from 'util';

type CustomDomApi = {
    $$x: (xpath: string) => Element[];
    $x: (xpath: string) => Element;
    clickByCSS: (selector: string) => Promise<void>;
    clickByXpath: (selector: string) => Promise<void>;
    debug: () => void;
    getByText: (text: string) => Element;
    hoverByCSS: (selector: string) => Promise<void>;
    hoverByXpath: (selector: string) => Promise<void>;
    waitForQuerySelector: (selector: string) => Promise<Element[]>;
    waitForXpath: (selector: string, options?: { timeout: number }) => Promise<Element[]>;
};

declare global {
    interface Document extends CustomDomApi {}
    interface Element extends CustomDomApi {}
}

async function waitForXpath(
    this: Element | Document,
    selector: string,
    options?: { timeout: number }
): Promise<Element[]> {
    try {
        return await waitFor(() => this.$$x(selector), options);
    } catch (e) {
        throw new Error(`Waiting of xpath selector '${selector}' failed \n${(e as Error).stack}`);
    }
}

async function waitForQuerySelector(this: Element | Document, selector: string): Promise<Element[]> {
    try {
        return await waitFor(() => Array.from(this.querySelectorAll<Element>(selector)));
    } catch (e) {
        throw new Error(`Waiting of css selector '${selector}' failed \n${(e as Error).stack}`);
    }
}

function $$x(this: Element | Document, xpath: string): Element[] {
    const iterator = document.evaluate(xpath, this, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);

    const result: Element[] = [];
    let element = iterator.iterateNext();
    while (element) {
        result.push(element as Element);
        element = iterator.iterateNext();
    }
    return result;
}

function getByText(this: Element, text: string): Element {
    const selector = format('.//*[contains(text(), "%s")]', text);
    return this.$x(selector);
}

function $x(this: Element | Document, xpath: string): Element {
    const [element] = this.$$x(xpath);
    return element;
}

async function clickByCSS(this: Element | Document, selector: string): Promise<void> {
    try {
        const [element] = await this.waitForQuerySelector(selector);
        fireEvent.click(element);
    } catch (e) {
        throw new Error(`Cannot click by css \n${(e as Error).stack}`);
    }
}

async function clickByXpath(this: Element | Document, selector: string): Promise<void> {
    try {
        const [element] = await this.waitForXpath(selector);
        fireEvent.click(element);
    } catch (e) {
        throw new Error(`Cannot click by xpath \n${(e as Error).stack}`);
    }
}

async function hoverByCSS(this: Element | Document, selector: string): Promise<void> {
    try {
        const [element] = await this.waitForQuerySelector(selector);
        fireEvent.mouseOver(element);
    } catch (e) {
        throw new Error(`Cannot hover by css \n${(e as Error).stack}`);
    }
}

function debug(this: Element | Document): void {
    logDOM(this);
}

async function hoverByXpath(this: Element | Document, selector: string): Promise<void> {
    try {
        const [element] = await this.waitForXpath(selector);
        fireEvent.mouseOver(element);
    } catch (e) {
        throw new Error(`Cannot hover by xpath \n${(e as Error).stack}`);
    }
}

const extensions = {
    $$x,
    $x,
    clickByCSS,
    clickByXpath,
    debug,
    hoverByCSS,
    hoverByXpath,
    waitFor,
    waitForQuerySelector,
    waitForXpath,
    getByText,
};

[Element, Document].forEach(({ prototype }) => (prototype = Object.assign(prototype, extensions)));
