import { Header } from "./components/Header"
// import { Footer } from "./components/Footer"
import { ParcelasList } from "./components/ParcelasList";
import { useEffect, useState } from "react";
import { Worker } from '@react-pdf-viewer/core';
import { ModalPdf } from "./components/ModalPdf";
import { Titulo } from "./services/types";
import { DatabaseService } from "./services/database.service";
import { AxiosError } from "axios";
import { useAuth } from "./context/useAuth";

function App() {
  const [showPdf, setShowPdf] = useState(false);
  const [titulos, setTitulos] = useState<Titulo[]>([])
  const [loading, setLoading] = useState(false)
  const { logout, user } = useAuth()
  
  
  async function getTitutlos({page = 1, limit = 20}: {page?: number, limit?: number}) {
    // userId 15270
    try {
        setLoading(true)
        console.log('getTitulos',user?.id, page, limit)
        if (user?.id){
          const titulosFromDb = await DatabaseService.getTitulos(user.id, page, limit)
          setTitulos(titulosFromDb.data)
        }
        
        // console.log(JSON.stringify(titulosFromDb.data, null, 4))
      } catch (error) {
        const err = error as AxiosError
        if (err.status === 403) {
          logout()
        }
        console.warn(error)
      } finally {
        setLoading(false)
      }
  }

  function handleClosePdf () { setShowPdf(false)}
  function handleShowPdf () { setShowPdf(true)}
  
  useEffect(() => {
    getTitutlos({page: 1, limit: 100})
}, [])

  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
      <main className=" text-white w-screen flex flex-col">
        {showPdf ? <ModalPdf handleClosePdf={handleClosePdf} />
        : (
          <>
            <Header />
            
            <ParcelasList loading={loading} handleShowPdf={handleShowPdf} titulos={titulos}/>

            {/* <Footer isModalOpen={isModalOpen} /> */}
          </>
        )}
      </main>
    </Worker>
  )
}

export default App
