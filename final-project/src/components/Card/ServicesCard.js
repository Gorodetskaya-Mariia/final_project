import React from "react";
import { Card } from "antd";
import './ServicesCard.css';

const { Meta } = Card;
class ServicesCard extends React.Component{

	render(){
		const { service }= this.props;
		return (

        <Card
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

		)
	}
}

export default ServicesCard;