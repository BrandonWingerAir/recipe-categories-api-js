let url = "https://www.themealdb.com/api/json/v1/1/";

let app = document.querySelector(".app");
let screen = {
    main:app.querySelector(".main-screen"),
    recipe:app.querySelector(".recipe-screen")
};

// List Categories
(async function() {
    let res = await fetch(url + "list.php?c=list");
    let data = await res.json();
    let categories = data.meals;

    for (let i = 1; i < categories.length; i++) {
        let div = document.createElement("div");

        div.innerText = categories[i].strCategory;
        
        div.addEventListener("click", function() {
            screen.main.querySelector(".categories .active").classList.remove("active");
            div.classList.add("active");
            getRecipesOfCategory(categories[i].strCategory);
        });

        if (i == 1) {
            div.classList.add("active");
            getRecipesOfCategory(categories[i].strCategory);
        }

        screen.main.querySelector(".categories").appendChild(div);
    } 
})();

// Category Details
async function getRecipesOfCategory(category) {
    screen.main.querySelector(".recipe-list").innerHTML = "";

    try {
        let res = await fetch(url + "filter.php?c=" + category);
        let data = await res.json();
        let recipes = data.meals;

        for (let i = 0; i < recipes.length; i++) {
            let div = document.createElement("div");

            div.classList.add("item");

            div.addEventListener("click", function() {
                showFullRecipe(recipes[i].idMeal);
            });

            div.innerHTML = `
                <div class="thumbnail">
                    <img src="${recipes[i].strMealThumb}"/>
                </div>
                <div class="details">
                    <h2>${recipes[i].strMeal}</h2>
                </div>
            `;

            screen.main.querySelector(".recipe-list").appendChild(div);
        }
    } catch (msg) {
        
    }
}

// Recipe Details
async function showFullRecipe(recipeId) {
    screen.main.classList.add("hidden");
    screen.recipe.classList.remove("hidden");

    screen.recipe.querySelector(".back-btn").addEventListener("click", function() {
        screen.recipe.classList.add("hidden");
        screen.main.classList.remove("hidden");
        screen.recipe.querySelector(".thumbnail img").src = "";
        screen.recipe.querySelector(".details h2").innerText = "";
        screen.recipe.querySelector(".details ul").innerHTML = "";
        screen.recipe.querySelector(".details ol").innerHTML = "";
    });

    try {
        let res = await fetch(url + "lookup.php?i=" + recipeId);
        let data = await res.json();
        let recipe = data.meals[0];

        screen.recipe.querySelector(".thumbnail img").src = recipe.strMealThumb;
        screen.recipe.querySelector(".details h2").innerText = recipe.strMeal;

        for (let i = 1; i <= 20; i++) {
            if (recipe["strIngredient" + i].length == 0) {
                break;
            }

            let li = document.createElement("li");
            li.innerText = recipe["strIngredient" + i] + " - " + recipe["strMeasure" + i];
            
            screen.recipe.querySelector(".details ul").appendChild(li);
        }

        let instruct = recipe.strInstructions.split("\r\n").filter(v => v);

        for (let i = 0; i < instruct.length; i++) {
            let li = document.createElement("li");
            li.innerText = instruct[i];
            screen.recipe.querySelector(".details ol").appendChild(li);
        }
    } catch (msg) {
        
    }
}