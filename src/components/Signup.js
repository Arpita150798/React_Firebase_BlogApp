import React, { Component } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { auth } from "../services/firebase";

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      useremail: "",
      password: "",
      username: "",
    };
  }
  authListener() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const cookies = new Cookies();
        cookies.set("User", user, { path: "/" });
      }
    });
  }
  signup = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(this.state.useremail, this.state.password)
      .then((response) => {
        if (response.user != null) {
          response.user
            .updateProfile({
              displayName: this.state.username,
            })
            .then((res) => {
              this.authListener();
              window.location = "/dashboard/";
            });
        } else {
          alert("Some Error Occurred!!");
        }
      })
      .catch((err) => {
        alert(err.message + " " + "Try with another email Id.");
        this.setState({
          username: "",
          useremail: "",
          password: "",
        });
        console.log(err);
      });
  };
  handleFormChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  render() {
    return (
      <React.Fragment>
        <div className="outer">
          <div className="inner">
            <form>
              <h3>Register</h3>

              <div className="form-group">
                <label>User Name</label>
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  placeholder="Enter Username"
                  required
                  value={this.state.username}
                  onChange={this.handleFormChange}
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="useremail"
                  className="form-control"
                  placeholder="Enter Email"
                  required
                  value={this.state.useremail}
                  onChange={this.handleFormChange}
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Enter Password"
                  required
                  value={this.state.password}
                  onChange={this.handleFormChange}
                />
              </div>
              
              <button
                className="btn btn-primary btn-lg btn-block"
                onClick={this.signup}
              >
                Register
              </button>
              <p className="text-right">
                Already registered? <Link to={"/sign-in"}>Login</Link>
              </p>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
