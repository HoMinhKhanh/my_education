import axios from "axios"

export const axiosJWT = axios.create()

export const createAssignment = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/assignment/create-assignment`, data)
    return res.data
}

export const getDetailsAssignment = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/assignment/details-assignment/${id}`)
    return res.data
}

export const countAllAssignment = async (id) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/assignment/count-assignment/${id}`)
    return res.data
}