import UserProfile from "./UserProfile";
import React, { useState } from "react";
import { HeatingSolutionOffers } from "../types";

const sampleUserData = {
  name: "John Doe",
  houseSqm: 150,
  currentHeating: "Oil",
  street: "123 Main St",
  postalCode: "12345",
  city: "Helsinki",
  occupants: 3,
  budget: 10000,
  urgency: 1, // Assuming 1 represents low urgency
  description: "200 neliöinen iso talo keskellä metsää\nhyvin vanha",
};

interface OfferCardProps {
  offerInfo: HeatingSolutionOffers;
}

interface HomeComponentProps {
  offers: HeatingSolutionOffers[];
}

const OfferCard: React.FC<OfferCardProps> = ({ offerInfo }) => {
  return (
    <div className="card collapse-arrow shadow-lg bg-neutral w-full p-3">
      <div className="card-title text-secondary w-full flex justify-between">
        <span className="text-xl">{offerInfo.name}</span>
        <span className="text-xl">
          {offerInfo.offers.filter((offer) => offer.received).length}
          {" / "}
          {offerInfo.offers.length}
        </span>
      </div>
    </div>
  );
};

const Home: React.FC<HomeComponentProps> = ({ offers }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="flex">
      <div className="w-2/3">
        <div className="container mx-auto p-4">
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold">Offers</h1>
          </div>
          <div className="flex justify-center">
            {offers.map((offer, index) => (
              <OfferCard key={index} offerInfo={offer} />
            ))}
          </div>
          <div className="container mx-auto p-4 flex flex-col items-center">
            {!show && (
              <button
                className="btn btn-secondary"
                onClick={() => setShow(!show)}
              >
                New Offer
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="w-1/3">
        {show && (
          <UserProfile userInfo={sampleUserData} showSubmitButton={true} />
        )}
      </div>
    </div>
  );
};

export default Home;
