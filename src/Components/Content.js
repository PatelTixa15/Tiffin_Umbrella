import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Gallery from './Gallery';
import './content.css';
import { Animated } from "react-animated-css";
import { Route, Link } from "react-router-dom";
import FormControl from '@material-ui/core/FormControl';
import { HorizontalSplitRounded } from '@material-ui/icons';
import { spacing } from '@material-ui/system';


var cuisines = [];  
var category =[];
function Content() {
  const [seller, setSeller] = useState([]);
  const url = 'https://tiffin-umbrella.herokuapp.com/get_seller_list';

  useEffect(() => {
    let fetchData = async () => {

      const request = await axios.get(url);
      console.log(request.data.sellers);
      setSeller(request.data);
      return request;
    }

    fetchData();

  }, [url]);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  var show = true;
  function passIdToNext(idTosent) {
    console.log(idTosent);

  }

  function handleFilterClick(keyCui) {
    console.log(keyCui)
    if (document.getElementById(keyCui).checked) {
      cuisines.push(keyCui)
    }
    else {
      cuisines = cuisines.filter(e => e !== keyCui);
    }
    console.log(cuisines)
  }

  function handleFilterCategories(categories) {
    console.log(categories)
    if (document.getElementById(categories).checked) {
      category.push(categories)
    }
    else {
      category = category.filter(e => e !== categories);
    }
    console.log(category)
  }

  function showCheckboxes() {
    var checkboxes =
      document.getElementById("checkBoxes");

    if (show) {
      checkboxes.style.display = "block";
      show = false;
    } else {
      checkboxes.style.display = "none";
      show = true;
    }
  }

  function preparations(arr) {
    let v = "";
    arr.forEach(element => {
      v += element + " ";
      
    });
    return v;
  }

  // function test1(s) {
  //   let t=[];
  //   t=s;
  //   return t[0];
  // }

  function test2(s1) {
    let t1=[];
    t1=s1;
    return t1[1];
  }
  
  function test3(t2){
    let t3=[];
    t3=t2;
    if ( t3[0] === "NON_VEG"){
      let k = " NON-VEG,";
      return k;
    }
    else if(t3[0] === "EGG"){
      return "EGG";
    }
  
  }

  function status(st){
    if ( st == "VERIFIED"){
      return<img className="status" src={"https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/whatsapp/273/check-mark-button_2705.png"} alt="Logo"/>;
    }
    else{
      return<img className="status" src={"https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/microsoft/209/cross-mark_274c.png"} alt="logo"/>;
    }
  }

  async function filterResults() {

    const url = 'https://tiffin-umbrella.herokuapp.com/get_seller_list';
    const apiResponse = await axios({
      method: 'post',
      url: url,
      headers: {},
      data: {
        cuisines: cuisines,
        categories: category

      }
    });
    setSeller(apiResponse.data)
    //console.log(apiResponse);
    //console.log(apiResponse.data);


  }

  // function handleImage(){
  //   const data = 'R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
  //   const Example = ({ data }) => <img src={`data:image/jpeg;base64,${data}`} />
  // }
  return (

    <div>


      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"></link>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />


      <section className="">

        <div id="carousel" className="carousel slide" data-ride="carousel" data-interval="6000">
          <div className="carousel-inner">

            <div className="carousel-item active">

              <img className="d-block w-100" src="https://i.ibb.co/z6cQrQ0/Main-Page-2nd-Pic.png" alt="First slide" style={{ height: "600px" }} />
              <div className="centered">
                <Animated animationIn="bounceInDown" animationInDelay="2000" isVisible={true}> <p className="main"><b>Welcome to Tiffin Umbrella</b></p> </Animated>
                <Animated animationIn="bounceInRight" animationInDelay="3000" isVisible={true}><p className="caption">Safe and healthy food</p></Animated>
                <Animated animationIn="bounceInUp" animationInDelay="5000" isVisible={true}> <p className="box"><b>Call us now- 983-765-4321</b></p> </Animated>
              </div>

            </div>
            <div className="carousel-item">
              <img className="d-block w-100 "  src="https://i.ibb.co/5LFmLnf/tiffin-3.jpg" alt="Second slide" style={{ height: "600px" }} />
              <div className="centered"><Animated animationIn="bounceInDown" animationInDelay="2000" isVisible={true}> <p className="main"><b>Welcome to Tiffin Umbrella</b></p> </Animated>
                <Animated animationIn="bounceInRight" animationInDelay="3000" isVisible={true}><p className="caption">Delivered to your door</p></Animated>
                <Animated animationIn="bounceInUp" animationInDelay="5000" isVisible={true}> <p className="box"><b>Call us now- 983-765-4321</b></p> </Animated>
              </div>
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src="https://i.ibb.co/FHpxSyZ/new-tiffin-1.jpg" alt="Third slide" style={{ height: "600px" }} />
              
              <div className="centered">
                <Animated animationIn="bounceInDown" animationInDelay="2000" isVisible={true}> <p className="main"><b>Welcome to Tiffin Umbrella</b></p> </Animated>
                <Animated animationIn="bounceInRight" animationInDelay="3000" isVisible={true}><p className="caption">Authentic Indian Food</p></Animated>
                <Animated animationIn="bounceInUp" animationInDelay="5000" isVisible={true}> <p className="box"><b>Call us now- 983-765-4321</b></p> </Animated>
              </div>
            </div>

          </div>
        </div>
      </section>
      <section className="bg-light" id="about">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-12">
              <h3 className="text-center mt-4 text-secondary">Know about us</h3>
            </div>
          </div>
          <div className="row">
            <p className="mt-4 mb-5">Hello, we are glad that you are here! Before you place the order, let us share about this
              service. How we started and how we are doing. We have started this service as part of our academic project with a team of 8 members. Our primary focus is to bring all the tiffin providers under one umbrella.

            </p>
          </div>
        </div>
      </section>

      <section className="" id="tiffinproviders" style={{ backgroundColor: "whitesmoke" }}>
        <div className="container" style={{ backgroundColor: "whitesmoke" }}>
          <div className="row">
            <div className="col-sm-12 col-md-12">
              <h3 className="text-center mt-4 text-secondary">Tiffin Providers</h3>
            </div>
          </div>
          <FormControl>
            <form>
            <div className="filterbox">
              <div class="multipleSelection">
                
                <div class="selectBox"
                  onClick={showCheckboxes}>
                  <select>
                    <option>Filter options</option>
                  </select> 
                  <div class="overSelect"></div>
                </div>
                </div>

                <div id="checkBoxes">
                  <label for="first">
                    <input type="checkbox" id="VEG" value="VEG" onClick={() => handleFilterCategories("VEG")} /> 
                     &nbsp; VEG
                  </label>

                  <label for="second">
                    <input type="checkbox" value="NON_VEG" id="NON_VEG" onClick={() => handleFilterCategories("NON_VEG")} />
                    &nbsp; NON-VEG
                  </label>
                  <label for="third">
                    <input type="checkbox" value="GUJARATI" id="GUJARATI" onClick={() => handleFilterClick("GUJARATI")} />
                    &nbsp; GUJARATI
                  </label>
                  <label for="fourth">
                    <input type="checkbox" id="PUNJABI" value="PUNJABI" onClick={() => handleFilterClick("PUNJABI")} />
                    &nbsp; PUNJABI
                  </label>
                  <label for="fifth">
                    <input type="checkbox" id="CHINESE" value="CHINESE" onClick={() => handleFilterClick("CHINESE")} />
                    &nbsp; CHINESE
                  </label>
                </div>
              </div>
            </form>
          </FormControl>
          <button className="btn btn-primary filterdesign" onClick={filterResults}>Apply Filter</button>
          <div className="container-fluid" >
            <div className="row">

              {

                seller.length>0?(seller.map(seller => (
                  
                <div className="col-sm-4 w" >
                  <div className="card mt-4">
                   <img className="card-img-top" style={{ maxHeight: "180px" }} src={seller && seller.imageUrl ? seller.imageUrl : "Images/No-image.jpg"} alt="" />
                    <div className="card-body">
                      <h4 className="card-title text-secondary">{seller.name}&nbsp;{status(seller.status)}</h4>
                      <p className="card-text text-secondary">{truncate(seller?.description, 70)}</p>
                      <p className="card-text text-secondary"><h6><strong>Average price per person :</strong> {seller && seller.averagePricePerPerson ? "$"+seller.averagePricePerPerson : "N.A"}</h6></p>
                      <p className="card-text text-secondary" ><strong>Categories available :</strong> <className style={{ color: "red"}}> {seller && seller.categories ? test3(seller.categories) : "N.A" }</className>  <className style={{ color: "green"}}>{seller && seller.categories ? test2(seller.categories) : "N.A"}</className></p>
                      <p className="card-text text-secondary" style={{ maxHeight: "10px", marginBottom: "30px" }}><h6><strong>Cuisines available : </strong>{ seller && seller.cuisines ? preparations(seller.cuisines) : "N.A"}</h6></p>
                      <p className="card-text text-secondary" type="hidden" value={seller.id}></p>
                    </div>
                    <div className="card-footer" >
                  
                      <Link to={{
                        pathname: "/plans",
                        data: { seller_id: seller.id, seller_name: seller.name, sellerimage:seller.imageUrl }
                      }} className="btn btn-primary" onClick={() => passIdToNext(seller.id)}>Find Out More</Link> 
                    </div>
                  </div>
                </div>

                    ))):
                    (<div className="centerRed">No Sellers Found, Change the filter</div>)

              }

            </div>
          </div>

          <section className="bg-light" id="gallery">
            <div className="container">
              <div className="row">
                <div className="col-sm-12 col-md-12">
                  <h3 className="text-center mt-4 text-secondary">Gallery</h3>
                </div>
              </div>
              <div className="row">
                <Gallery />
              </div>
              <div className="container">
                <div className="row">
                  {/* <img src="Images/new-tiffin-2.jpeg" alt="Cinque Terre" width="600" height="400"></img> */}

                </div>
              </div>

            </div>
          </section>

          
        </div>
      </section>
    </div>
  );
}

export default Content;