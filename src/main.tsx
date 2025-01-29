import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {Theme} from "@radix-ui/themes";
import "./index.css";
import App from "./App.tsx";
import "@radix-ui/themes/styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Theme>
      <App />
    </Theme>
  </StrictMode>
);
