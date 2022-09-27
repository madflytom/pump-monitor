var  config = require('./dbconfig');
const  sql = require('mssql');
const WaterLevelChartObject = require('../models/waterLevelChartObject');

async  function  getOrders() {
  try {
    let  pool = await  sql.connect(config);
    let  products = await  pool.request().query("SELECT * from Orders");
    return  products.recordsets;
  }
  catch (error) {
    console.log(error);
  }
}

async  function  getLevels() {
    try {
      let  pool = await  sql.connect(config);

      let  levels = await  pool.request().query("SELECT Id as id, LoggedTime as label, Measurement as data from Waterlevels ORDER BY LoggedTime ASC;");
      return  levels.recordsets;
    }
    catch (error) {
      console.log(error);
    }
  }

  async  function  clearPastLevels() {
    try {
      let  pool = await  sql.connect(config);
      let  query = await  pool.request().query("delete from WaterLevels where LoggedTime < DATEADD(day, -1, GETDATE());");
      return  query.recordsets;
    }
    catch (error) {
      console.log(error);
    }
  }

async  function  getOrder(productId) {
  try {
    let  pool = await  sql.connect(config);
    let  product = await  pool.request()
    .input('input_parameter', sql.Int, productId)
    .query("SELECT * from Orders where Id = @input_parameter");
    return  product.recordsets;
  }
  catch (error) {
    console.log(error);
  }
}

async  function  addOrder(order) {
  try {
    let  pool = await  sql.connect(config);
    let  insertProduct = await  pool.request()
    .input('Id', sql.Int, order.Id)
    .input('Title', sql.NVarChar, order.Title)
    .input('Quantity', sql.Int, order.Quantity)
    .input('Message', sql.NVarChar, order.Message)
    .input('City', sql.NVarChar, order.City)
    .query('INSERT into Orders ([Id],[Title],[Quantity],[Message],[City]) VALUES (@Id, @Title, @Quantity, @Message, @City)');
    return  insertProduct.recordsets;
  }
  catch (err) {
    console.log(err);
  }
}

module.exports = {
  getOrders:  getOrders,
  getOrder:  getOrder,
  addOrder:  addOrder,
  getLevels: getLevels,
  clearPastLevels: clearPastLevels
}