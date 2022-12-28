import { Box, Image } from "@mantine/core";
import React from "react";

export default function Logo(props: any) {
  return (
    <Box {...props}>
      <Image src="../Images/1.png" alt="Big-Logo"></Image>
    </Box>
  );
}
