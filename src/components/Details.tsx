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

type CSSPropertiesMap = {
    [name: string]: React.CSSProperties
};

const styles: CSSPropertiesMap = {
    alignRight: {
        textAlign: 'right'
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
        textAlign: 'left'
    },
    description: {
        fontStyle: 'italic',
        textAlign: 'justify'
    }
};

const defaultDetails = { id: 0, title: '', description: '', status: '', price: 0, created_at: '' };

const Details: React.FC<DetailsProps> = (props: DetailsProps) => {
    const [ details, setDetails] = useState<Offer>({ ...defaultDetails });
    const [ loading, setLoading] = useState<boolean>(true);
    const [ buttonHovered, setButtonHovered] = useState<boolean>(false);
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
        if (loading) {
            getSingleOffer(String(match.params.id))
            .then(res => {
                setDetails(res.data);
                setLoading(false);
            }); 
        }
        
    }, [loading, match]);

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
