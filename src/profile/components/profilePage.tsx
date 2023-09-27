"use client";

import React, { useEffect } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/src/auth/context/use-auth";
import { ProfileService } from "../service/profile.service";
import Image from "next/image";
import { UploadFileService } from "@/src/common/service/upload-file.service";

const formSchema = z.object({
  username: z.string().min(2).max(50).optional(),
  email: z.string().email().optional(),
  password: z.string().optional(),
});
const profileService = new ProfileService();
const uploadFileService = new UploadFileService();
const ProfilePage = () => {
  const { user, setUser } = useAuth();
  const [file, setFile] = React.useState<File | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    form.setValue("username", user?.username);
    form.setValue("email", user?.email);
  }, [user]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const payload: { [key: string]: string } = {};
    if (values.email !== user?.email && values.email) {
      payload.email = values.email;
    }
    if (values.password) {
      payload.password = values.password;
    }
    if (values.username !== user?.username && values.username) {
      payload.username = values.username;
    }
    if (file) {
      if (user?.avatar) {
        await uploadFileService.deleteImage(user?.avatar);
      }
      const res = await uploadFileService.uploadImage(file);
      if (res?.link) {
        payload.avatar = res.link;
      }
    }
    const { data } = await profileService.updateProfile(payload);
    if (data) setUser(data);
  }

  const isSubmitting = form.formState.isSubmitting;

  return (
    <div className="px-4 md:px-0 py-4">
      <h1 className="font-semibold text-4xl mb-6">Update Profile</h1>
      <div className="w-16 h-16 rounded-full bg-gray-300 my-4 relative overflow-hidden">
        <label htmlFor="image-upload-avatar" className="cursor-pointer">
          {user?.avatar ? (
            <Image fill alt="user-avatar" src={user?.avatar} />
          ) : (
            <div className="text-4xl text-white text-center w-full h-full flex items-center justify-center">
              {user?.username[0]}
            </div>
          )}
        </label>
      </div>
      <input
        id="image-upload-avatar"
        hidden
        type="file"
        accept="image/png, image/gif, image/jpeg, image/jpg"
        onChange={(e) => {
          if (e.target.files) {
            setFile(e.target.files[0]);
          }
        }}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Enter email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter username" {...field} />
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
                    placeholder="Enter password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button isLoading={isSubmitting} type="submit">
            Update
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ProfilePage;
