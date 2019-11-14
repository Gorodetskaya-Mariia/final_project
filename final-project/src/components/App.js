import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Service from "./pages/Service";
import Account from "./pages/Account";
import Appointment from "./pages/Appointment";
import Header from "./Header";

const App = () => {
	return (
		<div>			
			<BrowserRouter>
				<Header></Header>
				<Route path="/" exact component={ Home }></Route>
				<Route path="/services" component={ Services }></Route>
				<Route path="/service" component={ Service }></Route>
				<Route path="/account" component={ Account }></Route>
				<Route path="/appointment" component={ Appointment }></Route>
			</BrowserRouter>
		</div>)
};

export default App;