"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Input, Button, Heading, useToast } from "@chakra-ui/react";
import { getUserFromToken } from "../../utils/auth";

export default function SigninPage() {
  const toast = useToast();
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });

  const loginUser = async () => {
    const res = await fetch("/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(form),
});

    const data = await res.json();
     
    if (!res.ok) return toast({ title: data.error, status: "error" });

    sessionStorage.setItem("token", data.token);

    const user = getUserFromToken();
    console.log(user);
    
    if (user?.role === "ADMIN") router.push("/admin");
    else router.push("/");
  };

  return (  
    <Box maxW="400px" mx="auto" mt={10}>
      <Heading mb={4}>Login</Heading>
      <Input placeholder="Email" mb={3} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <Input placeholder="Password" type="password" mb={3} onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <Button w="full" onClick={loginUser}>Login</Button>
    </Box>
  );
}
