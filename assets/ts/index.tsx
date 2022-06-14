/*
zmsy.co
Main javascript entrypoint - includes all logic for site.
*/

import Alpine from "alpinejs";
import { initialize as initializeStore } from "./store";

// Set Alpine as a global and start.
window.Alpine = Alpine;
initializeStore();
Alpine.start();
