import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
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
          <button className="btn btn-primary w-fit self-end">
            Create Post
          </button>

        </div>
        <ul>
          <div class="container px-6 py-10 mx-auto">
            <h1 class="text-3xl font-semibold capitalize lg:text-4xl">From the blog</h1>

            {/* blog post */}
            <div class="mt-8 lg:-mx-6 lg:flex lg:items-center">
              <img class="object-cover w-full lg:mx-6 lg:w-1/2 rounded-xl h-72 lg:h-96" src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="" />

              <div class="mt-6 lg:w-1/2 lg:mt-0 lg:mx-6 ">
                <a href="#" class="block mt-4 text-2xl font-semibold md:text-3xl">
                  All the features you want to know
                </a>
                <p class="mt-3 text-sm text-base-content md:text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure veritatis sint autem nesciunt,
                  laudantium quia tempore delect
                </p>
              </div>
            </div>
          </div>
        </ul>
      </div>
    </>
  );
}
