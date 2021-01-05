import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import FloatingButton from "./components/FloatingButton/FloatingButton";
import BookShelve from "./components/BookShelve/BookShelve";
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Profile from "./pages/Profile";
import Detail from "./pages/Detail";
import Search from "./pages/Search";
import Upload from "./pages/Upload/Upload";
import NoMatch from "./pages/NoMatch";
import Community from "./pages/Community";
import ProfileRoute from "./pages/ProfileRoute/ProfileRoute";
import MyReview from "./pages/MyReview";
import Layout from "./components/Layout/Layout";

import "./styles/globalStyle.scss";


function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/book/:id" component={Detail}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/search" component={Search}></Route>
          <Route path="/signup" component={SignUp}></Route>
          <ProfileRoute exact path="/me/books" component={Profile}/>
          <ProfileRoute exact path="/me/review" component={MyReview}/>
          <ProfileRoute exact path="/profile/:id/books" component={Profile}/>
          <ProfileRoute exact path="/profile/:id/review" component={MyReview}/>
          <Route path="/upload" component={Upload}></Route>
          <Route path="/community/reviews" component={Community}></Route>
          <Route path="/community/top-readers" component={Community}></Route>
          <Route path="/community/top-reviewers" component={Community}></Route>
          <Route path="/shelve/:id" component={BookShelve}></Route>
          <Route component={NoMatch} />
        </Switch>
        <FloatingButton />
      </Layout>
    </Router>
  );
}

export default App;
