import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="h-[80px]">
        <div className="container mx-auto flex justify-between items-center h-full">
            <h1>マイブログ</h1>
            <ul>
                <li>
                    <Link to="/blog/new">投稿する</Link>
                </li>
            </ul>
        </div>
    </header>
  )
}
