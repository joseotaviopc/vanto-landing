import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCar, faUser, faSignOut } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router'
import { useAuth } from '../context/useAuth';

export function Header() {
    const { logout } = useAuth()

    function handleLogout() {
        
        logout()
    }

    return (
        <header className="flex justify-between fixed w-full top-0 bg-[rgb(46_81_130)] z-10 p-4">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold">
                    <Link to="/parcelas">
                    Faturas
                    </Link>
                </h1>
                <h2 className="font-light">120948 - Cartão de Crédito</h2>
            </div>
            <div className="flex gap-4">
                <Link to="/automoveis">
                    <FontAwesomeIcon icon={faCar} className='text-white text-xl' />
                </Link>
                <Link to="/usuario">
                    <FontAwesomeIcon icon={faUser} className='text-white text-xl' />
                </Link>
                <FontAwesomeIcon icon={faSignOut} onClick={handleLogout} className='text-white text-xl' />
            </div>
        </header>
    );
}