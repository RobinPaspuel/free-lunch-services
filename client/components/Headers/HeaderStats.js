import React from "react";

// components

import CardStats from "components/Cards/CardStats.js";

export default function HeaderStats() {
  const [{ orders, dishes }, setOrdersStats] = React.useState("0");
  const [productsUsed, setProductsUsed] = React.useState("0");
  const [purchases, setPurchases] = React.useState("0");

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost/kitchen/orders");
      const parseResponse = await response.json();

      const recipes = parseResponse.map((order) => order.recipes).flat();

      const ordersDispatched = parseResponse.length;

      setOrdersStats({
        orders: ordersDispatched.toString(),
        dishes: recipes.length.toString(),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost/inventory/products");
      const parseResponse = await response.json();
      const productsUsed = parseResponse.reduce(
        (acc, item) => acc + item.used_times,
        0
      );
      setProductsUsed(productsUsed.toString());
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPurchases = async () => {
    try {
      const response = await fetch("http://localhost/inventory/purchases");
      const parseResults = await response.json();
      const purchases = parseResults.length;
      setPurchases(purchases.toString());
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchOrders();
    fetchPurchases();
    fetchProducts();
  }, []);

  return (
    <>
      {/* Header */}
      <div className="relative bg-blueGray-800 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="ORDERS SERVED"
                  statTitle={orders}
                  statArrow="up"
                  statPercent="test"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Since last month"
                  statIconName="fas fa-cash-register"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="DISHES SERVED"
                  statTitle={dishes}
                  statArrow="down"
                  statPercent="3.48"
                  statPercentColor="text-red-500"
                  statDescripiron="Since last week"
                  statIconName="fas fa-hamburger"
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="PURCHASES"
                  statTitle={purchases}
                  statArrow="down"
                  statPercent="1.10"
                  statPercentColor="text-orange-500"
                  statDescripiron="Since yesterday"
                  statIconName="fas fa-dollar-sign"
                  statIconColor="bg-pink-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="PRODUCTS USED"
                  statTitle={productsUsed}
                  statArrow="up"
                  statPercent="12"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Since last month"
                  statIconName="fas fa-tags"
                  statIconColor="bg-lightBlue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
