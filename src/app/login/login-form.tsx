"use client"

import Link from "next/link"
import { Shield } from "lucide-react"

import { useActionState } from "react"

import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { login } from "~/app/actions/auth"

const initialState = {
  error: null as string | null,
}

export default function LoginForm() {
  const [error, formData] = useActionState(login, initialState)

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <Shield className="h-8 w-8 text-teal-600" />
            <span className="text-2xl font-bold text-gray-900">SecureBank</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h1>
          <p className="text-gray-600">Sign in to your account to continue</p>
        </div>

        {
          error && <p className="text-red-500">{error?.error}</p>
        }

        {/* Login Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <form action={formData} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input id="email" name="email" type="email" placeholder="Enter your email" required className="w-full" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                required
                className="w-full"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  id="remember"
                  name="remember"
                  type="checkbox"
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                />
                <Label htmlFor="remember" className="text-sm text-gray-600">
                  Remember me
                </Label>
              </div>
              <Link href="#" className="text-sm text-teal-600 hover:text-teal-500">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700">
              Sign in
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {"Don't have an account? "}
              <Link href="/signup" className="text-teal-600 hover:text-teal-500 font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">🔒 Your information is protected with bank-level security</p>
        </div>
      </div>
    </div>
  )
}