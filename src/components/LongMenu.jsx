import React, { useContext, useState } from "react";
import { IconButton } from "@material-ui/core";
import { Menu } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Delete, Edit } from "@material-ui/icons";
import { MaindataContext } from "../contexts/MaindataContext";

const ITEM_HEIGHT = 48;

export default function LongMenu(props) {
  const { handleDelete } = useContext(MaindataContext);
  const { taskId, columnId, setIsEditing } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="float-end cursor-pointer">
      <IconButton
        className="p-0"
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        <MenuItem
          onClick={
            (handleClose,
            () => setIsEditing(true))
          }
        >
          <Edit />
          Edit
        </MenuItem>
        <MenuItem onClick={(handleClose, () => handleDelete(taskId, columnId))}>
          <Delete />
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
}
