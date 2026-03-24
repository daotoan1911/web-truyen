import fs from "fs";
import path from "path";
import Link from "next/link";
import { Truyen } from "@/types/truyen";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const filePath = path.join(process.cwd(), "data/truyen", `${slug}.json`);

  if (!fs.existsSync(filePath)) {
    return <div>Không tìm thấy truyện</div>;
  }

  const content = fs.readFileSync(filePath, "utf-8");
  const truyen: Truyen = JSON.parse(content);

  return (
    <div style={{ padding: 20 }}>
      <Link href="/">← Trang chủ</Link>

      <h1>{truyen.title}</h1>

      {truyen.chapters.map((chap) => (
        <div key={chap.slug}>
          <Link href={`/truyen/${slug}/${chap.slug}`}>
            <p>{chap.title}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}