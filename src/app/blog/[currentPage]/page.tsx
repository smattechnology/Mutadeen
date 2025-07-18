import Card from "@/components/card/Card";
import PostCard from "@/components/card/PostCard";
import Link from "next/link";
const dummyPosts = [
  {
    id: 1,
    title: "Understanding JavaScript Closures",
    slug: "understanding-javascript-closures",
    description: "A deep dive into closures and how they work in JavaScript.",
    link: "/blog/understanding-javascript-closures",
    created_at: "2024-06-01",
    updated_at: "2024-06-02",
  },
  {
    id: 2,
    title: "10 Tips to Improve React Performance",
    slug: "react-performance-tips",
    description:
      "Learn how to speed up your React apps with these 10 proven techniques.",
    link: "/blog/react-performance-tips",
    created_at: "2024-06-03",
    updated_at: "2024-06-04",
  },
  {
    id: 3,
    title: "Mastering Python Generators",
    slug: "mastering-python-generators",
    description: "Use generators to write efficient and clean Python code.",
    link: "/blog/mastering-python-generators",
    created_at: "2024-06-05",
    updated_at: "2024-06-06",
  },
  {
    id: 4,
    title: "CSS Grid vs Flexbox: When to Use What?",
    slug: "css-grid-vs-flexbox",
    description:
      "Explore the differences between CSS Grid and Flexbox layout systems.",
    link: "/blog/css-grid-vs-flexbox",
    created_at: "2024-06-07",
    updated_at: "2024-06-08",
  },
  {
    id: 5,
    title: "Beginner’s Guide to TypeScript",
    slug: "beginners-guide-to-typescript",
    description:
      "A quick and easy guide to get started with TypeScript in your projects.",
    link: "/blog/beginners-guide-to-typescript",
    created_at: "2024-06-09",
    updated_at: "2024-06-10",
  },
  {
    id: 6,
    title: "How to Secure Your Node.js App",
    slug: "secure-nodejs-app",
    description: "Follow best practices to secure your backend and APIs.",
    link: "/blog/secure-nodejs-app",
    created_at: "2024-06-11",
    updated_at: "2024-06-12",
  },
  {
    id: 7,
    title: "What is Server-Side Rendering (SSR)?",
    slug: "what-is-ssr",
    description:
      "Understand the benefits and drawbacks of SSR in modern web apps.",
    link: "/blog/what-is-ssr",
    created_at: "2024-06-13",
    updated_at: "2024-06-14",
  },
  {
    id: 8,
    title: "Creating a REST API with FastAPI",
    slug: "rest-api-with-fastapi",
    description: "A step-by-step tutorial to build your first FastAPI backend.",
    link: "/blog/rest-api-with-fastapi",
    created_at: "2024-06-15",
    updated_at: "2024-06-16",
  },
  {
    id: 9,
    title: "Tailwind CSS Tips and Tricks",
    slug: "tailwind-css-tips",
    description:
      "Boost your productivity using Tailwind utility classes effectively.",
    link: "/blog/tailwind-css-tips",
    created_at: "2024-06-17",
    updated_at: "2024-06-18",
  },
  {
    id: 10,
    title: "Understanding Git Rebase vs Merge",
    slug: "git-rebase-vs-merge",
    description:
      "Learn when to use rebase and merge in collaborative workflows.",
    link: "/blog/git-rebase-vs-merge",
    created_at: "2024-06-19",
    updated_at: "2024-06-20",
  },
  {
    id: 11,
    title: "JavaScript Event Loop Explained",
    slug: "event-loop-explained",
    description: "Unravel the mystery behind JavaScript’s async behavior.",
    link: "/blog/event-loop-explained",
    created_at: "2024-06-21",
    updated_at: "2024-06-22",
  },
  {
    id: 12,
    title: "Getting Started with Next.js App Router",
    slug: "nextjs-app-router",
    description: "A beginner’s guide to routing in the Next.js 13+ App Router.",
    link: "/blog/nextjs-app-router",
    created_at: "2024-06-23",
    updated_at: "2024-06-24",
  },
  {
    id: 13,
    title: "How OAuth2 Works (for Beginners)",
    slug: "how-oauth2-works",
    description:
      "Understand the OAuth2 flow and how it's used in web authentication.",
    link: "/blog/how-oauth2-works",
    created_at: "2024-06-25",
    updated_at: "2024-06-26",
  },
  {
    id: 14,
    title: "Deploying to Vercel vs Netlify",
    slug: "vercel-vs-netlify",
    description: "Compare two top frontend deployment platforms.",
    link: "/blog/vercel-vs-netlify",
    created_at: "2024-06-27",
    updated_at: "2024-06-28",
  },
  {
    id: 15,
    title: "Build a Dark Mode Toggle in React",
    slug: "react-dark-mode-toggle",
    description:
      "Add theme switching with just a few lines of React and Tailwind CSS.",
    link: "/blog/react-dark-mode-toggle",
    created_at: "2024-06-29",
    updated_at: "2024-06-30",
  },
];

interface PageProps {
  params: {
    page: string; // Not an array!
  };
}

const POSTS_PER_PAGE = 10; // adjust if needed

export default async function BlogPage({ params }: PageProps) {
  const currentPageInt = parseInt(params.page || "1", 10);

  if (isNaN(currentPageInt) || currentPageInt < 1) {
    return <div>Invalid page</div>;
  }
  const totalPages = Math.ceil(dummyPosts.length / POSTS_PER_PAGE);

  // Validate current page bounds
  if (currentPageInt < 1 || currentPageInt > totalPages) {
    return <div>Page not found</div>;
  }

  // Calculate which page numbers to show (4 total)
  let startPage = Math.max(1, currentPageInt - 1);
  const endPage = Math.min(totalPages, startPage + 3);

  // Adjust startPage if less than 4 pages shown at the end
  if (endPage - startPage < 3) {
    startPage = Math.max(1, endPage - 3);
  }

  // Slice posts for current page
  const startIndex = (currentPageInt - 1) * POSTS_PER_PAGE;
  const pagedPosts = dummyPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  return (
    <div className="w-full lg:max-w-7xl mx-auto p-10 flex flex-col justify-between items-start">
      <div className="w-full flex justify-center items-center">Post List</div>

      <div className="w-full flex justify-between items-start gap-4">
        <div className="w-4/5 flex flex-col gap-4">
          {pagedPosts.map((post) => (
            <PostCard
              key={post.id}
              id={post.id.toString()}
              title={post.title}
              description={post.description}
              slug={post.slug}
              link={post.link}
              created_at={post.created_at}
              updated_at={post.updated_at}
            />
          ))}
        </div>
        <div className="w-1/5">
          <span>Category List</span>
        </div>
      </div>

      {/* Pagination controls */}
      <div className="w-full flex justify-center items-center gap-2 mt-6">
        {/* Prev button */}
        <Link
          href={`/blog/${currentPageInt - 1 === 1 ? "" : currentPageInt - 1}`}
        >
          <button
            className="px-3 py-1 rounded border text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
            disabled={currentPageInt === 1}
          >
            Prev
          </button>
        </Link>

        {/* Page numbers */}
        {Array.from({ length: endPage - startPage + 1 }, (_, idx) => {
          const pageNum = startPage + idx;
          return (
            <Link key={pageNum} href={`/blog/${pageNum === 1 ? "" : pageNum}`}>
              <button
                className={`px-3 py-1 rounded border ${
                  pageNum === currentPageInt
                    ? "bg-blue-600 text-white border-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {pageNum}
              </button>
            </Link>
          );
        })}

        {/* Next button */}
        <Link href={`/blog/${currentPageInt + 1}`}>
          <button
            className="px-3 py-1 rounded border text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
            disabled={currentPageInt === totalPages}
          >
            Next
          </button>
        </Link>
      </div>
    </div>
  );
}
