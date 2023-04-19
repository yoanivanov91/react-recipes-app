import registerImg from '../assets/images/register.jpg'
import registerImg2 from '../assets/images/register2.jpg'
import styles from '../assets/css/Register.module.css'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { register as registerUser } from '../services/authService';
import { useQueryClient } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const schema = yup.object({
    email: yup.string().required('Please enter your email').email('Please enter a valid email'),
    password: yup.string().required('Please enter your password').min(6, 'Password must be at least 6 characters long'),
    confirmPassword: yup.string().required('Please confirm your password').oneOf([yup.ref('password'), null], "Passwords don't match"),
    firstName: yup.string().required('Please enter your first name'),
    lastName: yup.string().required('Please enter your last name')
}).required();

function Register() {
    const queryClient = useQueryClient();
    const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: yupResolver(schema) });
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const {token, ...userData} = await registerUser(data);
            window.localStorage.setItem("token", token);
            queryClient.setQueryData('user', userData);
            reset();
            navigate('/', { replace: true});
            toast.success(`Welcome, ${userData.firstName}`);
        } catch(err) {
            toast.error(err.response.data.message);
            reset({password: '', confirmPassword: ''});
        }
    }

    useEffect(() => {
        document.title = "Recipes: Register";
      }, []);

    return (
        <>
            <div className="hero animate__animated animate__fadeIn">
                <img
                    src={registerImg}
                    alt="Register"
                    width="100%"
                    height="100%"
                />
            </div>
            <div className="overflow-hidden padding-fix">
                <div className={styles.registerContainer + ' animate__animated animate__slideInUp animate__fast'}>
                    <img src={registerImg2} alt="Register" className={styles.registerImg} />
                    <div className={styles.formContainer}>
                        <h1 className="headline">Register</h1>
                        <form onSubmit={handleSubmit(onSubmit)} noValidate>
                            <div className="row mb-3">
                                <div className="col">
                                    <label htmlFor="email" className="form-label is-required">Email</label>
                                    <input
                                    type="text"
                                    className={errors.email ? "form-control is-invalid" : "form-control"}
                                    id="email"
                                    {...register("email")}
                                    />
                                    {errors.email &&
                                        <div className="invalid-feedback">{errors.email.message}</div>
                                    }
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col">
                                    <label htmlFor="password" className="form-label is-required">Password</label>
                                    <input
                                    type="password"
                                    className={errors.password ? "form-control is-invalid" : "form-control"}
                                    id="password"
                                    {...register("password")}
                                    />
                                    {errors.password &&
                                        <div className="invalid-feedback">{errors.password.message}</div>
                                    }
                                </div>
                                <div className="col">
                                    <label htmlFor="confirmPassword" className="form-label is-required">Confirm password</label>
                                    <input
                                    type="password"
                                    className={errors.confirmPassword ? "form-control is-invalid" : "form-control"}
                                    id="confirmPassword"
                                    {...register("confirmPassword")}
                                    />
                                    {errors.confirmPassword &&
                                        <div className="invalid-feedback">{errors.confirmPassword.message}</div>
                                    }
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col">
                                    <label htmlFor="firstName" className="form-label is-required">First name</label>
                                    <input
                                        type="text"
                                        className={errors.firstName ? "form-control is-invalid" : "form-control"}
                                        id="firstName"
                                        {...register("firstName")}
                                    />
                                    {errors.firstName &&
                                        <div className="invalid-feedback">{errors.firstName.message}</div>
                                    }
                                </div>
                                <div className="col">
                                    <label htmlFor="lastName" className="form-label is-required">Last name</label>
                                    <input
                                        type="text"
                                        className={errors.lastName ? "form-control is-invalid" : "form-control"}
                                        id="lastName"
                                        {...register("lastName")}
                                    />
                                    {errors.lastName &&
                                        <div className="invalid-feedback">{errors.lastName.message}</div>
                                    }
                                </div>
                            </div>
                            <button
                                className="btn my-primary-btn w-100"
                                type="submit"
                            >
                                Register
                            </button>
                        </form>
                        <p className="mb-0 mt-3">
                        Already have an account? You can login <Link className="simple-link" to="/auth/login">here</Link>
                        </p>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Register