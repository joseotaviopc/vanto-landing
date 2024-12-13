import { Navigate, Route, Routes as RouterRoutes } from "react-router";
import { Parcelas } from "../pages/Parcelas";
import { Usuario } from "../pages/Usuario";
// TODO: Create and import the Login component
import { Login } from "../pages/Login";
import { Suspense } from "react";
import { useAuth } from "../context/useAuth";
import { Automoveis } from "../pages/Automoveis";

export function Routes() {
    const { isLogged} = useAuth();
    
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <RouterRoutes>
                {isLogged ? (
                    <>
                        <Route path="/" element={<Navigate to="/parcelas" />} />
                        <Route path="/parcelas" element={<Parcelas />} />
                        <Route path="/usuario" element={<Usuario />} />
                        <Route path="/automoveis" element={<Automoveis />} />
                        <Route path="*" element={<Navigate to="/parcelas" />} />
                    </>
                ) : (
                    <>
                        <Route path="/" element={<Login />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </>
                )}
            </RouterRoutes>
        </Suspense>
    )
}