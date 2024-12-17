import { model, Schema } from "mongoose";
import { TAcademicDeperment } from "./academicDeperment.interface";
import AppError from "../../errors/AappErrors";

const academicDepermentSchema = new Schema<TAcademicDeperment>({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    academicFaculty: {
        type: Schema.Types.ObjectId,
        ref: "academicFaculty"
    }
}, {
    timestamps: true
})







// academicDepermentSchema.pre("save", async function (next) {
//     const isDepermentExist = await AcademicDeperment.findOne({
//         name: this.name
//     })
//     if (isDepermentExist) {
//         throw new AppError(404, "Deperment Already Exists")
//     }

//     next()
// })


academicDepermentSchema.pre("findOneAndUpdate", async function (next) {

    const query = this.getQuery();
    const isDeparmentExist = await AcademicDeperment.findOne(query);

    if (isDeparmentExist) {
        throw new AppError(404, "This deparment dose not exist!")
    }
    next()

})

export const AcademicDeperment = model<TAcademicDeperment>("AcademicDeperment", academicDepermentSchema)