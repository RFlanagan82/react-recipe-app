import React, { useState, useEffect } from "react";
import Recipe from "./Recipe";
import "./App.css";

const App = () => {
  const APP_ID = "5ccfc0d5";
  const APP_KEY = "6fc27514f0e252c681f20a8d8d36dc43";

  //create a state that affects the API response for recipes
  const [recipes, setRecipes] = useState([]);

  //create a state that toggles when a user clicks search
  const [search, setSearch] = useState("");

  //create a state that toggles a change to the user's query and manipulates the API URL
  const [query, setQuery] = useState("chicken");

  //get new recipes every time we complete a search
  useEffect(() => {
    getRecipes();
  }, [query]);

  //use Async - Await for API calls
  const getRecipes = async () => {
    //you must await the call and use fetch method with the GET request URL
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    //create data variable that parses out the response from the api call
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };

  //need to create a function that changes the URL based on the user's search query
  const updateSearch = (e) => {
    setSearch(e.target.value);
    console.log(search);
  };

  //need to prevent the API from being called until the user has completed inputing their query and clicked on the submit btn
  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
  };

  return (
    <>
      <h1 className="header">Recipe Finder App</h1>
      <div className="App">
        <form onSubmit={getSearch} className="search-form">
          <input
            className="search-bar"
            type="text"
            value={search}
            onChange={updateSearch}
          />
          <button className="search-button" type="submit">
            Search
          </button>
        </form>
        <div className="recipes">
          {recipes.map((recipe) => (
            //create props to grab the values from the objects within the api
            <Recipe
              key={recipe.recipe.label}
              title={recipe.recipe.label}
              calories={recipe.recipe.calories}
              image={recipe.recipe.image}
              ingredients={recipe.recipe.ingredients}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default App;
