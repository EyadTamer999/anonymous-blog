import React from 'react'

const modal = () => {
    return (
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Create Post!</h3>
                <div className="space-y-3">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Title</span>
                        </label>
                        <input type="text" placeholder="Title" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <textarea placeholder="Description" className="textarea textarea-bordered"></textarea>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Image URL</span>
                        </label>
                        <input type="file" className="file-input w-full" />
                    </div>
                </div>
                <div className="modal-action">
                    <form method="dialog w-full">
                        <div className="space-x-4">
                            <button className="btn btn-primary">Create</button>
                            <button className="btn btn-accent">Close</button>
                        </div>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default modal