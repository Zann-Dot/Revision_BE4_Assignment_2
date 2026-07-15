import { connectDB } from "./db/db.connect";
import express from "express";
import cors from "cors"
connectDB()
const app = express();
app.use(cors());
app.use(express.json());
const PORT = 3000;

app.get("/recipes", async (req, res) => {
    try {
        const recipes = await Recipes.find();
        if (recipes.length === 0) {
            return res.status(404).json({ message: "No recipes found" });
        }
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/recipes", async (req, res) => {
    try {
        const recipe = await Recipes.create(req.body);

        if (!recipe) {
            return res.status(400).json({ message: "Failed to add recipe" });
        }

        res.status(201).json({ message: "Recipe added successfully", recipe });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
