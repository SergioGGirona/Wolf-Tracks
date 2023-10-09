import { WolfToPublic } from '../../model/wolf';
import styles from './wolf.module.scss';
type Props = {
  wolf: WolfToPublic;
};
function Card({ wolf }: Props) {
  return (
    <li className={styles.wolfy}>
      <img
        loading="lazy"
        src={wolf.images[0].url}
        alt={`Imagen de ${wolf.nickname}`}
      />
      <div>
        <span>{wolf.nickname}</span>
        <span>{wolf.territory}</span>
      </div>
    </li>
  );
}
export default Card;
