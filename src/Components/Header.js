import React from 'react';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';


function Header() {
  return (
    <section className="navbar-dark bg-dark header">
       <div className="container">
          <div className="row">
           <div className="col-sm-12"> 
            <nav className="navbar navbar-expand-lg ">
              <Link to="/" className="navbar-brand text-white">Tiffin Umbrella</Link>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarSupportedContent">
            
                  <li className="nav-link">
                  <Link to="/sellerlogin" className="nav-link login">Login<span className="sr-only">(current)</span></Link>
                  </li>
           
                
              </div>
             
             </nav>
             
            </div>
            
          </div>
          
        </div>
    </section> 
  );
}

export default Header;
