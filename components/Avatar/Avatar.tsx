import styles from "./Avatar.module.css"

interface AvatarProps {
  name: string
}

export default function Avatar({ name }: AvatarProps) {
  const initials = name
    .split(" ")
    .map(word => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className={styles.avatar} role="img" aria-label={`Avatar for ${name}`}>
      {initials}
    </div>
  )
}
