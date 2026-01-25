// Ensure this file is recognized as a module
export { };

// Define the shared Selections interface
export interface Selections {
    gown: string | null;
    gownPrice: number;
    photography: { id: number; name: string; price: number; description: string } | null;
    photographyPrice: number;
    videography: { id: number; name: string; price: number; description: string } | null;
    videographyPrice: number;
    hairMakeup: { id: string; name: string; price: number } | null;
    hairMakeupPrice: number;
    florist: boolean;
    floristPrice: number;
    hairMakeupLooks: number;
    freshLooks: number;
}