import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import dotenv from "dotenv";
dotenv.config();

class ConfigService {
  readonly appName: string;
  readonly appPort: number;
  readonly appEnv: string;
  readonly typeOrmConfig: TypeOrmModuleOptions;

  constructor(private env: { [k: string]: string | undefined }) {
    this.appName = this.getValue('APP_NAME', 'Hogwarts');
    this.appPort = parseInt(this.getValue('APP_PORT', '3001'));
    this.appEnv = this.getValue('APP_ENV', 'DEV').toUpperCase();
    this.typeOrmConfig = this.setTypeOrmConfig();
  }

  public isProduction() {
    return this.appEnv === 'PRODUCTION';
  }

  /**
   * Return environment variables
   *
   * @param key variable name
   * @param defaultValue returned if the respective env variable is not defined
   */
  private getValue(key: string, defaultValue: string): string {
    const value = this.env[key];

    return value ? value : defaultValue;
  }

  /**
   * Set the configurations for TypeOrm
   */
  private setTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'mysql',

      host: this.getValue('DB_HOST', '127.0.0.1'),
      port: parseInt(this.getValue('DB_PORT', '3306')),
      username: this.getValue('DB_USERNAME', 'root'),
      password: this.getValue('DB_PASSWORD', 'root'),
      database: this.getValue('DB_DATABASE', 'hogwarts'),

      entities: ['dist/src/models/*.entity{.ts,.js}'],
      migrations: ['src/migrations/*.ts'],

      migrationsTableName: 'migrations',

      cli: {
        migrationsDir: 'src/migrations',
      },
    };
  }
} 

const configService = new ConfigService(process.env);
export { configService };
