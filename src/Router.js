import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";

// const dispatch = useDispatch();
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/movies/1" />,
    action: () => {
      //   dispatch(resetFilters());
      console.log("Hello from router");
    },
  },
  {
    path: "/movies/:page",
    element: <HomePage />,
    action: () => {
      //   dispatch(resetFilters());
      console.log("Hello from router");
    },
  },
]);
