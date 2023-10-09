import { SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useUsers } from '../../hooks/use.users';
import { UserLogin } from '../../model/user';
import styles from './login.module.scss';

function Login() {
  const navigate = useNavigate();

  const { loginUser } = useUsers();
  const handleSubmit = (ev: SyntheticEvent) => {
    ev.preventDefault();
    const form = ev.target as HTMLFormElement;

    const loginData: UserLogin = {
      userName: (form.elements.namedItem('userName') as HTMLInputElement).value,
      password: (form.elements.namedItem('password') as HTMLInputElement).value,
    };
    loginUser(loginData);
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Bienvenid@!',
      background: '#0d312a',
      color: 'white',
      showConfirmButton: false,
      timer: 1500,
    });

    navigate('/');
  };

  return (
    <main className={styles.loginPage}>
      <form className={styles.loginForm} role="form" onSubmit={handleSubmit}>
        <h2>Welcome again!</h2>
        <div className={styles['loginContainer']}>
          <input
            type="text"
            placeholder="Nombre de usuario"
            name="userName"
            className={styles.textForm}
            autoComplete="username"
            required
          />

          <input
            type="password"
            placeholder="Contraseña"
            name="password"
            className={styles.textForm}
            autoComplete="current-password"
            required
          />
        </div>
        <button className={styles.buttonForm} type="submit">
          Entrar
        </button>
      </form>
      <p>¿Ha entrado un nuevo miembro a la manada? </p>
      <a role="button" href={'/register'}>
        Regístralo aquí
      </a>
    </main>
  );
}

export default Login;
