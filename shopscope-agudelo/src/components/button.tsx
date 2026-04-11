interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
}

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      className="bg-cyan-600 text-white px-5 py-2 rounded-lg hover:bg-cyan-700 transition"
      onClick={onClick}
    >
      {children}
    </button>
  )
}