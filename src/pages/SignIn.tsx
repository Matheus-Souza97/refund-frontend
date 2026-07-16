import { useActionState } from "react"
import { useNavigate } from "react-router"

import { z, ZodError } from "zod"
import { AxiosError } from "axios"

import { api } from "../services/api"
import { useAuth } from "../hooks/useAuth"

import { Input } from "../components/Input"
import { Button } from "../components/Button"


const signInSchema = z.object({
  email: z.string().email("E-mail ou senha inválido"),
  password: z.string().min(6, "E-mail ou senha inválido")
})


export function SignIn() {
  const [state, formAction, isLoading] = useActionState(signIn, null)

  const auth = useAuth()


  async function signIn(preState: any, formData: FormData) {
    try {
      const data = signInSchema.parse({
      email: formData.get("email"),
      password: formData.get("password")

    })
      const response = await api.post("/sessions", data)
      auth.save(response.data)

    } catch (error) {
      console.log(error)

      if(error instanceof ZodError) {
        return {message: error.issues[0].message}
      }

      if(error instanceof AxiosError) {
        return {message: error.response?.data.message}
      }

      return {message:"Não foi possivel fazer o login"}
      
    }
  }
  return <form action={formAction} className="w-full flex flex-col gap-4">
    <Input name="email" required legend="E-mail" type="email" placeholder="seu@email" />

    <Input name="password" required legend="Senha" type="password" placeholder="********"/>

    <p className="text-sm text-red-600 text-center my-4 font-medium">
      {state?.message}
    </p>

    <Button type="submit" isLoadind={isLoading}>Entrar</Button>

    <a href="/signup" className="text-sm font-semibold text-gray-100 mt-10 mb-4 text-center hover:text-green-800 transiton ease-linear">Criar conta</a>

  </form>
}