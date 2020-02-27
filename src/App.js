import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./route/Home";
import Login from "./route/Login";
import SignUp from "./route/SignUp";
import Profile from "./route/Profile";
import Detail from "./route/Detail";
import Footer from "./components/Footer";
import Search from "./route/Search";
import Edit from "./route/Edit";
import Upload from "./route/Upload";
import Header from "./components/Header";

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
        <Route path="/profile/:id" component={Profile}></Route>
        <Route path="/upload" component={Upload}></Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
