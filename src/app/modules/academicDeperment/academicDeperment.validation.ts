import { z } from 'zod'

const createAcademicDepermentValidationSchema = z.object({
    body: z.object({
        name: z
            .string({
                invalid_type_error: "Academic Deperment must be a string",
                required_error: "Name is required"
            }),
        academicFaculty: z.string({
            invalid_type_error: "Academic Feculty must be a string",
            required_error: "Academic Faculty Is required"
        })
    })
})

const updateAcademicDepermentValidationSchema = z.object({
    body: z.object({
        name: z
            .string({
                invalid_type_error: "Academic Deperment must be a string",
                required_error: "Name is required"
            }).optional(),
        academicFaculty: z.string({
            invalid_type_error: "Academic Feculty must be a string",
            required_error: "Academic Faculty Is required"
        }).optional()
    })
})





export const AcademicDepermentValidation = {
    createAcademicDepermentValidationSchema,
    updateAcademicDepermentValidationSchema
}