import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUsers } from '../../hooks/use.users';
import { useWolves } from '../../hooks/use.wolves';
import { Wolf } from '../../model/wolf';
import ErrorPage from '../error.page/error.page';
import { WolfDetail } from '../wolf.detail/wolf.detail';
import styles from './profile.module.scss';

function Profile() {
  const { loadState, loadWolves, wolves } = useWolves();
  const { users, status } = useUsers();

  useEffect(() => {
    loadWolves();
  }, [loadWolves]);

  if (status !== 'logged') {
    return <ErrorPage />;
  }
  const userWolves = wolves.filter(
    (wolf) => wolf.specialist && wolf.specialist.id === users[0].id
  ) as Wolf[];

  return (
    <main className={styles.profile}>
      <h2>Tu perfil, {users[0].userName}</h2>
      <hr />
      <Link to={'/addWolf'} className={styles.addWolfButton}>
        ¿Nuevo rastro?
      </Link>
      <p>Estos son los lobos a los que estás haciendo seguimiento:</p>

      {loadState === 'loading' && (
        <img
          src="../../../spinner.webp"
          alt="Esperando a que tus lobos carguen"
        />
      )}
      {loadState === 'loaded' && (
        <ul>
          {userWolves.map((item) => (
            <WolfDetail key={item.id} wolf={item}></WolfDetail>
          ))}
        </ul>
      )}
    </main>
  );
}

export default Profile;
