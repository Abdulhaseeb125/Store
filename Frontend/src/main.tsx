import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./components/themeControls/theme-provider.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux"; // import { ChakraProvider } from "@chakra-ui/react";
import store from "./store/store.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
   
        <BrowserRouter>
          <Provider store={store}>
            <App />
          </Provider>
        </BrowserRouter>
 
    </ThemeProvider>
  </React.StrictMode>
);
