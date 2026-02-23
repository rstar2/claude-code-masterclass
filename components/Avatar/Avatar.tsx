import styles from "./Avatar.module.css";
import { getInitials } from "@/util/initials";

interface AvatarProps {
  name: string;
}

export default function Avatar({ name }: AvatarProps) {
  const initials = getInitials(name);

  return (
    <div className={styles.avatar} role="img" aria-label={`Avatar for ${name}`}>
      {initials}
    </div>
  );
}
