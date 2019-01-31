import axios from "axios";
const host = "http://192.168.1.108:3000";
const api = axios.create({
    baseURL: host,
    timeout: 1000,
    headers: {
        token: "token"
    }
});
export default {
    recipes : function () {
        return api.get("/recipes");
    },
    getByIngredients : function (idIngredients) {
        return api.post("/getByIngredients", {idIngredients})
    },
    addRecipe : function (token, name, content, preparationTime, ingredients) {
        api.defaults.headers.token = token;
        return api.put("/addRecipe", {name, content, preparationTime, ingredients});
    },
    editRecipe : function (token, id, name, content, preparationTime, ingredients) {
        api.defaults.headers.token = token;
        return api.put("/editRecipe", {id, name, content, preparationTime, ingredients});
    },
    removeRecipe : function (token, id) {
        api.defaults.headers.token = token;
        return api.delete("/removeRecipe", {id});
    },
    ingredients : function () {
        return api.get("/ingredients");
    },
    getByName : function (name) {
        return api.get("/ingredientsByName", {params: {
                name
            }});
    }
};