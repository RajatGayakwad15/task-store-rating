import React from "react";
import { Button } from "./button.tsx";
import { Card, CardContent } from "./card.tsx";

const NewCard = ({ name, email, address, onRateClick }) => {
  return (
    <Card className=" relative bg-gradient-to-b from-gray-900 to-black text-white border border-gray-700 rounded-2xl shadow-2xl overflow-hidden">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-800/30 via-transparent to-transparent pointer-events-none" />
      
      <CardContent className="p-8 relative z-10">
        {/* Heading */}
        {/* <h2 className="text-2xl font-semibold mb-3">
          Connect with Leading Platforms to Enhance Your Data Strategy
        </h2> */}

        {/* Subheading */}
        {/* <p className="text-sm text-gray-400 mb-6">
          Unlock the potential of your data with our robust integrations.
        </p> */}

        {/* User Details */}
        <div className="mb-6 space-y-2">
          <p><span className="font-semibold text-gray-300">Name:</span> {name}</p>
          <p><span className="font-semibold text-gray-300">Email:</span> {email}</p>
          <p><span className="font-semibold text-gray-300">Address:</span> {address}</p>
        </div>

        {/* Button */}
        <Button
          className="bg-gradient-to-r cursor-pointer from-gray-600 to-gray-700 text-white px-5 py-2 rounded-md hover:from-gray-500 hover:to-gray-600"
          onClick={onRateClick}
        >
          Rate Now →
        </Button>
      </CardContent>
    </Card>
  );
};

export default NewCard;
