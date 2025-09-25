import { useEffect, useState } from "react";
import api from "../lib/axios.js";
import { useParams } from "react-router";
import { Reply, ThumbsUp, ThumbsDown } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';

function BookClubPage() {
  const { id } = useParams();
  const [bookClub, setBookClub] = useState(null);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('')
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState('');

  const userId = localStorage.getItem('userId');

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

  // Handle create post function
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

    // Handle reply function
  const handleReply = async (postId) => {
    if (!replyContent.trim()) return alert('Cannot be empty!');

    try {
      const token = localStorage.getItem('token');
      const res = await api.post(`/post/${postId}/reply`,
        { content: replyContent },
        { headers: { Authorization: `Bearer ${token}`}}
      );

      // Update the UI
      setPosts((prev) => 
        prev.map((p) => (p._id === postId ? res.data : p))
      );

      setReplyingTo(null);
      setReplyContent('');        
    } catch (error) {
      console.error('Error submitting reply', error);        
    }
  };

  const handleLike = async (postId) => {
    try {
      const token = localStorage.getItem('token');
      const res = await api.patch(`/post/${postId}/like`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setPosts(prevPosts => prevPosts.map(post => post._id === postId ? res.data : post));

    } catch (error) {
      console.error('Error liking post.', error);      
    }
  }

  const handleDislike = async (postId) => {
    try {
      const token = localStorage.getItem('token');
      const res = await api.patch(`/post/${postId}/dislike`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setPosts(prevPosts => prevPosts.map(post => post._id === postId ? res.data : post));

    } catch (error) {
      console.error('Error disliking post.', error);      
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
                      <p className="text-sm text-gray-500 mb-1">Posted by <span className="font-semibold">{post.user.username}</span> - {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</p>
                      <p className="text-base">{post.content}</p>
                    </div>
                    <div className="flex flex-col items-center gap-2 text-gray-500">
                      <button onClick={() => setReplyingTo(post._id)} className="hover:text-gray-700 transition">
                        <Reply size={20} />
                      </button>
                      <div className="flex flex-col items-center">
                        <button onClick={() => handleLike(post._id)} className={`hover:text-green-700 transition ${post.likes.includes(userId) ? 'text-green-700' : 'text-gray-500'}`}>
                          <ThumbsUp size={18} />
                        </button>
                        <p className="text-xs font-medium">{post.likes.length - post.dislikes.length}</p>
                        <button onClick={() => handleDislike(post._id)} className={`hover:text-red-700 transition ${post.dislikes.includes(userId) ? 'text-red-700' : 'text-gray-500'}`}>
                          <ThumbsDown size={18} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Reply text box if active */}
                  {replyingTo === post._id && (
                    <div className="mt-2 flex flex-col">
                      <textarea 
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      className="textarea textarea-bordered w-full mb-2"
                      placeholder="Write a reply..."
                      />
                      <div className="flex flex-row justify-end">
                        <button
                        onClick={() => handleReply(post._id)}
                        className="btn btn-primary btn-sm">
                          Submit Reply
                        </button>
                        <button
                        className="btn btn-secondary btn-sm ml-1"
                        onClick={() => setReplyingTo(null)}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Replies section */}
                  <div className="mt-3 pl-3 border-l-2 border-gray-500 space-y-2">
                    {post.replies && post.replies.length > 0 ? (
                      post.replies.map((reply) => (
                        <div key={reply._id} className="bg-base-200 p-2 rounded-md shadow-sm">
                          <p className="text-sm text-gray-500 mb-1">Posted by <span className="font-semibold">{reply.user.username}</span> - {formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}</p>
                          <p className="text-base">{reply.content}</p>
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
