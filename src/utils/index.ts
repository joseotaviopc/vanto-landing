
function formatDate(date: string) {
    return new Date(date).toLocaleDateString('pt-BR', {timeZone: 'UTC'})
}

function formatDateToISO(date: string): string {
    return new Date(date).toISOString()
}

function convertDateFormat(dateString: string): string {
    const [day, month, year] = dateString.split('/');
    return `${month}/${day}/${year}`;
}

function compareDate(date: string): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0); // Reset time to start of day
    return compareDate.getTime() < today.getTime();
}


const validateCPF = (cpf: string) => {
    const cleanCPF = cpf.replace(/[^\d]/g, '');
    
    if (cleanCPF.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cleanCPF)) return false;

    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
    }
    let digit = 11 - (sum % 11);
    if (digit > 9) digit = 0;
    if (digit !== parseInt(cleanCPF.charAt(9))) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
    }
    digit = 11 - (sum % 11);
    if (digit > 9) digit = 0;
    if (digit !== parseInt(cleanCPF.charAt(10))) return false;

    return true;
};

const formatCPF = (value: string) => {
    const cleanValue = value.replace(/[^\d]/g, '');
    if (cleanValue.length <= 3) return cleanValue;
    if (cleanValue.length <= 6) return `${cleanValue.slice(0, 3)}.${cleanValue.slice(3)}`;
    if (cleanValue.length <= 9) return `${cleanValue.slice(0, 3)}.${cleanValue.slice(3, 6)}.${cleanValue.slice(6)}`;
    return `${cleanValue.slice(0, 3)}.${cleanValue.slice(3, 6)}.${cleanValue.slice(6, 9)}-${cleanValue.slice(9, 11)}`;
};

const maskDate = (value: string) => {
    const cleanValue = value.replace(/[^\d]/g, '');
    if (cleanValue.length <= 2) return cleanValue;
    if (cleanValue.length <= 5) return `${cleanValue.slice(0, 2)}/${cleanValue.slice(2)}`;
    if (cleanValue.length <= 8) return `${cleanValue.slice(0, 2)}/${cleanValue.slice(2, 4)}/${cleanValue.slice(4)}`;
    return `${cleanValue.slice(0, 2)}/${cleanValue.slice(2, 4)}/${cleanValue.slice(4, 8)}`;
};

const cpfOnlyNumbers = (value: string) => {
    return value.replace(/[^\d]/g, '');
}

export { formatDate, formatDateToISO, convertDateFormat, cpfOnlyNumbers, compareDate, validateCPF, formatCPF, maskDate }