import { Header } from "./components/Header"
import { Footer } from "./components/Footer"
import { ParcelasList } from "./components/ParcelasList";
import { useState } from "react";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <>
      <main className=" text-white w-screen flex flex-col">
        <Header />
        
        <ParcelasList isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />

        <Footer isModalOpen={isModalOpen} />
      </main>
    </>
  )
}

export default App
