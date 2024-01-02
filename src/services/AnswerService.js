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

export const updateAnswer = async (id, access_token, data) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/answer/update-answer/${id}`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const deleteAnswer = async (id, access_token) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/answer/delete-answer/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const deleteManyAnswer = async (data, access_token) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/answer/delete-many-answer`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const countAllAnswer = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/answer/count-answer`, data)
    return res.data
}

export const countAllAnswerInstructor = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/answer/count-answer-instructor`, data)
    return res.data
}