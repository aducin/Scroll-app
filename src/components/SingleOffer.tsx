import * as React from 'react';
import { Offer } from '../interfaces/offer';

interface SinleOfferProps {
    offer: Offer,
    handleLinkClicked: (event: React.MouseEvent<HTMLElement, MouseEvent>, id: number) => void
}

const offerStyles: React.CSSProperties = {
    backgroundColor: '#f2f2f2',
    border: '2px solid #737373',
    borderRadius: '1%',
    margin: '2em',
    padding: '1em',
};

const SingleOffer: React.FC<SinleOfferProps> = (props: SinleOfferProps ) => {
    const { offer } = props;
    const descriptionHeader = offer.description.slice(0, 100);
    return <div style={offerStyles}>
        <h3>{offer.title}</h3>
        <p>{descriptionHeader}...</p>
        <p>
            <a
                href={`/offers/${offer.id}`}
                onClick={(event: React.MouseEvent<HTMLElement>) => props.handleLinkClicked(event, offer.id)}
            >See details</a>
        </p>
    </div>
};

export default SingleOffer;