import React from "react";

// components

import CardProfile from "components/Cards/CardProfile.js";

// layout for page

import Admin from "layouts/Admin.js";

export default function Settings({ recipes }) {
  return (
    <>
      <div className="flex flex-wrap">
        {recipes.map((recipe) => (
          <div className="w-full xl:w-3/12 px-4" key={recipe._id}>
            <CardProfile data={recipe} />
          </div>
        ))}
      </div>
    </>
  );
}

Settings.layout = Admin;

export async function getServerSideProps() {
  const recipes = await fetch("http://nginx/kitchen/recipes");

  const parseRecipes = await recipes.json();

  return {
    props: {
      recipes: parseRecipes,
    },
  };
}
