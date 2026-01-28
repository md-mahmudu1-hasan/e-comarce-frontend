import { createBrowserRouter } from "react-router";
import App from "../App";
import ProductDetails from "../components/ProductDetails";
import { getProductById } from "../data/products";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "/product/:id",
    element: <ProductDetails />,
    loader: ({ params }) => {
      const product = getProductById(params.id);
      if (!product) {
        throw new Response("Product Not Found", { status: 404 });
      }
      return product;
    },
    errorElement: (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Product Not Found</h2>
        <p>The product you're looking for doesn't exist.</p>
        <a href="/" style={{ color: '#2d7a2d', textDecoration: 'none' }}>
          Back to Home
        </a>
      </div>
    ),
  },
]);
