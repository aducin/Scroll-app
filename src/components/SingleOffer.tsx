import * as React from 'react';
import { SingleOfferInterface } from '../interfaces/offer';

const offerStyles = {
    backgroundColor: '#f2f2f2',
    border: '2px solid #737373',
    borderRadius: '1%',
    margin: '2em',
    padding: '1em',
};

const SingleOffer: React.FC<SingleOfferInterface> = (props: SingleOfferInterface ) => {
    const descriptionHeader = props.description.slice(0, 100);
    return <div style={offerStyles}>
        <h3>{props.title}</h3>
        <p>{descriptionHeader}...</p>
        <p>
            <a
                href="/offer/{el.id}"
                onClick={(event: React.MouseEvent<HTMLElement>) => props.handleLinkClicked(event, props.id)}
            >See details</a>
        </p>
    </div>
};

export default SingleOffer;