"use server";

import { redirect } from "next/navigation";
import {
  executeServerAction,
  executeServerActionVoid,
  type ServerActionResult,
  type ServerActionResultVoid,
} from "@/lib/actions";
import * as authService from "../services/auth.service";

export async function signIn(formData: {
  email: string;
  password: string;
}): Promise<ServerActionResultVoid> {
  return executeServerActionVoid(async () => {
    await authService.signIn(formData);
  });
}

export async function signUp(formData: {
  email: string;
  password: string;
}): Promise<ServerActionResultVoid> {
  return executeServerActionVoid(async () => {
    await authService.signUp(formData);
  });
}

export async function signInWithGoogle(): Promise<ServerActionResult<string>> {
  return executeServerAction(async () => {
    return authService.signInWithOAuth("google");
  });
}

export async function signOut(): Promise<void> {
  await authService.signOut();
  redirect("/auth/login");
}

export async function getUser() {
  return authService.getCurrentUser();
}