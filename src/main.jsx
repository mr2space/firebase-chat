import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Helmet } from "react-helmet";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { ChatContextProvider } from "./context/ChatContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ChatContextProvider>
        <App />
      </ChatContextProvider>
    </AuthContextProvider>
    <Helmet>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/vanilla-tilt/1.8.1/vanilla-tilt.babel.min.js" integrity="sha512-DQKpLk1v945t4NI9BtySf4X0WijLvw9HsX7Le0aFkJd9rF+Rz8Dua+ItWSzs2hf/LHAxlH4MKVYoRRjuHiBOgg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    </Helmet>
  </React.StrictMode>
);
