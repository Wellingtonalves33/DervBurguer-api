module.exports = {
    dialect: 'postgres',
    url: process.env.DATABASE_URL,
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    },
    // Configurações específicas para a Vercel
    dialectOptions: process.env.NODE_ENV === 'production' ? {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    } : {}
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