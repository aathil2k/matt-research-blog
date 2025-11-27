import { jwtDecode } from "jwt-decode";

export function getUserFromToken() {
  if (typeof window === "undefined") return null;

  const token = sessionStorage.getItem("token");
  if (!token) return null;

  try {
    return jwtDecode<any>(token);
  } catch (e) {
    return null;
  }
}

export function isAdmin() {
  const user = getUserFromToken();
  return user?.role === "ADMIN";
}
