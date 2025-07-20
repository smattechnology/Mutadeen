// app/blog/[slug]/page.tsx

import React from "react";
import { generateHTML } from "@tiptap/html/server";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Link from "@tiptap/extension-link";
import Code from "@tiptap/extension-code";
import Blockquote from "@tiptap/extension-blockquote";
import HardBreak from "@tiptap/extension-hard-break";

// Example rawContent (in a real app, you'd fetch from DB or API)
const rawContent = `'e12a5e06-f156-48a6-a8da-d2e5283c95bf', '🌐 ওয়েব ও মোবাইল অ্যাপ্লিকেশন', '6025e774-7832-4182-9b2f-f80a4c390cd7', 'web-and-mobile', '{\"type\": \"doc\", \"content\": [{\"type\": \"heading\", \"attrs\": {\"level\": 2, \"textAlign\": null}, \"content\": [{\"text\": \"🌐 ওয়েব ও মোবাইল অ্যাপ্লিকেশন\", \"type\": \"text\", \"marks\": [{\"type\": \"bold\"}]}]}, {\"type\": \"paragraph\", \"attrs\": {\"textAlign\": null}}, {\"type\": \"paragraph\", \"attrs\": {\"textAlign\": null}, \"content\": [{\"text\": \"Write your amazing story here...🌐 ওয়েব ও মোবাইল অ্যাপ্লিকেশন\", \"type\": \"text\"}]}, {\"type\": \"paragraph\", \"attrs\": {\"textAlign\": null}, \"content\": [{\"text\": \"আমরা প্রতিদিন যে অ্যাপগুলো ব্যবহার করি, তা-ই আসলে প্রযুক্তির সেরা ব্যবহার উদাহরণ।\", \"type\": \"text\"}]}, {\"type\": \"orderedList\", \"attrs\": {\"type\": null, \"start\": 1}, \"content\": [{\"type\": \"listItem\", \"content\": [{\"type\": \"paragraph\", \"attrs\": {\"textAlign\": null}, \"content\": [{\"text\": \"বিকাশ / নগদ অ্যাপ\", \"type\": \"text\", \"marks\": [{\"type\": \"bold\"}]}]}]}, {\"type\": \"listItem\", \"content\": [{\"type\": \"paragraph\", \"attrs\": {\"textAlign\": null}, \"content\": [{\"text\": \"রোগ নির্ণয়ের অ্যাপ\", \"type\": \"text\", \"marks\": [{\"type\": \"bold\"}]}]}]}, {\"type\": \"listItem\", \"content\": [{\"type\": \"paragraph\", \"attrs\": {\"textAlign\": null}, \"content\": [{\"text\": \"অনলাইন শিক্ষামূলক প্ল্যাটফর্ম\", \"type\": \"text\", \"marks\": [{\"type\": \"bold\"}]}]}]}, {\"type\": \"listItem\", \"content\": [{\"type\": \"paragraph\", \"attrs\": {\"textAlign\": null}, \"content\": [{\"text\": \"E-commerce\", \"type\": \"text\", \"marks\": [{\"type\": \"link\", \"attrs\": {\"rel\": \"noopener\", \"href\": \"https://daraz.com.bd/\", \"class\": \"\", \"target\": \"_new\"}}, {\"type\": \"bold\"}]}]}]}]}, {\"type\": \"paragraph\", \"attrs\": {\"textAlign\": null}}, {\"type\": \"horizontalRule\"}, {\"type\": \"paragraph\", \"attrs\": {\"textAlign\": null}}, {\"type\": \"paragraph\", \"attrs\": {\"textAlign\": null}}, {\"type\": \"paragraph\", \"attrs\": {\"textAlign\": null}}, {\"type\": \"paragraph\", \"attrs\": {\"textAlign\": null}}, {\"type\": \"paragraph\", \"attrs\": {\"textAlign\": null}}, {\"type\": \"paragraph\", \"attrs\": {\"textAlign\": null}}, {\"type\": \"paragraph\", \"attrs\": {\"textAlign\": null}}, {\"type\": \"paragraph\", \"attrs\": {\"textAlign\": null}}, {\"type\": \"paragraph\", \"attrs\": {\"textAlign\": null}}, {\"type\": \"paragraph\", \"attrs\": {\"textAlign\": null}}, {\"type\": \"paragraph\", \"attrs\": {\"textAlign\": null}}, {\"type\": \"paragraph\", \"attrs\": {\"textAlign\": null}}, {\"type\": \"paragraph\", \"attrs\": {\"textAlign\": null}}, {\"type\": \"paragraph\", \"attrs\": {\"textAlign\": null}}, {\"type\": \"heading\", \"attrs\": {\"level\": 3, \"textAlign\": null}, \"content\": [{\"text\": \"🔒 সাইবার নিরাপত্তা\", \"type\": \"text\"}]}, {\"type\": \"paragraph\", \"attrs\": {\"textAlign\": null}, \"content\": [{\"text\": \"আমাদের তথ্য রক্ষা করতে হলে কিছু মূল নিরাপত্তা ব্যবস্থা নেওয়া জরুরি।\", \"type\": \"text\"}]}, {\"type\": \"paragraph\", \"attrs\": {\"textAlign\": null}, \"content\": [{\"text\": \"পদ্ধতিবিবরণ2FAদ্বিস্তর প্রমাণীকরণSSLসুরক্ষিত সার্ভারTokenসেশন ম্যানেজমেন্ট\", \"type\": \"text\"}]}, {\"type\": \"horizontalRule\"}, {\"type\": \"heading\", \"attrs\": {\"level\": 3, \"textAlign\": null}, \"content\": [{\"text\": \"🖼️ একটি প্রযুক্তির চিত্র\", \"type\": \"text\"}]}, {\"type\": \"paragraph\", \"attrs\": {\"textAlign\": null}}, {\"type\": \"paragraph\", \"attrs\": {\"textAlign\": null}, \"content\": [{\"text\": \"চিত্র: প্রযুক্তির জটিলতা এবং সমাধান (রুবিক্স কিউব)\", \"type\": \"text\", \"marks\": [{\"type\": \"italic\"}]}]}, {\"type\": \"horizontalRule\"}, {\"type\": \"heading\", \"attrs\": {\"level\": 3, \"textAlign\": null}, \"content\": [{\"text\": \"🧭 ভবিষ্যতের প্রযুক্তি\", \"type\": \"text\"}]}, {\"type\": \"blockquote\", \"content\": [{\"type\": \"paragraph\", \"attrs\": {\"textAlign\": null}, \"content\": [{\"text\": \"আমরা ভবিষ্যতের দিকেই এগোচ্ছি, যেখানে প্রযুক্তিই হবে চালিকাশক্তি।\", \"type\": \"text\"}]}]}, {\"type\": \"heading\", \"attrs\": {\"level\": 3, \"textAlign\": null}, \"content\": [{\"text\": \"ভবিষ্যৎ প্রযুক্তি:\", \"type\": \"text\"}]}, {\"type\": \"bulletList\", \"content\": [{\"type\": \"listItem\", \"content\": [{\"type\": \"paragraph\", \"attrs\": {\"textAlign\": null}, \"content\": [{\"text\": \"🌌 কোয়ান্টাম কম্পিউটিং\", \"type\": \"text\"}]}]}, {\"type\": \"listItem\", \"content\": [{\"type\": \"paragraph\", \"attrs\": {\"textAlign\": null}, \"content\": [{\"text\": \"🦾 বায়োনিক শরীর\", \"type\": \"text\"}]}]}, {\"type\": \"listItem\", \"content\": [{\"type\": \"paragraph\", \"attrs\": {\"textAlign\": null}, \"content\": [{\"text\": \"🕶️ \", \"type\": \"text\"}, {\"text\": \"মেটাভার্স ও VR\", \"type\": \"text\", \"marks\": [{\"type\": \"link\", \"attrs\": {\"rel\": \"noopener\", \"href\": \"https://en.wikipedia.org/wiki/Metaverse\", \"class\": \"\", \"target\": \"_new\"}}]}]}]}]}, {\"type\": \"horizontalRule\"}, {\"type\": \"heading\", \"attrs\": {\"level\": 3, \"textAlign\": null}, \"content\": [{\"text\": \"✅ উপসংহার\", \"type\": \"text\"}]}, {\"type\": \"paragraph\", \"attrs\": {\"textAlign\": null}, \"content\": [{\"text\": \"প্রযুক্তি হয়তো সামনে খুব বেশি দেখা যায় না, কিন্তু পিছনে তার অবদান বিশাল। আমাদের উচিত:\", \"type\": \"text\"}]}, {\"type\": \"bulletList\", \"content\": [{\"type\": \"listItem\", \"content\": [{\"type\": \"paragraph\", \"attrs\": {\"textAlign\": null}, \"content\": [{\"text\": \"প্রযুক্তিকে ভয় না পেয়ে ব্যবহার শেখা\", \"type\": \"text\"}]}]}, {\"type\": \"listItem\", \"content\": [{\"type\": \"paragraph\", \"attrs\": {\"textAlign\": null}, \"content\": [{\"text\": \"সময়োপযোগী দক্ষতা অর্জন\", \"type\": \"text\"}]}]}, {\"type\": \"listItem\", \"content\": [{\"type\": \"paragraph\", \"attrs\": {\"textAlign\": null}, \"content\": [{\"text\": \"গঠনমূলক কাজে প্রযুক্তির প্রয়োগ\", \"type\": \"text\"}]}]}]}, {\"type\": \"horizontalRule\"}, {\"type\": \"heading\", \"attrs\": {\"level\": 3, \"textAlign\": null}, \"content\": [{\"text\": \"📚 আরও পড়ুন\", \"type\": \"text\"}]}, {\"type\": \"bulletList\", \"content\": [{\"type\": \"listItem\", \"content\": [{\"type\": \"paragraph\", \"attrs\": {\"textAlign\": null}, \"content\": [{\"text\": \"🔗 \", \"type\": \"text\"}, {\"text\": \"কৃত্রিম বুদ্ধিমত্তা কি?\", \"type\": \"text\", \"marks\": [{\"type\": \"link\", \"attrs\": {\"rel\": \"noopener\", \"href\": \"https://bn.wikipedia.org/wiki/%E0%A6%95%E0%A7%83%E0%A6%A4%E0%A7%8D%E0%A6%B0%E0%A6%BF%E0%A6%AE_%E0%A6%AC%E0%A7%81%E0%A6%A6%E0%A7%8D%E0%A6%A7%E0%A6%BF%E0%A6%A4%E0%A7%8D%E0%A6%A4%E0%A6%BE\", \"class\": \"\", \"target\": \"_new\"}}]}]}]}, {\"type\": \"listItem\", \"content\": [{\"type\": \"paragraph\", \"attrs\": {\"textAlign\": null}, \"content\": [{\"text\": \"🔐 \", \"type\": \"text\"}, {\"text\": \"সাইবার নিরাপত্তা গাইড\", \"type\": \"text\", \"marks\": [{\"type\": \"link\", \"attrs\": {\"rel\": \"noopener\", \"href\": \"https://owasp.org/\", \"class\": \"\", \"target\": \"_new\"}}]}]}]}, {\"type\": \"listItem\", \"content\": [{\"type\": \"paragraph\", \"attrs\": {\"textAlign\": null}, \"content\": [{\"text\": \"🧑‍💻 \", \"type\": \"text\"}, {\"text\": \"ওপেনসোর্স প্ল্যাটফর্ম\", \"type\": \"text\", \"marks\": [{\"type\": \"link\", \"attrs\": {\"rel\": \"noopener\", \"href\": \"https://github.com/\", \"class\": \"\", \"target\": \"_new\"}}]}]}]}]}, {\"type\": \"horizontalRule\"}, {\"type\": \"heading\", \"attrs\": {\"level\": 3, \"textAlign\": null}, \"content\": [{\"text\": \"✍️ লেখক পরিচিতি\", \"type\": \"text\"}]}, {\"type\": \"paragraph\", \"attrs\": {\"textAlign\": null}, \"content\": [{\"text\": \"আবির হাসান\", \"type\": \"text\", \"marks\": [{\"type\": \"bold\"}]}, {\"text\": \" একজন সফটওয়্যার ডেভেলপার ও প্রযুক্তিবিদ। তিনি \", \"type\": \"text\"}, {\"text\": \"S.M.A.T\", \"type\": \"text\", \"marks\": [{\"type\": \"link\", \"attrs\": {\"rel\": \"noopener\", \"href\": \"https://smat.com/\", \"class\": \"\", \"target\": \"_new\"}}]}, {\"text\": \" প্রযুক্তি প্রতিষ্ঠানের প্রতিষ্ঠাতা।\", \"type\": \"text\"}]}, {\"type\": \"paragraph\", \"attrs\": {\"textAlign\": null}, \"content\": [{\"text\": \"📧 ইমেইল: \", \"type\": \"text\"}, {\"text\": \"abir@example.com\", \"type\": \"text\", \"marks\": [{\"type\": \"code\"}]}, {\"type\": \"hardBreak\"}, {\"text\": \"🌐 ওয়েবসাইট: \", \"type\": \"text\"}, {\"text\": \"abirhasan.dev\", \"type\": \"text\", \"marks\": [{\"type\": \"link\", \"attrs\": {\"rel\": \"noopener\", \"href\": \"https://abirhasan.dev/\", \"class\": \"\", \"target\": \"_new\"}}]}]}]}', '2025-07-18 17:53:15', NULL    `;

// Extract JSON from rawContent
const match = rawContent.match(/'({.*})'/);
if (!match) {
  throw new Error("❌ No valid TipTap JSON found in rawContent");
}

const escapedJsonStr = match[1];

// Unescape JSON string
const unescapedJsonStr = escapedJsonStr.replace(/\\"/g, '"');

let tiptapJson;
try {
  tiptapJson = JSON.parse(unescapedJsonStr);
} catch (err) {
  throw new Error("❌ Failed to parse JSON: " + err.message);
}

interface BlogPageProps {
  params: { slug: string };
}

const BlogPage = async ({ params }: BlogPageProps) => {
  // TODO: Replace with real fetch based on slug
  // e.g. const rawContent = await getBlogPostContent(params.slug);

  // Generate HTML from TipTap JSON
  // Generate HTML from TipTap JSON

  function transformEmptyParagraphsToHardBreak(json: any): any {
    if (!json || typeof json !== "object") return json;

    if (json.type === "paragraph") {
      const isEmpty =
        !json.content ||
        json.content.every((node: any) => {
          if (node.type === "text") {
            return !node.text || node.text.trim() === "";
          }
          return false;
        });

      if (isEmpty) {
        return {
          type: "hardBreak",
        };
      }
    }

    // Recursively process children
    if (Array.isArray(json.content)) {
      return {
        ...json,
        content: json.content
          .map((child: any) => transformEmptyParagraphsToHardBreak(child))
          .filter(Boolean), // remove nulls
      };
    }

    return json;
  }

  const html = generateHTML(transformEmptyParagraphsToHardBreak(tiptapJson), [
    Document,
    Paragraph,
    Text,
    Bold,
    Italic,
    Heading,
    BulletList,
    OrderedList,
    ListItem,
    HorizontalRule,
    Link,
    Code,
    Blockquote,
    HardBreak,
  ]);

  // Replace empty paragraphs with <br>
  const processedHtml = html.replace(/<p>(\s|&nbsp;)*<\/p>/g, "<br>");

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-2">🌐 ওয়েব ও মোবাইল অ্যাপ্লিকেশন</h1>
      <p className="text-sm text-gray-500 mb-6">🗓️ ২০২৫-০৭-১৮</p>

      <article
        className="prose prose-lg max-w-none dark:prose-invert prose-a:text-blue-600 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </main>
  );
};

export default BlogPage;
