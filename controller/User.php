<?php 

require_once(__DIR__.'/../model/UserModel.php');
require_once(__DIR__.'/../model/QuestionModel.php');
require_once(__DIR__.'/../model/AnswerModel.php');

class User{

function __construct(){
	//echo 'user controller CLASS CREATED '."<br />";
	$this->model=new UserModel();
	$this->question_model=new QuestionModel();
	$this->answer_model=new AnswerModel();

}

function login_post(){
	$data = array();
	//print_r($_POST);
	$data['username'] = $_POST['username'];
	$data['password'] = md5($_POST['password']);
	$result = $this->model->does_user_exist($data);

	if(count($result) > 0){
			$response['login'] = 'success';
			$response['user_id'] = $result[0]['id'];
			$response['username'] = $data['username'];
	}else{
		$response['login'] = 'failure';
	}
	
	echo json_encode($response);
	
 }
 function register_post(){
		$data = array();
		$response = array();
		$data['username'] = $_POST['username'];
		$r1 = $this->model->does_user_exist($data);
		$data['email'] = $_POST['email'];
		$r2 = $this->model->does_user_exist(array('email'=>$data['email']));

		if(count($r1) > 0 || count($r2) > 0){
			$response['register'] = 'failure';
			$response['message']='';


			if(count($r1) > 0)
			$response['message'] = 'username already exist';
			if(count($r2) > 0)
			$response['message'] += 'email already exist';
		}
		else {
			$data['password'] = md5($_POST['password']);
			$this->model->add_user($data);
			$response['register'] = 'success';
			$response['message'] = '';
		}
		    echo json_encode($response);
 }


function hello_get(){
	echo "Hello, World!";
}


//http://localhost/CJ-MVC/index.php/User/getAll/
function getAll_get(){
	$result = $this->model->get_all();
	echo json_encode($result);
}


//http://localhost/CJ-MVC/index.php/User/get/2/
function get_get($id){

	$result = $this->model->get($id);
	echo json_encode($result);
}

function getAllQuestions_get($userid){
	$result=$this->question_model->get_by_user_id($userid);
	echo json_encode($result);
}

function getAllAnswers_get($userid){
	$result=$this->answer_model->get_by_user_id($userid);
	echo json_encode($result);
}

}

 ?>