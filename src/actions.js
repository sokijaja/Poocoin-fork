import axios from 'axios';

export const getLpinfo = (tokenId) => {
    return axios
        .get("http://localhost:5000/token/getLpinfo", {
            params: { foo: tokenId },
        }).then((res) => { return res.data })
}
