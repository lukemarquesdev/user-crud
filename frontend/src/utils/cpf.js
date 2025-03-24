export const formatCPF = (value) => {
    const cpf = value.replace(/\D/g, ''); 
    const formattedCPF = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    return formattedCPF;
}

export const removeFormatCPF = (value) => {
    return value.replace(/\D/g, '');
}