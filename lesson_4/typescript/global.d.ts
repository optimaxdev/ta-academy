import type { DataLayerEvent } from '@Utils/types/dataLayerEvent';

declare global {
  declare interface Window {
    dataLayer: DataLayerEvent[];
  }
}
