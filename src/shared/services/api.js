import axios from "axios";

export const APIHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Autorization': {
        toString() {
            return `Bearer ${localStorage.getItem('token')}`
        }
    }
};

export const API = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL,
    headers: APIHeaders,
    timeout: 5000
});