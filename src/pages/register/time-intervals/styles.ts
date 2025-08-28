import { Box, styled } from "@ignite-ui/react";

export const IntervalBox = styled(Box, {
   marginTop: "$6",
   display: "flex",
   flexDirection: "column"
})

export const IntervalsContainer = styled("div", {
   marginBottom: "$4",
   borderRadius: "$md",
   border: "1px solid $gray600"
})

export const IntervalItem = styled("div", {
   display: "flex",
   
   padding: "$3 $4",

   alignItems: "center",
   justifyContent: "space-between",

   "& + &": {
      borderTop: "1px solid $gray600"
   }
})

export const IntervalDay = styled("div", {
   display: "flex",
   alignItems: "center",

   gap: "$3"
})

export const IntervalInputs = styled("div", {
   display: "flex",
   alignItems: "center",

   gap: "$2",

   "input::-webkit-calendar-picker-indicator": {
      filter: "invert(100%) brightness(40%)"
   }
})