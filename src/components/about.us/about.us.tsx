import { Link } from 'react-router-dom';
import { Employees } from '../employees/employees';
import { Media } from '../media/media';
import styles from './about.us.module.scss';
export function AboutUs() {
  return (
    <div className={styles.aboutUs}>
      <h2>Un poco sobre Wolf Tracks</h2>
      <p>
        Wolf Tracks es una ONG dedicada a la protección del lobo ibérico y su
        hábitat. Nuestra historia se basa en la pasión por la vida silvestre y
        la determinación de preservar esta especie icónica en la península
        ibérica.
      </p>

      <h3>Nuestras colaboraciones:</h3>

      <Media></Media>

      <p>
        Utilizamos tecnología innovadora que analiza el patrón de comportamiento
        de los lobos, transformando huellas y marcas en datos técnicos precisos
        para un seguimiento objetivo y científico.
      </p>
      <img
        className={styles.imgWolves}
        src="../../../avistamiento.jpeg"
        alt="Fotografía de un avistamiento de dos lobos ibéricos en un bosque."
      />
      <p className={styles.rightP}>
        Nuestro lema, <strong>"Huellas que inspiran acción"</strong>, refleja
        nuestro compromiso con la conservación activa y nuestra visión de un
        futuro donde lobos y humanos coexistan en armonía.
      </p>
      <h3>¡Ponle cara a nuestro equipo!</h3>
      <Employees></Employees>

      <Link to={'/'}>Conoce a nuestros lobos</Link>
    </div>
  );
}
