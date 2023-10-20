import { Link } from 'react-router-dom';
import styles from './error.page.module.scss';
function ErrorPage() {
  return (
    <div className={styles.errorPage}>
      <video autoPlay loop muted src="../../../anim_lobo_aullando.mp4"></video>
      <h2>¿Has perdido el rastro?</h2>
      <p>Vuelve a la manada y sigue ayudándonos a defender al lobo ibérico.</p>
      <Link className={styles.link} to={'/'}>
        Vuelve a home
      </Link>
    </div>
  );
}
export default ErrorPage;
