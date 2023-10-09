import styles from './media.module.scss';

export function Media() {
  return (
    <section className={styles.media}>
      <div>
        <img
          src="../../../logoMedia/NationalG.webp"
          alt="Logo de National Geographic"
        />
        <img
          src="../../../logoMedia/MinisterioMA.png"
          alt="logo del Ministerio de Medio Ambiente de España"
        />
        <img
          src="../../../logoMedia/EcologistasEA.png"
          alt="Logo de Ecologistas en acción"
        />
        <img src="../../../logoMedia/NewYT.png" alt="Logo de New York Times" />
        <img src="../../../logoMedia/Ascel.png" alt="Logo de ASCEl" />
      </div>
    </section>
  );
}
