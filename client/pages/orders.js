import React from "react";

// components

import CardTable from "components/Cards/CardTable.js";

// layout for page

import Admin from "layouts/Admin.js";

export default function Tables({ orders }) {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardTable data={orders} />
        </div>
      </div>
    </>
  );
}

Tables.layout = Admin;

export async function getServerSideProps() {
  const orders = await fetch("http://nginx/kitchen/orders");

  const parseOrders = await orders.json();

  return {
    props: {
      orders: parseOrders,
    },
  };
}
