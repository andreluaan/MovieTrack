const express = require('express');

function createMovieRouter(controller) {
  const router = express.Router();

  router.get('/stats',         controller.getStats);      
  router.get('/',              controller.getAll);        
  router.get('/:id',           controller.getById);       
  router.post('/',             controller.create);        
  router.put('/:id',           controller.update);        
  router.delete('/:id',        controller.delete);        
  router.patch('/:id/watch',   controller.markAsWatched); 

  return router;
}

module.exports = createMovieRouter;