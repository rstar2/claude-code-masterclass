"use client";

import { useState } from "react";
import { Clock8, Plus } from "lucide-react";
import Link from "next/link";
import { useUser } from "@/lib/hooks/useUser";
import { logout } from "@/lib/auth";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { user } = useUser();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    setIsLoggingOut(true);
    try {
      await logout();
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
    <div className={styles.siteNav}>
      <nav>
        <header>
          <h1>
            <Link href="/heists">
              P<Clock8 className={styles.logo} size={14} strokeWidth={2.75} />
              cket Heist
            </Link>
          </h1>
          <div>Tiny missions. Big office mischief.</div>
        </header>
        <ul className={styles.navActions}>
          {user && (
            <li>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className={styles.logoutBtn}
              >
                {isLoggingOut ? "Logging out..." : "Logout"}
              </button>
            </li>
          )}
          <li>
            <Link href="/heists/create" className="btn">
              <Plus size={20} strokeWidth={2} />
              <span>Create New Heist</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
