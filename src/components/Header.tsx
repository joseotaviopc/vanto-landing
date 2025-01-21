import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCar, faUser, faSignOut } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router'
import { useAuth } from '../context/useAuth';
import { ModeToggle } from './mode-toggle';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface HeaderProps {
    currentContract: number | null
    setCurrentContract: React.Dispatch<React.SetStateAction<number | null>>
}

export function Header({ currentContract, setCurrentContract }: HeaderProps) {
    const { logout, contratos } = useAuth()

    const placeholder = contratos?.length > 0 && currentContract
        ? `Contrato: ${currentContract} - Modalidade: ${contratos[currentContract]?.modalidade_contrato === 'FINANCIAMENTO_VEICULO' ? 'Financiamento' : 'Leasing'}`
        : 'Selecione um contrato'

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
                {contratos && contratos.length > 0 &&
                    <Select onValueChange={(val) => setCurrentContract(Number(val))} >
                        <SelectTrigger className="">
                            <SelectValue className="font-light text-left items-start" placeholder={placeholder} />
                        </SelectTrigger>
                        <SelectContent className='bg-[rgb(46_81_130)] border-transparent'>
                            {contratos?.map(item => (
                                <SelectItem
                                    key={item.id_contrato}
                                    value={String(item.id_contrato)}
                                    className="flex flex-col gap-1 border rounded-lg mb-2 p-2 text-zinc-200 hover:text-zinc-50 cursor-pointer"
                                >
                                    <p>Contrato: {item.id_contrato} - Modalidade: {item.modalidade_contrato === 'FINANCIAMENTO_VEICULO' ? 'Financiamento' : 'Leasing'}</p>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                }
            </div>
            <div className="flex gap-4 items-center">
                <Link to="/automoveis">
                    <FontAwesomeIcon icon={faCar} className='text-white text-xl hover:text-accent-foreground' />
                </Link>
                <Link to="/usuario">
                    <FontAwesomeIcon icon={faUser} className='text-white text-xl hover:text-accent-foreground' />
                </Link>
                <FontAwesomeIcon icon={faSignOut} onClick={handleLogout} className='text-white text-xl hover:text-accent-foreground cursor-pointer' />
                <ModeToggle />
            </div>
        </header>
    );
}