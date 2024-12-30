module.exports = {
  dialect: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DB || 'devburger',
  port: process.env.POSTGRES_PORT || 5432,
  url: process.env.DATABASE_URL,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
  dialectOptions: process.env.NODE_ENV === 'production' 
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      } 
    : {}
};



// module.exports = {
//     dialect:'postgres',
//     host:'localhost',
//     port: 5432,
//     username:'postgres',
//     password: 'postgres',
//     database:'devburger',
//     define:{
//         timestamps: true,
//         underscored: true,
//         underscoredAll:true,
//     },
// };