import { globalCss } from "@ignite-ui/react";

export const globalStyles = globalCss({
   "*": {
      margin: 0,
      padding: 0,
      boxSizing: "border-box"
   },

   body: {
      color: "$gray100",
      background: "$gray900",

      "-webkit-font-smoothing": "antialiased"
   }
})