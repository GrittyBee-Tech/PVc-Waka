import React from "react";

const LandingPage = () => {
  return (
    <section className="grid grid-justify-items-center py-20 text-center">
      <h1 className=" font-bold text-[#3fbcaa]">
        Permanent Voter's Card Action Movement
      </h1>
      <h2 className="text-lg text-gray-300">
        Empowering Voters, Strengthening Democracy
      </h2>
      <h5 className="text-md text-gray-400">
        Join the Movement for Electoral Reform
      </h5>
      <p className="text-md text-gray-400 md:w-1/2 mx-auto mt-3">
        Millions of eligible Nigerian voters remain unregistered or have
        uncollected PVCs due to lack of awareness, difficulty locating INEC
        centres, and fragmented grassroots mobilisation efforts. No single
        digital platform currently addresses all three gaps simultaneously with
        an identity-verified, trackable system.
      </p>
    </section>
  );
};

export default LandingPage;
