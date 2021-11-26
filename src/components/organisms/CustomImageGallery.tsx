import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";

type ItemData = {
  id: string;
  name: string;
  url: string;
};

type Props = {
  itemData: ItemData[];
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "auto",
      backgroundColor: theme.palette.background.paper,
      maxHeight: 490,
    },
    imageItem: {
      transition: "0.3s",
      "&:hover": {
        boxShadow:
          "0 4px 10px 0 rgb(0 0 0 / 20%), 0 4px 20px 0 rgb(0 0 0 / 19%)",
        cursor: "pointer",
      },
    },
    imageList: {
      width: "100%",
      height: "100%",
    },
  })
);

export function CustomImageGallery(props: Props) {
  const classes = useStyles();
  const { itemData } = props;

  return (
    <div className={classes.root}>
      <ImageList rowHeight={160} className={classes.imageList} cols={4}>
        {itemData.map((item) => (
          <ImageListItem key={item.id} cols={1} className={classes.imageItem}>
            <img src={item.url} alt={item.name} />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}
