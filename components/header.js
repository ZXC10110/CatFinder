import Link from 'next/link';

export default function Header() {
  return (
    <ul>
      <li>
        <Link href="/">
            Home
        </Link>
      </li>
      <li>
        <Link href="/queue">
            Queue
        </Link>
      </li>
      <li>
        <Link href="/all-cat">
            all-cat
        </Link>
      </li>
      <li>
        <Link href="/shlter/my-cat">
            my-cat
        </Link>
      </li>
    </ul>
  );
}