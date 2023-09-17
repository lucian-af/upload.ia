import { toast, TypeOptions } from "react-toastify"

export function alertMessage(message: string, type: TypeOptions = 'error') {
  return toast(message, { type })
}