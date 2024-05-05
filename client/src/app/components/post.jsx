import React from 'react'
import { deletePost, downvotePost, upvotePost } from '../fetchApi'


const post = ({ title, description, upvotes, img, postId }) => {

    const upvotePostButton = async (e) => {
        const response = await upvotePost(postId)
        console.log(response)
        window.location.reload()

    }

    const downvotePostButton = async (e) => {
        const response = await downvotePost(postId)
        console.log(response)
        window.location.reload()

    }

    const deletePostButton = async (e) => {


        const response = await deletePost(postId)
        console.log(response)
        window.location.reload()

    }


    return (
        < div className="mt-8 lg:-mx-6 lg:flex lg:items-center" >
            <img className="object-cover w-full lg:mx-6 lg:w-1/2 rounded-xl h-72 lg:h-96" src={img} alt="" />

            <div className="mt-6 lg:w-1/2 lg:mt-0 lg:mx-6 ">
                <a href="#" className="block mt-4 text-2xl font-semibold md:text-3xl">
                    {title}
                </a>
                <p className="mt-3 text-sm text-base-content md:text-sm">
                    {description}
                </p>
                <div className="flex items-center mt-6 space-x-4">
                    <button onClick={upvotePostButton} className="btn btn-sm btn-success btn-outline">Upvote</button>
                    <button onClick={downvotePostButton} className="btn btn-sm btn-accent btn-outline">Downvote</button>
                    <div className="flex items-center space-x-2 font-extralight">
                        <label>Upvotes: {upvotes}</label>
                    </div>
                </div>

                <div className="flex items-center mt-6 space-x-4">
                    <button onClick={deletePostButton} className="btn btn-sm btn-primary">Delete</button>
                </div>

            </div>
        </div >
    )
}

export default post