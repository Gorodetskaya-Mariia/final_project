import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
import './ServicesCard.css';

const { Meta } = Card;
class ServicesCard extends React.Component{

	render(){
		const { service, forWhom }= this.props;
		return (
		<Link to={`${forWhom}/${service.toLowerCase()}`} className="services__card">
        <Card
          key={ service }
          hoverable
					className="services__card"
          cover={
						<img
						alt="example"
						src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
					/>
					}
        >
          <Meta title={service} description="" />
        </Card>
    </Link>
		)
	}
}

export default ServicesCard;