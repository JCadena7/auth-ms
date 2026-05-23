import pg from 'pg';

const client = new pg.Client({
  connectionString: 'postgresql://postgres:juan123@localhost:5432/new_blog'
});

client.connect()
  .then(() => {
    console.log('Conexión OK');
    return client.end();
  })
  .catch((err) => {
    console.error('Falla conexión', err);
    process.exit(1);
  });