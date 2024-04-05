import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { store } from "./redux/App/store";
import { Provider } from "react-redux";

import { NextUIProvider } from "@nextui-org/react";
import { AuthProvider } from "./pages/AuthProvider/AuthProvider";
import { SocketContext, socket } from "./context/socket";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <NextUIProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Provider store={store}>
        <BrowserRouter>
          <SocketContext.Provider value={socket}>
            <AuthProvider>
              <App />
            </AuthProvider>
          </SocketContext.Provider>
        </BrowserRouter>
      </Provider>
    </NextUIProvider>
  </React.StrictMode>
);

reportWebVitals();
