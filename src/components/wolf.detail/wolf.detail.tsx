import { useState } from 'react';
import { BsArrowsAngleContract, BsArrowsAngleExpand } from 'react-icons/bs';
import { TbAlpha, TbBeta } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useWolves } from '../../hooks/use.wolves';
import { Wolf } from '../../model/wolf';
import styles from './wolf.detail.module.scss';

type Props = {
  readonly wolf: Wolf;
};
export function WolfDetail({ wolf }: Props) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { eraseWolf } = useWolves();

  const handleDelete = (wolf: Wolf) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'No se puede dar marcha atrás. ¿Te has asegurado de que se haya perdido totalmente el rastro?',
      icon: 'question',
      showCancelButton: true,
      cancelButtonColor: '#19191a',
      background: '#0d312a',
      color: 'white',
      confirmButtonText: 'Sí, decir adiós',
      confirmButtonColor: '#0d312a',
    }).then((result) => {
      if (result.isConfirmed) {
        eraseWolf(wolf);
        Swal.fire('Borrado', 'El lobo ya no está en la manada.', 'success');
      }
    });
  };

  const wolfTrack = () => {
    const data = wolf.tracks[0].split(',');
    return data;
  };

  return (
    <li>
      {isDetailsOpen === false ? (
        <div className={styles.wolfPreDetail}>
          <div
            className={styles.wolfPrePhoto}
            style={{ backgroundImage: `url(${wolf.images[0].url})` }}
          />
          <section>
            <span>{wolf.territory}</span>
            <span className={styles.wolfCodeName}>{wolf.codeName}</span>
          </section>
          <BsArrowsAngleExpand
            role="button"
            onClick={() => setIsDetailsOpen(!isDetailsOpen)}
          />
        </div>
      ) : (
        <div className={styles.wolfDetail}>
          <div
            className={styles.wolfPhoto}
            style={{ backgroundImage: `url(${wolf.images[0].url})` }}
          >
            {wolf.isAlpha ? <TbAlpha /> : <TbBeta />}
          </div>
          <section>
            <span className={styles.wolfCodeName}>{wolf.codeName}</span>
            <span>{wolf.nickname}</span>
            {wolf.isFemale ? <span>♀</span> : <span>♂</span>}
          </section>
          <div>
            <span>{wolf.age} años</span>
            <span>{wolf.pack}</span>
            <span>{wolf.territory}</span>
          </div>
          <p>{wolf.comments}</p>
          <p>Último rastro: {wolf.tracks}</p>

          <iframe
            src={`https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d9459.90007598987!2d${
              wolfTrack()[1]
            }!3d${
              wolfTrack()[0]
            }!2m3!1f0!2f0!3f0!3m2!1i512!2i384!4f13.1!3m2!1m1!2zNDLCsDM0JzUzLjkiTiA2wrA1OCczNi45Ilc!5e1!3m2!1ses!2ses!4v1695811218105!5m2!1ses!2ses&z=2000`}
            width="600"
            height="450"
            loading="lazy"
          ></iframe>

          <img src={wolf.images[0].url} alt="Foto de avistamiento de lobo" />
          <div className={styles.buttonsWolf}>
            <Link
              role="button"
              to={`/update/${wolf.id}`}
              className={styles.linkUpdate}
            >
              Actualizar
            </Link>
            <button role="button" onClick={() => handleDelete(wolf)}>
              ✘
            </button>
          </div>
          <BsArrowsAngleContract
            role="button"
            onClick={() => setIsDetailsOpen(!isDetailsOpen)}
          />
        </div>
      )}
    </li>
  );
}
