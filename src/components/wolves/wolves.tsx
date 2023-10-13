import { SyntheticEvent, useEffect } from 'react';
import { useWolves } from '../../hooks/use.wolves';
import Wolf from '../wolf/wolf';
import styles from './wolves.module.scss';

export function Wolves() {
  const { loadPartialWolves, loadState, wolvesToPublic, filterTerritory } =
    useWolves();

  useEffect(() => {
    loadPartialWolves();
  }, [loadPartialWolves]);

  const handleFilter = (ev: SyntheticEvent) => {
    const selectedTerritory = ev.currentTarget.textContent;
    filterTerritory(selectedTerritory!);
  };

  return (
    <div className={styles.wolvesContainer}>
      <h3>Conoce a nuestros lobos</h3>

      <div className={styles.filters}>
        <label>Elije un territorio para filtrar:</label>
        <div>
          <span onClick={handleFilter} role="button">
            Asturias
          </span>
          <span onClick={handleFilter} role="button">
            Castilla-León
          </span>
          <span onClick={handleFilter} role="button">
            Galicia
          </span>
        </div>
      </div>
      {loadState === 'loading' && (
        <img
          className={styles.spinner}
          src="../../../spinner.webp"
          alt="Esperando a que los lobos carguen"
        />
      )}
      {loadState === 'loaded' && (
        <ul className={styles.wolvesList}>
          {wolvesToPublic.map((item) => (
            <Wolf key={item.id} wolf={item}></Wolf>
          ))}
        </ul>
      )}
      <div className={styles.buttons}>
        <button>{'<'}</button>
        <button>{'>'}</button>
      </div>
    </div>
  );
}
