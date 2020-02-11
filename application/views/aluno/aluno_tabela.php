<?php defined('BASEPATH') or exit('No direct script access allowed');
    if (isset($alunos)) :
        foreach ($alunos as $atual) :
?>
            <tr class="col-md-12" 
                data-idaluno="<?=$atual['idaluno']?>"
                data-nome="<?=$atual['nome']?>" 
                data-especialidade="<?=$atual['especialidade']?>" 
                data-casa="<?=$atual['casa']?>" 
                data-idade="<?=$atual['idade']?>" 
                data-status="<?=$atual['status']?>"
            >
                <td><?= $atual['idaluno'];?></td>
                <td><?= $atual['nome']?></td>
                <td><?= $atual['especialidade']?></td>
                <td>
                    <?php
                        switch($atual['casa']){
                            case 1:
                                echo 'GRIFINÓRIA';
                                break;
                            case 2:
                                echo 'SONSERINA';
                                break;
                            case 3:
                                echo 'CORNIVAL';
                                break;
                            case 4:
                                echo 'LUFA-LUFA';
                                break;
                        }
                    ?>
                </td>
                <td class="text-center"><?= $atual['idade']?></td>
                <td class="text-center">
                    <?= (int)$atual['status'] === 1 ? '<i class="fas fa-check fa-lg"></i>' : '<i class="fas fa-times fa-2x"></i>' ?>
                </td>
            </tr>
<?php 
        endforeach;
    endif;
?>