import loginImg from '../assets/images/login.jpg'
import loginImg2 from '../assets/images/login2.jpg'
import styles from "../assets/css/Login.module.css"
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { login } from '../services/authService';
import { useQueryClient } from 'react-query';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const schema = yup.object({
    email: yup.string().required('Please enter your email').email('Please enter a valid email'),
    password: yup.string().required('Please enter your password')
}).required();

function Login() {
    const queryClient = useQueryClient();
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({ resolver: yupResolver(schema) });
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const onSubmit = async (data) => {
        try {
            const {token, ...userData } = await login(data.email, data.password);
            window.localStorage.setItem("token", token);
            queryClient.setQueryData('user', userData);
            reset();
            navigate(from, { replace: true});
            toast.success(`Welcome, ${userData?.firstName}`);
        } catch(err) {
            if(err.response?.data?.message) {
                toast.error(err.response.data.message);
            } else {
                toast.error(err.message);
            }
            reset({password: ''});
        }
    }

    useEffect(() => {
        document.title = "Recipes: Login";
      }, []);

    return (
        <>
            <div className="hero animate__animated animate__fadeIn">
                <img src={loginImg} alt="Login" width="100%" height="100%" />
            </div>
            <div className="overflow-hidden padding-fix">
                <div className={styles.loginContainer + ' animate__animated animate__slideInUp animate__fast'}>
                    <img src={loginImg2} alt="Login" className={styles.loginImg} />
                    <div className={styles.formContainer}>
                        <h1 className="headline">Login</h1>
                        <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <div className="mb-3">
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
                        <div className="mb-3">
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
                            <button
                            className="btn my-primary-btn w-100"
                            type="submit"
                            disabled={isSubmitting}
                            >
                            {isSubmitting ? "Please wait..." : "Login"}
                            </button>
                        </form>
                        <p className="mb-0 mt-3">
                        Don't have an account? You can register <Link className="simple-link" to="/auth/register" state={{ from: from }}>here</Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login