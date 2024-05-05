"use client";
import Navbar from "./components/navbar";
import Post from "./components/post";
import Modal from "./components/modal";
import { useEffect, useState } from "react";
import { getAllPosts } from './fetchApi'

export default function Home() {

  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState("All")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllPosts().then(data => {
      console.log(data)
      setPosts(data.Items) ? data.Items : []
    })

    setLoading(false)

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
          <select className="select select-bordered w-1/4" onChange={(e) => setFilter(e.target.value)}>
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

            {loading ? <span className="self-center loading loading-bars loading-lg"></span>
              :
              <>

                {filter === "All" && posts.map(post => (
                  <Post key={post.postId} title={post.title} description={post.description} upvotes={post.upvotes} img={post.img} />
                ))}

                {filter === "Recent" && posts.sort((a, b) => new Date(b.date) - new Date(a.date)).map(post => (
                  <Post key={post.postId} title={post.title} description={post.description} upvotes={post.upvotes} img={post.img} />
                ))}

                {filter === "Popular" && posts.sort((a, b) => b.upvotes - a.upvotes).map(post => (
                  <Post key={post.postId} title={post.title} description={post.description} upvotes={post.upvotes} img={post.img} />
                ))}

                {posts.length === 0 && <h1 className="text-2xl font-semibold text-center">No posts to show</h1>}
              </>
            }

          </div>
        </ul>
      </div>
    </>
  );
}
