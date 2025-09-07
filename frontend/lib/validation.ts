import {email, z} from "zod";

export const UserFormValidation = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email : z.email("Invalid email address"),
  phone : z.string()
})