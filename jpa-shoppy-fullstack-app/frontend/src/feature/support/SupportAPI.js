import { axiosPost } from "../../utils/fetchData.js";

export const getSupport = async (type) => {
    const url = "/support/list";
    const supportData = { "type" : type }
    const jsonData = await axiosPost(url, supportData);
    return jsonData;
}