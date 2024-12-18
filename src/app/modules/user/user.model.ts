import bcrypt from "bcrypt";
import { model, Schema } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import config from "../../config";

const userSchema = new Schema<TUser, UserModel>({
    id: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: 0
    },
    needsPasswordChange: {
        type: Boolean,
        default: true,
    },
    role: {
        type: String,
        enum: ["student", "faculty", "admin"]
    },
    status: {
        type: String,
        enum: ["in-progress", "blocked"],
        default: "in-progress"
    },
    isDeleted: {
        type: Boolean,
        default: false
    },


}, {
    timestamps: true
})

userSchema.pre('save', async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this; // doc
    // hashing password and save into DB
    user.password = await bcrypt.hash(
        user.password,
        // Number(config.bcrypt_salt_rounds),
        12
    );
    // user.password = await bcrypt.hash(user.password, 10);

    next();
});

// set '' after saving password
userSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
});


//
userSchema.statics.isUserExistsByCustomId = async function (id: string) {

    return await User.findOne({ id }).select('+password')
}

// 
userSchema.statics.isPasswordMatched = async function (
    plainTextPassword,
    hashedPassword,
) {
    console.log(plainTextPassword, hashedPassword);
    const result = await bcrypt.compare(hashedPassword, plainTextPassword)
    return result
    // return await bcrypt.compare(plainTextPassword, hashedPassword)
}

// const user = await User.isUserExistsByCustomId(payload.id);
// console.log(user);


export const User = model<TUser, UserModel>("User", userSchema)