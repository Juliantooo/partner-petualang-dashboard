
const PAGE_USED_LAYOUT: Array<string> = [
    '/',
    '/transaction',
    '/items'
]

const useLayout = ({ path }: { path: string }) => {
    return PAGE_USED_LAYOUT.includes(path)
}

export default useLayout