import { Home } from '../../components/main.home/main.home';
import { Info } from '../../components/main.info/main.info';
import { Wolves } from '../../components/wolves/wolves';
import styles from './home.page.module.scss';

function HomePage() {
  return (
    <main className={styles.main}>
      <Home></Home>
      <Info></Info>
      <Wolves></Wolves>
    </main>
  );
}
export default HomePage;
