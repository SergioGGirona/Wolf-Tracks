import styles from './main.home.module.scss';
export function Home() {
  return (
    <div className={styles['main']}>
      <video autoPlay loop muted src="../../../lobo_video.mp4"></video>

      <img src="../../../fondo_wolftracks.png" />

      <div className={styles.mainClaim}>
        <h2>
          Huellas que <em>inspiran</em> acción
        </h2>
      </div>
    </div>
  );
}
