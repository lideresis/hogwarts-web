<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Bruxos extends CI_Controller {

	public function __construct(){
		// Construtor do CI_Controller
		parent::__construct(); 
	}
	
	public function index(){
        $this->load->view('layout/header');
        $this->load->view('bruxos/bruxos');
		$this->load->view('layout/footer');
    } 
} 