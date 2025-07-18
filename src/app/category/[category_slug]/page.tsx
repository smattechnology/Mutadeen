"use strict";
import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import PostCard from "@/components/card/PostCard";

interface CategoryData {
  name: string;
  description: string;
  posts: Array<{
    id: string;
    title: string;
    description: string;
    slug: string;
    created_at: string;
    updated_at: string;
  }>;
  created_at: string;
  updated_at: string;
}

interface PageProps {
  params: Promise<{ category_slug: string }> | { category_slug: string };
}

async function fetchCategory(
  category_slug: string
): Promise<CategoryData | null> {
  try {
    const res = await fetch(
      `https://test_api.nuraloom.xyz/category/${category_slug}`
    );
    if (!res.ok) throw new Error("Category not found");
    const data: CategoryData = await res.json();
    return data;
  } catch {
    return null;
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const resolvedParams = params instanceof Promise ? await params : params;
  const { category_slug } = resolvedParams;

  const categoryData = await fetchCategory(category_slug);

  if (!categoryData) {
    notFound();
  }

  return (
    <div className="w-full lg:max-w-7xl mx-auto p-4 lg:p-0 flex flex-col items-start">
      <div className="w-full flex flex-col items-center">
        <h2>{categoryData.name}</h2>
        <p>{categoryData.description}</p>
      </div>
      <div className="w-full lg:max-w-7xl mx-auto flex flex-col md:flex-row gap-4">
        <div className="w-full flex flex-col gap-4">
          {categoryData.posts.map((post) => (
            <PostCard
              key={post.id}
              title={post.title}
              description={post.description}
              slug={post.slug}
              id={post.id}
              created_at={post.created_at}
              updated_at={post.updated_at}
              link={`/category/${category_slug}/${post.slug}`}
            />
          ))}
        </div>
        <div className="col-span-1 md:col-span-1 ">
          <h3 className="text-lg font-semibold mb-4">Related Categories</h3>
          {/* Placeholder for related categories */}
          <p>No related categories available.</p>
        </div>
      </div>
    </div>
  );
}
