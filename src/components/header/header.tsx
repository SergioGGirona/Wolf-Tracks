import { useState } from 'react';
import { AiOutlineLogin, AiOutlineLogout } from 'react-icons/ai';
import { PiPlusLight } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import { useUsers } from '../../hooks/use.users';
import styles from './header.module.scss';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { token } = useUsers();

  return (
    <>
      <header>
        <h1 className={`${styles.mainheader}`}>Wolf Tracks</h1>
        <nav>
          <Link to={'/'}>
            <img
              className={styles['logo']}
              src="../../../Logo_white.png"
              alt="El logotipo de Wolf Tracks, un lobo dentro de la O."
            />
          </Link>
          <div>
            <section
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
              }}
              role="button"
              aria-label="button"
            >
              <PiPlusLight
                className={styles['openMenu']}
                style={
                  isMenuOpen
                    ? { transform: 'rotate(45deg)' }
                    : { transform: 'rotate(270deg)' }
                }
              />
            </section>
            <ul
              style={
                isMenuOpen
                  ? { right: '0%', top: '100%', opacity: 1 }
                  : { right: '0%', top: '-500%', opacity: 0 }
              }
            >
              <li>
                <Link
                  className={styles['link']}
                  to={'/'}
                  onClick={() => {
                    setIsMenuOpen(!isMenuOpen);
                  }}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className={styles['link']}
                  to={'/aboutus'}
                  onClick={() => {
                    setIsMenuOpen(!isMenuOpen);
                  }}
                >
                  Conócenos
                </Link>
              </li>
              <li>
                <Link
                  className={styles['link']}
                  to={'/suscribe'}
                  onClick={() => {
                    setIsMenuOpen(!isMenuOpen);
                  }}
                >
                  ¿Oyes el aullido?
                </Link>
              </li>
              {token ? (
                <>
                  <li>
                    <Link
                      className={styles['link']}
                      to={'/profile'}
                      onClick={() => {
                        setIsMenuOpen(!isMenuOpen);
                      }}
                    >
                      Tu perfil
                    </Link>
                  </li>

                  <li className={styles.loginOut}>
                    <a
                      className={styles['link']}
                      href={'/'}
                      onClick={() => {
                        setIsMenuOpen(!isMenuOpen);
                      }}
                    >
                      Logout
                    </a>
                    <AiOutlineLogout />
                  </li>
                </>
              ) : (
                <li className={styles.loginOut}>
                  <Link
                    className={styles['link']}
                    to={'/login'}
                    onClick={() => {
                      setIsMenuOpen(!isMenuOpen);
                    }}
                  >
                    Login
                  </Link>
                  <AiOutlineLogin id="login" />
                </li>
              )}
            </ul>
          </div>
        </nav>
      </header>
      <div className={`${styles.headerSeparator}`}></div>
    </>
  );
}
