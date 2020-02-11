<?php
defined('BASEPATH') or exit('No direct script access allowed');

class LoginModel extends CI_Model{

    public function __construct()
    {
        parent::__construct();
    }

     /**
     * Buscar usuário do banco a partir do email
     *
     * @access public
     * @version 1.0.0 - 08 de Fevereiro de 2020
     * @author Lucas Gehlen <contato.lucasgehlen@gmail.com>
     * @param string $email
     * @return mixed
     */
    public function buscarInfoUsuario(string $email){
        try{
            $info = $this->db->where('email', strtolower($email))->get('usuario');
            return $info->row_array(); //Retornando uma única linha
        }

        catch (Exception $e){
            return FALSE;
        }
    }
}