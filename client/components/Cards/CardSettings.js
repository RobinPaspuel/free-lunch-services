import React from "react";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

// components

export default function CardSettings() {
  const router = useRouter();

  const handleSubmit = async (numberDishes) => {
    try {
      await axios({
        method: "POST",
        url: "http://localhost/kitchen/orders",
        params: {
          serves_number: numberDishes,
        },
      });
      toast.success("Order Placed!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        onClose: () => router.reload("/"),
      });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      dishes: 1,
    },
    onSubmit: (values) => {
      handleSubmit(values.dishes);
    },
  });
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-center">
            <form onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                id="dishes"
                name="dishes"
                label="Number of Dishes"
                type="number"
                value={formik.values.dishes}
                onChange={formik.handleChange}
              />
              <button
                className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 mt-4 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="submit"
              >
                Place Order
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
