interface PlaceholderImageProps {
  name: string
  className?: string
}

export default function PlaceholderImage({ name, className = '' }: PlaceholderImageProps) {
  const initials = name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
  
  const colors = [
    'bg-gradient-to-br from-green-600 to-blue-700',
    'bg-gradient-to-br from-blue-600 to-green-700',
    'bg-gradient-to-br from-green-500 to-blue-600',
    'bg-gradient-to-br from-blue-500 to-green-600',
  ]
  
  const colorIndex = name.length % colors.length
  const bgColor = colors[colorIndex]
  
  return (
    <div className={`flex items-center justify-center ${bgColor} ${className}`}>
      <span className="text-white text-4xl font-light">{initials}</span>
    </div>
  )
}