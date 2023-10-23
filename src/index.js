import App from "./App";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const el = document.getElementById("root");
const root = createRoot(el);
root.render(<App />);
