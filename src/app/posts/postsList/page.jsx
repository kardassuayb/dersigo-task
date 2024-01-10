"use client";

// ICONS
import { IconSquareRoundedLetterX } from "@tabler/icons-react";
import { IconUserEdit } from "@tabler/icons-react";
import { IconExternalLink } from "@tabler/icons-react";
import { IconPlus } from "@tabler/icons-react";
// NEXT
import Link from "next/link";
// REACT
import { useState } from "react";
// RTK
import { useFetchPostsQuery } from "@/redux/store";
import { useRemovePostMutation } from "@/redux/store";
// USER IMAGE
import dersigoUser from "../../../asset/images/dersigoUser.png";

// MATERIAL UI
import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const PostsList = () => {
  const { data, error, isFetching } = useFetchPostsQuery();

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

  const transformedData = data
    ? data.data.map((item) => {
        const id = item.id;
        const image = item.image ? item.image : dersigoUser;
        const likes = item.likes ? item.likes : 0;
        const tags = item.tags ? item.tags : [];
        const text = item.text ? capitalizeAllWords(item.text) : "";
        const publishDate = item.publishDate
          ? formatDate(item.publishDate)
          : "";
        const ownerId =
          item.owner && item.owner.id != null ? item.owner.id : "";
        const ownerTitle =
          item.owner && item.owner.title != null ? item.owner.title : "";
        const ownerFirstName =
          item.owner && item.owner.firstName != null
            ? item.owner.firstName
            : "";
        const ownerLastName =
          item.owner && item.owner.lastName != null ? item.owner.lastName : "";
        const ownerPicture =
          item.owner && item.owner.picture != null
            ? item.owner.picture
            : dersigoUser;

        return {
          id,
          image,
          likes,
          tags,
          text,
          publishDate,
          ownerId,
          ownerTitle,
          ownerFirstName,
          ownerLastName,
          ownerPicture,
        };
      })
    : [];

  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = transformedData.filter((item) =>
    item.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = (itemId) => {
    setExpanded((prevState) => ({
      ...prevState,
      [itemId]: !prevState[itemId],
    }));
  };

  const [anchorEl, setAnchorEl] = useState({});

  const handleMenuClick = (e, itemId) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [itemId]: e.currentTarget,
    }));
  };

  const handleClose = (itemId) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [itemId]: null,
    }));
  };

  // POST SİLME
  const [removePost] = useRemovePostMutation();
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const deletePost = () => {
    removePost(selectedPostId);
    setIsDeleteModalOpen(false);
    setSelectedPostId(null);
  };

  return (
    <div>
      <div className="flex flex-col border bg-white border-gray-200 shadow-lg rounded-sm mb-6 relative">
        <div className="flex justify-end items-center space-x-2 my-2">
          <div className="relative">
            <div className="absolute inset-y-0 right-0 flex items-center pr-4">
              <svg
                className="h-3.5 w-3.5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
              </svg>
            </div>
            <input
              type="text"
              name="post-search"
              id="post-search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="py-2 px-4 border border-gray-200 block w-full rounded-sm text-sm focus:border-gray-200 focus:ring-transparent focus:shadow-sm"
              placeholder="Search for posts"
            />
          </div>
          <div className="">
            <Link
              href="/posts/newPost"
              className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-sm border border-transparent font-normal focus:ring-0 focus:outline-none focus:ring-offset-0 transition-all text-sm m-1 ml-0 bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500 float-right"
            >
              <IconPlus size={16} />
              Add Post
            </Link>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-x-6">
        {filteredData.map((item) => (
          <Card
            key={item.id}
            className="xs:col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 flex flex-col border bg-white border-gray-200 shadow-lg rounded-sm mb-6 relative min-h-[322px]"
          >
            <CardHeader
              avatar={<Avatar alt="Owner" src={item.ownerPicture} />}
              action={
                <div>
                  <IconButton
                    aria-label="settings"
                    onClick={(e) => handleMenuClick(e, item.id)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl[item.id]}
                    open={Boolean(anchorEl[item.id])}
                    onClose={() => handleClose(item.id)}
                  >
                    <MenuItem onClick={() => handleClose(item.id)}>
                      <IconExternalLink />
                    </MenuItem>
                    <MenuItem onClick={() => handleClose(item.id)}>
                      <IconSquareRoundedLetterX
                        onClick={() => {
                          setSelectedPostId(item.id);
                          setIsDeleteModalOpen(true);
                        }}
                      />
                    </MenuItem>
                    <MenuItem onClick={() => handleClose(item.id)}>
                      <IconUserEdit />
                    </MenuItem>
                  </Menu>
                </div>
              }
              title={`${item.ownerTitle} ${item.ownerFirstName} ${item.ownerLastName}`}
              subheader={item.publishDate}
            />
            <CardMedia
              component="img"
              height="120"
              image={item.image}
              alt="post's picture"
              className="!h-[120px]"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {item.text}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
                <Typography>{item.likes}</Typography>
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
              <ExpandMore
                expand={expanded[item.id]}
                onClick={() => handleExpandClick(item.id)}
                aria-expanded={expanded[item.id]}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            {isDeleteModalOpen && selectedPostId === item.id && (
              <div className="flex flex-col gap-2 absolute top-[52px] right-[50px] bg-[#9AD0C2] text-[#141B19] py-2 px-2 rounded-md z-999 font-bold text-sm">
                <p>Delete Post!</p>
                <div className="flex justify-around gap-2">
                  <button onClick={deletePost} className="text-red-700">
                    Delete
                  </button>
                  <button
                    className="text-blue-700"
                    onClick={() => setIsDeleteModalOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
            <Collapse in={expanded[item.id]} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>Tags:</Typography>
                {item.tags.map((tag) => (
                  <Typography key={tag} variant="body2" color="text.secondary">
                    {tag}
                  </Typography>
                ))}
              </CardContent>
            </Collapse>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PostsList;
