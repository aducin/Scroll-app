import axios from 'axios';

const url = 'http://localhost:8000/offers';

export const getSingleOffer = (id: string) =>
    axios.get(`${url}/${id}`);

export const getCollection = (limit: number, page: number) =>
    axios.get(`${url}?_page=${page}&_limit=${limit}&status=published`);
