import { generateHTML } from "@tiptap/html/server";
import StarterKit from "@tiptap/starter-kit";
import "./styles.scss";
interface PageProps {
  params: {
    category_slug: string;
    post_slug: string;
  };
}

interface BlogPost {
  id: string;
  category_id: string;
  title: string;
  slug: string;
  body: Record<string, any>; // Tiptap JSON
  created_at: string;
  updated_at?: string;
}

async function fetchPost(category_slug: string, post_slug: string) {
  const res = await fetch(
    `https://test_api.nuraloom.xyz/${category_slug}/${post_slug}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Failed to fetch post");

  return res.json() as Promise<BlogPost>;
}

export default async function PostPage({ params }: PageProps) {
  const { category_slug, post_slug } = await params;
  const post = await fetchPost(category_slug, post_slug);

  const html = generateHTML(post.body, [StarterKit]);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <article
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
