import axios from "axios";

const baseURL =
  process.env.NEXT_PUBLIC_DOMAIN_API ?? "http://localhost:4000/api";

export const apiClient = axios.create({
  baseURL,
  timeout: 8000,
  headers: { "Content-Type": "application/json" },
});

export function getApiErrorMessage(err: unknown): string {
  if (axios.isAxiosError(err)) {
    const data = err.response?.data;
    if (typeof data === "string" && data.length > 0) return data;
    if (Array.isArray((data as { message?: string[] })?.message))
      return (data as { message: string[] }).message.join(", ");
    if (typeof (data as { message?: string })?.message === "string")
      return (data as { message: string }).message;
    if (
      err.code === "ECONNREFUSED" ||
      err.code === "ERR_NETWORK" ||
      err.message.includes("Network")
    )
      return "Cannot reach the API. Is the backend running on :4000?";
    if (
      err.code === "ECONNABORTED" ||
      err.message.toLowerCase().includes("timeout")
    )
      return "The API took too long to respond. Is the backend running on :4000?";
    return err.message;
  }
  return err instanceof Error ? err.message : "Something went wrong.";
}
