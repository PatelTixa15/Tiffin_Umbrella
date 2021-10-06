import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {red} from '@material-ui/core/colors';
import Button from "@material-ui/core/Button"
import "./Card.css"
import {Route, Switch, Link, BrowserRouter} from "react-router-dom";
import {flexbox} from '@material-ui/system';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,

    },
    secondaryCardButton: {
        margin: '0 auto',
        // display: "flex",
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

export default function RecipeReviewCard(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const sellerid = props.sellerid
    const sellername = props.sellername
    const imageOfSeller = props.sellerimg;
    const planid = props.planid;
    const plantype = props.data.type;
    //console.log(props.sellerid)
    //console.log(props.sellername)


    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    console.log("this.props===>", props.data)
    return (


        <Card className={classes.root}>
            <CardHeader
                title={props.data.name}
                // subheader="September 14, 2016 ----> September 15, 2016"
            />
            <CardMedia
                className={classes.media}
                // image={props.data.imageURL}
                image={props.data.imageUrl}
                title="Weekly Plan"

            />
            {console.log("props==>", props.data)}
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {/* className={"Description-text"} */}
                    <h2>{props.data.description}</h2>
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    <h3>${props.data.price}</h3>
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    className="btnstyle"
                    color="primary"
                    variant="contained"
                    onClick={() => openLinkInNewTab(props.data.modelUrl)}>
                    3D
                </Button>
                <Button variant="contained" color="primary">
                    <Link to={{
                        pathname: "/buyerinfo",
                        data: {
                            seller_id: sellerid,
                            seller_name: sellername,
                            sellerphoto: imageOfSeller,
                            planImage: props.data.imageUrl,
                            description: props.data.description,
                            planname: props.data.name,
                            planprice: props.data.price,
                            planid: planid,
                            plantype: plantype
                        }
                    }} style={{color: "beige", textDecoration: 'none'}}>Subscribe Now</Link>
                </Button>
            </CardActions>
        </Card>

    );
}


function openLinkInNewTab(linkToBeOpened) {
    if (!linkToBeOpened) {/* if linkToBeOpened is invalid */
        linkToBeOpened = "https://sketchfab.com/models/5276969a17d24f2ea33e57e9c78c8919/embed";
    }
    return window.open(linkToBeOpened, "_blank");
}