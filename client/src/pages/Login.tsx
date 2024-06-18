import React from 'react'
import "./pageStyles/background.css";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { handleError } from '@/utils/handleError';
import { useLoginMutation } from '@/redux/slices/api';
import { useDispatch } from 'react-redux';
import { updateCurrentUser, updateIsLoggedIn } from '@/redux/slices/AppSlice';

const formSchema = z.object({
    username: z.string(),
    password: z.string(),
});

const Login = () => {

    const [login, { isLoading }] = useLoginMutation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    async function handleLogin(value: z.infer<typeof formSchema>) {
        try {
            const response = await login(value).unwrap();
            dispatch(updateCurrentUser(response))
            dispatch(updateIsLoggedIn(true))
            navigate("/profile")
        } catch (error) {
            handleError(error);
        }
    }

    return (
        <div className="__login grid-bg w-full h-[calc(100dvh-60px)] flex justify-center items-center flex-col gap-3">
            <div className="__form_container bg-black border-[1px] py-8 px-4 flex flex-col gap-5 w-[300px] rounded-lg">
                <div className="">
                    <h1 className="font-mono text-4xl font-bold text-left">Вход</h1>
                </div>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleLogin)}
                        className="flex flex-col gap-2"
                    >
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            required
                                            placeholder="Username или Email"
                                            {...field}
                                            disabled={isLoading}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            required
                                            type="password"
                                            placeholder="Пароль"
                                            {...field}
                                            disabled={isLoading}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className="w-full" type="submit" disabled={isLoading}>
                            Войти
                        </Button>
                    </form>
                </Form>
                <small className="text-xs font-mono">
                    Нет аккаунта?{" "}
                    <Link className=" text-blue-500" to="/signup">
                        Регистрация
                    </Link>
                    .
                </small>
            </div>
        </div>
    )
}

export default Login