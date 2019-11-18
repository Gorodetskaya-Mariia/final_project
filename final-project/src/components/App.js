import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./pages/Home";
import Services from "./pages/Services";
import ServiceDetail from "./ServiceDetail/ServiceDetail";
import Account from "./pages/Account";
import Appointment from "./pages/Appointment/Appointment";
import Auth from "./pages/Auth/Auth";
import Header from "./Header";

const App = () => {
	return (
		<div>			
			<BrowserRouter>
				<Header></Header>
				<Route path="/" exact component={ Home } />
				<Route path="/services-for-men" exact component={ Services }/>
				<Route path="/services-for-women" exact component={ Services }/>
				<Route path="/services-for-women/color" component={ ServiceDetail }/>
				<Route path="/services-for-women/haircutting" component={ ServiceDetail }/>
				<Route path="/services-for-women/makeup" component={ ServiceDetail }/>
				<Route path="/services-for-women/waxing" component={ ServiceDetail }/>
				<Route path="/services-for-men/color" component={ ServiceDetail }/>
				<Route path="/services-for-men/haircutting" component={ ServiceDetail }/>
				<Route path="/services-for-men/waxing" component={ ServiceDetail }/>
				<Route path="/account" component={ Account }/>
				<Route path="/appointment" component={ Appointment }/>
				<Route path="/login" component={ Auth }/>
			</BrowserRouter>
		</div>)
};

export default App;