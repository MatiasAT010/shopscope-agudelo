export default function button ({ children, onClick}) {
    return (
        <button className= "bg-cyan-600 text-white px-5 py-2 rounded-lg hover: bg-cyan-600 transition"
        onClick= {onClick}
        >
            {children}
        </button>
    )
}