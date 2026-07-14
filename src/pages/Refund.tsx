import { useState } from "react"
import { useNavigate, useParams } from "react-router"

import fileSvg from "../assets/file.svg"
import { CATEGORIES, CATEGORIES_KEYS } from "../utils/categories"

import { Input } from "../components/Input"
import { Select } from "../components/Select"
import { Upload } from "../components/Upload"
import { Button } from "../components/Button"

export function Refund() {
  const [name, setName] = useState("")
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [fileName, setFileName] = useState<File | null>(null)

  const navigate = useNavigate()
  const params = useParams<{id: string }>()
  

  function OnSubmit(e:React.SubmitEvent) {
    e.preventDefault()

    if(params.id) {
      return navigate(-1)
    }


    console.log(name, amount, category, fileName)
    navigate("/confirm", {state: {fromSubmit: true}})
  }
  return (
    <div className="w-full h-full "> 
      <form onSubmit={OnSubmit} className="bg-gray-500 max-w-3xl rounded-xl flex flex-col p-10 gap-6 lg:min-w-2xl m-auto">
        <header>
          <h1 className="text-xl font-bold text-gray-100">Solicitacão de reembolso</h1>
          <p className="text-sm text-gray-200 mt-2 mb-4">Dados da despsesa para solicitar reembolso.</p>
        </header>

        <Input required legend="Nome da solicitacão" value={name} onChange={(e) => setName(e.target.value)} disabled={!!params.id}/>


        <div className="flex gap-4">

          <Select required legend="Categoria" value={category} onChange={(e) => setCategory(e.target.value)} disabled={!!params.id}>
            {CATEGORIES_KEYS.map((category) => (
              <option key={category} value={category}>{CATEGORIES[category].name}</option>
            ))}
          </Select>

          <Input required legend="Valor" value={amount} onChange={(e) => setAmount(e.target.value)} disabled={!!params.id}/>

        </div>

        {
          params.id ? (
            <a  href="https://www.linkedin.com/feed/" target="_blank" className="text-sm text-green-100 font-semibold flex items-center justify-center gap-2 my-6 hover:opacity-70 transition ease-linear">
              <img src={fileSvg} alt="icone para abrir arquivo" />
              Abrir comprovante</a>
          ) : (
            <Upload filename={fileName && fileName.name} onChange={(e) => e.target.files && setFileName(e.target.files[0])}/>
          )
        }

        

        <Button type="submit" isLoadind={isLoading}>{params.id ? "Voltar" : "Enviar"}</Button>

      </form>
    </div>
  )
}