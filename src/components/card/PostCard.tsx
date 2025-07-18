import React from "react";
import Link from "next/link";

interface PostCardProps {
  id: string;
  title: string;
  description: string;
  slug: string;
  created_at: string;
  updated_at: string;
  link: string;
}

const PostCard = ({
  id,
  title,
  description,
  slug,
  created_at,
  updated_at,
  link,
}: PostCardProps) => {
  return (
    <div className="w-full border-2 border-[#4FCE5D] border-bg-2 rounded-lg overflow-hidden hover:shadow-md">
      <div className="p-4">
        <h3 className="text-lg font-semibold">
          <Link href={link}>{title}</Link>
        </h3>
        <p className="text-gray-600">{description}</p>
        <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
          <span>By {}</span>
          <span>{new Date(created_at).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
