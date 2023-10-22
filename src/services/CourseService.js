import axios from "axios"

export const getAllCourse = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/course/get-all-course`)
    return res.data
}