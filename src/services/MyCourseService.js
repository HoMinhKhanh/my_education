import axios from "axios"

export const axiosJWT = axios.create()

export const getMyCourse = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/mycourse/get-my-course/${id}`)
    return res.data
}

export const createMyCourse = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/mycourse/create-my-course`, data)
    return res.data
}
