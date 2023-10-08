"use client";

import * as z from "zod";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import useAuth from "@/src/auth/context/use-auth";

import authService from "@/src/auth/services/auth.service";

import { FRONTEND_ROUTES } from "@/src/common/utils/routes";

const formSchema = z
  .object({
    username: z.string().nonempty(),
    email: z.string().email().nonempty(),
    password: z.string().min(6).max(30).nonempty(),
    confirm_password: z.string().min(6).max(30).nonempty(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
  });

  const SignUp = () => {
  const { user, setUser } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { data } = await authService.Signup(
      values.username,
      values.email,
      values.password
    );
    if (data) {
      setUser((await authService.GetMe()).data);
    }
  }

  if (user) return redirect(FRONTEND_ROUTES.chat);

  const isSubmitting = form.formState.isSubmitting;

  return (
    <div className="py-4 shadow-sm border-[1px] w-full max-w-[500px] p-4 rounded-md">
      <h1 className="text-center text-4xl font-bold mb-6">Sign Up</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Username..." {...field} />
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
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Enter Email..." {...field} />
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter Password..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirm_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Renter Password..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant="primary" isLoading={isSubmitting} type="submit">
            Sign up
          </Button>
          <p>
            Already have an account?{" "}
            <Link href={FRONTEND_ROUTES.signIn} className="text-blue-600">
              Login
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
};

export default SignUp;
