import { useState } from "react"
import { useNavigate } from "react-router"

import { z, ZodError } from "zod"
import { AxiosError } from "axios"

import { api } from "../services/api"

import { Input } from "../components/Input"
import { Button } from "../components/Button"

const signUpSchema = z.object({
  name: z.string().trim().min(1, "Informe o nome"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter no minimo 6 digitos"),
  passwordConfirm: z.string("Confirme a senha")
}).refine((data) => data.password === data.passwordConfirm, {
  message: "As senhas não são iguais",
  path: ["passwordConfirm"]
})

export function SignUp() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  async function onSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      setIsLoading(true)
      const data = signUpSchema.parse({
        name, email, password, passwordConfirm
      })

      await api.post("/users", data)

      if(confirm("Cadastrado com sucesso. Ir para a tela de login?")) {
        navigate("/")
      }
      
    } catch (error) {
      console.log(error)
      if(error instanceof ZodError) {
        return alert(error.issues[0].message)
      } 
      if(error instanceof AxiosError) {
        return alert(error.response?.data.message)

      }
    } finally{
      setIsLoading(false)
    }
  }
  return <form onSubmit={onSubmit} className="w-full flex flex-col gap-4">

    <Input required legend="Nome" type="text" placeholder="Nome completo" onChange={(e) => setName(e.target.value)}/>

    <Input required legend="E-mail" type="email" placeholder="seu@email" onChange={(e) => setEmail(e.target.value)}/>

    <Input required legend="Senha" type="password" placeholder="********" onChange={(e) => setPassword(e.target.value)}/>

    <Input required legend="Confirmar senha" type="password" placeholder="********" onChange={(e) => setPasswordConfirm(e.target.value)}/>

    <Button type="submit" isLoadind={isLoading}>Cadastrar</Button>

    <a href="/" className="text-sm font-semibold text-gray-100 mt-10 mb-4 text-center hover:text-green-800 transiton ease-linear">Já tenho uma conta</a>

  </form>
}

