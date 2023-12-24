import httpStatus from "http-status";
import AppError from "../../errors/appError";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistration } from "./semesterRegistration.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { registrationStatus } from "./semesterRegistration.constant";

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration
) => {
  /**
   * Step1: Check if there any registered semester that is already 'UPCOMING'|'ONGOING'
   * Step2: Check if the semester is exist
   * Step3: Check if the semester is already registered!
   * Step4: Create the semester registration
   */

  const academicSemester = payload?.academicSemester;

  //check if there any registered semester that is already 'UPCOMING'|'ONGOING'

  const isThereAnyUpcomingOrOngoingSemester =
    await SemesterRegistration.findOne({
      $or: [
        {
          status: "UPCOMING",
        },
        {
          status: "ONGOING",
        },
      ],
    });

  if (isThereAnyUpcomingOrOngoingSemester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is aready an ${isThereAnyUpcomingOrOngoingSemester.status} registered semester !`
    );
  }
  // Check if the Academic Semeter is exist
  const isAcademicSemesterExists = await AcademicSemester.findById(
    academicSemester
  );
  if (!isAcademicSemesterExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "This Academic Semester is not Exitsts "
    );
  }

  // Check if the semster alreay Regester
  const isSemesterRegistrationExists = await SemesterRegistration.findOne({
    academicSemester,
  });
  if (isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This Semseter already Registed"
    );
  }
  const result = await SemesterRegistration.create(payload);
  return result;
};

const getAllSemesterRegistrationsFromDB = async (
  query: Record<string, unknown>
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate("academicSemester"),
    query
  )
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await SemesterRegistration.find();
  return result;
};

const getSingleSemesterRegistrationsFromDB = async (id: string) => {
  const result = await SemesterRegistration.findById(id).populate(
    "academicSemester"
  );
  return result;
};

const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>
) => {
  /**
   * Step1: Check if the semester is exist
   * Step2: Check if the requested registered semester is exists
   * Step3: If the requested semester registration is ended, we will not update anything
   * Step4: If the requested semester registration is 'UPCOMING', we will let update everything.
   * Step5: If the requested semester registration is 'ONGOING', we will not update anything  except status to 'ENDED'
   * Step6: If the requested semester registration is 'ENDED' , we will not update anything
   *
   * UPCOMING --> ONGOING --> ENDED
   *
   */
  // Check this semester Registrat id is Exits
  const exitsSemeterRegistration = await SemesterRegistration.findById(id);
  const requsetSemeterRegistrationStatu = payload?.status;
  if (!exitsSemeterRegistration) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `Semester Registred id is ${id} not Exits }`
    );
  }
  const currentSemesterRegistrationStatus = exitsSemeterRegistration.status;
  if (currentSemesterRegistrationStatus === "ENDED") {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not directly change status from ${currentSemesterRegistrationStatus}`
    );
  }

  // UPCOMING --> ONGOING --> ENDED

  if (
    currentSemesterRegistrationStatus === registrationStatus.UPCOMING &&
    requsetSemeterRegistrationStatu === "ENDED"
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not directly change status from ${currentSemesterRegistrationStatus} to ${requsetSemeterRegistrationStatu}`
    );
  }
  if (
    currentSemesterRegistrationStatus === registrationStatus.ONGOING &&
    requsetSemeterRegistrationStatu === "UPCOMING"
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not directly change status from ${currentSemesterRegistrationStatus} to ${requsetSemeterRegistrationStatu}`
    );
  }

  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};
const deleteSemesterRegistrationFromDB = async (id: string) => {
  const result = await SemesterRegistration.findByIdAndDelete(id, {
    new: true,
  });
};

export const SemesterRegistrationService = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationsFromDB,
  getSingleSemesterRegistrationsFromDB,
  updateSemesterRegistrationIntoDB,
  deleteSemesterRegistrationFromDB,
};
