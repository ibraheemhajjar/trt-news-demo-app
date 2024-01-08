import React from "react";
import { createRoutesFromElements, createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import HomePage from "./pages/HomePage";
import NewsDetail from "./components/news-detail/NewsDetail";

function App() {
     const routesDefinitions = createRoutesFromElements(
          <Route>
               <Route path="/" element={<RootLayout />}>
                    <Route path="/" element={<HomePage exact />} />
                    <Route path="/:category" element={<HomePage exact />} />
                    <Route path="/:category/:newsId" element={<NewsDetail exact />} />
               </Route>
          </Route>
     );

     const router = createBrowserRouter(routesDefinitions);

     return <RouterProvider router={router} />;
}

export default App;
