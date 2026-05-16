import { Router } from 'express';
import {
  listUsers,
  getUserById,
  createUser,
  updateUser,
  toggleUser,
  deleteUser,
  updateAvatar,
} from '@/controllers/user.controller';
import { authenticate, authorize } from '@/middlewares/auth.middleware';
import { validate } from '@/middlewares/validate.middleware';
import { uploadAvatar } from '@/middlewares/upload.middleware';
import { uuidParamSchema, userFilterSchema } from '@/validations/common.validation';
import { createUserSchema, updateUserSchema } from '@/validations/user.validation';
import { Role } from '@prisma/client';

const router = Router();

// All user routes require authentication
router.use(authenticate);

// GET /api/users
router.get('/', validate(userFilterSchema, ['query']), listUsers);

// GET /api/users/:id
router.get('/:id', validate(uuidParamSchema, ['params']), getUserById);

// POST /api/users — SUPER_ADMIN & ADMIN only
router.post(
  '/',
  authorize(Role.SUPER_ADMIN, Role.ADMIN),
  validate(createUserSchema),
  createUser,
);

// PATCH /api/users/:id
router.patch(
  '/:id',
  authorize(Role.SUPER_ADMIN, Role.ADMIN),
  validate(uuidParamSchema, ['params']),
  validate(updateUserSchema),
  updateUser,
);

// PATCH /api/users/:id/toggle — SUPER_ADMIN only
router.patch(
  '/:id/toggle',
  authorize(Role.SUPER_ADMIN),
  validate(uuidParamSchema, ['params']),
  toggleUser,
);

// DELETE /api/users/:id — SUPER_ADMIN only (soft delete)
router.delete(
  '/:id',
  authorize(Role.SUPER_ADMIN),
  validate(uuidParamSchema, ['params']),
  deleteUser,
);

// PATCH /api/users/:id/avatar
router.patch(
  '/:id/avatar',
  authorize(Role.SUPER_ADMIN, Role.ADMIN),
  validate(uuidParamSchema, ['params']),
  uploadAvatar.single('avatar'),
  updateAvatar,
);

export default router;
