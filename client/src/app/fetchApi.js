import axios from "axios";
const apiURL = process.env.BACKEND_URL;
const userId = localStorage.getItem("userId");

export const createPost = async (title, description, img) => {
    const formData = new FormData()
    formData.append("title", title)
    formData.append("description", description)
    formData.append("img", img)
    formData.append("userId", userId)
    console.log("Create post")
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


export const upvotePost = async (postId) => {
    console.log("Upvote post")
    try {
        const response = await axios.put(apiURL + "/api/post/upvote/" + postId, { userId })
        return response.data
    } catch (err) {
        console.log(err)
    }
}

export const downvotePost = async (postId) => {
    console.log("Downvote post")
    try {
        const response = await axios.put(apiURL + "/api/post/downvote/" + postId, { userId })
        return response.data
    } catch (err) {
        console.log(err)
    }
}

export const deletePost = async (postId) => {
    console.log("Delete post")
    try {
        console.log(userId)
        const response = await axios.delete(apiURL + "/api/post/" + postId, { data: { userId } })
        return response.data
    } catch (err) {
        console.log(err)
    }
}
