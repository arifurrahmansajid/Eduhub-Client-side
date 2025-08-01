import SectionHeader from "../../components/SectionHeader";
import Container from "../../Sharecomponent/Container";
import { useState } from "react";

const Question = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "What is an online course classroom?",
      answer: "An online course classroom is a virtual environment where students can access course materials, interact with instructors, participate in discussions, and complete assignments remotely."
    },
    {
      question: "How do I enroll in a course?",
      answer: "You can enroll in a course by visiting our Courses section, selecting the desired course, and following the enrollment instructions. Payment options are available at checkout."
    },
    {
      question: "What materials are provided in the course?",
      answer: "Course materials typically include video lectures, reading materials, assignments, quizzes, and projects. Some courses may also offer live sessions and interactive content."
    }
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 ">
      <Container>
        <div className="max-w-4xl mx-auto">
          <SectionHeader 
            title="Frequently Asked Questions" 
            subtitle="Find answers to common questions about our courses"
            center
          />
          
          <div className="mt-12 space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-300"
              >
                <button
                  className={`flex items-center justify-between w-full p-6 text-left transition-colors duration-200 ${
                    openIndex === index 
                      ? 'bg-gradient-to-r from-[#F66B1D] to-[#F99D1C] text-white' 
                      : 'bg-white hover:bg-gray-50 text-gray-800'
                  }`}
                  onClick={() => toggleAccordion(index)}
                >
                  <h3 className="text-lg font-semibold md:text-xl">
                    {faq.question}
                  </h3>
                  <svg
                    className={`w-6 h-6 transform transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                
                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    openIndex === index ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="p-6 bg-white text-gray-600">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Question;