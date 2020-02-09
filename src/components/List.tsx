import React, { useCallback, useEffect, useReducer, useRef, useState } from 'react';

import { getCollection } from '../http/http';
import { Offer, SinleOfferProps } from '../interfaces/offer';
import SingleOffer from '../components/SingleOffer';
import LoadingIndicator from '../components/Loading';

interface ListProps {
    history: {
        push(url: string): void;
    };
    increment: number,
    limit: number;
    posY: number,
    setLimit: (limit: number) => void,
    setPosY: (posY: number) => void
}

interface ListState {
    handleRequest?: Boolean,
    list: Offer[],
    listCompleted?: Boolean,
    loading?: Boolean
};

interface ListReducer {
    payload: ListState,
    type: string
};

const listReducer = (state: ListState, action: ListReducer): ListState => {
    switch (action.type) {
        case 'loading':
            return { ...state, handleRequest: true, loading: true }
        case 'listCompleted':
            return { ...state, listCompleted: action.payload.listCompleted };
        case 'setHandleRequest':
            return { ...state, handleRequest: action.payload.handleRequest };
        case 'setResult':
            return {
                ...state,
                list: [...state.list, ...action.payload.list],
                loading: false
            };
        default:
            return state;
    }
};

const defaultReducerState: ListState = {
    handleRequest: true,
    list: [],
    listCompleted: false,
    loading: true
};

const List: React.FC<ListProps> = (props: ListProps) => {
    const [ curPage, setCurPage ] = useState<number>(1);
    const [ data, dispatch ] = useReducer(listReducer, defaultReducerState);
    const contentEl = useRef<HTMLHeadingElement>(null);

    const { handleRequest, list, listCompleted, loading } = data;
    const { increment, history, limit, posY, setLimit, setPosY } = props;

    const handleLinkClicked = useCallback((event: React.MouseEvent<HTMLElement>, id: number) => {
        event.preventDefault();
        setLimit(curPage * limit);
        setPosY(window.scrollY);
        history.push(`/offers/${id}`);
    }, [curPage, limit, history, setLimit, setPosY]);

    const handleScroll = useCallback(() => {
        if (contentEl.current) {
            const scrolled: number = window.scrollY + window.innerHeight;
            const proceedLoading: boolean = !listCompleted && !loading;
            
            if (proceedLoading && scrolled > contentEl.current.offsetHeight) {
                setPosY(window.scrollY);
                setCurPage(curPage + 1);
                dispatch({ type: 'loading', payload: { list }});
            }
        }
    }, [curPage, list, listCompleted, loading, setPosY]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, true);
        return () => {
            window.removeEventListener('scroll', handleScroll, true);
        }
    }, [handleScroll]);

    useEffect(() => {
        if (handleRequest) {
            getCollection(limit, curPage)
            .then(res => {
                if (res.data.length) {
                    dispatch({ type: 'setResult', payload: { list: res.data }});
                } else {
                    dispatch({ type: 'listCompleted', payload: { list: [], listCompleted: true }});
                }
            });
        }
    }, [curPage, handleRequest, limit]);

    useEffect(() => {
        if (!loading) {
            window.scrollTo({ top: posY });
        }
    }, [loading, posY]);

    useEffect(() => {
        if (limit !== increment) {
            dispatch({ type: 'setHandleRequest', payload: { handleRequest: false, list }});
            setCurPage(limit / increment);
            setLimit(increment);
        }
    }, [handleRequest, increment, limit, list, setLimit]);

    const content = list.map((el: Offer, index: number) => {
        const props: SinleOfferProps = { offer: el, handleLinkClicked: handleLinkClicked };
        return <SingleOffer key={index} {...props} />
    });
    let loadingIndicator;

    if (loading) {
        loadingIndicator = <LoadingIndicator />;
    }

    return <div ref={contentEl}>
        <h2>Offer List</h2>
        {content}
        {loadingIndicator}
    </div>;
}

export default React.memo(List);
