import React, { Component } from "react";
import { db, auth } from "../services/firebase";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import Login from "./Login";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    const cookies = new Cookies();
    this.state = {
      user: cookies.get("User"),
      blogContent: "",
      posts: [],
    };
  }
  logout = () => {
    auth.signOut();
    const cookies = new Cookies();
    this.setState({
      user: {},
    });
    cookies.remove("User", { path: "/", domain: "localhost" });
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.user) {
      const contentRef = db.collection("blogcontents");
      let newPost = {
        PostContent: this.state.blogContent,
        UserName: this.state.user.displayName,
        UserEmail: this.state.user.email,
        dateAdded: new Date(),
      };

      contentRef
        .add(newPost)
        .then(function (docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });
      var newPostDate = newPost.dateAdded.toDateString();
      newPost.dateAdded = newPostDate;
      this.setState({
        posts: this.state.posts.concat(newPost),
        blogContent: "",
      });
    } else {
      alert("No user logged In");
      window.location = "/sign-in/";
    }
  };
  componentDidMount() {
    db.collection("blogcontents")
      .where("UserEmail", "==", this.state.user.email)
      .get()
      .then((snapshot) => {
        const allPosts = [];
        snapshot.docs.forEach((doc) => {
          let post = doc.data();
          var dateAdded = new Date(post.dateAdded.toDate()).toDateString();
          post.dateAdded = dateAdded;
          allPosts.push(post);
        });
        this.setState({ posts: allPosts });
      });
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
            <div className="row">
              <div className="col-sm-4">
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
                        onChange={this.handleChange}
                      ></textarea>
                    </div>
                    <button
                      className="btn btn-primary btn-md btn-block"
                      type="submit"
                    >
                      Post
                    </button>
                  </form>
                </div>
              </div>
              <div className="col-sm-6">
                {this.state.posts.map((post, index) => (
                  <div className="blog-post" key={index}>
                    <ul>
                      {post.PostContent} <br></br>
                      Added by: {post.UserName} @{post.dateAdded}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <Login></Login>
        )}
      </React.Fragment>
    );
  }
}

export default Dashboard;
