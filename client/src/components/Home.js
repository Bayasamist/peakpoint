import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="text-gray-800">
      {/* Hero Section */}
<section className="bg-blue-50 py-16 text-center px-4">
  <h1 className="text-4xl font-bold mb-4">Find the visa that’s right for you</h1>
  <p className="text-lg mb-6 max-w-xl mx-auto">
    Explore visa options, get personalized recommendations, and apply with confidence.
  </p>
  <Link
    to="/recommend"
    className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
  >
    Find My Visa
  </Link>
</section>

      {/* Explore Resources */}
      <section className="py-16 bg-white px-4">
        <h2 className="text-2xl font-bold text-center mb-10">Explore visa resources</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { title: 'Visa types', text: 'Understand different types of visas and how to apply.' },
            { title: 'Travel guides', text: 'Find visa-free destinations and entry tips.' },
            { title: 'Student resources', text: 'Get help with studying abroad and university prep.' },
            { title: 'Study abroad', text: 'Explore countries ideal for long-term education.' },
          ].map((item) => (
            <div key={item.title} className="p-4 border rounded shadow-sm hover:shadow-md transition">
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-sm">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recommendation Prompt */}
      <section className="bg-blue-100 text-center py-12 px-4">
        <h2 className="text-xl font-semibold mb-3">Not sure which visa to apply for?</h2>
        <Link to="/apply">
          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            Get personalized recommendations
          </button>
        </Link>
      </section>

      {/* Visa Guides */}
      <section className="py-16 px-4 bg-white">
        <h2 className="text-2xl font-bold text-center mb-10">Popular visa guides</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: 'How to apply for a Schengen visa',
              img: 'https://via.placeholder.com/300x160?text=Schengen+Guide',
            },
            {
              title: 'Student visa requirements by country',
              img: 'https://via.placeholder.com/300x160?text=Student+Visa',
            },
            {
              title: 'Tourist visa requirements by country',
              img: 'https://via.placeholder.com/300x160?text=Tourist+Visa',
            },
          ].map((guide) => (
            <div key={guide.title} className="border rounded overflow-hidden shadow-sm hover:shadow-md">
              <img src={guide.img} alt={guide.title} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold mb-2">{guide.title}</h3>
                <button className="text-blue-600 hover:underline">Read more</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-gray-50">
        <h2 className="text-2xl font-bold text-center mb-10">Get answers to your visa questions</h2>
        <div className="max-w-2xl mx-auto space-y-4">
          {[
            'What do I need to apply for a student visa?',
            'How long does it take to get a tourist visa?',
            'Do I need health insurance to study abroad?',
            'Can I get work rights with a student visa?',
          ].map((q, i) => (
            <div key={i} className="flex justify-between border-b pb-2">
              <p>{q}</p>
              <button className="text-blue-600 hover:underline">Read answer</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
