import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';

const Input = styled('input')({
  display: 'none',
});

export default function UploadButtons() {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
    <br/>
<label style={{margin: 10, width: "200"}} htmlFor="contained-button-file">
    <Input onChange={e => setFile(e.target.files[0])} id="contained-button-file" type="file" />
    <Button  color="inherit" variant="contained" component="span">
        Choose File
    </Button>
</label>
      <label htmlFor="icon-button-file">
        <Input accept="image/*" id="icon-button-file" type="file" />
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label>
    </Stack>
  );
}

