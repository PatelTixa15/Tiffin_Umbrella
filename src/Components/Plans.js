import React,{useState,useEffect} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Card from "./Card.js"
import Grid from "@material-ui/core/Grid"
//import logo from "./../logo.svg"
// const arr = [{ key: ['WEEKLY','MONTHLY','YEARLY']}] 
// let weekly = arr.filter(item => item.key.includes('WEEKLY'));
// let monthly = arr.filter(item => item.key.includes('MONTHLY'));
// let yearly = arr.filter(item => item.key.includes('YEARLY'));
// const mainWeeklyList=[
//     {
//         "planTypes" : ['WEEKLY'],
//         "name":"Week1",
//         "description":"5 conatiners including veg curries + 14 chappatis + 1 large pulao rice or steam rice + dessert + pickle + chutney ",
//         "averagePricePerPerson":200,  
//         "imageURL":require("./../logo.svg")     ,
        
//     },
//     {
//         "planTypes" : ['WEEKLY'],
//         "name":"Week2",
//         "description":"5 conatiners including veg curries + 7 chappatis + 1 large pulao rice or steam rice + dal + dessert + pickle + chutneyshfdfdjfh dewkfhew",
//         "averagePricePerPerson":200,     
//         "imageURL":require("./../logo.svg")      
//     },
// ]

// const mainMonthlyList=[
//     {
//         "planTypes" : ['MONTHLY'],
//         "name":"Month1",
//         "description":"this is the month 1 list providing the details of gujarati dish ",
//         "averagePricePerPerson":500,  
//         "imageURL":require("./../logo.svg")     
//     },
//     {
//         "planTypes" : ['MONTHLY'],
//         "name":"Month 2",
//         "description":"we will provide you some punjabi dishes",
//         "averagePricePerPerson":600,     
//         "imageURL":require("./../logo.svg")      
//     },
   
// ]

// const mainOnceList=[
//     {
//         "planTypes" : ['YEARLY'],
//         "name":"combo1",
//         "description":"providing the details of gujarati dish ",
//         "averagePricePerPerson":100,  
//         "imageURL":require("./../logo.svg")     
//     },
//     {
//         "planTypes" : ['YEARLY'],
//         "name":"combo2",
//         "description":"we will provide you some punjabi dishes",
//         "averagePricePerPerson":100,     
//         "imageURL":require("./../logo.svg")      
//     },
// ]

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
  },
}));

export default function FullWidthTabs(props) {
  
  const[pageProps, setpageProps]=useState([props]);

  useEffect(()=>{
        setpageProps(JSON.parse(window.localStorage.getItem('pageProps')));
  },[]);
  
  
  useEffect(()=>{
   window.localStorage.setItem('props',pageProps);
  },[pageProps]);

  //console.log(props.location.data)
  const idofseller = props.location.data
  //console.log(idofseller.seller_id)
  const idtest =idofseller.seller_id
  const seller_name = idofseller.seller_name
  const sellerimage = idofseller.sellerimage

  //console.log(idofseller.seller_name)
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

const [plan, setPlan]= useState([]);
  
  useEffect(()=>{
     let fetchData = async()=> {
        
        const request = await axios.get('https://tiffin-umbrella.herokuapp.com/get_plans?id='+idtest)
        .then(res => {
          console.log("response==>",res)
          setPlan(res.data)
          // const persons = res.data;
          // this.setState({ persons });
        })
        //console.log(request.data.sellers);
        // setSeller(request.data.sellers);
        // return request;
      }
     
      fetchData();
             
  },[]);

  
  
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Weekly" {...a11yProps(0)} />
          <Tab label="Monthly" {...a11yProps(1)} />
          <Tab label="Daily" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
   
        <TabPanel value={value} index={0} dir={theme.direction}>
        <Grid container spacing={2}>
          {plan.map((item,index)=>{
          
         return(
           <>
              {item.type == "WEEKLY" && 
              <Grid item xs={12} md={4} lg={4} sm={4}>
          {console.log("iotem===>",item)}
          <Card
              data={item} sellerid={idtest} sellername={seller_name} sellerimg={sellerimage} planid={item.id}/>
      </Grid>}
           </>  
            )
          }
       
          )}
          </Grid>
          
            {/* <Grid container spacing={2}>
                {mainWeeklyList && mainWeeklyList.map((item,index)=>{
                    return(
                        <Grid item xs={12} md={4} lg={4} sm={4}>
                            {console.log("iotem===>",item)}
                        <Card
                        data={item}/>
                        </Grid>
                    )
                })} */}
    
        </TabPanel>

        <TabPanel value={value} index={1} dir={theme.direction}>
        <Grid container spacing={2}>
          {plan.map((item,index)=>{
          
         return(
           <>
              {item.type == "MONTHLY" && 
              <Grid item xs={12} md={4} lg={4} sm={4}>
          {console.log("iotem===>",item)}
          <Card
             data={item} sellerid={idtest} sellername={seller_name} sellerimg={sellerimage} planid={item.id}/>
      </Grid>}
           </>  
            )
          }
       
          )}
          </Grid>
        {/* <Grid container spacing={2}> */}
                {/* {mainMonthlyList && mainMonthlyList.map((item,index)=>{
                    return(
                        <Grid item xs={12} md={4} lg={4} sm={4}>
                            {console.log("iotem===>",item)}
                        <Card
                        data={item}/>
                        </Grid>
                    )
                })}
            </Grid> */}
        </TabPanel>

        <TabPanel value={value} index={2} dir={theme.direction}>
        <Grid container spacing={2}>
          {plan.map((item,index)=>{
          
         return(
           <>
              {item.type == "ONCE" && 
              <Grid item xs={12} md={4} lg={4} sm={4}>
          {console.log("iotem===>",item)}
          <Card
              data={item} sellerid={idtest} sellername={seller_name} sellerimg={sellerimage} planid={item.id}/>
      </Grid>}
           </>  
            )
          }
       
          )}
          </Grid>
        </TabPanel>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
    </div>
    
  );
}
