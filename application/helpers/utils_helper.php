<?php
defined('BASEPATH') or exit('No direct script access allowed');


/**
 * Remove os espaços do inicio e fim da variável
 * Remove barras invertidas da variável
 * Remove caractere NULL em strings
 * Escapa caracteres HTML em strings
 *
 * @version 1.0.0 - 08 de Fevereiro de 2020
 * @author Lucas Gehlen <viniciusmeng2@gmail.com>
 * @param mixed $input variável a ser limpada. Array ou variável simples.
 * @return mixed variável ou array passada como parâmetro
 */
function limpaInput($input) 
{
    if(!isset($input)){
        return NULL;
    }

    if(is_array($input))
    {
        array_walk_recursive($input, 'limpaInput');
    }
    else 
    {
        $input = trim($input);
        $input = stripslashes($input);
        $input = htmlspecialchars($input);
        $input = remove_invisible_characters($input);
    }
    
    return $input;
}