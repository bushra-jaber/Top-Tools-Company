import { Router } from 'express'
import * as adminController from './admin.controller.js';
import { auth } from '../../middleware/auth.js';
import { asyncHandler } from '../../utls/errorHandling.js';
import { endpoints } from './admin.endPoint.js';
const router = Router();

router.post('/', auth(endpoints.create) ,asyncHandler(adminController.createAdmin))
router.delete('/:id',asyncHandler(adminController.deleteAdmin))
export default router;