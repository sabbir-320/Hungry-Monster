// initial meal
mealApi("chicken");

// event handler meal
function searchBtn() {
  const allCart = document.querySelectorAll(".cart");
  const inputMeal = document.getElementById("inputMeal");
  allCart.forEach((singleCart) => {
    singleCart.style.display = "none";
  });
  mealApi(inputMeal.value);

  // after search
  inputMeal.value = "";
}

function mealApi(mealName) {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
    .then((res) => res.json())
    .then((data) => mealHandle(data));
}

function mealHandle(data) {
  if (data.meals === null) {
    alert("You meal is not found or check meal spelling");
  } else {
    data.meals.forEach((meal) => {
      const cartContainer = document.querySelector(".cart-container");
      const cart = document.createElement("div");
      const mealImg = document.createElement("img");
      const mealTitle = document.createElement("h3");
      mealImg.src = meal.strMealThumb;
      mealTitle.textContent = meal.strMeal;
      cart.className = "cart";
      cart.setAttribute("id", meal.idMeal);
      cart.appendChild(mealImg);
      cart.appendChild(mealTitle);
      cartContainer.appendChild(cart);
    });
  }
  const allCart = document.querySelectorAll(".cart");
  mealDetails(allCart);
}

// get modal element
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modalContent");
const modalImg = document.querySelector('.img')
const mealName = document.querySelector(".mealName")
const ingredient = document.querySelector(".ingredient")
const ul = document.querySelector(".ul")

// meal details by Modal
function mealDetails(allCart) {
  allCart.forEach((singleCart) => {
    singleCart.addEventListener("click", (e) => {
      const mealId = parseInt(singleCart.getAttribute("id"));
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then((res) => res.json())
        .then((data) => {
          const {
            strMealThumb,
            strMeal,
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
            strIngredient6,
          } = data.meals[0];
          
          modalImg.src = strMealThumb;
          mealName.textContent = strMeal;
          ingredient.textContent = "Ingredients";
          const allLi = ul.children;
          allLi[0].textContent = strIngredient1
          allLi[1].textContent = strIngredient2
          allLi[2].textContent = strIngredient3
          allLi[3].textContent = strIngredient4
          allLi[4].textContent = strIngredient5
          allLi[5].textContent = strIngredient6
        });
      // Open Modal
      modal.style.display = "block";
    });
  });
}

//close Modal
function closeModal() {
  modal.style.display = "none";
}
window.addEventListener("click", (e) => {
  if (e.target == modal) {
    modal.style.display = "none";
  }
});
