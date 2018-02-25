import React from 'react';
import ReactDOM from 'react-dom';

//引入antd样式
import 'antd/dist/antd.less';

class Login extends React.Component {
	render() {
		return(
			<div>登录</div>
		)
	}
}

ReactDOM.render(<Login/>,document.getElementById("login"));