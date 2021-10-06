import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Redirect, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const columns = [
  { field: "id", headerName: "Order ID", width: 350 },
  {
    field: "firstname",
    headerName: "First Name",
    width: 150,
    editable: true
  },
  {
    field: "lastname",
    headerName: "Last Name",
    width: 150,
    editable: true
  },
  {
    field: "phone",
    headerName: "Phone Number",
    type: "number",
    width: 180,
    editable: true
  },
  {
    field: "email",
    headerName: "Email ID",
    width: 150,
    editable: true
  },
  {
    field: "address",
    headerName: "Addresss",
    width: 200,
    editable: true
  },
  {
    field: "plan",
    headerName: "Plan Ordered",
    width: 150,
    editable: true
  },
  {
    field: "planprice",
    headerName: "Plan Price",
    width: 150,
    editable: true 
  }
  // },
  // {
  //   field: 'fullName',
  //   headerName: 'Full name',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params) =>
  //     `${params.getValue(params.id, 'firstName') || ''} ${
  //       params.getValue(params.id, 'lastName') || ''
  //     }`,
  // },
];
export default function ViewSellerOrders(props) {

  const [history, setHistory]= useState(useHistory());

  function handlePlans(){
    history.push({
      pathname: "/addplan",
      id: props.location.id
     });
  
  }

  const [data, setData] = useState([]);
  // const sellerid = window.localStorage.getItem("sellerid");
  // console.log("Seller ID received", props.location.id);
  // const serialID = .localStoragwindowe.getItem("sellerid");
  // const serialID= props.location.id;
  // console.log("Serial ID", serialID);
  const serialID = window.localStorage.getItem("sellerid");
  const url = 'https://tiffin-umbrella.herokuapp.com/sellers/'+serialID+'/orders';

  useEffect(() => {
    let fetchData = async () => {

      const response = await axios.get(url);
      console.log(response.data);
      setData(response.data);

      return response;
    }

    fetchData();

  }, [url]);
  

 
  return (
    <div style={{ height: 800, width: "100%" }}>
      <DataGrid
        rows={data.map(dataelement=>({
          id:dataelement.id, 
          firstname: dataelement.buyer.firstName,
          lastname: dataelement.buyer.lastName,
          phone: dataelement.buyer.contact.phone,
          email: dataelement.buyer.contact.email,
          address: JSON.stringify(dataelement.buyer.contact.address.line1  + dataelement.buyer.contact.address.zip),
          plan: dataelement.plan.name,
          planprice: dataelement.plan.price
        }))}
        columns={columns}
        pageSize={12}
        checkboxSelection
        disableSelectionOnClick
      />

      
    </div>
  );
}

