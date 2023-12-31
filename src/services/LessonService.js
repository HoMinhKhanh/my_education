import axios from "axios"

export const axiosJWT = axios.create()

export const getAllLesson = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/lesson/get-all-lesson`)
    return res.data
}

export const createLesson = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/lesson/create-lesson`, data)
    return res.data
}

export const getDetailsLesson = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/lesson/details-lesson/${id}`)
    return res.data
}

export const updateLesson = async (id, access_token, data) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/lesson/update-lesson/${id}`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const deleteLesson = async (id, access_token) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/lesson/delete-lesson/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
<<<<<<< HEAD
=======
}

export const deleteManyLesson = async (data, access_token) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/lesson/delete-many-lesson`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const countAllLesson = async (id) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/lesson/count-lesson/${id}`)
    return res.data
>>>>>>> 09a384dec923a768188f78a69ed32d1851d6c782
}