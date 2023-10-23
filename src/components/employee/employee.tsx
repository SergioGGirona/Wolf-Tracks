import { User } from '../../model/user';
import styles from './employee.module.scss';
type Props = {
  readonly user: User;
};
export function Employee({ user }: Props) {
  return (
    <li className={styles.employee}>
      <img
        src={user.avatar.url}
        alt={`Imagen de perfil de ${user.firstName}.`}
      />
      <div>
        <p>{user.firstName}</p>
        <span>{user.surNames}</span>
      </div>
      <span className={styles.zone}>{user.assingedZone}</span>
    </li>
  );
}
