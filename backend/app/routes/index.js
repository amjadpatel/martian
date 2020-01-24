
import initRationRoutes from "./rationRoutes"

const initRoutes = (app) => {
  app.use(`/api/ration`, initRationRoutes());
};

export default initRoutes;
