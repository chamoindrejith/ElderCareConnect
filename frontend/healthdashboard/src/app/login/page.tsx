"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSetCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Link from "next/link";
import axiosInstance from "@/lib/axiosInstance"; // Import the centralized Axios instance

const provider = new GoogleAuthProvider();

provider.addScope("https://www.googleapis.com/auth/fitness.heart_rate.read");
provider.addScope("https://www.googleapis.com/auth/fitness.blood_glucose.read");

export default function Login() {
  const setCookie = useSetCookie();
  const router = useRouter();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        setCookie("token", token);
        setCookie("user", user);
        setCookie("role", "elder");
        localStorage.setItem("userRole", "elder");
        console.log(token) // Store role in local storage
        router.push("/");
        toast("Login successful");
      })
      .catch((error) => {
        console.error("Form submission error", error);
        toast.error("Failed to submit the form. Please try again.");
      });
  };

  const handleCaregiverLogin = async () => {
    const username = (document.getElementById("username") as HTMLInputElement)?.value;
    const password = (document.getElementById("password") as HTMLInputElement)?.value;

    try {
      const response = await axiosInstance.post("/caregivers/login", { username, password }); // Use axiosInstance
      const { token, user } = response.data;
      setCookie("token", token);
      setCookie("user", user);
      setCookie("role", "caregiver");
      localStorage.setItem("userRole", "caregiver"); // Store role in local storage
      router.push("/");
      toast("Login successful");

    } catch (error) {
      console.error("Caregiver login error", error);
      toast.error("Invalid username or password. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Tabs defaultValue="elder" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="elder">Elder</TabsTrigger>
          <TabsTrigger value="caregiver">Caregiver</TabsTrigger>
        </TabsList>
        <TabsContent value="elder">
          <Card className="mx-auto max-w-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Elder Login</CardTitle>
              <CardDescription>
                Use your google account to proceed.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                type="button"
                className="w-full"
                onClick={handleGoogleSignIn}
              >
                Signin with Google
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="caregiver">
          <Card>
            <CardHeader>
              <CardTitle>Caregiver Login</CardTitle>
              <CardDescription>
                Enter your account details here. Click login when you&apos;re done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <Input id="username" placeholder="username" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="password" />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col justify-start">
              <Button onClick={handleCaregiverLogin}>Login</Button>
              <div>
                <h3 className="text-center text-sm text-gray-500">
                  Don&apos;t have an account? <Link href="/register">Signup</Link>
                </h3>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
