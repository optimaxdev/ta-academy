import { fireEvent, logDOM } from '@testing-library/react';
import type { CustomFile } from '@Utils/customFile';

export class Component {
    protected element: Element;
    protected selectors: Record<string, unknown>;

    public constructor(element: Element | null = null) {
        this.element = element;
    }

    public copy(): void {
        fireEvent.copy(this.element);
    }

    public debug(): void {
        logDOM(this.element);
    }

    public doubleClick(): void {
        fireEvent.dblClick(this.element);
    }

    public fireClick(): void {
        fireEvent.click(this.element);
    }

    public getAttribute(attribute: string): string {
        return this.element.getAttribute(attribute);
    }

    public hover(): void {
        fireEvent.mouseOver(this.element);
    }

    public input(text: string): void {
        fireEvent.change(this.element, { target: { value: text } });
    }

    public inputImage(file: CustomFile): void {
        fireEvent.change(this.element, { target: { files: [file] } });
    }
}
