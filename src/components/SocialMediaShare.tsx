import React, { Fragment } from 'react';

import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import ShareIcon from '@material-ui/icons/Share';
import FacebookIcon from '@material-ui/icons/Facebook';
import PinterestIcon from '@material-ui/icons/Pinterest';
import Typography from '@material-ui/core/Typography';


type SocialMediaShareProps = any;

export function SocialMediaShare(props: SocialMediaShareProps) {

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <IconButton aria-label="share" onClick={handleClick}>
        <ShareIcon />
      </IconButton>

      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>
          <FacebookIcon />
          <Typography variant="subtitle2">Facebook</Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <PinterestIcon />
          <Typography variant="subtitle2">Pinterest</Typography>
        </MenuItem>
      </Menu>
    </Fragment>
  );
}