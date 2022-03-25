import React from "react";

// components

export default function CardProfile({ data }) {
  const setIcon = () => {
    if (!data.existence) {
      return (
        <div className="text-center mt-12">
          <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-400 mb-2">
            {data.name.toUpperCase()}
          </h3>
          <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
            <i className="fas fa-hamburger mr-2 text-lg text-blueGray-400"></i>{" "}
            {`${data.used_times} times prepared`}
          </div>
          <div className="mb-2 text-blueGray-600 mt-10">
            <i className="far fa-calendar-check mr-2 text-lg text-blueGray-400"></i>
            {`Last Prepared at: ${new Date(data.updatedAt).toUTCString()}`}
          </div>
        </div>
      );
    } else {
      return (
        <div className="text-center mt-12">
          <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-400 mb-2">
            {data.name.toUpperCase()}
          </h3>
          <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
            <i className="fas fa-shopping-basket mr-2 text-lg text-blueGray-400"></i>{" "}
            {`${data.existence} in existence`}
          </div>
          <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
            <i className="fas fa-chart-line mr-2 text-lg text-blueGray-400"></i>{" "}
            {`${data.used_times} times used`}
          </div>
          <div className="mb-2 text-blueGray-600 mt-10">
            <i className="far fa-calendar-check mr-2 text-lg text-blueGray-400"></i>
            {`Last Buy: ${new Date(data.updatedAt).toUTCString()}`}
          </div>
        </div>
      );
    }
  };

  const test = () => {
    if (!data.existence) {
      return (
        <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
          <div className="flex flex-wrap justify-center">
            <div className="w-full lg:w-9/12 px-4">
              <p className="mb-4 text-lg leading-relaxed text-blueGray-500">
                Ingredients: <br />
              </p>
              <ul className="mb-4 text-lg leading-relaxed text-blueGray-500">
                {data.ingredients.map((ingredient) => (
                  <li key={ingredient._id}>
                    {ingredient.ingredient.name}
                    {` - - - - - `}
                    {ingredient.required_qt} units
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16 mx-16">
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div className="w-full px-4 flex justify-center">
              <div className="relative">
                <img
                  alt="..."
                  src={`${data.image}`}
                  className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                />
              </div>
            </div>
          </div>
          <div>{setIcon()}</div>
          <div>{test()}</div>
        </div>
      </div>
    </>
  );
}
