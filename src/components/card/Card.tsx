import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CardProps {
  title: string;
  description: string;
  img: string;
  link: string; // Optional link prop
}

const Card: React.FC<CardProps> = ({ title, description, img, link }) => {
  return (
    <div>
      <div className="bg-white border border-gray-300 hover:shadow-md rounded-lg p-4 space-y-4">
        <Image
          src={img}
          width={500}
          height={300}
          alt={title}
          className="mt-2 rounded-md"
        />
        <Link href={link || "#"} className="text-xl font-semibold mb-2">
          {title}
        </Link>
        <p className="text-gray-700">{description}</p>
        <Link href={link || "#"} className="bg-2 text-white px-4 py-2 rounded">
          এখানে জানুন
        </Link>
      </div>
    </div>
  );
};

export default Card;
