import React, { Component } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { auth } from "../services/firebase";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      useremail: "",
      password: "",
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
  handleFormChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  login = (event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(this.state.useremail, this.state.password)
      .then((response) => {
        this.setState({
          useremail: "",
          password: "",
        });
        if (response != null) {
          this.authListener();
          window.location = "/dashboard/";
        } else {
          alert("Invalid credentials!!");
        }
      })
      .catch((err) => {
        alert(err.message);
        this.setState({
          useremail: "",
          password: "",
        });
      });
  };
  render() {
    return (
      <div className="outer">
        <div className="inner">
          <form>
            <h3>Log in</h3>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="useremail"
                className="form-control"
                placeholder="Enter email"
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
                placeholder="Enter password"
                required
                value={this.state.password}
                onChange={this.handleFormChange}
              />
            </div>

            <div className="form-group">
              <p>
                Don't have an account? <Link to={"/sign-up"}>Sign up</Link>
              </p>
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-lg btn-block"
              onClick={this.login}
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    );
  }
}
