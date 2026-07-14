export function NotFound() {
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <h1 className="text-9xl m-5">404</h1>
      <h2 className="text-2xl mb-5">Essa página não existe.</h2>
      <a href="/" className=" font-semibold text-xs text-blue-500 hover:scale-105 hover:underline transition ease-linear ">Voltar para o inicio</a>
    </div>
  )
}