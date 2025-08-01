import { useQuery } from "@tanstack/react-query";
import ComunityCard from "../../components/ComunityCard";
import PreLoader from "../../components/PreLoader";
import SectionHeader from "../../components/SectionHeader";
import Container from "../../Sharecomponent/Container";
import useAxiosPublic from "../../useHooks/useAxiosPublic";
import community from "../../assets/comunity.png";

const Community = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: counts,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["counts"],
    queryFn: async () => {
      const res = await axiosPublic.get("/totalCount");
      return res.data;
    },
  });

  if (isFetching) {
    return <PreLoader />;
  }
  if (error) {
    return <p className="text-2xl text-red-500 text-center py-10">{error.message}</p>;
  }

  return (
    <section className="py-16 bg-gray-50">
      <Container>
        <div className="max-w-6xl mx-auto">
          <SectionHeader 
            title="Our Community" 
            subtitle="Join thousands of learners and educators"
            center
          />

          <div className="flex flex-col lg:flex-row justify-center items-center gap-10 mt-12">
            {/* Left: Community Cards */}
            <div className="flex flex-col gap-6 w-full lg:w-2/5">
              <ComunityCard
                title="Total Classes"
                count={counts?.allClasses}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl transition-shadow"
              />
              <ComunityCard 
                title="Total Users" 
                count={counts?.alluser}
                className="bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-shadow"
              />
              <ComunityCard
                title="Total Enrollments"
                count={counts?.totalEnroll}
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg hover:shadow-xl transition-shadow"
              />
            </div>

            {/* Right: Image */}
            <div className="w-full lg:w-3/5 flex justify-center">
              <img
                src={community}
                alt="EduHub community"
                className="w-full max-w-2xl rounded-lg shadow-md hover:scale-[1.02] transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Community;