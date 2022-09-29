import SearchAppBar from "../Components/NavBar";
import { useStyles } from "./style";
import { useState, useEffect, Fragment } from "react";
import { Box, Container } from "@mui/material";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import MediaCard from "../Components/Card";
import Animations from "../Components/Loading";
import axios from "axios";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [allData, setallData] = useState({});
  const [data, setPhotosResponse] = useState([]);
  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [perPage, setperPage] = useState("10");
  const [isLoading, setIsloading] = useState(true);
  const [favorates, setFavorates] = useState(
    localStorage.getItem("favourite")
      ? JSON.parse(localStorage.getItem("favourite"))
      : []
  );
  const navigate = useNavigate();

  const handleChange = (pageNumber) => {
    setPageNumber(pageNumber);
  };

  const handleChangePerpage = (event) => {
    setperPage(event.target.value);
  };

  const addTofavorite = (e) => {
    let included = favorates.some((item) => {
      return item.id === e.id;
    });
    if (!included) {
      setFavorates([...favorates, e]);
      localStorage.setItem("favourite", JSON.stringify([...favorates, e]));
      // dispatch({ type: "add", payload: e });
    } else {
      setFavorates(favorates.filter((item) => item.id !== e.id));
      localStorage.setItem(
        "favourite",
        JSON.stringify(favorates.filter((item) => item.id !== e.id))
      );
    }
  };
  const FetchData = async () => {
    await axios
      .get(
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=4ab599f28c01704d5d52d3435551e6c9&tags=technology&text=${search}&per_page=${perPage}&page=${pageNumber}&format=json&nojsoncallback=1`
      )
      .then((resp) => {
        setallData(resp.data);
        // console.log(resp);
        const formattedData = resp.data.photos.photo.map((item) => {
          return {
            url: `https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_b.jpg`,
            id: item.id,
            alt: item.title,
          };
        });
        setPhotosResponse(formattedData);
        setPhotosResponse(formattedData);
        setIsloading(false);
      });
  };
  useEffect(() => {
    FetchData();
  }, [perPage, pageNumber, search]);

  useEffect(() => {
    window.scroll(0, 0);
  }, [pageNumber]);

  const classes = useStyles();

  return (
    <Fragment>
      <SearchAppBar setSearch={setSearch} searchValue={search} />

      <Container maxWidth="xl">
        <Stack
          sx={{
            width: "100%",
          }}
          direction={"row"}
          width={200}
          justifyContent="space-between"
          mt={2}
        >
          <div
            style={{
              width: "50%",
            }}
          >
            <FormControl
              style={{
                minWidth: "200px",
              }}
            >
              <InputLabel id="demo-simple-select-label">Per Page</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={perPage}
                label="Per Page"
                onChange={handleChangePerpage}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={100}>100</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div>
            <Button onClick={() => navigate("/favorite")}>My Favorite</Button>
          </div>
        </Stack>
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Animations />
          </Box>
        ) : (
          <Box className={classes.root}>
            {data.map((item) => {
              return (
                <MediaCard
                  addTofavorite={() => addTofavorite(item)}
                  key={item.id}
                  imagePath={item.url}
                  alt={item.alt}
                  item={item}
                  favorates={favorates}
                />
              );
            })}
          </Box>
        )}
        {allData.photos?.total > 1 && (
          <Box className={classes.root}>
            <Pagination onChange={handleChange} count={allData.photos?.total} />
          </Box>
        )}
      </Container>
    </Fragment>
  );
};

export default HomePage;
