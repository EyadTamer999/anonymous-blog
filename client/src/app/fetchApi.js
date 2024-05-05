import axios from "axios";
const apiURL = process.env.BACKEND_URL;


export const createPost = async (title, description, img) => {
    const formData = new FormData()
    formData.append("title", title)
    formData.append("description", description)
    formData.append("img", img)
    try {
        const response = await axios.post(apiURL + "/api/post/", formData)
        return response.data
    } catch (err) {
        console.log(err)
    }
}

export const getAllPosts = async () => {
    console.log("Get all posts")
    console.log(apiURL)
    try {
        const response = await axios.get(apiURL + "/api/post/")
        console.log(response.data)
        return response.data
    } catch (err) {
        console.log(err)
    }
}
