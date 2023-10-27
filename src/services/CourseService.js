import axios from "axios"

export const axiosJWT = axios.create()

export const getAllCourse = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/course/get-all-course`)
    return res.data
}

export const createCourse = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/course/create-course`, data)
    return res.data
}

export const getDetailsCourse = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/course/details-course/${id}`)
    return res.data
}

export const updateCourse = async (id, access_token, data) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/course/update-course/${id}`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const deleteCourse = async (id, access_token) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/course/delete-course/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}