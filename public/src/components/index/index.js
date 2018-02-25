import React from 'react';
import ReactDOM from 'react-dom';

import { Layout, Menu, Icon, Button } from 'antd';
const { Header, Sider, Content } = Layout;

//引入antd样式
import 'antd/dist/antd.less';

class Index extends React.Component {
	
	//当前页面的所有状态
	constructor(){
		super();
		this.state = {
		    collapsed: false,
		    hasLogined:false,
		    name:"admin",
		    user:""
		};
	}
	
	//【react生命周期】模块加载之前判定
	componentWillMount(){
    	if(localStorage.user){
      		this.setState({hasLogined:true});
    	}
  	}
	
	//头部按钮控制左侧边栏收缩扩展
	toggle(){
		this.setState({collapsed: !this.state.collapsed});
	}
	
	render() {
		
		//根据用户是否登录判定显示头部代码
		const userState = this.state.hasLogined
			?
	        <a href="/loginRegist"><Icon type="user"/></a>
	    	:
	    	<a href="/loginRegist"><Icon type="select"/>登录/<Icon type="user-add"/>注册</a>
		
		return(
			<Layout>
		        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
		          	<div className="logo" />
	          		<Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
	            		<Menu.Item key="1">
	              			<Icon type="user" />
	              			<span>nav 1</span>
	            		</Menu.Item>
	            		<Menu.Item key="2">
	              			<Icon type="video-camera" />
	              			<span>nav 2</span>
	            		</Menu.Item>
	            		<Menu.Item key="3">
			              	<Icon type="upload" />
			              	<span>nav 3</span>
	            		</Menu.Item>
	          		</Menu>
		        </Sider>
		        <Layout>
		          	<Header style={{background:'#fff',padding:'0 0 0 20px'}}>
		            	<Icon className="trigger" type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggle.bind(this)}/>
		            	
		            	<span style={{float:'right'}}>{userState}</span>
		            	
		          	</Header>
		          	<Content style={{margin:'20px',padding:'24',background:'#fff',minHeight:'280px'}}>
						Content
					</Content>
		        </Layout>
		    </Layout>
		);
	}
}

ReactDOM.render(<Index/>,document.getElementById("index"));