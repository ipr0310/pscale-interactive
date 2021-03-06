import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    return await addGame(req, res);
  }

  if (req.method === "GET") {
    return await readGames(req, res);
  }

  return res
    .status(405)
    .json({ message: "Method not allowed", success: false });
}

// Add a game
const addGame = async (req, res) => {
  const body = req.body;

  try {
    const newEntry = await prisma.game.create({
      data: {
        name: body.name,
        developer: body.developer,
        genre: body.genre,
        price: body.price,
      },
    });

    return res.status(200).json(newEntry, { success: true });
  } catch (error) {
    console.error("Request error", error);
    res.status(500).json({ error: "Error adding game", success: false });
  }
};

// Read all games
const readGames = async (req, res) => {
  try {
    const readEntries = await prisma.game.findMany();

    return res.status(200).json(readEntries, { success: true });
  } catch (error) {
    res.status(500).json({ error: "Error reading all games", success: false });
  }
};
