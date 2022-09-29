import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { IconButton } from "@material-ui/core";

export default function MediaCard(props) {
  const { imagePath, alt, addTofavorite, item, favorates } = props;
  // console.log({ favorates });
  const checkContain = () => {
    const check = favorates.some((ele) => {
      return ele.id === item.id;
    });
    // console.log(check);
    return check;
  };

  return (
    <Card
      sx={{
        width: "320px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        margin: "20px 10px",
        borderRadius: "8px",
        border: "1px solid #e0e0e0",
        boxShadow: "none",
      }}
    >
      <CardMedia component="img" height="300" image={imagePath} alt={alt} />

      <CardActions>
        <IconButton onClick={() => addTofavorite(item)}>
          {checkContain() ? (
            <FavoriteIcon fontSize="large" sx={{ color: "#f00" }} />
          ) : (
            <FavoriteBorderIcon fontSize="large" />
          )}
        </IconButton>
      </CardActions>
    </Card>
  );
}
