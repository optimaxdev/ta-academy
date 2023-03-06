export type DataLayerEvent = {
  name: string;
  value: string | number;
};

export const pushToDataLayer = (event: DataLayerEvent): void => {
  if (!window.dataLayer) {
    window.dataLayer = [];
  }

  window.dataLayer.push(event);
};
