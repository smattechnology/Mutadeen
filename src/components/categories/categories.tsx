"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Card from "../card/Card";

// Define the Category type
interface Category {
  id: number;
  name: string;
  description: string;
  img?: string; // Optional if you're using images
}

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://test_api.nuraloom.xyz/get-categories"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data: Category[] = await response.json();
        console.log("Fetched categories:", data); // Debugging line

        setCategories(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="p-4 h-full lg:max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {error && <p className="text-red-500">{error}</p>}
      {loading && <p>Loading categories...</p>}
      {!loading && !error && categories.length === 0 && (
        <p>No categories found.</p>
      )}
      {categories.map((category) => (
        <Card
          key={category.id}
          title={category.name}
          description={category.description}
          img={category.img || "/img/img.jpg"} // Use a default image if none is provided
          link={`/category/${category.name}`}
        />
      ))}
    </div>
  );
};

export default Categories;
