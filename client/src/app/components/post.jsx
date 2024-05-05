import React from 'react'

const post = ({ title, description, upvotes }) => {
    return (
        < div className="mt-8 lg:-mx-6 lg:flex lg:items-center" >
            <img className="object-cover w-full lg:mx-6 lg:w-1/2 rounded-xl h-72 lg:h-96" src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="" />

            <div className="mt-6 lg:w-1/2 lg:mt-0 lg:mx-6 ">
                <a href="#" className="block mt-4 text-2xl font-semibold md:text-3xl">
                    {title}
                </a>
                <p className="mt-3 text-sm text-base-content md:text-sm">
                    {description}
                </p>
                <div className="flex items-center mt-6 space-x-4">
                    <button className="btn btn-sm btn-success btn-outline">Upvote</button>
                    <button className="btn btn-sm btn-accent btn-outline">Downvote</button>
                    <div className="flex items-center space-x-2 font-extralight">
                        <label>Upvotes: {upvotes}</label>
                    </div>
                </div>

            </div>
        </div >
    )
}

export default post