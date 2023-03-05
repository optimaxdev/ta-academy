import { DataLayerEvent } from "../src/dataLayer/dataLayer";

declare global {
  interface Window {
    dataLayer: DataLayerEvent[];
  }
}
