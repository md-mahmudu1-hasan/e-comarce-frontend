import { createBrowserRouter } from "react-router";
import Mainmother from "../Layouts/Mainmother";
import Home from "../Pages/Home/Home";
import ProductDetails from "../components/ProductDetails";
import { getProductById } from "../data/products";
import { getClothingProductById } from "../data/clothingProducts";
import Profile from "../Pages/Profile/Profile";
import Cart from "../Pages/Cart/Cart";
import Login from "../Authentication/Login";
import Signup from "../Authentication/Signup";
import CompleteProfile from "../Authentication/CompleteProfile";
import ForgetPassword from "../Authentication/ForgetPassword";
import TermsAndConditions from "../Pages/Legal/TermsAndConditions";
import AboutUs from "../Pages/About/AboutUs";
import EmailVerification from "../Authentication/EmailVerification";
import AllClothes from "../Pages/AllClothes/AllClothes";

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
        path: "/forgot-password",
        element: <ForgetPassword></ForgetPassword>,
      },
      {
        path: "verify-email",
        element: <EmailVerification></EmailVerification>,
      },
      {
        path: "profile",
        element: <Profile></Profile>,
      },
      {
        path: "about",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "terms",
        element: <TermsAndConditions></TermsAndConditions>,
      },
      {
        path: "cart",
        element: <Cart></Cart>,
      },
      {
        path: "all-clothes",
        element: <AllClothes></AllClothes>,
      },
      {
        path: "product/:id",
        element: <ProductDetails />,
        loader: ({ params }) => {
          const product = getProductById(params.id) || getClothingProductById(params.id);
          if (!product) {
            throw new Response("Product Not Found", { status: 404 });
          }
          return product;
        },
      },
    ],
  },
]);