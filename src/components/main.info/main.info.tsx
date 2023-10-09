import styles from './main.info.module.scss';

export function Info() {
  return (
    <div className={styles.mainInfo}>
      <p>
        La relación entre el hombre y el lobo en España ha sido siempre
        complicada. <strong>Es momento de arreglarla.</strong>
      </p>
      <p>
        El tracking de lobos nos permite cuantificar el número de ejemplares y
        ayudarles en el momento de marcaje y de cría.
      </p>
      <img src="../../../track_manadas.jpeg" alt="" />
    </div>
  );
}
