// Ensure this file is recognized as a module
export { };

// Define the shared Selections interface
export interface Selections {
    gown: string | null;
    gownPrice: number;
    photography: { id: number; name: string; price: number; description: string } | null;
    videography: { id: number; name: string; price: number; description: string } | null;
    hairMakeup: { id: string; name: string; price: number } | null;
    florist: boolean;
    hairMakeupLooks: number;
    freshLooks: number;
}