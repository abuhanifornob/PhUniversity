import express from "express";

import validateRequest from "../../middleware/validateRequest";

import { AdminController } from "./admin.coltroller";
import { AdminValidations } from "./admin.validation";

const router = express.Router();

router.get("/", AdminController.getAllAdmin);
router.get("/:id", AdminController.getSingleAdmin);
router.patch(
  "/:id",
  validateRequest(AdminValidations.updateAdminValidationSchema),
  AdminController.updateAdmin
);
router.delete("/:id", AdminController.deleteAdmin);

export const AdminRouters = router;
