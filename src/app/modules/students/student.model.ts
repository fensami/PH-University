import { Schema, model } from 'mongoose';
import {
  TGuardian,
  TLocalGurdian,
  TStudent,
  TUserName,
  StudentModel,
} from './student.inderface';
import validator from 'validator';
import AppError from '../../errors/AappErrors';




const userNameSchema = new Schema<TUserName, StudentModel>({
  firstName: {
    type: String,
    trim: true,
    required: [true, 'First name is required'],
    maxlength: [20, 'First name can not be more than 20 characters'],
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      message: "{VALUE} is not in vapitalized"
    }
  },
  middleName: { type: String },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: "{VALUE}  is not valid"
    }
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: [true, 'Father\'s name is required'] },
  fatherOccupation: { type: String, required: [true, 'Father\'s occupation is required'] },
  fatherContactNo: { type: String, required: [true, 'Father\'s contact number is required'] },
  motherName: { type: String, required: [true, 'Mother\'s name is required'] },
  motherOccupation: { type: String, required: [true, 'Mother\'s occupation is required'] },
  motherContactNo: { type: String, required: [true, 'Mother\'s contact number is required'] },
});

const localGuardianSchema = new Schema<TLocalGurdian>({
  name: { type: String, required: [true, 'Local guardian\'s name is required'] },
  occupation: { type: String, required: [true, 'Local guardian\'s occupation is required'] },
  contactNo: { type: String, required: [true, 'Local guardian\'s contact number is required'] },
  address: { type: String, required: [true, 'Local guardian\'s address is required'] },
});

// Student Schema
const studentSchema = new Schema<TStudent, StudentModel>({
  id: {
    type: String,
    required: [true, 'Student ID is required'],
    unique: true
  },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User ID is required'],
    unique: true,
    ref: "User"
  }
  ,
  name: {
    type: userNameSchema,
    required: [true, 'Name details are required'],
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: '{VALUE} is not a valid gender',
    },
    required: [true, 'Gender is required'],
  },
  dateOfBirth: { type: String },
  email: {
    type: String,
    required: [true, 'Email is required'],
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: "{VALUE} is not a value r type"
    }
  },
  contactNo: { type: String, required: [true, 'Contact number is required'] },
  emergencyContactNo: { type: String, required: [true, 'Emergency contact number is required'] },
  bloodGroup: {
    type: String,
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      message: '{VALUE} is not a valid blood group',
    },
  },
  presentAddress: { type: String, required: [true, 'Present address is required'] },
  permanentAddress: { type: String, required: [true, 'Permanent address is required'] },
  guardian: {
    type: guardianSchema,
    required: [true, 'Guardian details are required'],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, 'Local guardian details are required'],
  },
  profileImg: { type: String },
  admissionSemester: {
    type: Schema.Types.ObjectId,
    ref: "AcademicSemester"
  },
  academicDeperment: {
    type: Schema.Types.ObjectId,
    ref: "AcademicDeperment"
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },

});



// creating a custom statics mathod

studentSchema.statics.isUserExists = async function (id: string) {
  const existiongUser = await Student.findOne({ id })
  return existiongUser;
}








// Create a model
export const Student = model<TStudent, StudentModel>('Student', studentSchema);
