import express from 'express'
import { Prisma, PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()
const router = express.Router()

const formSchema = z.object({
    firstName: z.string({ required_error: 'First name is requested', invalid_type_error: 'First name must be a string' }).min(3, 'First name should be atleast 3 charaters long'),
    lastName: z.string({ required_error: 'Last name is requested', invalid_type_error: 'Last name must be a string' }).min(3, 'Last name should be atleast 3 charaters long'),
    email: z.string({ required_error: 'Email is requested', invalid_type_error: 'Email must be a string' }).email('Must be valid email'),
    username: z.string({ required_error: 'Usernaem is requested', invalid_type_error: 'Username must be a string' }).min(4, 'Username should be atleast 4 charaters long'),
    password: z.string({ required_error: 'Password is requested', invalid_type_error: 'Password must be a string' }).min(4, 'Password should be atleast 4 charaters long'),
    confirmPassword: z.string({ required_error: 'Confirm Password is requested', invalid_type_error: 'Confirm Password must be a string' }).min(4, 'Password should be atleast 4 charaters long')
}).superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
        ctx.addIssue({
            code: 'custom',
            message: 'Password and Confirm Password does not match'
        })
    }
})

router.post('/create', async (req, res) => {

    let firstName, lastName, email, username, password

    try {
        ({ firstName, lastName, email, username, password } = formSchema.parse(req.body))
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(401).json({
                error: error.issues
            })
            return
        }
        else if (error instanceof Error) {
            res.status(500).json({
                error: [{
                    name: 'InternalServerError',
                    message: error.message
                }]
            })
            return
        }
        else {
            res.status(500).json({
                error: [{
                    name: 'InternalServerError',
                    message: 'Something went wrong'
                }]
            })
            return
        }
    }

    let form

    try {

        form = await prisma.form.create({
            data: {
                firstName,
                lastName,
                email,
                username,
                password
            }
        })
    } catch (error) {

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                if (typeof error.meta?.target === 'string' && error.meta?.target.includes('email')) {
                    res.json({
                        error: [
                            {
                                message: 'Email already exists'
                            }
                        ]
                    })
                    return
                }
                else if (typeof error.meta?.target === 'string' && error.meta?.target.includes('username')) {
                    res.json({
                        error: [
                            {
                                message: 'Username is already taken'
                            }
                        ]
                    })
                    return
                }
                else {
                    res.json({
                        error: [
                            {
                                message: 'Username or Email is already taken'
                            }
                        ]
                    })
                    return
                }
            }
            else{
                res.status(500).json({
                    error: [{
                        name: 'DuplicateFound',
                        message: error.message
                    }]
                })
                return
            }
        }
        else {
            if (error instanceof Error) {
                res.status(500).json({
                    error: [{
                        name: 'InternalServerError',
                        message: error.message
                    }]
                })
                return
            }
            else {
                res.status(500).json({
                    error: [{
                        name: 'InternalServerError',
                        message: 'Please try after sometime'
                    }]
                })
                return
            }
        }

    }



    res.json({
        result: form
    })
})

export default router