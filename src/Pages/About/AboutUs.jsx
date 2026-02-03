import React from "react";
import { Link } from "react-router";
import {
  FiArrowLeft,
  FiShoppingBag,
  FiUsers,
  FiAward,
  FiTruck,
  FiHeadphones,
  FiHeart,
  FiTarget,
  FiTrendingUp,
} from "react-icons/fi";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="p-6">
        <div className="max-w-6xl mx-auto px-4">
          <Link
            to="/"
            className="inline-flex items-center mb-6 transition bg-gradient-to-r from-green-600 to-orange-500 text-white rounded-lg p-2"
          >
            <FiArrowLeft className="mr-2" />
            Back to Home
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About SM সহজ Buy
          </h1>

          <p className="text-lg md:text-xl max-w-3xl">
            আপনার ফ্যাশন ও আস্থার নির্ভরযোগ্য ঠিকানা। অনলাইন ও অফলাইনে
            মানসম্মত পোশাক এবং আধুনিক লাইফস্টাইল পণ্যের নিশ্চয়তা।
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16 space-y-20">
        {/* Story */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">
            অনলাইন ও অফলাইনের অনন্য সমন্বয়
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            আধুনিক কেনাকাটায় বিশ্বাসযোগ্যতা ও স্বাচ্ছন্দ্য নিশ্চিত করতে
            SM সহজ Buy আপনাকে দিচ্ছে অনলাইন সুবিধা ও অফলাইন শোরুমের বাস্তব
            অভিজ্ঞতা। ঘরে বসে অর্ডার করুন অথবা সরাসরি শোরুমে এসে ট্রায়াল দিয়ে
            নিশ্চিন্তে কেনাকাটা করুন।
          </p>
        </section>

        {/* Mission & Vision */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="flex items-center mb-4">
              <FiTarget className="text-green-600 w-8 h-8 mr-3" />
              <h3 className="text-2xl font-bold">আমাদের মিশন</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              নীলফামারী শহরের ভেতরে প্রথম ৪ মাস ফ্রি হোম ডেলিভারি এবং
              ন্যূনতম ১২৫০ টাকার অর্ডারে নিশ্চিত উপহার দিয়ে গ্রাহকের
              সন্তুষ্টি নিশ্চিত করা।
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="flex items-center mb-4">
              <FiTrendingUp className="text-orange-600 w-8 h-8 mr-3" />
              <h3 className="text-2xl font-bold">আমাদের ভিশন</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              অনলাইনের স্বাচ্ছন্দ্য ও অফলাইনের বিশ্বাসযোগ্যতাকে একত্র করে
              বাংলাদেশের অন্যতম নির্ভরযোগ্য ফ্যাশন ব্র্যান্ড হওয়া।
            </p>
          </div>
        </section>

        {/* Core Values */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-12">
            আমাদের মূল নীতিসমূহ
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <FiHeart />,
                title: "কাস্টমার সবার আগে",
                color: "green",
                text: "প্রতিটি সিদ্ধান্ত গ্রাহকের সন্তুষ্টিকে গুরুত্ব দিয়ে।",
              },
              {
                icon: <FiAward />,
                title: "সেরা মান",
                color: "orange",
                text: "মানের সাথে কোনো আপস নয়।",
              },
              {
                icon: <FiTruck />,
                title: "নির্ভরযোগ্যতা",
                color: "blue",
                text: "সঠিক পণ্য, সঠিক সময়ে।",
              },
              {
                icon: <FiUsers />,
                title: "দীর্ঘ সম্পর্ক",
                color: "purple",
                text: "গ্রাহকদের সাথে পারিবারিক সম্পর্ক।",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 text-center"
              >
                <div
                  className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-${item.color}-100 text-${item.color}-600 text-2xl`}
                >
                  {item.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="bg-gradient-to-r from-green-50 to-orange-50 rounded-xl p-10">
          <h2 className="text-3xl font-bold text-center mb-12">
            কেন আমাদের পছন্দ করবেন?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <FiShoppingBag className="mx-auto text-green-600 w-10 h-10 mb-4" />
              <h3 className="font-semibold text-xl mb-2">বিশাল কালেকশন</h3>
              <p className="text-gray-600">
                উৎসব ও দৈনন্দিন ব্যবহারের জন্য বিশাল কালেকশন।
              </p>
            </div>

            <div>
              <FiTruck className="mx-auto text-orange-600 w-10 h-10 mb-4" />
              <h3 className="font-semibold text-xl mb-2">দ্রুত ডেলিভারি</h3>
              <p className="text-gray-600">
                ৩–৫ কার্যদিবসের মধ্যে পণ্য পৌঁছে দেওয়া।
              </p>
            </div>

            <div>
              <FiHeadphones className="mx-auto text-blue-600 w-10 h-10 mb-4" />
              <h3 className="font-semibold text-xl mb-2">২৪/৭ সাপোর্ট</h3>
              <p className="text-gray-600">
                যেকোনো প্রয়োজনে আমাদের টিম আপনার পাশে।
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-10">
          <h2 className="text-3xl font-bold text-center mb-10">
            আমাদের অর্জন
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-green-600">10K+</p>
              <p className="text-gray-600">সন্তুষ্ট গ্রাহক</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-orange-600">500+</p>
              <p className="text-gray-600">পণ্য</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-600">50+</p>
              <p className="text-gray-600">ক্যাটাগরি</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-purple-600">4.8★</p>
              <p className="text-gray-600">রেটিং</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
