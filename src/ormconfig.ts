import { ConnectionOptions } from 'typeorm';

const ormconfig: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'cms',
  password: '123',
  database: 'cms',
  entities: [__dirname + '/**/*.entity{.js,.ts}'],
  synchronize: false,
  migrations: [__dirname + '/migration/**/*{.js,.ts}'],
  cli: {
    migrationsDir: 'src/migration',
  },
};

export default ormconfig;
