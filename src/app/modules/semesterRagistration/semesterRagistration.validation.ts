import { z } from "zod"
import { SemesterRagistrationStatus } from "./semesterRagistration.constant"

export const createSemesterRagistrationValidation = z.object({
    body: z.object({
        academicSemester: z.string(),
        status: z.enum([...SemesterRagistrationStatus as [string, ...string[]]]),

        startDate: z.string().datetime(),
        endDate: z.string().datetime(),
        minCredit: z.number(),
        maxCredit: z.number()
    })
})

export const updateSemesterRagistrationValidation = z.object({
    body: z.object({
        academicSemester: z.string().optional(),
        status: z.enum([...SemesterRagistrationStatus as [string, ...string[]]]).optional(),
        startDate: z.string().datetime().optional(),
        endDate: z.string().datetime().optional(),
        minCredit: z.number().optional(),
        maxCredit: z.number().optional()
    })
})


export const semesterRagistrationValidations = {
    createSemesterRagistrationValidation,
    updateSemesterRagistrationValidation
}