import { Router } from "express";
import CourseController from "../Controllers/CourseController.js";
import isUserAuthenticated from "../middlewares/auth.js";
import courseValidator from "../validators/course-validator.js";
const router = Router();
router.get("/all", CourseController.index);
router.post("/create", courseValidator, CourseController.createCourse);
router.get("/:courseId", courseValidator, CourseController.getCourse);
router.patch(
	"/update/:courseId",
	courseValidator,
	CourseController.updateCourse
);
router.post("/image", CourseController.courseImage);
export default router;