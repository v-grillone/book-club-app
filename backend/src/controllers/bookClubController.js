import BookClub from "../models/BookClub.js";

export async function getAllClubs(_, res) {
  try {
    const clubs = await BookClub.find();
    res.status(200).json(clubs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching book clubs" });
  }
}

export async function getBookClub(req, res) {
  try {
    console.log(req.params);
    const { id } = req.params;
    const bookClub = await BookClub.findById(id);

    if(!bookClub) {
      return res.status(404).json({message: "Book club not found."});
    }
    res.status(200).json(bookClub)
    
  } catch (error) {
    console.error("Error fetching book club", error);
    res.status(500).json({message: "Server error fetching book club"});
    
  }
}

export async function createClub(req, res) {
  const { title, author, genre, members, startDate, speed } = req.body;

  if (!title || !author || !genre || !members || !speed) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newClub = new BookClub({
      title,
      author,
      genre,
      members,
      speed,
      startDate,
      coverImageUrl: req.file ? req.file.path : null,
    });
    await newClub.save();
    res.status(201).json(newClub);
  } catch (error) {
    res.status(500).json({ message: "Error creating book club" });
  }
}

export async function updateClub(req, res) {
  const { id } = req.params; // club ID from the route
  try {
    const updatedClub = await BookClub.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidator: true }
    );

    if (!updatedClub) {
      return res.status(404).json({ message: "Book club not found" });
    }

    res.status(200).json(updatedClub);
  } catch (error) {
    res.status(500).json({ message: "Error updating book club", error: error.message });
  }
}
