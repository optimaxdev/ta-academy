import { Container } from '@Core/container';

const SELECTORS = {};

export class CartPageContainer extends Container {
    public async fulfill(initialState = {}): Promise<void> {
        await super.fulfill(initialState);
    }
}
