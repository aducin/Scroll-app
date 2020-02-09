export interface Offer {
    id: number;
    title: string;
    description: string;
    status: string;
    price: number;
    created_at: string;
    discount?: number,
    rating?: number
};

export interface SinleOfferProps {
    offer: Offer,
    handleLinkClicked: (event: React.MouseEvent<HTMLElement, MouseEvent>, id: number) => void
};
