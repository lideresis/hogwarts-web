import { configService } from '../config/config.service';
import fs = require('fs');

if (fs.existsSync('ormconfig.json')) {
  fs.unlinkSync('ormconfig.json');
}

fs.writeFileSync(
  'ormconfig.json',
  JSON.stringify(configService.typeOrmConfig, null, 2),
);
