declare type LayerEvent = {
    event: string;
    eventCategory: string;
    eventAction: string;
    eventLabel: string;
    eventValue?: number | string;
    deviceMemory?: string;
    hardwareConcurrency?: string;
    connection?: string;
    prescriptionName?: string;
    filled_email?: string;
    'gtm.uniqueEventId': number;
};
export type DataLayerEvent = Partial<LayerEvent>;
