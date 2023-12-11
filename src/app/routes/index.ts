import { Router } from 'express';
import { ReviewRoutes } from '../modules/review/review.route';
import { CategoriesRoutes } from '../modules/category/categories.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/reviews',
    route: ReviewRoutes,
  },
  {
    path: '/categories',
    route: CategoriesRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
