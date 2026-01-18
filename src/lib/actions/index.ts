import { BaseError } from "@/lib/errors";

export type ServerActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string; code?: string };

export type ServerActionResultVoid =
  | { success: true }
  | { success: false; error: string; code?: string };

export async function executeServerAction<T>(
  serverAction: () => Promise<T>
): Promise<ServerActionResult<T>> {
  try {
    const data = await serverAction();
    return { success: true, data };
  } catch (error) {
    console.error("Server action error:", error);
    if (error instanceof BaseError) {
      return { success: false, error: error.message, code: error.code };
    }
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    return { success: false, error: errorMessage };
  }
}

export async function executeServerActionVoid(
  serverAction: () => Promise<void>
): Promise<ServerActionResultVoid> {
  try {
    await serverAction();
    return { success: true };
  } catch (error) {
    console.error("Server action error:", error);
    if (error instanceof BaseError) {
      return { success: false, error: error.message, code: error.code };
    }
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    return { success: false, error: errorMessage };
  }
}