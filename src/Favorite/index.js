import { ClassNames } from "@emotion/react";
import { Box, Button, Container } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MediaCard from "../Components/Card";

const Favorite = () => {
  const navigate = useNavigate();
  const [favorates, setFavorates] = useState(
    localStorage.getItem("favourite")
      ? JSON.parse(localStorage.getItem("favourite"))
      : []
  );
  const removeFromfavorite = (e) => {
    let included = favorates.some((item) => {
      return item.id === e.id;
    });
    if (!included) {
      setFavorates([...favorates, e]);
      localStorage.setItem("favourite", JSON.stringify([...favorates, e]));
    } else {
      setFavorates(favorates.filter((item) => item.id !== e.id));
      localStorage.setItem(
        "favourite",
        JSON.stringify(favorates.filter((item) => item.id !== e.id))
      );
    }
  };

  return (
    <Container>
      <Button onClick={() => navigate("/")}>back to home</Button>
      <Box className={ClassNames.root}>
        {favorates.map((item) => {
          return (
            <MediaCard
              addTofavorite={() => removeFromfavorite(item)}
              key={item.id}
              imagePath={item.url}
              alt={item.alt}
              item={item}
              favorates={favorates}
            />
          );
        })}
      </Box>
    </Container>
  );
};

export default Favorite;
