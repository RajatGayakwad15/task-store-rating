import React from "react";
import { useNavigate } from "react-router-dom";
import { formatDate1 } from "../Utils/UtilFunctions";

export type SalesProps = {
  name: string;
  email: string;
  saleAmount: string;
  orderId: string;
  hasAccess: boolean;
  joinDate: string;
};

export default function SalesCard(props: SalesProps) {
  const navigate = useNavigate();

  const handleNavigation = (orderId: string) => {
    navigate(`/admin/waitlist/${orderId}`);
  };

  return (
    <div
      className={`flex flex-wrap justify-between py-2 mt-0 px-2 rounded-md transition ${
        props.hasAccess && "cursor-pointer hover:bg-zinc-900"
      }`}
      onClick={() => props.hasAccess && handleNavigation(props.orderId)}
    >
      <section className="flex items-center gap-2">
        <div className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-800 text-white font-semibold">
          {props.name.charAt(0).toUpperCase()}
        </div>
        <div className="text-sm">
          <p>{props.name}</p>
          <div className="text-ellipsis overflow-hidden whitespace-nowrap w-[120px]  sm:w-auto  text-gray-400">
            {props.email}
          </div>
        </div>
      </section>
      <p className="hover:underline self-center pe-1">
        {formatDate1(props.joinDate)}
      </p>
    </div>
  );
}
