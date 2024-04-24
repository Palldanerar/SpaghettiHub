import React from 'react'
import "./pageStyles/background.css";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { handleError } from '@/utils/handleError';

const formSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string(),
});


const Signup = () => {

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
            console.log(value)
        } catch (error) {
            handleError(error);
        }
    }

    return (
        <div className="__signup grid-bg w-full h-[calc(100dvh-60px)] flex justify-center items-center flex-col gap-3">
            <div className="__form_container bg-black border-[1px] py-8 px-4 flex flex-col gap-5 w-[300px] rounded-lg">
                <div className="">
                    <h1 className="font-mono text-4xl font-bold text-left">Signup</h1>
                    <p className=" font-mono text-xs">
                        Join the community of expert frontend developers.
                    </p>
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
                                            type="password"
                                            placeholder="Password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className="w-full" type="submit">
                            Signup
                        </Button>
                    </form>
                </Form>
                <small className="text-xs font-mono">
                    Already have an account?{" "}
                    <Link className=" text-blue-500" to="/login">
                        Login
                    </Link>
                    .
                </small>
            </div>
        </div>
    )
}

export default Signup