import { SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWolves } from '../../hooks/use.wolves';
import styles from './register.wolf.module.scss';

function RegisterWolf() {
  const navigate = useNavigate();
  const { addWolf } = useWolves();
  const handleSubmit = (ev: SyntheticEvent) => {
    ev.preventDefault();

    const formElement = ev.currentTarget as HTMLFormElement;
    const formData = new FormData(formElement);
    addWolf(formData);
    navigate('/profile');
  };

  return (
    <form
      role="form"
      onSubmit={handleSubmit}
      className={styles['formWolfContainer']}
    >
      <h3>¿Has escuchado un nuevo aullido?</h3>
      <p>Rellena los campos para unir al lobo a la manada.</p>
      <div className={styles['formContainer']}>
        <input
          type="text"
          placeholder="Código único"
          name="codeName"
          className={styles['textForm']}
          required
        />

        <input
          type="text"
          placeholder="Ponle un mote"
          name="nickname"
          className={styles['textForm']}
          required
        />

        <input
          type="number"
          placeholder="Edad aproximada"
          name="age"
          className={styles['numberForm']}
          required
        />

        <div className={styles['fieldset']}>
          <div>
            <select name="territory" id="assingedZone-select" defaultValue={''}>
              <option disabled value="">
                Zona Asignada ▼
              </option>
              <option value="Asturias">Asturias</option>
              <option value="Castilla-León">Castilla-León</option>
              <option value="Galicia">Galicia</option>
            </select>
          </div>
        </div>

        <div className={styles['fieldset']}>
          <div>
            <select name="pack" id="pack-select" defaultValue={''}>
              <option disabled value="">
                ¿A qué manada pertenece? ▼
              </option>
              <option value="As01">As01</option>
              <option value="CL01">CL01</option>
              <option value="CL02">CL02</option>
              <option value="Ga01">Ga01</option>
            </select>
          </div>
        </div>

        <fieldset className={styles.radioSelector}>
          <legend>¿Es un nuevo alfa?</legend>

          <div>
            <input type="radio" id="isAlphatrue" name="isAlpha" value="true" />
            <label htmlFor="isAlphatrue">Sí</label>
          </div>

          <div>
            <input
              type="radio"
              id="isAlphafalse"
              name="isAlpha"
              value="false"
            />
            <label htmlFor="isAlphafalse">No</label>
          </div>
        </fieldset>

        <fieldset className={styles.radioSelector}>
          <legend>¿Es hembra?</legend>

          <div>
            <input
              type="radio"
              id="isFemaletrue"
              name="isFemale"
              value="true"
            />
            <label htmlFor="isFemaletrue">Sí</label>
          </div>

          <div>
            <input
              type="radio"
              id="isFemalefalse"
              name="isFemale"
              value="false"
            />
            <label htmlFor="isFemalefalse">No</label>
          </div>
        </fieldset>

        <input
          type="text"
          placeholder="Coordenadas"
          name="tracks"
          className={styles['textForm']}
          required
        />
        <span>Recuerda separar longitud y latitud por una coma.</span>

        <label htmlFor="file">Sube su fotografía ☉</label>

        <input
          id="file"
          type="file"
          placeholder="Sube su foto"
          name="images"
          accept="image/png, image/jpeg, image/webp"
        />
        <textarea
          placeholder="Cuenta un poco sobre el lobo"
          name="comments"
          className={styles['textForm']}
          rows={6}
          cols={50}
          required
        ></textarea>
      </div>
      <button className={styles['buttonForm']} type="submit">
        Enviar
      </button>
    </form>
  );
}

export default RegisterWolf;
