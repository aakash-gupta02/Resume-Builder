import Classic from "./Classic";
import Classic2 from "./Classic2";
import Minimal from "./Minimal";
import Modern from "./Modern";
import Modern2 from "./Modern2";
import ModernTwoColumnResume from "./ModernTwo-ColumnResume";
import Narrow from "./Narrow";

export const TEMPLATES = {
  classic: {
    component: Classic,
    name: "Classic",
    description: "Traditional single-column layout",
    image:
      "https://images.openai.com/thumbnails/url/yipAbHicu1mSUVJSUGylr5-al1xUWVCSmqJbkpRnoJdeXJJYkpmsl5yfq5-Zm5ieWmxfaAuUsXL0S7F0Tw7UDTCKyHFODC73cykvijfwCDeoCspONKsscfYNMMoKNsgyjzRzLAmz9HDJjXI3T_XyKvS0yE5N0q00DVQrBgD-cCjk", // VisualCV style
  },
  modern: {
    component: Modern,
    name: "Modern",
    description: "Sleek two-column layout",
    image:
      "https://images.openai.com/thumbnails/url/zhpTCXicu1mUUVJSUGylr5-al1xUWVCSmqJbkpRnoJdeXJJYkpmsl5yfq5-Zm5ieWmxfaAuUsXL0S7F0Tw7U9dMtiahwLUouT_Ux98hNivJIikhJDA_wCQ31zk_OT_PJMgmPyglzcwxJTXEpyC4yNDAKC4nyK45XKwYAzQgpVQ", // Novorésumé style
  },
  minimal: {
    component: Minimal,
    name: "Minimal",
    description: "Clean and simple layout",
    image:
      "https://images.openai.com/thumbnails/url/xIZWiXicu1mUUVJSUGylr5-al1xUWVCSmqJbkpRnoJdeXJJYkpmsl5yfq5-Zm5ieWmxfaAuUsXL0S7F0Tw72iyoyMiyv9AjxSw7OcMsPKi5LMnL1DQlLLcpzdsp28iuO982oKPLOyPMJ8K_wCc3OLfHwC04p8M1VKwYA3EAqNQ", // Modern two-column example
  },
  modern2: {
    component: Modern2,
    name: "Modern2",
    description: "Updated modern layout with new features",
    image:
      "https://images.openai.com/thumbnails/url/xIZWiXicu1mUUVJSUGylr5-al1xUWVCSmqJbkpRnoJdeXJJYkpmsl5yfq5-Zm5ieWmxfaAuUsXL0S7F0Tw72iyoyMiyv9AjxSw7OcMsPKi5LMnL1DQlLLcpzdsp28iuO982oKPLOyPMJ8K_wCc3OLfHwC04p8M1VKwYA3EAqNQ",
  },
  classic2: {
    component: Classic2,
    name: "Classic2",
    description: "Updated classic layout with new features",
    image:
      "https://images.openai.com/thumbnails/url/ATpTc3icu1mUUVJSUGylr5-al1xUWVCSmqJbkpRnoJdeXJJYkpmsl5yfq5-Zm5ieWmxfaAuUsXL0S7F0Tw4udnHMyrV0LqwMMK1MDncKLswpzi6oKk4x8vA0NjDJSM72LU6NzDMtNc0OLgpIMkryMoqPMko09a1UKwYA24QpdA", // Another clean design
  },
  narrow: {
    component: Narrow,
    name: "Narrow",
    description: "Narrow layout with new features",
    image:
      "https://resumeworded.com/assets/images/resume-guides/career-change-data-scientist.png", // Another clean design
  },
  modernTwoColumnResume: {
    component: ModernTwoColumnResume,
    name: "Modern Two Column",
    description: "Modern two-column layout",
    image:
      "https://cdn.enhancv.com/images/1098/i/aHR0cHM6Ly9jZG4uZW5oYW5jdi5jb20vcHJlZGVmaW5lZC1leGFtcGxlcy9OcWVmRGROYXV3ZUhkY3hzVXI2dmt3TG13V1ZQUm5vZ3dORDBZUnMzL2ltYWdlLnBuZw~~.png", 
  },
};

export const DEFAULT_TEMPLATE = "classic";
