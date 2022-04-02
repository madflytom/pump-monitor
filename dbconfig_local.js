const  config = {
    user:  'foo', // sql user
    password:  'foo', //sql user password
    server:  'localhost', // if it does not work try your machine name
    database:  'Products',
    options: {
      trustedconnection:  true,
      enableArithAbort:  true,
      instancename:  'SQLEXPRESS'  // SQL Server instance name
    }
  }
  
  module.exports = config;

  //Your dbconfig.js file should be like this one.  
  // I'm not including the real file in the repo.  