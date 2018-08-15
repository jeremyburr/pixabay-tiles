import React, { Component } from 'react'

export default class Login extends Component {
    constructor() {
        super();
        this.idRef = React.createRef();
        this.passwordRef = React.createRef();
    }

    checkValidity = () => {
      if ((this.idRef.current.value === "") || (this.passwordRef.current.value === "")) {
        alert('Please enter email and password');
        return 
      }; 

      // Browser built-in validation pseudoselector

      if (this.idRef.current.matches(":invalid")) {
        alert('Please enter a valid email')
        return 
      } 

      // Regex - 8 character minimum, one lowercase, uppercase, symbol 

      let input= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,100}$/;
      if(!this.passwordRef.current.value.match(input)) { 
        alert('Please enter a valid password')
        return false;
      } 
      console.log('check complete'); 
      this.props.goToContent();
     }

        render() { 

          // Only render for "login" state

          if (this.props.section !== "login") {
            return <div />
          } 
          return (
          <div style={{backgroundImage: "url('assets/background.png')"}} className="login-container">
            <div className="login-modal">
              <div className="modal-container">
                <span className="modal-header">
                  VIDERI
                </span> 
                <span className="modal-subheader">
                  ORCHESTRATOR
                </span><br /><br />
                <div className="sign-in">
                  Sign In
                </div> <br />
                <input type="email" className="login" placeholder="ID" ref={this.idRef} /><br />
                <input className="login" placeholder="Password" ref={this.passwordRef} />
                <button className="login" onClick={this.checkValidity}>
                  Sign In
                </button>
              </div>
            </div>
          </div>
          ) 
        } 
}
