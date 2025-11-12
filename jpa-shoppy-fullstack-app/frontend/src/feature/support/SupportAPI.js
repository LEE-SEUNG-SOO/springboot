import { axiosPost } from "../../utils/fetchData.js";

export const getSupport = async (data) => {
    const url = "/support/list";
    const jsonData = await axiosPost(url, data);
    return jsonData;
}