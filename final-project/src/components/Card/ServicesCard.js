import React from "react";
import { Card } from 'antd';
import './ServicesCard.css';

const tabList = [
  {
    key: 'tab1',
    tab: 'Color',
  },
  {
    key: 'tab2',
    tab: 'Waxing',
	},
	{
    key: 'tab3',
    tab: 'Haircut',
	},
	{
    key: 'tab4',
    tab: 'Beard',
	},
	{
    key: 'tab5',
    tab: 'Makeup',
  },
];

const contentList = {
  tab1: <p>content1</p>,
	tab2: <p>content2</p>,
	tab3: <p>content3</p>,
	tab4: <p>content4</p>,
	tab5: <p>content5</p>,
};

class ServicesCard extends React.Component{
	state = {
		key: 'tab1',
		title: "title"
  };

  onTabChange = (key, type) => {
    this.setState({ [type]: key });
	};
	
	render(){
		return (
		<div className="services__card">
        <Card
          title={ this.state.title }
          tabList={tabList}
          activeTabKey={this.state.key}
          onTabChange={key => {
            this.onTabChange(key, 'key');
          }}
        >
          {contentList[this.state.key]}
        </Card>   
      </div>
		)
	}
}

export default ServicesCard;