var  Db = require('./dboperations');
var  Order = require('./Order');
var  express = require('express');
var  bodyParser = require('body-parser');
var  cors = require('cors');
var  app = express();
var  router = express.Router();

app.use(bodyParser.urlencoded({ extended:  true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

router.use((request, response, next) => {
  console.log('middleware');
  next();
});
 
 
router.route('/orders').get((request, response) => {
  Db.getOrders().then((data) => {
    response.json(data[0]);
  })
})

router.route('/levels').get((request, response) => {
    Db.getLevels().then((data) => {
      response.json(data[0]);
    })
  })

  router.route('/clearlevels').post((request, response) => {
    Db.clearPastLevels().then((data) => {
      response.json(data[0]);
    })
  })

router.route('/orders/:id').get((request, response) => {
  Db.getOrder(request.params.id).then((data) => {
    response.json(data[0]);
  })
})

router.route('/orders').post((request, response) => {
  let  order = { ...request.body }
  Db.addOrder(order).then(data  => {
    response.status(201).json(data);
  })
})
  
  
var  port = process.env.PORT || 8090;
app.listen(port);
console.log('Order API is runnning at ' + port);