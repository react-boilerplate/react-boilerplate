import React, { Component} from 'react';
import { Link } from 'react-router';

export default class AboutPage extends Component {
	render() {
    return (
    		<div className="wrapper">
    			<img className="logo" src={require('file!../../img/logo.png')} />
				<h2>About</h2>
				<Link to="/">Home</Link>
			</div>
		);
  }
}
