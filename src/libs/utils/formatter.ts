export const formatPrice = (value: number) => {
    const val = value / 1;
    const formattedNum = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    return `Rp ${formattedNum}`;
};
