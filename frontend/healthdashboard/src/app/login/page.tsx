"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSetCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebase";

const provider = new GoogleAuthProvider();

provider.addScope("https://www.googleapis.com/auth/fitness.heart_rate.read");
provider.addScope("https://www.googleapis.com/auth/fitness.blood_glucose.read");

export default function LoginPreview() {
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
        router.push("/");
        toast("Login successful");
      })
      .catch((error) => {
        console.error("Form submission error", error);
        toast.error("Failed to submit the form. Please try again.");
      });
  };

  return (
    <div className="flex flex-col min-h-screen h-full w-full items-center justify-center px-4">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Use your google account to proceed.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button type="button" className="w-full" onClick={handleGoogleSignIn}>
            Signin with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
