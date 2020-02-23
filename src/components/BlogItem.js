import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles(theme => ({
    root: {
        width: 300,
        marginBottom: 50,
        [theme.breakpoints.up('sm')]: {
            margin: 30
        }
    },
    media: {
      height: 140,
    },
    description: {
        height: 200,
        overflow: 'hidden'
    },
    }));
const BlogItem = ({title, image, description, id}) => {
    const classes = useStyles();
    if(image === ""){
        image = "not-set"
    }
    return(
        <Card className={classes.root}>
            <Link href={'id/' + id} style={{ textDecoration: 'none', color: '#000' }}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={'https://drive.google.com/uc?export=view&id=' + image}
                        title={title}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {title}
                        </Typography>
                        <Typography className={classes.description} variant="body2" color="textSecondary" component="p">
                            {description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Link>

            <CardActions>
                <Button size="small" color="primary" href={'id/' + id}>
                    Show me
                </Button>
            </CardActions>
      </Card>
    )
}
export default BlogItem;