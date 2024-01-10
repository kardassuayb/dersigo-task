"use client";
import { useFetchPostDetailsQuery } from "@/redux/store";
import dersigoUser from "../../../../asset/images/dersigoUser.png";
// MATERIAL UI
import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const PostDetails = ({ params }) => {
  const id = params.id;
  const { data, error, isFetching } = useFetchPostDetailsQuery(id);

  // TARİH FORMAT DEĞİŞİKLİĞİ
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };

    const date = new Date(dateString);
    return date
      .toLocaleDateString("tr-TR", options)
      .replace(".", "/")
      .replace(".", "/");
  };

  // KELİMELERİN İLK HARFLERİNİ BÜYÜK YAPAR
  function capitalizeAllWords(str) {
    return str
      .split(" ")
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(" ");
  }

  const Id = data ? data.id : "";
  const image =
    data && data.image
      ? data.image
      : error
      ? "https://www.dersigo.com/assets/images/logo/logo.png"
      : "";
  const likes = data && data.likes ? data.likes : 0;
  const tags = data && data.tags ? data.tags : [];
  const text = data && data.text ? capitalizeAllWords(data.text) : "";
  const publishDate =
    data && data.publishDate ? formatDate(data.publishDate) : "";
  const ownerId =
    data && data.owner && data.owner.id != null ? data.owner.id : "";
  const ownerTitle =
    data && data.owner && data.owner.title != null ? data.owner.title : "";
  const ownerFirstName =
    data && data.owner && data.owner.firstName != null
      ? data.owner.firstName
      : "";
  const ownerLastName =
    data && data.owner && data.owner.lastName != null
      ? data.owner.lastName
      : "";
  const ownerPicture =
    data && data.owner && data.owner.picture != null
      ? data.owner.picture
      : error
      ? "https://www.dersigo.com/assets/images/logo/logo.png"
      : "";

  return (
    <div>
      <Card className="flex flex-col border bg-white border-gray-200 shadow-lg rounded-sm mb-6 relative">
        <CardHeader
          avatar={<Avatar alt="Owner" src={ownerPicture} />}
          title={`${ownerTitle} ${ownerFirstName} ${ownerLastName}`}
          subheader={publishDate}
        />
        <CardMedia component="img" image={image} alt="post's picture" />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {text}
          </Typography>
        </CardContent>
        <CardActions disableSpacing className="flex justify-between">
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
            <Typography>{likes}</Typography>
          </IconButton>
          <CardContent className="flex items-center">
            <Typography className="mb-0 mr-2" paragraph>
              Tags:
            </Typography>
            {tags.map((tag) => (
              <Typography
                className="flex flex-col mr-1"
                key={tag}
                variant="body2"
                color="text.secondary"
              >
                {tag} /
              </Typography>
            ))}
          </CardContent>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
};

export default PostDetails;
