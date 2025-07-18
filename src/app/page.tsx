import Banner from "@/components/banner/Banner";
import Card from "@/components/card/Card";
import Categories from "@/components/categories/categories";
export default function Home() {
  const cards = [
    {
      title: "রুকইয়াহ ব্লগ",
      description: "রুকইয়াহ বিষয়ক সব লেখা পড়ুন",
      img: "/img/img.jpg",
      link: "/blog",
    },
    {
      title: "ব্লগরুকইয়াহ অডিও",
      description: "রুকইয়াহ শারইয়ার অডিও ডাউনলোড করতে",
      img: "/img/img.jpg",
      link: "/blog",
    },
    {
      title: "রুকইয়ার আয়াত",
      description: "রুকইয়ার আয়াত, দোয়া ইত্যাদি পড়তে",
      img: "/img/img.jpg",
      link: "/blog",
    },
    {
      title: "মোবাইল ও পিসি অ্যাপ",
      description: "রুকইয়াহ বিষয়ক ফ্রি সফটওয়ারগুলো দেখুন",
      img: "/img/img.jpg",
      link: "/blog",
    },
    {
      title: "ইউটিউব চ্যানেল",
      description: "রুকইয়াহ বা লেকচার শুনতে ফলো করুন",
      img: "/img/img.jpg",
      link: "/blog",
    },
    {
      title: "রুকইয়াহ প্লেয়ার",
      description: "তিলাওয়াত ও রুকইয়াহ শুনতে দেখুন",
      img: "/img/img.jpg",
      link: "/blog",
    },
    {
      title: "আল-কোরআন পোর্টাল",
      description: "কোরআনের অডিও, অনুবাদ, অ্যাপ, ইত্যাদি",
      img: "/img/img.jpg",
      link: "/blog",
    },
    {
      title: "রুকইয়াহ শারইয়াহ ইনডেক্স",
      description: "প্রাসঙ্গিক সব লেখা একত্রে পেতে ভিজিট করুন",
      img: "/img/img.jpg",
      link: "/blog",
    },
    {
      title: "ফ্রড আর্কাইভ",
      description: "কবিরাজ-যাদুকরদের শয়তানি সম্পর্কে জানতে",
      img: "/img/img.jpg",
      link: "/blog",
    },
    {
      title: "Frequently Asked Question",
      description: "রুকইয়াহ বিষয়ে বহুল জিজ্ঞাসিত প্রশ্নগুলোর উত্তর",
      img: "/img/img.jpg",
      link: "/blog",
    },
    {
      title: "রুকইয়াহ বই",
      description: "আলোচনা ও সহায়তার জন্য অনলাইন ফোরামে",
      img: "/img/img.jpg",
      link: "/blog",
    },
    {
      title: "রুকইয়াহ ফোরাম",
      description: "আলোচনা ও সহায়তার জন্য অনলাইন ফোরামে",
      img: "/img/img.jpg",
      link: "/blog",
    },
  ];

  return (
    <div className="w-full h-full">
      {/* <Banner /> */}
      {/* <Categories */}
      <div className="p-4 h-full lg:max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            description={card.description}
            img={card.img}
            link={card.link}
          />
        ))}
      </div>
    </div>
  );
}
