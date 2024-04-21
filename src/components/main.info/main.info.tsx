import { useNavigate } from 'react-router-dom';
import styles from './main.info.module.scss';

export function Info() {
  const navigate = useNavigate();
  return (
    <section className={styles.mainInfo}>
      <p>
        A pesar de la creencia popular, la población de lobos ibéricos es
        considerablemente menor de lo que puedes pensar. Estas magníficas
        especies han sido duramente perseguidas en el pasado, casi llevadas a la
        extinción en nuestro país. Hoy en día, solo ocupan una fracción de sus
        territorios ancestrales, con alrededor de
        <em>300 manadas en toda España</em> de tamaños variables que oscilan
        entre cinco y diez individuos.
      </p>
      <p>
        <strong>En WolfTracks nos dedicamos a rastrear y monitorear </strong> de
        cerca la evolución de estas majestuosas criaturas en su hábitat natural.
        Esto nos permite cuantificar el número de ejemplares y ayudarles en el
        momento de marcaje y de cría.
      </p>
      <img src="../../../track_manadas.jpeg" alt="" />

      <p>
        Más que depredadores, los lobos son guardianes de nuestros ecosistemas,
        desempeñando un papel vital en el equilibrio natural y actuando como
        verdaderos guardianes de la salud de la naturaleza.
      </p>

      <p>
        Te invitamos a unirte a nuestra causa y apoyar nuestra campaña en
        defensa del lobo ibérico. Juntos, podemos trabajar hacia la coexistencia
        armoniosa. <strong>¡Acompáñanos en esta emocionante aventura!</strong>
      </p>

      <div className="dialogBox">
        <p>
          ¿Quieres recibir noticias de las manadas o de nuestras acciones?
          Suscríbete a nuestra newsletter mensual y no dejes de escuchar el
          aullido.
        </p>
        <button onClick={() => navigate('/suscribe')} role="button">
          ¡Suscríbete!
        </button>
      </div>
    </section>
  );
}
