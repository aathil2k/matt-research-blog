"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Input, Button, Heading, useToast } from "@chakra-ui/react";

export default function SignupPage() {
  const toast = useToast();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const registerUser = async () => {
     
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok) return toast({ title: data.error, status: "error" });

    toast({ title: "Registered successfully!", status: "success" });
    router.push("/signin");
  };

  return (
    <Box maxW="400px" mx="auto" mt={10}>
      <Heading mb={4}>Signup</Heading>
      <Input placeholder="Name" mb={3} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <Input placeholder="Email" type="email" mb={3} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <Input placeholder="Password" type="password" mb={3} onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <Button w="full" onClick={registerUser}>Register</Button>
    </Box>
  );
}
