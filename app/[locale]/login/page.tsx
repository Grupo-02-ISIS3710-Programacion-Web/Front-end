"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import GoogleIcon from "@/components/Google";

type LoginForm = {
  email: string;
  password: string;
};

export default function Login() {
  return (
    <div
      className="flex min-h-screen items-center justify-center px-4"
      style={{
        backgroundImage: `url(/background-reg.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Card className="w-full max-w-md rounded-3xl bg-white/95 backdrop-blur-sm shadow-xl p-8">
        <CardContent>
          <LoginFormComponent />
        </CardContent>
      </Card>
    </div>
  );
}

function LoginFormComponent() {
  const { register, handleSubmit, formState: { errors } } =
    useForm<LoginForm>();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

      {/* Logo */}
      <div className="flex justify-center">
        <div className="w-16 h-16 rounded-full border border-green-200 flex items-center justify-center">
          Skin4All
        </div>
      </div>

      {/* Title */}
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-semibold text-gray-900">
          Bienvenido 
        </h1>
        <p className="text-sm text-gray-500">
          Inicia sesión en tu ritual diario de cuidado de la piel
        </p>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-gray-500 uppercase">
          Username o Email
        </label>

        <div className="relative">
          <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
          <Input
            type="email"
            placeholder="glowing.skin@example.com"
            className="pl-10"
            {...register("email", { required: "Email is required" })}
          />
        </div>

        {errors.email && (
          <p className="text-xs text-red-500">{errors.email.message}</p>
        )}
      </div>

      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-xs font-medium text-gray-500 uppercase">
            Contraseña
          </label>

          <Link
            href="/forgot-password"
            className="text-xs text-pink-500 hover:underline"
          >
            Olvide mi contraseña?
          </Link>
        </div>

            <div className="relative">

                
                <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
                />

                
                <Input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="pl-10 pr-10 h-12 rounded-xl"
                {...register("password", {
                    required: "Password is required",
                })}
                />

                
                <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>

            </div>

        {errors.password && (
          <p className="text-xs text-red-500">{errors.password.message}</p>
        )}
      </div>

      
      <Button
        type="submit"
        className="w-full  text-white rounded-xl py-6"
      >
        Ingresar
      </Button>

      
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-xs text-gray-400">o continua con</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full rounded-xl py-6"
      >
        <img src="/google.svg" alt="Google" />
      </Button>

      {/* Sign up */}
      <p className="text-sm text-center text-gray-500">
        Nuevo en Skin4All?{" "}
        <Link href="/register" className="text-pink-500 font-medium hover:underline">
          Registrate
        </Link>
      </p>
    </form>
  );
}

