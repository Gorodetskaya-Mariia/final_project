import React from "react";
import { Link } from "react-router-dom";
import { Button } from 'antd';

const Home = () => {
	return (
	<div className="container">
		Home
		<Link to="/appointment">
			<Button type="primary" size={"large"}>
				Book an appointment
      </Button>
		</Link>
	</div>
	)
};

export default Home;