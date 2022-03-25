import React from "react";

// components

import CardProfile from "components/Cards/CardProfile.js";

// layout for page

import Admin from "layouts/Admin.js";

export default function Settings({ products }) {
  return (
    <>
      <div className="flex flex-wrap">
        {products.map((product, index) => (
          <div className="w-full xl:w-3/12 px-4" key={index}>
            <CardProfile data={product} />
          </div>
        ))}
      </div>
    </>
  );
}

Settings.layout = Admin;

export async function getServerSideProps() {
  const products = await fetch("http://nginx/inventory/products");

  const parseProducts = await products.json();

  return {
    props: {
      products: parseProducts,
    },
  };
}
