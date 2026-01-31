import { createBrowserRouter } from "react-router";
import Mainmother from "../Layouts/Mainmother";
import Home from "../Pages/Home/Home";
import ProductDetails from "../components/ProductDetails";
import { getProductById } from "../data/products";
import Profile from "../Pages/Profile/Profile";
import Cart from "../Pages/Cart/Cart";
import Login from "../Authentication/Login";
import Signup from "../Authentication/Signup";
import CompleteProfile from "../Authentication/CompleteProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainmother></Mainmother>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "signup",
        element: <Signup></Signup>,
      },
      {
        path: "complete-profile",
        element: <CompleteProfile></CompleteProfile>,
      },
      {
        path: "profile",
        element: <Profile></Profile>,
      },
      {
        path: "cart",
        element: <Cart></Cart>,
      },
      {
        path: "product/:id",
        element: <ProductDetails />,
        loader: ({ params }) => {
          const product = getProductById(params.id);
          if (!product) {
            throw new Response("Product Not Found", { status: 404 });
          }
          return product;
        },
      },
    ],
  },
]);