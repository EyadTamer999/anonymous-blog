"use client";
import Navbar from "./components/Navbar";
import Post from "./components/Post";
import Modal from "./components/Modal";
import { useEffect, useState } from "react";
import { getAllPosts } from './fetchApi'

export default function Home() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getAllPosts().then(data => {
      console.log(data)
      setPosts(data.Items)
    })

  }, [])

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 space-y-3 mt-8">
        <h1 className="text-4xl font-bold">Speak your mind</h1>
        <p className="text-lg">
          Welcome to the anonymous blog, where you can share your thoughts without any fear of judgement.
        </p>
      </div>

      {/* posts */}
      <div className="container flex flex-col mx-auto p-4">
        <div className="flex justify-between">
          {/* filter */}
          <select className="self-start select select-bordered w-52">
            <option>All</option>
            <option>Recent</option>
            <option>Popular</option>
          </select>

          {/* create post */}
          <button className="btn btn-primary w-fit self-end" onClick={() => document.getElementById('my_modal_5').showModal()}>Create Post</button>
          <Modal />

        </div>
        <ul>
          <h1 className="text-3xl font-semibold capitalize lg:text-4xl px-6 py-10 mx-auto">From the blog</h1>
          <div className="flex flex-col container px-6 py-10 mx-auto">

            {posts.map((post, index) => (
              <Post
                key={index}
                title={post.title}
                img={post.img}
                description={post.description}
                upvotes={post.upvotes}
              />
            ))}

            <hr className="self-center my-6 border-base-content w-1/2" />

          </div>
        </ul>
      </div>
    </>
  );
}
