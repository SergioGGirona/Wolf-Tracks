import { SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUsers } from '../../hooks/use.users';
import styles from './register.module.scss';

function Register() {
  const navigate = useNavigate();
  const { addUser } = useUsers();
  const handleSubmit = (ev: SyntheticEvent) => {
    ev.preventDefault();

    const formElement = ev.currentTarget as HTMLFormElement;
    const formData = new FormData(formElement);
    addUser(formData);
    navigate('/login');
  };

  return (
    <form role="form" onSubmit={handleSubmit} className={styles['form']}>
      <h2>¡Te damos la bienvenida!</h2>
      <p>Rellena los campos para unirte como Trackeador.</p>
      <div className={styles['formContainer']}>
        <input
          type="text"
          placeholder="Nombre de usuario"
          name="userName"
          className={styles['textForm']}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          name="password"
          className={styles['textForm']}
          required
        />

        <input
          type="text"
          placeholder="¿Cómo te llamamos?"
          name="firstName"
          className={styles['textForm']}
          required
        />

        <input
          type="text"
          placeholder="Apellidos o mote"
          name="surNames"
          className={styles['textForm']}
          required
        />

        <input
          type="email"
          placeholder="Correo electrónico"
          name="email"
          className={styles['textForm']}
          required
        />

        <input
          type="number"
          placeholder="Nº de empleado"
          name="employeeNumber"
          className={styles['numberForm']}
          min="10"
          required
        />

        <div className={styles['fieldset']}>
          <div className={styles['select-container']}>
            <select
              name="assingedZone"
              id="assingedZone-select"
              defaultValue={''}
            >
              <option disabled value="">
                Zona Asignadas ▼
              </option>
              <option value="Asturias">Asturias</option>
              <option value="Castilla-León">Castilla-León</option>
              <option value="Galicia">Galicia</option>
            </select>
          </div>
        </div>

        <input
          type="number"
          placeholder="Nº de tu tracker"
          name="tracker"
          min="10"
          className={styles['numberForm']}
          required
        />
        <label htmlFor="file">Sube tu foto de perfil</label>
        <input
          id="file"
          type="file"
          placeholder="Sube tu foto de perfil"
          name="avatar"
          className={styles['fileForm']}
          accept="image/png, image/jpeg, image/webp"
        />
      </div>
      <button className={styles['buttonForm']} type="submit">
        Enviar
      </button>
    </form>
  );
}

export default Register;
