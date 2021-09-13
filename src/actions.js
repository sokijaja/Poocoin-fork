import axios from 'axios';

export const getLpinfo = (tokenId) => {
    return axios
        .get("/token/getLpinfo", {
            params: { foo: tokenId },
        }).then((res) => { return res.data })
}
