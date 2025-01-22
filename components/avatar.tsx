import { Avatar as AvatarUI, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface AvatarProps {
  src?: string
  initials: string
  className?: string
}

export function Avatar({ src, initials, className }: AvatarProps) {
  return (
    <AvatarUI className={className}>
      <AvatarImage src={src} />
      <AvatarFallback>{initials}</AvatarFallback>
    </AvatarUI>
  )
}
