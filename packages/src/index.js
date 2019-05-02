import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/App";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "./reducers";

ReactDOM.render(
  // Połączenie reacta z reduxem i przypisanie stora
  <Provider store={createStore(reducers)}>
    <App />
  </Provider>,
  document.getElementById("root")
);
