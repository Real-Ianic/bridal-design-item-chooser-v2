// Define the shared Selections interface
export interface ItemSelection {
    id: string
    name: string
    description: string
    option: string
    price: number
    customPrice: boolean
}

export interface Selections {
    gown: ItemSelection | null;
    gownPrice: number;
    photography: ItemSelection | null;
    photographyPrice: number;
    videography: ItemSelection | null;
    videographyPrice: number;
    hairMakeup: ItemSelection | null;
    hairMakeupPrice: number;
    floristData: ItemSelection | null; // Changed from boolean to object
    floristPrice: number;
    // Legacy fields possibly not used anymore but kept for safety
    hairMakeupLooks: number;
    freshLooks: number;
    florist: boolean; // boolean flag
}