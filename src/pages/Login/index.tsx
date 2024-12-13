import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/useAuth';
import { convertDateFormat, cpfOnlyNumbers, formatCPF, formatDateToISO, validateCPF } from '../../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const loginSchema = z.object({
    cpf: z.string().min(11, { message: 'CPF inválido' }),
    password: z.string().min(6, { message: 'Data inválida' }),
});

type FormData = z.infer<typeof loginSchema>;

export function Login() {
    const { register, setValue, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<FormData>({
        resolver: zodResolver(loginSchema)
    });
    const { login } = useAuth();

    const onSubmit = async (data: FormData) => {
        const formattedCPF = formatCPF(data.cpf);
        console.log(data.cpf, formattedCPF)
        if (!validateCPF(formattedCPF)) {
            setError("cpf", { type: "manual", message: "CPF inválido" });
            return;
        }
        const brDate = convertDateFormat(data.password)

        const cleanCpf = cpfOnlyNumbers(data.cpf)
        const convertDate = formatDateToISO(brDate)
        await login(cleanCpf, convertDate.split('T')[0])
        // .catch((error) => {
        //     console.error("Login failed:", error);
        // })
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit(onSubmit)} className="p-8 bg-white rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-center mb-8 text-2xl font-semibold text-gray-800">
                    Login
                </h1>

                <div className="mb-4 space-y-4">
                    <div>
                        <input
                            type="text"
                            placeholder="CPF"
                            {...register("cpf", { required: true, maxLength: 14 })}
                            className={`w-full px-3 py-2 rounded-md border ${errors.cpf ? 'border-red-500' : 'border-gray-300'
                                } focus:outline-none focus:ring-2 ${errors.cpf ? 'focus:ring-red-500' : 'focus:ring-blue-500'
                                } focus:border-transparent`}
                            onChange={e => {
                                const formattedValue = formatCPF(e.target.value);
                                setValue("cpf", formattedValue); // Update the form value
                            }}
                        />
                        {errors.cpf && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.cpf.message || "CPF inválido"}
                            </p>
                        )}
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="01/10/1990"
                            {...register("password", { required: true })}
                            className={`w-full px-3 py-2 rounded-md border ${errors.password ? 'border-red-500' : 'border-gray-300'
                                } focus:outline-none focus:ring-2 ${errors.password ? 'focus:ring-red-500' : 'focus:ring-blue-500'
                                } focus:border-transparent`}
                        />
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.password.message || "Data inválida"}
                            </p>
                        )}
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-[rgb(46_81_130)] text-white rounded-md hover:bg-[rgb(36_71_120)] transition-colors duration-200 font-medium"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? <FontAwesomeIcon icon={faSpinner} className="text-white text-2xl animate-spin" /> : 'Sign In'}
                </button>
            </form>
        </div>
    );
}