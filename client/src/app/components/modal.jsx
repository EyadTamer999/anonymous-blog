"use client";
import React, { useState } from 'react'
import { createPost } from '../fetchApi'

const modal = () => {

    const [data, setData] = useState({ title: "", description: "", img: "" })

    const [loading, setLoading] = useState(false)


    const submitPost = async (e) => {

        if (!data.title || !data.description || !data.img) {
            alert("Please fill all the fields")
            return
        }
        e.preventDefault()
        console.log(data)
        setLoading(true)
        const response = await createPost(data.title, data.description, data.img)
        console.log(response)
        setLoading(false)
        document.getElementById('my_modal_5').close()
        setData({ title: "", description: "", img: "" })
        window.location.reload()
    }


    return (
        <>
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="flex flex-col modal-box">
                    {loading ?
                        <span className="self-center loading loading-bars loading-lg"></span>
                        :
                        <>
                            <span className="font-bold text-lg">
                                Create Post!
                            </span>
                            <div className="space-y-3">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Title</span>
                                    </label>
                                    <input onChange={(e) => setData({ ...data, title: e.target.value })} type="text" placeholder="Title" className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Description</span>
                                    </label>
                                    <textarea onChange={(e) => setData({ ...data, description: e.target.value })} placeholder="Description" className="textarea textarea-bordered"></textarea>
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Image</span>
                                    </label>
                                    <input onChange={(e) => setData({ ...data, img: e.target.files[0] })} type="file" placeholder="Image" className="input input-bordered" />
                                </div>
                            </div>
                            <div className="modal-action">
                                <form method="dialog w-full">
                                    <div className="space-x-4">
                                        <button onClick={submitPost} className="btn btn-primary">Create</button>
                                        <button className="btn btn-accent">Close</button>
                                    </div>
                                </form>
                            </div>
                        </>
                    }
                </div>
            </dialog>
        </>
    )

}

export default modal