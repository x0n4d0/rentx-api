import { Router } from 'express';
import multer from 'multer';

import createCategoryController from '../modules/cars/usecases/create-category';
import { importCategoryController } from '../modules/cars/usecases/import-category';
import { listCategoriesController } from '../modules/cars/usecases/list-categories';

const categoriesRoutes = Router();

const upload = multer({
  dest: './tmp',
});

categoriesRoutes.post('/', (request, response) => {
  return createCategoryController().handle(request, response);
});

categoriesRoutes.get('/', (request, response) => {
  return listCategoriesController.handle(request, response);
});

categoriesRoutes.post('/import', upload.single('file'), (request, response) => {
  return importCategoryController.handle(request, response);
});

export { categoriesRoutes };
