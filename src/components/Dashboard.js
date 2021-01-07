import React, { Component } from "react";
import { db , auth} from "../services/firebase";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import Login from "./Login";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    const cookies = new Cookies();
    this.state = {
      user: cookies.get("User"),
      blogContent: '',
      userFromDb: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  logout = () => {
    auth.signOut();
    const cookies = new Cookies();
    this.setState({
      user: {},
    });
    cookies.remove("User", { path: "/", domain: "localhost" });
  };
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
   if (this.state.user) {
    const contentRef = db.collection("blogcontents");
      contentRef.add({
        PostContent: this.state.blogContent,
        UserName: this.state.user.displayName,
        dateAdded: new Date(),
      }).then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
   } else {
    alert("No user logged In");
    window.location = '/sign-in/' ;
   }
    this.setState({
      blogContent: '',
      username: ''
    });
  }
  componentDidMount() {
  
  
  }
  render() {
    return (
      <React.Fragment>
        {this.state.user ? (
          <div className="outer-home">
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
              <div className="container">
                <Link className="navbar-brand" to={"/sign-in"}>
                  Welcome {this.state.user.displayName}
                </Link>
                <div
                  className="collapse navbar-collapse"
                  id="navbarTogglerDemo02"
                >
                  <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        to={"/sign-in"}
                        onClick={this.logout}
                      >
                        Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav> 
            <div className="inner-home">
              <form onSubmit={this.handleSubmit}>
                <h3>Add your posts here</h3>
                <div className="form-group">
                  <textarea
                    type="textarea"
                    name="blogContent"
                    className="form-control"
                    placeholder="Write your thoughts"
                    required
                    value={this.state.blogContent}
                    onChange={this.handleChange}></textarea>
                </div>
                <button className="btn btn-primary btn-md btn-block" type="submit">
                  Post
                </button>
              </form>
            </div>
            {/* <div className="blog-posts">
              Hello World
            </div> */}
            </div>
        ) : (
          <Login></Login>
        )}
      </React.Fragment>
    );
  }
}

export default Dashboard;
