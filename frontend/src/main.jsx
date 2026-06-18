import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import MessageContextProvider from "./context/MessageContext.jsx";
import UserContextProvider from "./context/UserContext.jsx";
import ListingContextProvider from "./context/ListingContext.jsx";
import "./App.css";
import BookingContextProVider from "./context/BookingContext.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserContextProvider>
      <BookingContextProVider>
      <MessageContextProvider>
        <ListingContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ListingContextProvider>
      </MessageContextProvider>
      </BookingContextProVider>
    </UserContextProvider>
  </StrictMode>,
);
