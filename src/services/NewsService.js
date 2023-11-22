import axios from "axios"

export const axiosJWT = axios.create()

export const getAllNews = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/news/get-all-news`)
    return res.data
}

export const createNews = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/news/create-news`, data)
    return res.data
}

export const getDetailsNews = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/news/get-details-news/${id}`)
    return res.data
}

export const updateNews = async (id, access_token, data) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/news/update-news/${id}`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const deleteNews = async (id, access_token) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/news/delete-news/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const deleteManyNews = async (data, access_token) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/news/delete-many-news`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}
