import React from "react";

// components

import CardBarChart from "components/Cards/CardBarChart.js";
import CardPageVisits from "components/Cards/CardPageVisits.js";
import CardSocialTraffic from "components/Cards/CardSocialTraffic.js";
import CardSettings from "components/Cards/CardSettings.js";

// layout for page

import Admin from "layouts/Admin.js";

export default function Dashboard({
  recipes,
  ordersDispatched,
  ordersReceived,
}) {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
          <CardSettings />
        </div>
        <div className="w-full xl:w-8/12 px-4 flex-auto">
          <CardBarChart recipes={recipes} />
        </div>
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
          <CardPageVisits ordersDispatched={ordersDispatched} />
        </div>
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-12/12 px-4">
          <CardSocialTraffic ordersReceived={ordersReceived} />
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const recipes = await fetch("http://nginx/kitchen/recipes");
  const ordersDispatched = await fetch(
    "http://nginx/kitchen/orders?dispatched=true"
  );
  const ordersReceived = await fetch(
    "http://nginx/kitchen/orders?received=true"
  );

  const parseRecipes = await recipes.json();
  const parseOrdersDispatched = await ordersDispatched.json();
  const parseOrdersReceived = await ordersReceived.json();

  return {
    props: {
      recipes: parseRecipes,
      ordersDispatched: parseOrdersDispatched,
      ordersReceived: parseOrdersReceived,
    },
  };
}

Dashboard.layout = Admin;
