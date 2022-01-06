import React,{useState,useEffect,Component} from 'react';
import Axios from 'axios';
import { useFormik } from 'formik';
import './Sign_Up.css';
import {useHistory} from 'react-router-dom'



export default function SignUp(props) {
  const url = " https://tiffin-umbrella.herokuapp.com/post_seller";
  const[history, setHistory] = useState(useHistory());
  const[imageUrl, setImageUrl]= useState();

  const handleImage = async (event) => {

    // formik.values.file = event.target.files[0]

    var image = new FormData();
    var imagefile =  event.target.files[0];
    var comment = imagefile.name;
    image.append("image", imagefile);
    await Axios.post("https://tiffin-umbrella.herokuapp.com/images?comment="+comment, image,  { headers: { 'Content-Type': 'multipart/form-data' }}) //'Authorization':'Client-ID 2f7124444928e3e'
        .then(res => { if(res.status === 200){
          console.log("Received Image url", res.data.url);
          setImageUrl(res.data.url);
        }
        })}

  const formik = useFormik({
    initialValues: {
      firstName: '',
      // lastName: '',
      phone: '',
      email: '',
      password: '',
      confirm_password: '',
      plan:[]
     // file: ''
    },

    onSubmit: (values, onSubmitProps) => {
      console.log('Form data', values)
      onSubmitProps.resetForm()
      const postData = {
        name: values.firstName,
        plans: values.plan,
        
        contact: {
          email: values.email,
          phone: values.phone,
       
        },
        password: values.password,
        imageUrl: imageUrl
      };

      Axios.post(url, postData)
        .then(res => { if(res.status===200){
          console.log("sucess");
          history.push({
            pathname: "/sellerlogin"
           });
        }
          else if(res.status === 400){
              alert("User already exists!");
          }
          else{
            alert("Something Went Wrong!");
          }
        } )
        .catch(errors => { console.log(errors) })

    },

    validate: values => {

      let errors = {}
      if (!values.firstName) {
          errors.firstName = 'Required'
      }

      // if (!values.lastName) {
      //   errors.lastName = 'Required'
      // }

      if (!values.email) {
        errors.email = 'Required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid'
      }


      if (!values.phone) {
        errors.phone = 'Required'

      } else if (!/([0-9])/.test(values.phone)) {
        errors.phone = 'Invalid'
      }
      

      if (!values.password) {
        errors.password = 'Required'
      }

      if (!values.confirm_password) {
        console.log('....', values.password)

        errors.confirm_password = 'Required'
      } else if (values.password != values.confirm_password){
        console.log('....', values.password)
        errors.password = "password don't match"
      }

      if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(values.password)) {
        errors.password = 'Passowrd policy break. Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character '
      }
      


      // if (!values.zip) {
      //   errors.zip = 'Required'
      // }
      // else if (/([a-z])/.test(values.zip)) {
      //   errors.zip = 'Invalid'
      // }

      return errors
    }
  })

  return (

    <div>
      <br/><br/><br/>
     
  {/* <div className='p'></div> */}
  


      <div className="inner">

        <h2 className='heading' >Sign-Up</h2>

        <div className="form-group">
          <form onSubmit={formik.handleSubmit}>
            <div>
              <label ></label>
              <input className="cinput"
                placeholder='Name'
                type='text'
                name='firstName'
                id='firstName'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
              />
              {formik.touched.firstName && formik.errors.firstName ? <div className='error'>{formik.errors.firstName}</div> : null}
            </div>

            {/* <div >
              <label > </label>
              <input className="cinput"
                placeholder='Last Name *'
                type='text'
                name='lastName'
                id='lastName'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
              />
              {formik.touched.lastName && formik.errors.lastName ? <div className='error'>{formik.errors.lastName}</div> : null}
            </div> */}

            <div >
              <label ></label>
              <input className="cinput"
                placeholder='Email'
                type='email'
                name='email'
                id='email'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? <div className='error'>{formik.errors.email}</div> : null}
            </div>

            <div>
              <label ></label>

              <input className="cinput"
                placeholder='Phone'
                type='text'
                name='phone'
                id='phone'
                maxLength="10"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
              />
              {formik.touched.phone && formik.errors.phone ? <div className='error'>{formik.errors.phone}</div> : null}
            </div>

            <div>
            <label></label>
            <input className="cinput"
              type="password" 
              name="password" 
              value={formik.values.password}
              // value={this.state.input.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              // class="form-control" 
              placeholder="Password" 
              id="password" />
              {formik.touched.password && formik.errors.password ? <div className='error'>{formik.errors.password}</div> : null}
              {/* <div className="text-danger">{this.state.errors.password}</div> */}
          </div>
  
          <div>
            <label></label>
            <input className="cinput"
              type="password" 
              name="confirm_password" 
              value={formik.values.confirm_password}
              // value={this.state.input.confirm_password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              // class="form-control" 
              placeholder="Confirm Password" 
              id="confirm_password" />
              {formik.touched.confirm_password && formik.errors.confirm_password ? <div className='error'>{formik.errors.confirm_password}</div> : null}
              {/* <div className="text-danger">{this.state.errors.confirm_password}</div> */}
          </div>
          <br></br>

            {/*<input type="file" onChange={event => {formik.values.file = event.target.files[0]} }  />*/}
            <label>Upload Image: </label><input id="file" name="file" type="file" accept="image/*" value={formik.values.imageUrl} onChange={handleImage}/>
            <div className="centerblock">

              {/* <input type="checkbox" id="checkbox" className="check" />&nbsp;
                I hereby agree to share my details with the seller */}
              Note: All fields are mandatory to fill

            <br />
              <br />

              <button type='submit' disabled={!formik.isValid}>
                {/* <Link to='/ValidatedLoginForm'> */}
                  Sign Up
                  {/* </Link> */}
                  </button>
              
              
            </div>
          </form>

        </div>
      </div>
  <br/><br/><br/><br/><br/><br/>
    </div>

  );

}

