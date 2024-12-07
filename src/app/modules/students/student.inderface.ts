import { Model, Types } from 'mongoose';

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};
export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};
export type TLocalGurdian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type TStudent = {
  id: string;
  user: Types.ObjectId,
  name: TUserName;
  gender: 'male' | 'female' | 'other';
  dateOfBirth?: String;
  email: string;
  avatar?: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGurdian;
  profileImg?: string;
  admissionSemester: Types.ObjectId;
  academicDeperment: Types.ObjectId;
  isDeleted: boolean;
};


// for creating static

export interface StudentModel extends Model<TStudent> {
  isUserExists(id: string): Promise<TStudent | null>
}




// for creating instance 
// export type StudentMethods = {
//   isUserExits(id: string): Promise<TStudent | null>;
// }

// export type SutudentModel = Model<TStudent, Record<string, never>, StudentMethods>;