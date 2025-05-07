import "@/lib/styles/global.css";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./lib/redux/store";
import Router from "./lib/router/router";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <Router />
  </Provider>
);
