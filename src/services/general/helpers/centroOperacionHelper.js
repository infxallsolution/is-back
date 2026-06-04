export const normalizeCentroOperacionMovimiento = (company, centroOperacionMovimiento) => {
    const normalizedCompany = String(company ?? '').padStart(3, '0');
    const normalizedCentro = String(centroOperacionMovimiento ?? '');

    if (normalizedCompany === '002' && normalizedCentro === '001') {
        return '011';
    }

    return normalizedCentro;
};

export default {
    normalizeCentroOperacionMovimiento
};