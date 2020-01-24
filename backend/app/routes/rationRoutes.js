import express from 'express';
import RationController from '../controllers/rationController';

//Routes for all ration api 


const initRationRoutes = () => {
  const rationRoutes = express.Router();

  rationRoutes.post('/add-ration',RationController.addRation);
  rationRoutes.get('/get-ration',RationController.getAllRation);
  rationRoutes.delete('/delete-ration/:id',RationController.deleteRation);
  rationRoutes.get('/schedule-ration/:date',RationController.scheduledRation);




  return rationRoutes;
};

export default initRationRoutes;
