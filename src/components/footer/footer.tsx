import { AiOutlineInstagram } from 'react-icons/ai';
import { FaPaw, FaTiktok } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

import styles from './footer.module.scss';
export function Footer() {
  return (
    <footer>
      <p>Protejamos al lobo: difunde nuestro aullido.</p>
      <ul>
        <li>
          <a
            href="https://loboiberico.com/"
            aria-label="Página de protectora ASCEL"
          >
            <FaPaw className={`${styles.icon}`} />
            <em>ASCEL</em>
          </a>
        </li>
        <li>
          <a
            href="https://www.instagram.com/"
            aria-label="Página Instagram de WolfTracks"
          >
            <AiOutlineInstagram className={`${styles.icon}`} />
            <em>Instagram</em>
          </a>
        </li>
        <li>
          <a
            href="https://twitter.com/"
            aria-label="Página Twitter de WolfTracks"
          >
            <FaXTwitter className={`${styles.icon}`} />
            <em>Twitter</em>
          </a>
        </li>
        <li>
          <a
            href="https://www.tiktok.com/es/"
            aria-label="Página Tik Tok de WolfTracks"
          >
            <FaTiktok className={`${styles.icon}`} />
            <em>Tik Tok</em>
          </a>
        </li>
      </ul>
    </footer>
  );
}
