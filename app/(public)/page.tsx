"use client";

import { Clock8, UserPlus, LogIn, Target, Zap, Shield } from "lucide-react";
import { useState, useEffect } from "react";
import styles from "./page.module.css";

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // NOTE: this will trigger animations (the CSS transitions),
    // as initially the page will be rendered on server with loaded=false,
    // and later in the client the useEffect will run once
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoaded(true);
  }, []);

  return (
    <div className={styles.splashPage}>
      {/* Animated background grid */}
      <div className={styles.gridBg} aria-hidden="true">
        <div className={`${styles.gridLine} ${styles.h1}`} />
        <div className={`${styles.gridLine} ${styles.h2}`} />
        <div className={`${styles.gridLine} ${styles.h3}`} />
        <div className={`${styles.gridLine} ${styles.h4}`} />
        <div className={`${styles.gridLine} ${styles.h5}`} />
        <div className={`${styles.gridLine} ${styles.v1}`} />
        <div className={`${styles.gridLine} ${styles.v2}`} />
        <div className={`${styles.gridLine} ${styles.v3}`} />
        <div className={`${styles.gridLine} ${styles.v4}`} />
      </div>

      {/* Laser beam effects */}
      <div className={styles.laserContainer} aria-hidden="true">
        <div className={`${styles.laser} ${styles.laser1}`} />
        <div className={`${styles.laser} ${styles.laser2}`} />
        <div className={`${styles.laser} ${styles.laser3}`} />
      </div>

      {/* Corner decorations */}
      <div
        className={`${styles.corner} ${styles.cornerTL}`}
        aria-hidden="true"
      />
      <div
        className={`${styles.corner} ${styles.cornerTR}`}
        aria-hidden="true"
      />
      <div
        className={`${styles.corner} ${styles.cornerBL}`}
        aria-hidden="true"
      />
      <div
        className={`${styles.corner} ${styles.cornerBR}`}
        aria-hidden="true"
      />

      <div className={styles.splashContainer}>
        {/* Classified stamp */}
        <div
          className={`${styles.classifiedStamp} ${loaded ? styles.stampVisible : ""}`}
          aria-hidden="true"
        >
          CLASSIFIED
        </div>

        {/* Main content */}
        <div className={styles.heroSection}>
          {/* Badge with logo */}
          <div
            className={`${styles.badgeContainer} ${loaded ? styles.badgeLoaded : ""}`}
          >
            <div className={styles.badge}>
              <div className={styles.badgeInner}>
                <Clock8 className={styles.badgeIcon} strokeWidth={2.5} />
              </div>
            </div>
          </div>

          {/* Title */}
          <h1
            className={`${styles.heroTitle} ${loaded ? styles.titleLoaded : ""}`}
          >
            <span className={styles.titleMain}>POCKET</span>
            <span className={styles.titleAccent}>HEIST</span>
          </h1>

          {/* Tagline */}
          <p
            className={`${styles.tagline} ${loaded ? styles.taglineLoaded : ""}`}
          >
            Tiny missions. Big rewards. Execute workplace mischief with style.
          </p>

          {/* Mission briefing */}
          <div
            className={`${styles.briefing} ${loaded ? styles.briefingLoaded : ""}`}
          >
            <div className={styles.briefingHeader}>
              <div className={styles.briefingLine} />
              <span className={styles.briefingLabel}>MISSION BRIEFING</span>
              <div className={styles.briefingLine} />
            </div>
            <p className={styles.briefingText}>
              Plan and execute tiny acts of workplace rebellion. Steal the
              office snacks. Liberate the good chair. Borrow all the pens. Your
              mission, should you choose to accept it: make the workday a little
              more interesting.
            </p>
          </div>

          {/* Feature cards */}
          <div
            className={`${styles.featureGrid} ${loaded ? styles.featuresLoaded : ""}`}
          >
            <div className={styles.featureCard}>
              <div className={`${styles.featureIcon} ${styles.featureIcon1}`}>
                <Target size={20} />
              </div>
              <span className={styles.featureText}>Pinpoint Targets</span>
            </div>
            <div className={styles.featureCard}>
              <div className={`${styles.featureIcon} ${styles.featureIcon2}`}>
                <Zap size={20} />
              </div>
              <span className={styles.featureText}>Quick Strikes</span>
            </div>
            <div className={styles.featureCard}>
              <div className={`${styles.featureIcon} ${styles.featureIcon3}`}>
                <Shield size={20} />
              </div>
              <span className={styles.featureText}>Covert Ops</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div
            className={`${styles.ctaContainer} ${loaded ? styles.ctaLoaded : ""}`}
          >
            <a href="/signup" className={`${styles.btn} ${styles.btnPrimary}`}>
              <UserPlus size={18} />
              <span>Join the Crew</span>
            </a>
            <a href="/login" className={`${styles.btn} ${styles.btnSecondary}`}>
              <LogIn size={18} />
              <span>Agent Login</span>
            </a>
          </div>

          {/* Trust indicator */}
          <div
            className={`${styles.trustBadge} ${loaded ? styles.trustLoaded : ""}`}
          >
            <div className={styles.trustDot} />
            <span>Encrypted Connection</span>
          </div>
        </div>
      </div>

      {/* Footer scroll indicator */}
      <div
        className={`${styles.scrollHint} ${loaded ? styles.hintLoaded : ""}`}
      >
        <div className={styles.scrollLine} />
      </div>
    </div>
  );
}
