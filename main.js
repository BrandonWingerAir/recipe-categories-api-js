let url = "https://www.themealdb.com/api/json/v1/1/";

let app = document.querySelector(".app");
let screen = {
    main:app.querySelector(".main-screen"),
    recipe:app.querySelector(".recipe-screen")
};

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

async function getRecipesOfCategory(category) {
    screen.main.querySelector(".recipe-list").innerHTML = "";

    try {let res = await fetch(url + "filter.php?c=" + category);
        let data = await res.json();
        let recipes = data.meals;

        for (let i = 0; i < recipes.length; i++) {
            let div = document.createElement("div");
            div.classList.add("item");
            div.addEventListener("click", function() {
                showFullRecipe(recipes[i].idMeal);
            });

            console.log(recipes);

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