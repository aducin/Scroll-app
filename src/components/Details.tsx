import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { match } from "react-router-dom";
import { getSingleOffer } from '../http/http';
import { Offer } from '../interfaces/offer';
import LoadingIndicator from '../components/Loading';

interface OfferParams { id: string };

interface DetailsProps {
    history: {
        push(url: string): void;
    };
    match: match<OfferParams>;
};

interface DetailsState {
    details: Offer,
    loading?: Boolean
};

interface DetailsReducer {
    payload: DetailsState,
    type: string
};

const styles = {
    alignRight: {
        textAlign: 'right' as 'right'
    },
    button: {
        marginBottom: '2em',
        padding: '0.5em'
    },
    containerStyles: {
        backgroundColor: '#f2f2f2',
        border: '2px solid #737373',
        borderRadius: '1%',
        margin: '2em',
        padding: '1em',
        textAlign: 'left' as 'left'
    },
    description: {
        fontStyle: 'italic',
        textAlign: 'justify' as 'justify'
    }
}

const detailsReducer = (state: DetailsState, action: DetailsReducer): DetailsState => {
    switch (action.type) {
        case 'setDetails':
            return { details: action.payload.details, loading: false };
        default:
            return state;
    }
};

const defaultReducerState: DetailsState = {
    details: { id: 0, title: '', description: '', status: '', price: 0, created_at: '' },
    loading: true
};

const Details: React.FC<DetailsProps> = (props: DetailsProps) => {
    const [ data, dispatch ] = useReducer(detailsReducer, defaultReducerState);
    const [ buttonHovered, setButtonHovered] = useState<boolean>(false);
    const { details, loading } = data;
    const { history, match } = props;

    const buttonStyle = useCallback(() => {
        return buttonHovered ? 
            { ...styles.button, cursor: 'pointer' } :
            { ...styles.button };
    }, [buttonHovered]);
    
    const handleGoBack = useCallback(() => {
        history.push('/offers');
    }, [history]);

    useEffect(() => {
        getSingleOffer(String(match.params.id))
        .then(res => {
            dispatch({ type: 'setDetails', payload: { details: res.data }});
        }); 
    }, [match]);

    let content, created, discount, rating;

    if (loading) {
        content = <LoadingIndicator />
    } else {
        created = details.created_at.split("T")[0];

        if (details.discount) {
            discount = <p><b>Discount: {details.discount}%</b></p>;
        }

        if (details.rating) {
            rating = <p>Offer rated - current rating: {details.rating}/5</p>
        }
        content = <React.Fragment>
            <h2>Offer Details</h2>
            <div style={styles.containerStyles}>
                <p>{details.title} (ID: {details.id})</p>
                <p>Price: {details.price}</p>
                <p style={styles.description}>{details.description}</p>
                {discount}
                {rating}
                <p style={styles.alignRight}>Created: {created}</p>
            </div>
            <button
                type="button"
                style={buttonStyle()}
                onClick={() => handleGoBack()}
                onMouseEnter={() => setButtonHovered(true)}
                onMouseLeave={() => setButtonHovered(false)}
            >Go back</button>
        </React.Fragment>;
    }

    return <div>{content}</div>;
};

export default React.memo(Details);
