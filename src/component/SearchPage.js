import React, { useState, useEffect } from 'react';
import { Box, Grid, Card, CardHeader, CardMedia, CardContent, CardActions, IconButton, Typography, Collapse } from '@mui/material';
import { blue } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import TextField from '@mui/material/TextField';


function SearchPage() {
  const [searchText, setSearchText] = useState('');
  const [items, setItems] = useState([]);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`https://www.melivecode.com/api/attractions?search=${searchText}`);
      const data = await response.json();
      setItems(data);
    }
    fetchData();
  }, [searchText]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Box>
      <TextField 
      placeholder="Search" 
      value={searchText} 
      onChange={(e) => setSearchText(e.target.value)} 
      id="outlined-textarea"
      label="Search Attraction Place"
      
    sx={{my:2,mx:2}}
      multiline
      />

      <Grid
        container
        spacing={2}
        sx={{
          '--Grid-borderWidth': '1px',
          borderTop: 'var(--Grid-borderWidth) none',
          borderLeft: 'var(--Grid-borderWidth) none',
          borderColor: 'divider',
          '& > div': {
            borderRight: 'var(--Grid-borderWidth) none',
            borderBottom: 'var(--Grid-borderWidth) none',
            borderColor: 'divider',
          },
        }}
      >
        {items.map((index) => (
          <Grid key={index.id} {...{ xs: 12, sm: 6, md: 4, lg: 3, mt: 2 }} minHeight={160}>
            <Card sx={{ maxWidth: 345 }}>
              <CardHeader
                avatar={
                  <MapOutlinedIcon sx={{ color: blue[500],my:3 }} aria-label="recipe">

                  </MapOutlinedIcon>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={index.name}
                subheader={index.latitude}
              />
              <CardMedia
                component="img"
                height="194"
                image={index.coverimage}
                alt="Paella dish"
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  <LocationOnOutlinedIcon /> {index.longitude}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
                <IconButton
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </IconButton>
              </CardActions>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph>
                    {index.detail}
                  </Typography>
                </CardContent>
              </Collapse>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default SearchPage;
