import { model, Schema } from "mongoose";
import { TSemesterRegistration } from "./semesterRagistration.interface";
import { SemesterRagistrationStatus } from "./semesterRagistration.constant";
import { number } from "joi";

const semesterRagistrationSchema = new Schema<TSemesterRegistration>(
    {
        academicSemester: {
            type: Schema.Types.ObjectId,
            required: true,
            unique: true,
            ref: "AcademicSemester"
        },
        status: {
            type: String,
            enum: SemesterRagistrationStatus,
            default: "UPCOMING"
        },
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
            required: true
        },
        minCredit: {
            type: Number,
            default: 3
            // required: true
        },
        maxCredit: {
            type: Number,
            default: 15
            // required: true
        }


    }, {
    timestamps: true
}
)

// generating full name
// facultySchema.virtual('fullName').get(function () {
//     return (
//         this?.name?.firstName + '' +
//         this?.name?.middleName + '' +
//         this?.name?.lastName
//     )
// })
// filter out deleted documents 
// facultySchema.pre('find', function (next) {
//     this.find({ isDeleted: { $ne: true } })
//     next()
// });

// facultySchema.pre('findOne', function (next) {
//     this.find({ isDeleted: { $ne: true } })
//     next()
// })

// facultySchema.pre('aggregate', function (next) {
//     this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
//     next()
// })

//checking if user is already Exist!
// facultySchema.statics.isUserExists = async function (id: string) {
//     const existingUser = await Faculty.findOne({ id });
//     return existingUser;
// }


export const SemesterRagistration = model<TSemesterRegistration>("SemesterRagistration", semesterRagistrationSchema)