import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Home from "./Home.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { BrowserRouter, Routes, Route } from "react-router";
import AuthLayout from "./AuthLayout.tsx";
import MainLayout from "./MainLayout.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<Home />}></Route>
            <Route path="auth" element={<AuthLayout />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
