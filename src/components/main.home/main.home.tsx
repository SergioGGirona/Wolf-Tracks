import styles from './main.home.module.scss';
export function Home() {
  return (
    <div className={styles['main']}>
      <video autoPlay loop muted src="../../../lobo_video.mp4"></video>

      <img src="../../../fondo_wolftracks.png" />

      <div>
        <h2>
          Huellas que <em>inspiran acción</em>
        </h2>
      </div>
    </div>
  );
}
