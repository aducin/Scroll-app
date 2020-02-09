export interface Offer {
    id: number | string;
    title: string;
    description: string;
    status: string;
    price: number;
    created_at: string;
    discount?: number,
    rating?: number
};

export interface SingleOfferInterface extends Offer {
    handleLinkClicked: any
}
