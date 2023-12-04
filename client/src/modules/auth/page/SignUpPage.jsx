import React from 'react'
import "../scss/SignUpPage.css"

function SignUpPage() {
  return (
    <div>
        <div className="to">
          <div className="form">
            <h2>Register</h2>
            <label >Username</label>
            <input type="text" name="hoten" />
            <label> Password</label>
            <input type="text" name="sdt" />
            <label style={{marginLeft:"-160px"}}>Email</label>
            <input type="text" name="email" /> 
            <input id="submit" type="submit" name="submit" value="Gửi" />
          </div>				
      </div>
    </div>
    
  )
}

export default SignUpPage