import { Request, Response } from "express";

import { StudentServices } from "./student.services";
import studentZodSchema from "./student.validation";

const createStudent = async (req: Request, res: Response) => {
  try {
    const studentData = req.body;
    const zodStudentData = studentZodSchema.parse(studentData);

    const result = await StudentServices.createStudentIntoDB(zodStudentData);
    res.status(201).json({
      success: true,
      message: "Student Create Success",
      data: result,
    });
  } catch (erro) {
    res.status(400).json({
      success: false,
      message: "Data NOt found",
      erro: erro,
    });
  }
};

export const StudentController = {
  createStudent,
};
