import React from 'react';

import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import { getMemes } from '../api/get-memes.api';

function CreateMeme() {

  function creMeme(event: any) {
    event.preventDefault();

    getMemes().then(data => {
      console.log(data);
    })
  }
  
  return (
    <Button variant="contained" color="primary" onClick={creMeme}>Create</Button>
  );
}

export const CreateMemeWithRouter = withRouter(CreateMeme);