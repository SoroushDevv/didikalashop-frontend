import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function EmptyFavorites() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ py: 5, width: "100%" }}
    >
      <Typography variant="h6" color="text.secondary" gutterBottom>
        هنوز چیزی را به علاقه‌مندی خودتان اضافه نکردید
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/"
        sx={{ mt: 2, borderRadius: 2, px: 4 }}
      >
        خانه
      </Button>
    </Box>
  );
}
