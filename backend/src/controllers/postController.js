import Post from "../models/Post.js";

// create a post
export async function createPost(req, res) {
  const { content } = req.body;
  const { id: clubId } = req.params;

  if (!content) return res.status(400).json({message: "content is required"});

  try {
    const newPost = new Post({
      club: clubId,
      user: req.user.id,
      content,
    });

    await newPost.save();

    const populatedPost = await newPost.populate('user', 'username email')
    res.status(201).json(populatedPost);    
  } catch (error) {
    console.error("Error creating post", error);
    res.status(500).json({ message: "Error creating post" });    
  }
}

// Get posts for a club
export async function getClubPosts(req, res) {
  const { id: clubId } = req.params;
  try {
    const posts = await Post.find({club: clubId }).populate('user', 'username email').sort({ createdAt: -1 });
    res.status(200).json(posts);
    
  } catch (error) {
    console.error("Error retreiving posts ", error);
    res.status(500).json({ message: "Error receiving posts"});    
  }
}