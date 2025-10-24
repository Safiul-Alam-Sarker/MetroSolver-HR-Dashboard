import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useState } from "react";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { registerUser } from "../components/slice/authSlice"; // ✅ Use registerUser action

interface SignupProps extends React.HTMLAttributes<HTMLDivElement> {
  setSignInModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SignupForm: React.FC<SignupProps> = ({
  setSignInModal,
  ...divProps
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return;
    }

    setLoading(true);
    try {
      // ✅ Use Redux action instead of direct API call
      const result = await dispatch(registerUser(formData) as any).unwrap();

      if (result.success) {
        // ✅ Redux automatically stores token and user data
        toast.success("Account created successfully!");
        navigate("/", { replace: true });
      }
    } catch (error: any) {
      console.log("Signup error:", error);
      toast.error(error.message || "Something went wrong during registration!");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <Card {...divProps}>
      <CardHeader className="text-center">
        <CardTitle className="text-xl lg:text-3xl">Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignup}>
          <FieldGroup>
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="firstName">First Name</FieldLabel>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="John"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  disabled={loading}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Doe"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  disabled={loading}
                />
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="john.doe@example.com"
                required
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="phoneNo">Phone Number</FieldLabel>
              <Input
                id="phoneNo"
                type="tel"
                placeholder="+1234567890"
                required
                value={formData.phoneNo}
                onChange={handleChange}
                disabled={loading}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                required
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
              />
              <FieldDescription>
                Must be at least 6 characters long.
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="confirmPassword">
                Confirm Password
              </FieldLabel>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={loading}
              />
              <FieldDescription>Please confirm your password.</FieldDescription>
            </Field>

            <Field>
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Creating Account..." : "Create Account"}
              </Button>
              <FieldDescription className="text-center mt-4">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setSignInModal(true)}
                  className="font-bold text-blue-600 hover:underline focus:outline-none"
                  disabled={loading}
                >
                  Sign in
                </button>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
};
