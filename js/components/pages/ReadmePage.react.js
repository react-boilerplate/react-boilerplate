/*
 * ReadmePage
 *
 * This is the page users see when they click the "Setup" button on the HomePage
 */

import React, { Component} from 'react';
import { Link } from 'react-router';

export default class AboutPage extends Component {
	render() {
    return (
    	<div>
				<h2>Further Setup</h2>
				<p>Assuming you have already cloned the repo and ran all the commands from the README (otherwise you would not be here), these are the further steps:</p>

				<ol>
					<li>Replace my name and the package name in the package.json file</li>
					<li>Replace the two components with your first component</li>
					<li>Replace the default actions with your first action</li>
					<li>Delete css/components/_home.css and add the styling for your component</li>
					<li>And finally, update the unit tests</li>
				</ol>

				<Link className="btn" to="/">Home</Link>
			</div>
		);
  }
}
