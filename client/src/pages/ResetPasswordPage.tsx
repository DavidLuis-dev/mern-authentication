import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { Error } from "../components";
import { attemptResetPassword } from "../store/thunks/auth";
import { useAppDispatch } from "src/store/hooks";
import { useServerError } from "src/hooks/useServerError";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

type ResetPasswordFormValues = {
  password: string;
};

export default function ResetPasswordPage() {
  const dispatch = useAppDispatch();
  const { token } = useParams<{ token: string }>();
  const { serverError, handleServerError } = useServerError();

  const initialValues: ResetPasswordFormValues = {
    password: "",
  };

  const validationSchema = Yup.object({
    password: Yup.string().min(5).max(255).required("Required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (values: ResetPasswordFormValues) => {
    const password = values.password;
    dispatch(attemptResetPassword(password, token)).catch(handleServerError);
  };

  return (
    <div className='container'>
      <form className='form' onSubmit={handleSubmit(onSubmit)}>
        <div className='field'>
          <label htmlFor='password'>Password</label>
          <input {...register("password")} id='password' type='password' placeholder='Password' />
          {errors.password && <Error>{errors.password.message}</Error>}
        </div>

        <button type='submit'>Reset password</button>
        {serverError && <Error>{serverError}</Error>}
      </form>
    </div>
  );
}
