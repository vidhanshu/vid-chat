"use client";

import * as z from "zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect, useRouter } from "next/navigation";

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
import { AuthService } from "../services/authService";
import { useAuth } from "../context/use-auth";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  email: z.string().email().nonempty(),
  password: z.string().min(6).max(30),
});

const authService = new AuthService();
const SignIn = () => {
  const router = useRouter();
  const { setUser, user } = useAuth();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { error } = await authService.Signin(values.email, values.password);
    if (error) {
      return toast({
        title: "Error",
        description: error,
        variant: "destructive",
      });
    }
    toast({
      title: "Successfully signed-in",
    });
    setUser((await authService.GetMe()).data);
  }

  if (user) return redirect("/");

  return (
    <div className="shadow-sm border-[1px] w-full max-w-[500px] p-4 rounded-md">
      <h1 className="text-center text-4xl font-bold mb-6">Sign In</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Email..." {...field} />
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
          <Button type="submit">Sign in</Button>
          <p>
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="text-blue-600">
              Register
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
};

export default SignIn;
