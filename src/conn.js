import mysql from 'mysql2/promise';

async function createPool() {
  const pool = mysql.createPool({
    host: 'localhost',
    user: 'matiu',
    database: 'GuatemalaDepot',
    password: 'password',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  return pool;
}

const pool = await createPool();

export default pool;
