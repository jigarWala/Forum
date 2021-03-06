import React,{Component} from 'react';
import AppAPI from '../../utils/appAPI';
import AppStore from '../../stores/AppStore';

export default class Answer extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
    	'upvotes':  parseInt(this.props.answer.upvotes),
    	'isLiked': (this.props.answer.isLiked),
    };
  }

  render() {

    var {answer} = this.props;
  	var username =  answer.user;
  	var answer = answer.answer;
  	var {upvotes, isLiked} =  this.state;
  	var liked = "btn-like fa fa-thumbs-up fa-2x ";
  	liked += (isLiked ? 'active' : '' );

    return (
      <div className="container-fluid">
      	<div className="card">
		  <div className="card-block">
		  <div className="row">
		  	<div className="col-xs-8 col-md-8 col-lg-8 col-sm-8">
		    <h3 className="card-title">{username}</h3>
		  </div>
		  <div className="col-xs-4 col-md-4 col-lg-4 col-sm-4 text-right">
		  	<span className="badge upvotes badge-info">{upvotes} upvotes</span>
		  </div>
		  </div>
		    <p className="card-text">{answer}</p>
		    <button className={liked} onClick={this.onClickHandler.bind(this)}></button>
		  </div>
		</div>	

      </div>
    );
  }

  handleLike(){
  	var {upvotes, isLiked} = this.state;
   
  	if(isLiked){
  		this.setState({upvotes : upvotes-1, isLiked: false});
  	}else{
      console.log('upvotes1 : ',upvotes);
  		this.setState({upvotes: upvotes+1, isLiked: true});
      console.log('upvotes :',upvotes);
  	}
  	return true;
  }

  onClickHandler(e){

    var {isLiked} = this.state;

  	if(!isLiked){
      var answerId = this.props.answer.id;
      var user_id = AppStore.get('user_id');
      var self = this;

      AppAPI.upvote(answerId, user_id).then((data)=>{
        self.handleLike();
        console.log(data);
        
      }).catch((err)=>{
        console.log("couldn't like ", err);
      });
    }
  	//downvote logic
  }

}

