import axios from "axios"

export const axiosJWT = axios.create()

export const getAllCourse = async (search, limit) => {
    let res = {}
    if (search?.length > 0) {
        res = await axios.get(`${process.env.REACT_APP_API_URL}/course/get-all-course?filter=name&filter=${search}&limit=${limit}`)
    } else {
        res = await axios.get(`${process.env.REACT_APP_API_URL}/course/get-all-course?limit=${limit}`)
    }
    return res.data
}

export const getAllCourseType = async (type) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/course/get-all-course-type/${type}`)
    return res.data
}

export const getAllCourseInstructor = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/course/get-all-course-instructor/${id}`)
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

export const deleteManyCourse = async (data, access_token) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/course/delete-many-course`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}