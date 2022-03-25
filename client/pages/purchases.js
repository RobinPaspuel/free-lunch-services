import React from "react";

// components

import CardTablePurchases from "components/Cards/CardTablePurchases.js";
// layout for page

import Admin from "layouts/Admin.js";

export default function Tables({ purchases }) {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardTablePurchases data={purchases} />
        </div>
      </div>
    </>
  );
}

Tables.layout = Admin;

export async function getServerSideProps() {
  const purchases = await fetch("http://nginx/inventory/purchases");

  const parsePurchases = await purchases.json();

  return {
    props: {
      purchases: parsePurchases,
    },
  };
}
