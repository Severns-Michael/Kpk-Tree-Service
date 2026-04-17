import styles from './TreeSilhouettes.module.css';

export function TreeSilhouettes() {
  return (
    <div className={styles.wrapper} aria-hidden="true">
      <svg
        className={styles.trees}
        viewBox="0 0 1440 400"
        preserveAspectRatio="xMidYMax slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Back layer - lighter, further away */}
        <g opacity="0.06">
          {/* Tall pine */}
          <path d="M120 400 L120 280 L90 280 L120 230 L95 230 L120 180 L100 180 L120 120 L140 180 L120 180 L145 230 L120 230 L150 280 L120 280 Z" fill="currentColor"/>
          {/* Wide oak */}
          <path d="M300 400 L300 300 Q260 280 240 240 Q230 200 260 170 Q280 150 300 140 Q320 130 340 140 Q360 150 380 170 Q400 200 390 240 Q370 280 340 300 L340 400 Z" fill="currentColor"/>
          {/* Thin pine */}
          <path d="M520 400 L520 310 L505 310 L520 270 L508 270 L520 220 L510 220 L520 160 L530 220 L520 220 L532 270 L520 270 L535 310 L520 310 Z" fill="currentColor"/>
          {/* Bushy tree */}
          <path d="M700 400 L700 310 Q650 300 630 260 Q620 220 650 190 Q680 160 720 160 Q760 160 790 190 Q810 220 800 260 Q780 300 740 310 L740 400 Z" fill="currentColor"/>
          {/* Tall pine */}
          <path d="M900 400 L900 290 L870 290 L900 240 L878 240 L900 185 L882 185 L900 120 L918 185 L900 185 L922 240 L900 240 L930 290 L900 290 Z" fill="currentColor"/>
          {/* Small tree */}
          <path d="M1080 400 L1080 330 Q1050 320 1040 290 Q1035 260 1060 240 Q1080 225 1100 240 Q1120 260 1115 290 Q1105 320 1080 330 Z" fill="currentColor"/>
          {/* Wide pine */}
          <path d="M1280 400 L1280 270 L1245 270 L1280 210 L1255 210 L1280 150 L1260 150 L1280 80 L1300 150 L1280 150 L1305 210 L1280 210 L1315 270 L1280 270 Z" fill="currentColor"/>
        </g>

        {/* Front layer - darker, closer */}
        <g opacity="0.1">
          {/* Pine cluster left */}
          <path d="M50 400 L50 330 L35 330 L50 290 L38 290 L50 240 L42 240 L50 190 L58 240 L50 240 L62 290 L50 290 L65 330 L50 330 Z" fill="currentColor"/>
          <path d="M200 400 L200 310 L178 310 L200 260 L183 260 L200 200 L188 200 L200 140 L212 200 L200 200 L217 260 L200 260 L222 310 L200 310 Z" fill="currentColor"/>
          {/* Big oak middle */}
          <path d="M440 400 L440 320 Q390 310 370 270 Q355 230 375 195 Q400 165 440 155 Q480 165 505 195 Q520 230 510 270 Q490 310 460 320 L460 400 Z" fill="currentColor"/>
          {/* Pine right of center */}
          <path d="M620 400 L620 300 L600 300 L620 250 L605 250 L620 195 L608 195 L620 130 L632 195 L620 195 L635 250 L620 250 L640 300 L620 300 Z" fill="currentColor"/>
          {/* Small pine */}
          <path d="M810 400 L810 340 L800 340 L810 310 L802 310 L810 270 L818 310 L810 310 L820 340 L810 340 Z" fill="currentColor"/>
          {/* Tall pine */}
          <path d="M1000 400 L1000 280 L975 280 L1000 225 L980 225 L1000 170 L985 170 L1000 100 L1015 170 L1000 170 L1020 225 L1000 225 L1025 280 L1000 280 Z" fill="currentColor"/>
          {/* Oak right */}
          <path d="M1180 400 L1180 330 Q1140 320 1125 285 Q1115 250 1140 225 Q1160 210 1190 210 Q1220 210 1240 225 Q1260 250 1250 285 Q1235 320 1200 330 L1200 400 Z" fill="currentColor"/>
          {/* End pine */}
          <path d="M1380 400 L1380 320 L1365 320 L1380 275 L1368 275 L1380 225 L1370 225 L1380 170 L1390 225 L1380 225 L1392 275 L1380 275 L1395 320 L1380 320 Z" fill="currentColor"/>
        </g>
      </svg>
    </div>
  );
}
