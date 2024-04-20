'use client'
import React, { useState } from 'react'
import styles from '@/styles/FormSection.module.css'
import Image from 'next/image'
import { z } from 'zod'
import { toast } from 'react-toastify'
import Spinner from './Spinner'

const formSchema = z.object({
    firstName: z.string({ required_error: 'First name is requested', invalid_type_error: 'First name must be a string' }).min(3, 'First name should be atleast 3 charaters long'),
    lastName: z.string({ required_error: 'Last name is requested', invalid_type_error: 'Last name must be a string' }).min(3, 'Last name should be atleast 3 charaters long'),
    email: z.string({ required_error: 'Email is requested', invalid_type_error: 'Email must be a string' }).email('Must be valid email'),
    username: z.string({ required_error: 'Username is requested', invalid_type_error: 'Username must be a string' }).min(4, 'Username should be atleast 4 charaters long'),
    password: z.string({ required_error: 'Password is requested', invalid_type_error: 'Password must be a string' }).min(4, 'Password should be atleast 4 charaters long'),
    confirmPassword: z.string({ required_error: 'Confirm Password is requested', invalid_type_error: 'Confirm Password must be a string' }).min(4, 'Confirm Password should be atleast 4 charaters long')
}).superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
        ctx.addIssue({
            code: 'custom',
            message: 'Password and Confirm Password does not match'
        })
    }
})


const FormSection = () => {


    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const handleFormSubmit = async () => {
        try {
            formSchema.parse({ firstName, lastName, email, username, password, confirmPassword })
        } catch (error) {
            if (error instanceof z.ZodError) {
                error.issues.map((err) => {
                    toast.error(err.message)
                })
            }
            else {
                toast.error(error.message)
            }
        }

        try {

            setLoading(true)

            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/2023.5.8' },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    username,
                    password,
                    confirmPassword,
                    email
                })
            };

            const formRes = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/form/create`, options)
            const formJson = await formRes.json()

            setLoading(false)

            if (formJson.error) {
                formJson.error.map((err) => {
                    toast.error(err.message)
                })
                return
            }

            toast.success('Your form has been submitted')

        } catch (error) {
            setLoading(false)
            toast.error(error.message)
        }

    }

    return (
        <div className={styles.container}>
            <div className={styles.posterContainer}>
                <Image src={'/airplane.jpg'} width={0} height={0} sizes="100vw" style={{ width: '100%', maxWidth: '600px', height: '100%', objectFit: 'cover', }} alt='Airplane' />
                <div className={styles.formHeroContainer}>
                    <h2>Altitude Air</h2>
                    <div className={styles.divider}></div>
                    <p>We promise to ensure that your well-being is taken care of while travelling with us. Boasting top in class fleet inventory and a 5 star approval for our in-flight experience, you know you're getting the best from Altitude with no attitude.</p>
                </div>
            </div>
            <div className={styles.formContainer}>
                <h2>Explore & Experience</h2>
                <p>Get onto your most comfortable journey yet. All the way up.</p>
                <div className={styles.innerFormContainer}>
                    <div className={styles.inpContainer}>
                        <input className='inp' type="text" placeholder='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        <input className='inp' type="text" placeholder='Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </div>
                    <div className={styles.inpContainer}>
                        <input className='inp' type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className={styles.inpContainer}>
                        <input className='inp' type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className={styles.inpContainer}>
                        <input className='inp' type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className={styles.inpContainer}>
                        <input className='inp' type="password" placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                    <button className={`primaryBtn ${styles.getStartedBtn}`} disabled={loading} onClick={handleFormSubmit}>
                        {
                            loading ? <Spinner width={20} color='white' borderWidth='3' /> : 'GET STARTED'
                        }
                    </button>
                </div>
                <button className={styles.signInBtn}>Sign In</button>
            </div>
        </div>
    )
}

export default FormSection