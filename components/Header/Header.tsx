import css from "@/components/Header/Header.module.css";
import Link from "next/link";

const Header = () => {
  <header className={css.header}>
    <Link href="/" aria-label="Home">
      NoteHub
    </Link>
    <nav aria-label="Main Navigation">
      <ul className={css.navigation}>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/notes">Notes</Link>
        </li>
      </ul>
    </nav>
  </header>;
};
