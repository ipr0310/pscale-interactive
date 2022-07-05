import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    return await readGame(req, res);
  }

  if (req.method === "POST") {
    return await updateGame(req, res);
  }

  if (req.method === "DELETE") {
    return await deleteGame(req, res);
  }

  return res
    .status(405)
    .json({ message: "Method not allowed", success: false });
}

// Read specific game
const readGame = async (req, res) => {
  const { id } = req.query;

  try {
    const readEntry = await prisma.game.findUnique({
      where: { id: Number(id) },
    });

    if (!readEntry) throw new Error("Error");

    return res.status(200).json(readEntry, { success: true });
  } catch (error) {
    res.status(500).json({ error: "Error finding game", success: false });
  }
};

// Update specific game
const updateGame = async (req, res) => {
  const { id } = req.query;
  const body = req.body;

  try {
    const updateEntry = await prisma.game.update({
      where: { id: Number(id) },
      data: {
        name: body.name,
        developer: body.developer,
        genre: body.genre,
        price: body.price,
      },
    });

    return res.status(200).json(updateEntry, { success: true });
  } catch (error) {
    res.status(500).json({ error: "Error updating the game", success: false });
  }
};

// Delete specific game
const deleteGame = async (req, res) => {
  const { id } = req.query;

  try {
    const deleteEntry = await prisma.game.delete({
      where: { id: Number(id) },
    });

    return res.status(200).json(deleteEntry, { success: true });
  } catch (error) {
    res.status(500).json({
      error: "Error deleting the game or the game does not exists anymore!",
      success: false,
    });
  }
};
