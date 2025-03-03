
type ErrorMessageProps = {
    children: React.ReactNode
}

export default function SuccessMessage({children}: ErrorMessageProps) {
  return (
      <p className="bg-green-50 text-green-600 p-3 uppercase text-sm font-bold">
          {children}
      </p>
  )
}
