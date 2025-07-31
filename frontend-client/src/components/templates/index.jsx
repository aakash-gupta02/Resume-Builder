import Classic from "./Classic";
import Classic2 from "./Classic2";
import Minimal from "./Minimal";
import Modern from "./Modern";
import Modern2 from "./Modern2";

export const TEMPLATES = {
  classic: {
    component: Classic,
    name: "Classic",
    description: "Traditional single-column layout",
  },
  modern: {
    component: Modern,
    name: "Modern",
    description: "Sleek two-column layout",
  },
  minimal: {
    component: Minimal,
    name: "Minimal",
    description: "Clean and simple layout",
  },
  modern2: {
    component: Modern2,
    name: "Modern2",
    description: "Updated modern layout with new features",
  },
  classic2: {
    component: Classic2,
    name: "Classic2",
    description: "Updated classic layout with new features",
  },
  // Add other templates here as needed
};

export const DEFAULT_TEMPLATE = "classic";
