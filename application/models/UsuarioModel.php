<?php
defined('BASEPATH') or exit('No direct script access allowed');

class UsuarioModel extends CI_Model{

    /**
	 * Recebe parâmetros e realiza a busca de usuários
	 *
	 * @access public
	 * @version 1.0.0 - 10 de Fevereiro de 2020
	 * @author Lucas Gehlen <contato.lucasgehlen@gmail.com>
	 * @param array $consulta_where - parâmetros que devem ser buscados com where simples
     *              array $consulta_like - parâmetros que devem ser buscados com like (contendo em parte do seu texto)
	 * @return mixed
	 */
    public function buscarUsuario($consulta_where, $consulta_like){
        try{            
            //Passando todas as condicionais em um array, e retornando a tabela Aluno
            $this->db->where($consulta_where);
            $this->db->like($consulta_like);      
            return $this->db->get('usuario')->result_array(); 
        }

        catch (Exception $e){
            return FALSE;
        }
    }
  
    /**
	 * Recebe parâmetros e realiza a inserção do usuário
	 *
	 * @access public
	 * @version 1.0.0 - 10 de Fevereiro de 2020
	 * @author Lucas Gehlen <contato.lucasgehlen@gmail.com>
	 * @param array $dados - parâmetros para inserção na tabela
	 * @return mixed
	 */
    public function inserirUsuario($dados){
        try{    
            return $this->db->insert('usuario',$dados);
        }
        catch (Exception $e){
            return FALSE;
        }
    }
  
    /**
	 * Recebe parâmetros e realiza a edição do usuário
	 *
	 * @access public
	 * @version 1.0.0 - 10 de Fevereiro de 2020
	 * @author Lucas Gehlen <contato.lucasgehlen@gmail.com>
	 * @param array $dados - parâmetros para inserção na tabela
	 * @return mixed
	 */
    public function editarUsuario($dados){
        try{    
            $this->db->where('idusuario', $dados['idusuario']);    
            return $this->db->update('usuario',$dados);
        }
        catch (Exception $e){
            return FALSE;
        }
    }

    /**
	 * Recebe parâmetros e realiza a desativação do bruxo
	 *
	 * @access public
	 * @version 1.0.0 - 10 de Fevereiro de 2020
	 * @author Lucas Gehlen <contato.lucasgehlen@gmail.com>
	 * @param array $dados - parâmetros para inserção na tabela
	 * @return mixed
	 */
    public function desativarUsuario($dados){
        try{
            $this->db->set('status', 0);
            $this->db->where('idusuario', $dados['idusuario']);    
            return $this->db->update('usuario');
        }
        catch (Exception $e){
            return FALSE;
        }
    }

}