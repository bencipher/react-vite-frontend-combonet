import React from "react";

interface MyProps {
  title?: string;
  subtitle?: string;
}

const Hero = ({
  title = "Find your first job",
  subtitle = "Find an entry level Remote job that introduces you into the world of tech",
}: MyProps) => {
  return (
    <section className="bg-black py-20 mb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
            {title}
          </h1>
          <p className="my-4 text-xl text-white">{subtitle}</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
