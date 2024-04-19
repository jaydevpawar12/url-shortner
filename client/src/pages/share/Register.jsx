import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import classNames from "classnames"
import * as yup from "yup"
import { useMemo } from 'react'
import { useRegisterMutation } from '../../redux/api/authApi'
import { toast } from 'react-toastify'

const Register = ({ toggle }) => {
    const [Register, { isSuccess }] = useRegisterMutation()
    const formik = useFormik({
        initialValues: {

            name: "sama",
            email: "sama@gmail.com",
            password: "Skillhub@123",
            cpassword: "Skillhub@123"
        },
        validationSchema: yup.object({
            name: yup.string().required("Enter name"),
            email: yup.string().email("Please Enter Valid Email").required("Enter email"),
            password: yup.string().required("Enter Password"),
            cpassword: yup.string().required("Enter Cpassword").oneOf([yup.ref("password")])
        }),
        onSubmit: (values, { resetForm }) => {
            Register(values)
            resetForm()
        }
    })
    const getClasses = (fieldName) => {
        return classNames({
            "form-control": true,
            "is-valid": formik.touched[fieldName] && !formik.errors[fieldName],
            "is-invalid": formik.touched[fieldName] && formik.errors[fieldName]
        })
    }
    useEffect(() => {
        if (isSuccess) {
            toast.success("Register SUccess")
            toggle()
        }
    }, [])

    return <>
        <div class="container">
            <div class="row">
                <div class="col-sm-6 offset-sm-3">
                    <div class="card animate__animated animate__headShake">
                        <div class="card-header">Signup</div>
                        <form onSubmit={formik.handleSubmit}>
                            <div class="card-body">
                                <div>
                                    <label for="name" class="form-label">First name</label>
                                    <input
                                        type="text"
                                        {...formik.getFieldProps("name")}
                                        className={getClasses("name")}
                                        id="name"
                                        placeholder="Enter your name"
                                    />
                                    <div class="valid-feedback">Looks good!</div>
                                    <div class="invalid-feedback">Please choose a username.</div>
                                </div>
                                <div class="mt-2">
                                    <label for="email" class="form-label">First Email</label>
                                    <input
                                        type="text"
                                        {...formik.getFieldProps("email")}
                                        className={getClasses("email")}
                                        id="email"
                                        placeholder="Enter Your Email"
                                    />
                                    <div class="valid-feedback">Looks good!</div>
                                    <div class="invalid-feedback">Please choose a username.</div>
                                </div>
                                <div class="mt-2">
                                    <label for="password" class="form-label">Password</label>
                                    <input
                                        type="password"
                                        {...formik.getFieldProps("password")}
                                        className={getClasses("password")}
                                        id="password"
                                        placeholder="Enter Your Password"
                                    />
                                    <div class="valid-feedback">Looks good!</div>
                                    <div class="invalid-feedback">Please choose a password.</div>
                                </div>
                                <div class="mt-2">
                                    <label for="cpassword" class="form-label"
                                    >Confirm Password</label
                                    >
                                    <input
                                        type="password"
                                        {...formik.getFieldProps("cpassword")}
                                        className={getClasses("cpassword")}
                                        id="cpassword"
                                        placeholder="Confirm Your Password"
                                    />
                                    <div class="valid-feedback">Looks good!</div>
                                    <div class="invalid-feedback">
                                        Please Recheck Your Password.
                                    </div>
                                </div>
                                <button type="submit" class="btn btn-primary w-100 mt-3">
                                    Signup
                                </button>
                                <p class="text-center mt-3">
                                    Already Have Account? <button onClick={toggle} className='btn btn-link'>Login Account</button>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Register