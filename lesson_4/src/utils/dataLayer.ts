import type { WaitForOptions } from '@Utils/waitFor';
import { waitFor } from '@Utils/waitFor';
import type { DataLayerEvent } from '@Utils/types/dataLayerEvent';
import deepMatch from 'deep-match2';
import type { Page } from 'playwright-core';

export class DataLayer {
  public constructor(private page: Page) {}

  public get events(): Promise<DataLayerEvent[]> {
    return this.getWindowDataLayer();
  }

  public get eventsReversed(): Promise<DataLayerEvent[]> {
    return this.getWindowDataLayer().then((d) =>
      d.reverse()
    );
  }

  private async findInDataLayer(
    eventQuery: DataLayerEvent
  ): Promise<DataLayerEvent[]> {
    const checkIsQueryPassed = (
      e: DataLayerEvent
    ): boolean => deepMatch(e, eventQuery);
    return (await this.eventsReversed)
      .map(
        ({ 'gtm.uniqueEventId': eventId, ...keepAtr }) =>
          keepAtr
      )
      .filter(checkIsQueryPassed);
  }

  public async waitForDataLayer(
    event: DataLayerEvent,
    options?: WaitForOptions
  ): Promise<DataLayerEvent[]> {
    return await waitFor(
      () => this.findInDataLayer(event),
      options
    ).catch((e) => this.throwNoEventFoundError(e, event));
  }

  private throwNoEventFoundError = (
    error: Error,
    event: DataLayerEvent
  ): never => {
    const errorLog = Object.entries(event)
      .map(
        ([eventName, eventValue]) =>
          `${eventName}: "${eventValue.toString()}"`
      )
      .join('\n');
    throw new Error(
      `Cannot find data layer events with the following parameters: \n		${errorLog} \n${error.stack}`
    );
  };

  private async getWindowDataLayer(): Promise<
    DataLayerEvent[]
  > {
    const dataWindowDataLayer = await this.page.evaluate(
      () => window.dataLayer
    );

    if (!dataWindowDataLayer) return [];

    return dataWindowDataLayer;
  }
}
