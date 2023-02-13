import axios from 'axios';

const cache = {};

export const connect = async (ip) => {
    try {
        if (!cache.ip) {
            cache.ip = ip;
            cache.host = `http://${ip}:1127`;
        }
        const res = await axios.get(`${cache.host}/connect`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (res.status === 200) {
            return res.data;
        }
    } catch (error) {
        return {
            code: 0
        };
    }
};

export const getLibrariesList = async (pageIndex, pageSize) => {
    try {
        const res = await axios.get(`${cache.host}/books`, {
            params: {
                pageIndex,
                pageSize
            }
        });
        if (res.status === 200) {
            return res.data;
        }
    } catch (error) {
        return {
            code: 0
        };
    }
};

export const uploadFile = async (formData) => {
    try {
        const res = await axios({
            url: `${cache.host}/upload`,
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: formData
        });
        if (res.status === 200) {
            return res.data;
        }
    } catch (error) {
        return {
            code: 0
        };
    }
};
