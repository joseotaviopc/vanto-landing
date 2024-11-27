import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCar, faUser } from '@fortawesome/free-solid-svg-icons'

export function Header() {
    return (
        <header className="flex justify-between fixed w-full top-0 bg-[rgb(46_81_130)] z-10 p-4">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold">
                Faturas
                </h1>
                <h2 className="font-light">120948 - Cartão de Crédito</h2>
            </div>
            <div className="flex gap-4">
                <FontAwesomeIcon icon={faCar} className='text-white text-xl' />
                <FontAwesomeIcon icon={faUser} className='text-white text-xl' />
            </div>
        </header>
    );
}