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

export const updateAssignment = async (id, access_token, data) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/assignment/update-assignment/${id}`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const deleteAssignment = async (id, access_token) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/assignment/delete-assignment/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const deleteManyAssignment = async (data, access_token) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/assignment/delete-many-assignment`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const countAllAssignment = async (id) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/assignment/count-assignment/${id}`)
    return res.data
}