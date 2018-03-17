import React from 'react';
import ReactDOM from 'react-dom';

import {Row, Col, Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

//引入登录界面特定样式
import './login.less';

class Login extends React.Component {
	
	//定义初始化值
	constructor(){
		super();
		this.state = {
			postForm:'123456789'
		}
	}
	
	//表单提交事件
	handleSubmit(e){
	    e.preventDefault();
	    this.props.form.validateFields((err, values) => {
	    	if (!err) {
	        	//提交
			    fetch('/loginRegist/loginPost',{
			    	'method':'POST',
			    	'credentials': 'include',//支持cookie传递
			    	'headers':{
//			    		'Content-Type':'application/x-www-form-urlencoded',
			    		'Accept': 'application/json',
			    		'Content-Type': 'application/json'
			    	},
//			    	'body':`user_name=${values.user_name}&user_password=${values.user_password}`
			    	'body':JSON.stringify(values)
			    })
				.then(response => response.json())
				.then(data => {
					this.setState({postForm:data.message});
					//浏览器保存user_name
					localStorage.userName = data.userName;
					//浏览器跳转
					location.href = data.address;
				})
	      	}else{
	      		alert('服务器错误');
	      	}
	    });
	}
	
	render() {
		
		const { getFieldDecorator } = this.props.form;
		
		return(
			<Row>
				<Col offset={9} span={6}>
				
					<span >{this.state.postForm}</span>
				
					<Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
				        <FormItem>
				          	{getFieldDecorator('userName', {
				            	rules: [{ required: true, message: 'Please input your username!' }],
				          	})(
				            	<Input prefix={<Icon type="user"/>} placeholder="请输入用户名" />
				          	)}
				        </FormItem>
				        <FormItem>
				          	{getFieldDecorator('userPassword', {
				            	rules: [{ required: true, message: 'Please input your Password!' }],
				          	})(
				            	<Input prefix={<Icon type="lock"/>} type="password" placeholder="请输入密码" />
				          	)}
				        </FormItem>
				        <FormItem>
				          	<a className="login-form-forgot loginForgot" href="">找回密码</a>
				        </FormItem>
				        <FormItem>
				          	<Button type="primary" icon="user" htmlType="submit" className="login-form-button loginBtn">
				            	登录
				          	</Button>
				          	<Button type="primary" icon="user-add" className="login-form-button loginBtn">
				            	注册
				          	</Button>
				        </FormItem>
				    </Form>
				</Col>
			</Row>
		)
	}
}

const WrappedNormalLoginForm = Form.create()(Login);
ReactDOM.render(<WrappedNormalLoginForm />,document.getElementById("login"));