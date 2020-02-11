<?php
defined('BASEPATH') or exit('No direct script access allowed');

class AlunoModel extends CI_Model{

    /**
	 * Recebe parâmetros e realiza a busca de bruxos
	 *
	 * @access public
	 * @version 1.0.0 - 10 de Fevereiro de 2020
	 * @author Lucas Gehlen <contato.lucasgehlen@gmail.com>
	 * @param array $consulta_where - parâmetros que devem ser buscados com where simples
     *              array $consulta_like - parâmetros que devem ser buscados com like (contendo em parte do seu texto)
	 * @return mixed
	 */
    public function buscarAlunos($consulta_where, $consulta_like){
        try{            
            //Passando todas as condicionais em um array, e retornando a tabela Aluno
            $this->db->where($consulta_where);
            $this->db->like($consulta_like);      
            return $this->db->get('aluno')->result_array(); 
        }

        catch (Exception $e){
            return FALSE;
        }
    }

    
    /**
	 * Recebe parâmetros e realiza a inserção do bruxo
	 *
	 * @access public
	 * @version 1.0.0 - 10 de Fevereiro de 2020
	 * @author Lucas Gehlen <contato.lucasgehlen@gmail.com>
	 * @param array $dados - parâmetros para inserção na tabela
	 * @return mixed
	 */
    public function inserirAluno($dados){
        try{    
            return $this->db->insert('aluno',$dados);
        }
        catch (Exception $e){
            return FALSE;
        }
    }
 
    /**
	 * Recebe parâmetros e realiza a edição do bruxo
	 *
	 * @access public
	 * @version 1.0.0 - 10 de Fevereiro de 2020
	 * @author Lucas Gehlen <contato.lucasgehlen@gmail.com>
	 * @param array $dados - parâmetros para edição na tabela
	 * @return mixed
	 */
    public function editarAluno($dados){
        try{
            $this->db->where('idaluno', $dados['idaluno']);    
            return $this->db->update('aluno',$dados);
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
    public function desativarAluno($dados){
        try{
            $this->db->set('status', 0);
            $this->db->where('idaluno', $dados['idaluno']);    
            return $this->db->update('aluno');
        }
        catch (Exception $e){
            return FALSE;
        }
    }

}