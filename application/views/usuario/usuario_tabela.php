<?php defined('BASEPATH') or exit('No direct script access allowed');
    if (isset($usuarios)) :
        foreach ($usuarios as $atual) :
?>
            <tr class="col-md-12" 
                data-idusuario="<?=$atual['idusuario']?>"
                data-nome="<?=$atual['nome']?>" 
                data-email="<?=$atual['email']?>" 
                data-status="<?=$atual['status']?>"
            >
                <td><?= $atual['idusuario'];?></td>
                <td><?= $atual['nome']?></td>
                <td><?= $atual['email']?></td>
                <td class="text-center">
                    <?= (int)$atual['status'] === 1 ? '<i class="fas fa-check fa-lg"></i>' : '<i class="fas fa-times fa-2x"></i>' ?>
                </td>
            </tr>
<?php 
        endforeach;
    endif;
?>