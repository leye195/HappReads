import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FloatingButton from "./components/FloatingButton/FloatingButton";
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Profile from "./pages/Profile";
import Detail from "./pages/Detail";
import Search from "./pages/Search";
import Upload from "./pages/Upload/Upload";
import NoMatch from "./pages/NoMatch";
import BookShelve from "./components/BookShelve/BookShelve";
import Community from "./pages/Community";
import "./styles/globalStyle.scss";

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
