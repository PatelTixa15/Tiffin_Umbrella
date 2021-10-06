import React,{useState,useEffect,Component} from 'react';
import Axios from 'axios';
import { useFormik } from 'formik';
import { useField } from 'formik';
import './AddPlan.css';
import CustomSelect from './CustomSelect';
import FormData from 'form-data';
import { Redirect, useHistory } from "react-router-dom";

const options =[
  {value:'WEEKLY', label: 'WEEKLY'},
  {value:'MONTHLY', label: 'MONTHLY'},
  {value:'ONCE', label: 'DAILY'}
]

export default function App(props) {

  const[imageUrl, setImageUrl]= useState();
  const[modelUrl, setModelUrl] = useState();
  const [history, setHistory]= useState(useHistory());
  const serialID = window.localStorage.getItem("sellerid");
  console.log("Seller ID", serialID);
  const url = " https://tiffin-umbrella.herokuapp.com/sellers/"+serialID+"/plans";


  const handleImage = async (e) => {
    var image = new FormData();
    var imagefile =  e.target.files[0];
    var comment = "This is a Image comment";
   image.append("image", imagefile);
    await Axios.post("https://tiffin-umbrella.herokuapp.com/images?comment="+comment, image,  { headers: { 'Content-Type': 'multipart/form-data' }}) //'Authorization':'Client-ID 2f7124444928e3e'
    .then(res => { if(res.status === 200){
      console.log("Received Image url", res.data.url);
      setImageUrl(res.data.url);
    }
    })}

    const handleModel = async (e) => {
      var image = new FormData();
      var imagefile =  e.target.files[0];
      var comment = "This is a Model comment";
     image.append("image", imagefile);
      await Axios.post("https://tiffin-umbrella.herokuapp.com/images?comment="+comment, image,  { headers: { 'Content-Type': 'multipart/form-data' }}) //'Authorization':'Client-ID 2f7124444928e3e'
      .then(res => { if(res.status === 200){
        console.log("Received Model url", res.data.url);
        setModelUrl(res.data.url);
      }
      })}

  const formik = useFormik({
    initialValues: {
      planType: '',
      planName: '',
      planDescription: '',
      planPrice: '',
      imageUrl: imageUrl,
      modelUrl: modelUrl
      // file: ''
    },

    onSubmit: (values, onSubmitProps) => {
      console.log('Form data', values)
      console.log('Image URL', imageUrl)
      const image_api_url= imageUrl
      const model_api_url= modelUrl
      console.log('Model URL', modelUrl)
      onSubmitProps.resetForm()
      const postData = {
        name: values.planName,
        description: values.planDescription,
        price: values.planPrice,
        type: values.planType,
        imageUrl: image_api_url,
        modelUrl: model_api_url
      };

      Axios.post(url, postData,  { headers: { 'Content-Type': 'application/json' }}) 
        .then(res => { if(res.status === 200){
          console.log("Success!!");
          alert("Your Plan is added successfully")
          history.push({
            pathname:'/sidebar'
          })
        }console.log(res.values) })
        .catch(errors => { console.log(errors) })

    },
   
    validate: values => {

      let errors = {}
      if (!values.planType) {
          errors.planType = 'Required'
      }

      if (!values.planName) {
        errors.planName = 'Required'
    }

      if (!values.planDescription) {
          errors.planDescription = 'Required'
      }

      if (!values.planPrice) {
        errors.planPrice = 'Required'
      }
      else if (!/([0-9])/.test(values.planPrice)) {
        errors.planPrice = 'Invalid'}

      // if (!values.file) {
      //   errors.file = 'Required'
      // }

      return errors
    }
  })

  return (
    <>

    <div>
      <hr />
  {/* <div className='p'></div> */}
  


      <div className="inner">

        <h2 className='heading'>Add Plan</h2>

        <div className="form-group">
          <form onSubmit={formik.handleSubmit}>
            <div>    
            <label></label>            
            <CustomSelect
               
              onChange={value=>formik.setFieldValue('planType',value.value)}
              options = {options}
              value = {formik.values.planType}
              className = 'input' 
             
            />
            {formik.touched.planType && formik.errors.planType ? <div className='error'>{formik.errors.planType}</div> : null}
            </div>
          &nbsp;
            <div>
              <label ></label>
              <input className="cinput"
                placeholder='Plan Name'
                type='text'
                name='planName'
                id='planName'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.planName}
              />
              {formik.touched.planName && formik.errors.planName ? <div className='error'>{formik.errors.planName}</div> : null}
            </div>

            <div >
              <label ></label>
              <input className="cinput"
                placeholder='Plan Description'
                type='text'
                name='planDescription'
                id='planDescription'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.planDescription}
              />
              {formik.touched.planDescription && formik.errors.planDescription ? <div className='error'>{formik.errors.planDescription}</div> : null}
            </div>

            <div>
              <label ></label>

              <input className="cinput"
                placeholder='Price'
                type='tel'
                maxLength = "3"
                name='planPrice'
                id='planPrice'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.planPrice}
              />
              {formik.touched.planPrice && formik.errors.planPrice ? <div className='error'>{formik.errors.planPrice}</div> : null}
            </div>

            
           
          <br></br>

          {/* <input
              label="Light Icon:"
              type="image"
              name="lightIcon"
              accept="image/x-png"
              onBlur
              onChange={event => {formik.values.dishImage = event.target.files[0]
                // setFieldValue('lightIcon', e.target.files[0]);
            }}
          /> */}
           {/* <div>
              <label ></label>
              <input className="cinput"
                placeholder='Image URL'
                type='text'
                name='imageUrl'
                id='imageUrl'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.imageUrl}
              />
              {formik.touched.imageUrl && formik.errors.imageUrl ? <div className='error'>{formik.errors.imageUrl}</div> : null}
            </div> */}

            
         <label >Choose Plan Image:</label>
          <input id="file" name="file" type="file" accept="image/*" value={formik.values.imageUrl} onChange={handleImage}/>

          <label >Choose Model(AR) Image:</label>
          <input id="file" name="model" type="file" accept="image/*" value={formik.values.modelUrl} onChange={handleModel}/>
          <br></br>
            {/* <input type="file" onChange={event => {formik.values.file = event.target.files[0]} } /> onChange={props.handleFileUpload}*/}
            <div className="centerblock">

              {/* <input type="checkbox" id="checkbox" className="check" />&nbsp;
                I hereby agree to share my details with the seller */}
              Note: All fields are mandatory to fill

            <br />
            

              <button type='submit' disabled={!formik.isValid}>
                {/* <Link to='/ValidatedLoginForm'> */}
                  Add Plan
                  {/* </Link> */}
                  </button>
              
              
            </div>
          </form>

        </div>
      </div>
    <hr />
    </div>
</>
  );

}

