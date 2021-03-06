import React,{Component} from 'react';
import AppActions from '../../actions/AppActions';
import AppStore from '../../stores/AppStore';
import AppAPI from '../../utils/appAPI';
import FeedList from './FeedList';
import Loader from '../Loader.js';
import AppConstants from '../../constants/AppConstants';

function get_feeds(){
		AppAPI.get_data(AppConstants.GET_FEEDS_URL, null, 'get',false).then((response)=>{
			console.log("asli data : ", response);
			var data = JSON.parse(response);
			console.log(data);
		})



return 	AppAPI.get_data(AppConstants.GET_FEEDS_URL, null, 'GET').then(
		function(data, err){
		if(err) console.log("There was an error ");
		var parsedData = JSON.parse(data);

		AppActions.setFeeds(parsedData);
		console.log("Hello, World!");
	}
	);
}





class Feeds extends Component{
	constructor(props) {
		super(props);
		var self = this;
		// delay on purpose remove later
		setTimeout(function(){
			get_feeds().then(function(){

				self.setState({'feeds': AppStore.get('feeds'), 'isLoading': false})
			});
		}, 1000);
		this.state = {
			'isLoading': true,
			'feeds': AppStore.get('feeds'),
		}
	}
	
	render() {
		
		console.log('refreshed here too');
		if(this.state.isLoading){
			return (<div className="loader"> 

					<Loader />

			</div>)
		}

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