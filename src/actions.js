import axios from 'axios';

export const getLpinfo = async (tokenId) => {
    let lpDatas = []
    await axios
        .get("http://localhost:5000/token/getLpinfo", {
            params: { foo: tokenId },
        })
        .then((res) => {
            for (var idx in res.data) {
                let combined_json = {};
                combined_json["name"] = res.data[idx]["type"];
                combined_json["token0"] = res.data[idx]["token0"];
                combined_json["token1"] = res.data[idx]["token1"];
                combined_json["lp_address"] = res.data[idx]["lp_address"];
                combined_json["tokenName0"] = res.data[idx]["tokenName0"];
                combined_json["tokenName1"] = res.data[idx]["tokenName1"];
                lpDatas.push(combined_json);
            }
        });
    return lpDatas;
}
