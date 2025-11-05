import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, ".env") });

import axios from "axios";
import Search from "../models/Search.model.js";


const unsplashApi = axios.create({
  baseURL: "https://api.unsplash.com",
  headers: {
    Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
  },
});

export const handleSearch = async (req, res) => {
  const { term } = req.body;
  const userId = req.user.id;

  if (!term) {
    return res.status(400).json({ message: "Search term is required" });
  }

  try {
    const newSearch = new Search({
      user: userId,
      term: term.toLowerCase(),
    });
    await newSearch.save();

    const response = await unsplashApi.get("/search/photos", {
      params: {
        query: term,
        per_page: 20,
      },
    });

    const images = response.data.results.map((img) => ({
      id: img.id,
      description: img.description,
      alt_description: img.alt_description,
      urls: {
        full: img.urls.full,
        regular: img.urls.regular,
        small: img.urls.small,
      },
      links: img.links,
    }));

    res.status(200).json(images);
  } catch (error) {
    console.error("--- UNISPLASH SEARCH FAILED ---");
    console.error(error.message);
    console.error("---------------------------------");
    res.status(500).json({ message: "Server error during search" });
  }
};

// GET /api/top-searches
export const getTopSearches = async (req, res) => {
  try {
    const topSearches = await Search.aggregate([
      {
        $group: {
          _id: "$term",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 5,
      },
    ]);

    res.status(200).json(topSearches);
  } catch (error) {
    console.error("Top searches error:", error.message);
    res.status(500).json({ message: "Server error fetching top searches" });
  }
};

// GET /api/history
export const getUserHistory = async (req, res) => {
  const userId = req.user.id;
  try {
    const history = await Search.find({ user: userId })
      .sort({ timestamp: -1 })
      .limit(20);

    res.status(200).json(history);
  } catch (error) {
    console.error("User history error:", error.message);
    res.status(500).json({ message: "Server error fetching user history" });
  }
};
