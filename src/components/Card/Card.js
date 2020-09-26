import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 300  
  },
  media: {
    height: 140,
  },
});

const Cards = ({name, val, border}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} style={{borderBottom: `2px solid ${border}`}}>

        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name.toUpperCase()}
          </Typography>
          <Typography variant="h2" color="textSecondary" component="h2">
            {val.toLocaleString('ru-RU')}
          </Typography>
        </CardContent>
    </Card>
  );
}

export default Cards
