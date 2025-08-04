const form = document.getElementById("search-form");
const resultsContainer = document.getElementById("results");

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const query = document.getElementById("query").value.trim();
  if (!query) return;

  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`;
  resultsContainer.innerHTML = "<p>Loading...</p>";

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("API error");
    const data = await response.json();

    if (!data.meals) {
      resultsContainer.innerHTML = "<p>No recipes found.</p>";
      return;
    }

    resultsContainer.innerHTML = data.meals
      .map(meal => `
        <div class="card">
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
          <div class="card-body">
            <h3>${meal.strMeal}</h3>
            <a href="${meal.strSource || meal.strYoutube || '#'}" target="_blank">View Recipe</a>
          </div>
        </div>
      `)
      .join("");
  } catch (err) {
    resultsContainer.innerHTML = `<p>Error fetching data: ${err.message}</p>`;
    console.error(err);
  }
});
