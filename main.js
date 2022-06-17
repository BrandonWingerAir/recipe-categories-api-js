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
        }

        screen.main.querySelector(".categories").appendChild(div);
    } 
})();