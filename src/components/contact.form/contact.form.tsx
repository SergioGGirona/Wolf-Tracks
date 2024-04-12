import { SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useUsers } from '../../hooks/use.users';
import styles from './contact.form.module.scss';

function Contact() {
  const navigate = useNavigate();
  const { suscribeVisitor } = useUsers();

  const handleSubmit = (ev: SyntheticEvent) => {
    ev.preventDefault();
    const form = ev.target as HTMLFormElement;

    const suscribeData = {
      userName: (form.elements.namedItem('userName') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
    };
    suscribeVisitor(suscribeData);

    Swal.fire({
      title: 'Te hemos añadido a nuestra manada',
      text: 'En nada recibirás un correo con toda la información. Por si acaso, revisa tu spam',
      imageUrl:
        'https://res.cloudinary.com/dn5pxi50z/image/upload/v1696935314/favicon_pmfgdy.png',
      imageWidth: 200,
      imageHeight: 200,
      imageAlt: 'Ilustración de lobo aullando',
    });

    navigate('/');
  };

  return (
    <section className={styles.contact}>
      <a role="button" href={'/'}>
        Volver
      </a>

      <form className={styles.contactForm} role="form" onSubmit={handleSubmit}>
        <h2>¡Suscríbete a nuestra newsletter!</h2>
        <p>
          Recibirás mensualmente, con la luna llena, noticias y curiosidades
          para conocer y proteger al lobo ibérico.
        </p>
        <div className={styles['loginContainer']}>
          <input
            type="text"
            placeholder="¿Cuál es tu nombre?"
            name="userName"
            className={styles.textForm}
            required
          />

          <input
            type="email"
            placeholder="¿Y tu correo?"
            name="email"
            className={styles.textForm}
            required
          />
        </div>
        <button className={styles.buttonForm} type="submit">
          Enviar
        </button>
      </form>
    </section>
  );
}

export default Contact;
