import ormconfig from 'src/ormconfig';

const seedormconfig = {
  ...ormconfig,
  seeds: ['src/seed/seeds/**/*{.ts,.js}'],
  factories: ['src/seed/factories/**/*{.ts,.js}'],
};

export default seedormconfig;
