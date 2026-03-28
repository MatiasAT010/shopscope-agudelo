export default function Navbar() {
    return(
        <nav className= "flex justify-between items-center py-4">
            <span className="font-bold text-lg">Shopscope</span>
            <div className="flex gap-6 text-sm text-gray-500">
                <a href="#">Inicio</a>
                <a href="#">Servicio</a>
                <a href="#">Iniciar sesion</a>
            </div>
        </nav> 
    )
}