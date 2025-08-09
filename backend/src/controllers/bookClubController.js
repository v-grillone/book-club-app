import BookClub from "../models/BookClub.js";

export async function getAllClubs(_, res) {
  try {
    const clubs = await BookClub.find();
    res.status(200).json(clubs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching book clubs" });
  }
}

export async function createClub(req, res) {
  const { title, author, genre, members, speed } = req.body;

  if (!title || !author || !genre || !members || !speed) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newClub = new BookClub({ title, author, genre, members, speed });
    await newClub.save();
    res.status(201).json(newClub);
  } catch (error) {
    res.status(500).json({ message: "Error creating book club" });
  }
}