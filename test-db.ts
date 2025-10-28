import { DataSource } from 'typeorm';

const dataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
});

dataSource.initialize()
  .then(() => console.log('✅ Connected successfully!'))
  .catch(err => console.error('❌ Connection failed:', err));
