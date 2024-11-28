import { Header } from "./components/Header"
import { Footer } from "./components/Footer"
import { ParcelasList } from "./components/ParcelasList";

function App() {
  
  return (
    <>
      <main className=" text-white w-screen flex flex-col">
        <Header />
        
        <ParcelasList />

        <Footer />
      </main>
    </>
  )
}

export default App
