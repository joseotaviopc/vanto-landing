import { Header } from "./components/Header"
import { Footer } from "./components/Footer"
import { ParcelaItem } from "./components/ParcelaItem"

function App() {
  const parcelas = Array.from({ length: 20 });
  return (
    <>
      <main className=" text-white w-screen flex flex-col">
        <Header />
        
        <div className="mt-36 p-6 h-[1000px] flex flex-col gap-2 z-0">
          {parcelas.map((_, index) => <div key={index} className={index === parcelas.length -1 ? 'pb-36' : ''}><ParcelaItem /></div>)}
        </div>

        <Footer />
      </main>
    </>
  )
}

export default App
