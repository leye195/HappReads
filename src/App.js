import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./route/Home";
import Login from "./route/Login/Login";
import SignUp from "./route/SignUp/SignUp";
import Profile from "./route/Profile";
import Detail from "./route/Detail";
import Footer from "./components/Footer";
import Search from "./route/Search";
import Edit from "./route/Edit/Edit";
import Upload from "./route/Upload/Upload";
import Header from "./components/Header";
import NoMatch from "./route/NoMatch";
import BookShelve from "./components/BookShelve/BookShelve";
import Community from "./route/Community";
import FloatingButton from "./components/FloatingButton/FloatingButton";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/book/:id" component={Detail}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/search" component={Search}></Route>
        <Route path="/signup" component={SignUp}></Route>
        <Route path="/edit" component={Edit}></Route>
        <Route path="/me" component={Profile}></Route>
        <Route path="/upload" component={Upload}></Route>
        <Route path="/community/reviews" component={Community}></Route>
        <Route path="/community/top-readers" component={Community}></Route>
        <Route path="/community/top-reviewers" component={Community}></Route>
        <Route path="/profile/:id" component={Profile}></Route>
        <Route path="/shelve/:id" component={BookShelve}></Route>
        <Route component={NoMatch} />
      </Switch>
      <FloatingButton />
      <Footer />
    </Router>
  );
}

export default App;
