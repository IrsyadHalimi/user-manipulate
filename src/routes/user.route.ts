/** Route definition for user manipulation */
import { Router } from 'express';
import { handleGetExternalUsers } from '../controllers/user.controller';

const router = Router();

router.get('/external-users', handleGetExternalUsers);

export default router;