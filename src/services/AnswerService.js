import axios from "axios"

export const axiosJWT = axios.create()

export const createAnswer = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/answer/create-answer`, data)
    return res.data
}

export const getDetailsAnswer = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/answer/details-answer/${id}`)
    return res.data
}

export const countAllAnswer = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/answer/count-answer`, data)
    return res.data
}