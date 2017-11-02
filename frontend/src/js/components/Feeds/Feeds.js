import React,{Component} from 'react';
import AppActions from '../../actions/AppActions';
import AppStore from '../../stores/AppStore';
import AppAPI from '../../utils/appAPI';
import FeedList from './FeedList';

function get_feeds(){
	AppAPI.get_data("http://localhost/forum/test/test.json", null, 'GET').then(
		function(data, err){
		if(err) console.log("There was an error ");
		var parsedData = JSON.parse(data);
		AppActions.setFeeds(parsedData.feeds);
		console.log("Hello, World!");
	}
	);
}





class Feeds extends Component{
	constructor(props) {
		super(props);
		get_feeds();
		this.state = {
			'feeds': AppStore.get('feeds'),
		}
	}
	
	render() {
		
		console.log('refreshed here too');
		return(
			<div className="container-fluid">
				<div className="row">
				<div className="col-xs-12 col-lg-10 col-sm-12 col-md-12">
				<FeedList {...this.state}  changePath={this.changePath.bind(this)}/>
				</div>
				</div>
			</div>

		)
	}

	changePath(){
		this.props.history.push("/questions");
		return;
	}

	_onChange(){
		this.setState(getAppState());
	}
}

export default Feeds;