import { SyntheticEvent } from 'react';
import { BiLocationPlus } from 'react-icons/bi';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useWolves } from '../../hooks/use.wolves';
import { Wolf } from '../../model/wolf';
import styles from './update.form.module.scss';

function UpdateForm() {
  const navigate = useNavigate();

  const { wolves, updateWolf } = useWolves();
  const { id } = useParams();
  const wolf = wolves.find((wolf) => id === wolf.id) as Wolf;

  const handleSubmit = (ev: SyntheticEvent) => {
    ev.preventDefault();
    const formElement = ev.currentTarget as HTMLFormElement;

    const wolfData: Partial<Wolf> = {
      nickname: (formElement.elements.namedItem('nickname') as HTMLFormElement)
        .value,
      age: (formElement.elements.namedItem('age') as HTMLFormElement).value,
      isAlpha: (formElement.elements.namedItem('isAlpha') as HTMLFormElement)
        .value,
      comments: (formElement.elements.namedItem('comments') as HTMLFormElement)
        .value,
    };
    updateWolf(wolfData, wolf.id);
    navigate('/profile');
  };

  const handleCoordinates = (ev: SyntheticEvent) => {
    ev.preventDefault();
    const formElement = ev.currentTarget as HTMLFormElement;
    const newCoordinates: string = (
      formElement.elements.namedItem('tracks') as HTMLFormElement
    ).value;

    const dataWolf: Partial<Wolf> = { tracks: [] };
    if (!newCoordinates) return;
    dataWolf.tracks = wolf.tracks;
    dataWolf.tracks = [...dataWolf.tracks, newCoordinates];
    updateWolf(dataWolf, wolf.id);
  };

  return (
    <div className={styles.update}>
      <form role="form" onSubmit={handleSubmit} className={styles.updateForm}>
        <p>Actualiza la información de {wolf.codeName}</p>
        <label htmlFor="nickname">¿Quieres cambiar el mote?</label>
        <input
          id="nickname"
          type="text"
          placeholder={wolf.nickname}
          name="nickname"
          className={styles.textForm}
        />
        <p className={styles.aclaration}>
          Recuerda que tiene que seguir las reglas de WolfTracks
        </p>
        <label htmlFor="age">¿Cuál es su edad ahora?</label>
        <input
          id="age"
          type="number"
          placeholder="{wolf.age}"
          name="age"
          className={styles.numberForm}
          defaultValue={wolf.age}
          required
        />
        <fieldset className={styles.isAlphaSelector}>
          <legend>¿Es el nuevo alfa de la manada?</legend>
          <div>
            <div>
              <input
                type="radio"
                id="isAlphatrue"
                name="isAlpha"
                value="true"
                required
              />
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
          </div>
        </fieldset>

        <label htmlFor="textarea">¿Cuáles son las novedades?</label>
        <textarea
          id="textarea"
          placeholder="Escribe sobre actitud, noticias de la mandada..."
          name="comments"
          className={styles['textForm']}
          rows={5}
          cols={30}
          defaultValue={wolf.comments}
          required
        ></textarea>
        <button className={styles.buttonForm} type="submit">
          Actualizar
        </button>
      </form>

      <form
        onSubmit={handleCoordinates}
        role="form"
        className={styles.updateForm}
      >
        <p>Anteriores coordenadas</p>

        {wolf.tracks.map((track, index) => (
          <span key={index}>{track}</span>
        ))}

        <input
          type="text"
          placeholder="¿Nuevas coordenadas?"
          name="tracks"
          className={styles.textForm}
        />

        <button className={styles.buttonCoordinates} type="submit">
          <BiLocationPlus />
          Añadir
        </button>
      </form>
      <Link className={styles.backButton} to={'/profile'}>
        Volver
      </Link>
    </div>
  );
}

export default UpdateForm;
