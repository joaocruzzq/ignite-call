import { Box, styled, Text } from "@ignite-ui/react";

export const ConnectBox = styled(Box, {
   marginTop: "$6",

   display: "flex",
   flexDirection: "column"
})

export const ConnectItem = styled("div", {
   display: "flex",
   alignItems: "center",
   justifyContent: "space-between",

   padding: "$4 $6",
   marginBottom: "$4",

   borderRadius: "$md",
   border: "1px solid $gray600",
})

export const AuthError = styled(Text, {
   color: "#F75A68",
   marginBottom: "$4"
})