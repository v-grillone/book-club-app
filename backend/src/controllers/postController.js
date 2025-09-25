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
    const posts = await Post.find({club: clubId }).populate('user', 'username email').populate('replies.user', 'username email').sort({ createdAt: -1 });
    res.status(200).json(posts);
    
  } catch (error) {
    console.error("Error retreiving posts ", error);
    res.status(500).json({ message: "Error receiving posts"});    
  }
}

// Reply to a post
export async function replyToPost(req, res) {
  const {id: postId} = req.params;
  const { content } = req.body;

  if (!content) return res.status(400).json({ message: "Reply content is required"});

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: 'Post not found.'});

    post.replies.push({
      user: req.user.id,
      content,
    });

    await post.save();
    const populatedPost = await Post.populate('user', 'username email').populate('replies.user', 'username email');

    console.log("Populated Post:", JSON.stringify(populatedPost, null, 2));

    res.status(200).json(populatedPost);

  } catch (error) {
    console.error('Error replying to post', error);
    res.status(500).json({ message: "Error replying to post" });    
  }
}

// Like post
export async function likePost(req, res) {
  const { id: postId } = req.params;
  const userId = req.user.id;

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: 'Post not found.'});

    // Remove user from dislike if they disliked before
    post.dislikes = post.dislikes.filter(id => id.toString() !== userId);

    // Toggle like
    if (post.likes.includes(userId)) {
      // unlike
      post.likes = post.likes.filter(id => id.toString() !== userId);
    } else {
      post.likes.push(userId);
    }

    await post.save()

    const updatedPost =  await Post.findById(postId)
      .populate('user', 'username email')
      .populate('user.replies', 'username email');

    res.status(200).json(updatedPost);
    
  } catch (error) {
    console.error("Error liking post.", error);
    res.status(500).json({ message: 'Error liking post.'});    
  }
}

// Dislike post
export async function dislikePost(req, res) {
  const { id: postId } = req.params;
  const userId = req.user.id;

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: 'Post not found.'});

    // Remove user from likes if they disliked before
    post.likes = post.likes.filter(id => id.toString() !== userId);

    // Toggle like
    if (post.dislikes.includes(userId)) {
      // unlike
      post.dislikes = post.dislikes.filter(id => id.toString() !== userId);
    } else {
      post.dislikes.push(userId);
    }

    await post.save()

    const updatedPost =  await Post.findById(postId)
      .populate('user', 'username email')
      .populate('user.replies', 'username email');

    res.status(200).json(updatedPost);
    
  } catch (error) {
    console.error("Error disliking post.", error);
    res.status(500).json({ message: 'Error disliking post.'});    
  }
}