import { useEffect, useState } from "react";
import api from "../lib/axios.js";
import { useParams } from "react-router";
import { Reply, ThumbsUp, ThumbsDown } from "lucide-react";

function BookClubPage() {
  const { id } = useParams();
  const [bookClub, setBookClub] = useState(null);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('')

  useEffect(() => {

    const token = localStorage.getItem("token");

    const fetchBookClub = async () => {
      try {
        
        const res = await api.get(`/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBookClub(res.data);
      } catch (error) {
        console.error("Error fetching book club.", error);
      }
    };
    fetchBookClub();

    const fetchPosts = async () => {
      try {
        const res = await api.get(`/post/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPosts(res.data);
                
      } catch (error) {
        console.error("Error fetching posts ", error);        
      }
    };
    fetchPosts();
  }, [id]);

  const handleCreatePost = async () => {
    if(!newPost.trim()) return alert("Post cannot be empty!");

    try {
      const token = localStorage.getItem('token');

      const res = await api.post(`/post/${id}`,
        { content: newPost },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );

      // Adds new post to the top of the posts list
      setPosts((prevPosts) => [res.data, ...prevPosts]);

      // Clear textarea after post
      setNewPost('');      
    } catch (error) {
      console.error('Error creating post ', error);      
    }

  }

  if (!bookClub) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Club Header */}
        <div className="card bg-base-100 shadow-xl p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            <figure className="md:w-1/3">
              <img
                src={bookClub.coverImageURL || "https://via.placeholder.com/300x400"}
                alt={bookClub.title}
                className="rounded-lg object-cover w-full h-full"
              />
            </figure>
            <div className="flex flex-col justify-between md:w-2/3">
              <div>
                <h2 className="text-3xl font-bold mb-2">{bookClub.title}</h2>
                <p className="text-lg text-gray-600 mb-1">By: {bookClub.author}</p>
                <p className="text-gray-500 mb-1">Genre: {bookClub.genre}</p>
                <p className="text-gray-500 mb-1">
                  Start Date: {new Date(bookClub.startDate).toLocaleDateString()}
                </p>
                <p className="text-gray-500">Speed: {bookClub.speed} pages/day</p>
              </div>
              <p className="mt-4 text-sm text-red-500">
                ⚠️ Warning: Chat may contain spoilers! Please be respectful to other users and only discuss topics up to the current page of the thread.
              </p>
            </div>
          </div>
        </div>

        {/* Create Post Section */}
        <div className="card bg-base-100 shadow-md p-4 mb-6">
          <h3 className="text-xl font-semibold mb-3">Create a Post</h3>
          <textarea
            placeholder="Write something..."
            className="textarea textarea-bordered w-full mb-3"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          />
          <button onClick={handleCreatePost} className="btn btn-primary w-full">Post</button>
        </div>

        {/* Chat Section */}
        <div className="card bg-base-100 shadow-md p-4">
          <h3 className="text-xl font-semibold mb-3">Club Chat</h3>
          <div className="max-h-96 overflow-y-auto bg-base-100 rounded-md p-3 mb-4">
            {posts.length === 0 ? (
              <p className="text-gray-500 italic">No messages yet. Be the first to start the conversation!</p>
            ) : (
              posts.map((post) => (
                <div key={post._id} className="p-4 bg-base-200 rounded-lg shadow-sm border border-base-300 mb-2">
                  {/* Post content */}
                  <div className="flex justify-between">
                    <div className="flex-1 pr-4">
                      <p className="text-sm text-gray-500 mb-1">Posted by <span className="font-semibold">{post.user.username}</span></p>
                      <p className="text-base">{post.content}</p>
                    </div>
                    <div className="flex flex-col items-center gap-2 text-gray-500">
                      <button className="hover:text-gray-700 transition">
                        <Reply size={20} />
                      </button>
                      <div className="flex flex-col items-center">
                        <button className="hover:text-green-700 transition">
                          <ThumbsUp size={18} />
                        </button>
                        <p className="text-xs font-medium">0</p>
                        <button className="hover:text-red-700 transition">
                          <ThumbsDown size={18} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Replies section */}
                  <div className="mt-3 pl-3 border-l-2 border-gray-300 space-y-2">
                    {post.comments && post.comments.length > 0 ? (
                      post.comments.map((comment) => (
                        <div key={comment._id} className="bg-base-100 p-2 rounded-md shadow-sm">
                          <p className="text-sm text-gray-500">- {comment.user.username}</p>
                          <p className="text-sm">{comment.content}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-400 italic">No replies yet. be the first to reply.</p>
                    )}
                  </div>
                </div>
              ))
            )}            
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookClubPage;
