import React from 'react'
import "./pageStyles/background.css";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { handleError } from '@/utils/handleError';
import { useDispatch } from 'react-redux';
import { useSignupMutation } from '@/redux/slices/api';
import { updateCurrentUser, updateIsLoggedIn } from '@/redux/slices/AppSlice';

const formSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string(),
});


const Signup = () => {

    const [signup, { isLoading }] = useSignupMutation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
    });

    async function handleSignup(value: z.infer<typeof formSchema>) {
        try {
            const response = await signup(value).unwrap()
            dispatch(updateCurrentUser(response))
            dispatch(updateIsLoggedIn(true))
            navigate("/profile")
        } catch (error) {
            handleError(error);
        }
    }

    return (
        <div className="__signup grid-bg w-full h-[calc(100dvh-60px)] flex justify-center items-center flex-col gap-3">
            <div className="__form_container bg-black border-[1px] py-8 px-4 flex flex-col gap-5 w-[300px] rounded-lg">
                <div className="">
                    <h1 className="font-mono text-4xl font-bold text-left">Регистрация</h1>
                </div>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSignup)}
                        className="flex flex-col gap-2"
                    >
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            disabled={isLoading}
                                            placeholder="Username"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            disabled={isLoading}
                                            type="email"
                                            placeholder="Email"
                                            {...field}
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
                                            disabled={isLoading}
                                            type="password"
                                            placeholder="Пароль"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className="w-full" type="submit" disabled={isLoading}>
                            Регистрация
                        </Button>
                    </form>
                </Form>
                <small className="text-xs font-mono">
                    Есть аккаунт?{" "}
                    <Link className=" text-blue-500" to="/login">
                        Войти
                    </Link>
                    .
                </small>
            </div>
        </div>
    )
}

export default Signup