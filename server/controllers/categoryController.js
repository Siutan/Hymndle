import categoryService from "../services/categoryService.js";

async function handleCategory(req, res) {
    try {
        console.log(req.body);
        const categoryRes = await categoryService.getPlaylistsByCategory(req.body["categoryId"]);
        res.send(categoryRes);
    } catch (error) {
        res.status(500).send(error);
    }
}

async function getCategories(req, res) {
    try {
        const categories = await categoryService.getCategories();
        res.send(categories);
    } catch (error) {
        res.status(500).send(error);
    }
}

export default {
    handleCategory,
    getCategories
}