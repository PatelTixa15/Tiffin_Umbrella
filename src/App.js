
import React from 'react';
import Header from './Components/Header';
import Content from './Components/Content';
import Footer from './Components/Footer';
import Gallery from './Components/Gallery';
import {Route, Switch, Link, BrowserRouter} from "react-router-dom";
import Buyer from './Components/BuyerInfo';
import Plans from './Components/Plans';
import ValidatedLoginForm from './Components/ValidatedLoginForm';
import SellerDashboard from './Components/SellerDashboard';
import ViewSellerOrders from './Components/ViewSellerOrders';
import SignUp from './Components/Sign_Up';
import AddPlan from './Components/AddPlan';
import SideBar from './Components/SideBar';
function App() {

  return (

     <React.Fragment>
        
       <BrowserRouter>
        <div> 
        
          <Header/>
            
              <Switch>
                   <Route exact path="/" component={Content}/>
                   <Route exact path='/gallery' component={Gallery}/>
                   <Route path="/buyerinfo" component={Buyer}/>
                   <Route path="/plans" component={Plans}/>
                   <Route path="/sellerlogin" component={ValidatedLoginForm}/>
                   <Route path="/sellerdashboard" component={SellerDashboard}/>
                   <Route path="/viewsellerorders" component={ViewSellerOrders}/>
                   <Route path="/signup" component={SignUp}/>
                   <Route path="/addplan" component={AddPlan}/>
                   
                    <Route path="/sidebar" exact component={SideBar} />
                   
              </Switch>
          <Footer/>
         
        </div>
       </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
