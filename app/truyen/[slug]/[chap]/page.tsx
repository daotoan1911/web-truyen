import fs from "fs";
import path from "path";
import Link from "next/link";
import { Truyen } from "@/types/truyen";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string; chap: string }>;
}) {
  const { slug, chap } = await params;

  const filePath = path.join(process.cwd(), "data/truyen", `${slug}.json`);

  if (!fs.existsSync(filePath)) {
    return <div>Không tìm thấy truyện</div>;
  }

  const content = fs.readFileSync(filePath, "utf-8");
  const truyen: Truyen = JSON.parse(content);

  const index = truyen.chapters.findIndex((c) => c.slug === chap);
  const currentChap = truyen.chapters[index];

  if (!currentChap) return <div>Không tìm thấy chap</div>;

  const prev = truyen.chapters[index - 1];
  const next = truyen.chapters[index + 1];

  return (
    <div style={{ padding: 20, maxWidth: 700, margin: "auto" }}>
      <Link href="/">← Trang chủ</Link>

      <h1>{truyen.title}</h1>
      <h2>{currentChap.title}</h2>

      <p style={{ lineHeight: 1.8 }}>{currentChap.content}</p>

      <div style={{ marginTop: 30 }}>
        {prev && (
          <Link href={`/truyen/${slug}/${prev.slug}`}>
            ← Chap trước
          </Link>
        )}
        <div style={{ marginTop: 30, padding: 15, background: "#fff3cd" }}>
  <p>🔥 Gợi ý sản phẩm hay:</p>

  <a
    href="https://www.facebook.com/daotoan2002/?locale=vi_VN"
    target="_blank"
    style={{ color: "red", fontWeight: "bold" }}
  >
    👉 Mua ngay trên Shopee
  </a>
</div>
        {" | "}

        {next && (
          <Link href={`/truyen/${slug}/${next.slug}`}>
            Chap sau →
          </Link>
        )}
      </div>
    </div>
  );
}