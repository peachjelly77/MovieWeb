import React from "react";
import Button from "../../Button";
import { useNavigate } from "react-router-dom";
import checkicon from "../../../samplePicture/404-tick.png"

function RegisterConfirm() {

      const navigate = useNavigate();
      
      function validateForm() {
        let x = document.forms["myForm"]["fname"].value;
        if (x == "") {
          alert("Name must be filled out");
          return false;
        } 
      }
    
      return (
        
        <div className="flex justify-center h-screen items-center bg-primary">
          <div className="card p-3 w-400">
            <div className="flex justify-center">
            <img src={checkicon} alt="" className="icon"/>
            </div>
            <br/>
            <h1 className="text-xl mb-1">Verification code sent to email</h1>
            <br/>
            <div className="flex justify-center">
            {/* <Button title="submit"
            onClick={()=> navigate('/')}/> */}
            <form name="myForm" action="/action_page.php" onsubmit='validateForm()' method="post"/>
              Code: <input type="text" name="fname"/>
              <Button title="submit"
            onClick={()=> {let x = document.forms["myForm"]["fname"].value;
            if (x == "") {
              alert("Name must be filled out");
              return false;
            } }}/>
            </div>
          </div>

        </div>
      );
    }
    
export default RegisterConfirm