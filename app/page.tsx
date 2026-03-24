import fs from "fs";
import path from "path";
import Link from "next/link";
import { Truyen } from "@/types/truyen";

export default function Home() {
  const folder = path.join(process.cwd(), "data/truyen");
  const files = fs.readdirSync(folder);

  const truyenList: Truyen[] = files.map((file) => {
    const content = fs.readFileSync(path.join(folder, file), "utf-8");
    return JSON.parse(content) as Truyen;
  });

  return (
    <div style={{ padding: 20 }}>
      <h1>📚 Web Truyện</h1>

      {truyenList.map((t) => (
        <div key={t.slug}>
          <Link href={`/truyen/${t.slug}`}>
            <h2>{t.title}</h2>
          </Link>
        </div>
      ))}
    </div>
  );
}