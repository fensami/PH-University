import AppError from "../../errors/AappErrors";
import { TSchedule } from "./offeredCourse.interface"





export const hasTimeConfilct = (assignedSchedule: TSchedule[], newSchedule: TSchedule) => {

    for (const schedule of assignedSchedule) {
        const existingStartTime = new Date(`1971-01-01T${schedule.startTime}`);
        const existingEndTime = new Date(`1971-01-01T${schedule.endTime}`);
        const newStartTime = new Date(`1971-01-01T${newSchedule.startTime}`);
        const newEndTime = new Date(`1971-01-01T${newSchedule.endTime}`);

        if (newStartTime < existingEndTime && newEndTime > existingStartTime) {
            return true
            // throw new AppError(404, `This Faculty is not available at that time ! choose other time or days`)
        }
    }


    // assignedSchedule.forEach((schedule) => {


    // })

    return false
}