import axios from "axios"

export const axiosJWT = axios.create()

export const loginUser = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/sign-in`, data)
    return res.data
}

export const signupUser = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/sign-up`, data)
    return res.data
}

export const createUser = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/create-user`, data)
    return res.data
}

export const getDetailsUser = async (id, access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/user/get-details/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const getProfileUser = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/user/get-profile/${id}`)
    return res.data
}

<<<<<<< HEAD
=======
export const getAllInstructor = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/user/get-all-instructor`)
    return res.data
}

>>>>>>> 09a384dec923a768188f78a69ed32d1851d6c782
export const getAllUser = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/user/getAll`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const refreshToken = async () => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/refresh-token`, {
        withCredentials: true
    })
    return res.data
}

export const logoutUser = async () => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/log-out`)
    return res.data
}

export const updateUser = async (id, access_token, data) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/user/update-user/${id}`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const deleteUser = async (id, access_token) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/user/delete-user/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

<<<<<<< HEAD
export const loginPasswork = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/sign-in-passwork`, data)
    return res.data
}

export const updatePasswork = async (id, access_token, data) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/user/update-Passwork/${id}`, data, {
=======
export const deleteManyUser = async (data, access_token) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/user/delete-many-user`, data, {
>>>>>>> 09a384dec923a768188f78a69ed32d1851d6c782
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}