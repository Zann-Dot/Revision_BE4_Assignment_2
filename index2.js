import { connectDB } from "./db/db.connect";
import express from "express";
import cors from "cors"
import { Recipes } from "./models/recipes.models";
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

app.get("/recipes/title/:title", async (req, res) => {
    const title = req.params.title;
    try {
        const recipe = await Recipes.findOne({ title });
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        res.status(200).json(recipe);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/recipes/author/:author", async (req, res) => {
    const author = req.params.author;
    try {
        const recipe = await Recipes.find({ author });
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        res.status(200).json(recipe);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/recipes/difficulty/:difficulty", async (req, res) => {
    const difficulty = req.params.difficulty;
    try {
        const recipe = await Recipes.find({ difficulty });
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        res.status(200).json(recipe);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/recipes/:id", async (req, res) => {
    const id = req.params.id;
    const recipe = await Recipes.findByIdAndUpdate(id, req.body, { new: true });

    if (!recipe) {
        return res.status(404).json({ message: "Recipe not found" });
    }

    res.status(201).json({ message: "Recipe updated successfully", recipe });
});

app.post("/recipes/update/:title", async (req, res) => {
    const title = req.params.title;
    const { prepTime, cookTime } = req.body;

    if (!prepTime || !cookTime) {
        return res
            .status(400)
            .json({ message: "PrepTime and CookTime are required" });
    }
    const recipe = await Recipes.findOneAndUpdate(
        { title },
        { prepTime, cookTime },
        { new: true },
    );

    if (!recipe) {
        return res.status(404).json({ message: "Recipe not found" });
    }

    res.status(201).json({ message: "Recipe updated successfully", recipe });
});

app.delete("/recipes/:id", async (req, res) => {
    const id = req.params.id;
    const recipe = await Recipes.findByIdAndDelete(id);

    if (!recipe) {
        return res.status(404).json({ message: "Recipe not found" });
    }
    res.status(200).json({ message: "Recipe deleted successfully", recipe });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
