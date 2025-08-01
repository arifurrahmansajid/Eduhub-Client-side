import {
  FaCode,
  FaPaintBrush,
  FaMobileAlt,
  FaGamepad,
  FaShieldAlt,
  FaRobot,
  FaChartLine,
  FaEllipsisH,
} from "react-icons/fa";
import Container from "../../Sharecomponent/Container";
import Marquee from "react-fast-marquee";
import useContexHooks from "../../useHooks/useContexHooks";
import SectionHeader from "../../components/SectionHeader";

const categories = [
  { icon: <FaCode className="text-3xl" />, name: "Web Development", color: "from-blue-100 to-blue-200" },
  { icon: <FaPaintBrush className="text-3xl" />, name: "Graphics Design", color: "from-purple-100 to-purple-200" },
  { icon: <FaMobileAlt className="text-3xl" />, name: "App Development", color: "from-green-100 to-green-200" },
  { icon: <FaGamepad className="text-3xl" />, name: "Game Development", color: "from-red-100 to-red-200" },
  { icon: <FaShieldAlt className="text-3xl" />, name: "Cyber Security", color: "from-yellow-100 to-yellow-200" },
  { icon: <FaRobot className="text-3xl" />, name: "Artificial Intelligence", color: "from-indigo-100 to-indigo-200" },
  { icon: <FaChartLine className="text-3xl" />, name: "Digital Marketing", color: "from-pink-100 to-pink-200" },
  { icon: <FaEllipsisH className="text-3xl" />, name: "Coming Soon", color: "from-gray-100 to-gray-200" },
];

const Category = () => {
  const { togol } = useContexHooks();
  
  return (
    <section className={`${togol } py-16`}>
      <Container>
        <div className="max-w-7xl mx-auto">
          <SectionHeader 
            title="Explore Categories" 
            subtitle="Browse through our diverse range of learning categories"
            center
          />
          
          <div className="mt-12">
            <Marquee 
              speed={40}
              pauseOnHover
              gradient={false}
            >
              <div className="flex gap-6 px-2 py-4">
                {categories.map((category, index) => (
                  <div
                    key={index}
                    className={`flex flex-col items-center justify-center p-8 w-64 h-48 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-br ${category.color} hover:-translate-y-2`}
                  >
                    <div className="text-4xl text-gray-800 mb-4">
                      {category.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 text-center">
                      {category.name}
                    </h3>
                  </div>
                ))}
              </div>
            </Marquee>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Category;