import React, { useState } from "react";
import {
  DollarSign,
  Users,
  CreditCard,
  Activity,
  CalendarIcon,
} from "lucide-react";
import { format } from "date-fns";
import { Card } from "../../components/ui/CustomCard.jsx";
import { Button } from "../../components/ui/button.tsx";
import { PieChart } from "../../components/ui/PieChart.jsx";
import SalesCard from "../../components/ui/SalesCard";
import { CardContent } from "../../components/ui/CustomCard.jsx";
import { formatDate } from "../../components/Utils/UtilFunctions.jsx";
import { useNavigate, useOutletContext } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover.tsx";
import { Calendar } from "../../components/ui/calendar.tsx";

export default function Home() {
  const navigate = useNavigate();
  const menuData = useOutletContext();

  const [startDate, setStartDate] = useState(new Date(2025, 1, 1));
  const [endDate, setEndDate] = useState(new Date());
  const [openStart, setOpenStart] = useState(false);
  const [openEnd, setOpenEnd] = useState(false);

  const hasAccess = (url) => {
    return menuData?.some((item) => item.url === url);
  };

  const dummyDashboardData = {
    code: 200,
    data: {
      join_waitlist_submissions: [
        {
          id: 1,
          name: "Aman Sharma",
          email: "aman@example.com",
          phone_number: 9876543210,
          company_name: "Aman Tech",
          joined_at: "2025-05-01T10:15:00Z",
        },
        {
          id: 2,
          name: "Priya Verma",
          email: "priya@example.com",
          phone_number: 9123456780,
          company_name: "Verma Solutions",
          joined_at: "2025-05-03T14:45:00Z",
        },
      ],
      contact_us_submissions: [
        {
          id: 1,
          name: "Ravi Kumar",
          email: "ravi.kumar@example.com",
          message: "I’d like to understand your pricing.",
          submitted_at: "2025-05-04T09:30:00Z",
        },
        {
          id: 2,
          name: "Sneha Reddy",
          email: "sneha@example.com",
          message: "Do you offer custom branding?",
          submitted_at: "2025-05-04T11:00:00Z",
        },
      ],
      total_waitlist_signups: 2,
      total_contact_queries: 2,
      total_revenue: 1400,
      total_orders: 25,
      completed_orders: 21,
      new_customers: 15,
      recent_users_sales: [
        {
          id: "ORD001",
          email: "user1@example.com",
          first_name: "John",
          total_sales_amount: 300,
        },
        {
          id: "ORD002",
          email: "user2@example.com",
          first_name: "Alice",
          total_sales_amount: 250,
        },
      ],
    },
  };

  const cardData = [
    {
      label: "Total Waitlist",
      amount: dummyDashboardData.data.total_orders || "0",
      icon: CreditCard,
      onClickPath: "/admin/waitlist",
    },
    {
      label: "Total Contacts",
      amount: dummyDashboardData.data.new_customers || "0",
      icon: Users,
      onClickPath: "/admin/contact",
    },
  ];

  return (
    <div className="flex flex-col gap-5 w-full px-6 text-white my-5">
      {/* Dashboard Cards */}
      <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">
        {cardData.map((d, i) => (
          <Card
            key={i}
            amount={d.amount}
            icon={d.icon}
            label={d.label}
            onClickPath={d.onClickPath}
            payload={d.payload}
          />
        ))}
      </section>

      {/* Pie Chart and Sales */}
      <section className="grid grid-cols-1 gap-4 transition-all lg:grid-cols-2">
        {/* <PieChart
          startDate={formatDate(startDate)}
          endDate={formatDate(endDate)}
          DashboardData={dummyDashboardData.data}
        /> */}
        <CardContent className="flex gap-2 flex-col">
          <div className="flex justify-between items-center flex-wrap gap-3">
            <p className="font-bold">Recent Waitlist</p>

            <Button
              onClick={() => navigate("/admin/waitlist")}
              variant="outline"
              className="cursor-pointer px-4 py-2 text-sm rounded-xl"
            >
              All Waitlist
            </Button>
          </div>

          {dummyDashboardData.data.recent_users_sales?.length > 0 ? (
            dummyDashboardData.data.join_waitlist_submissions
              .slice(0, 5)
              .map((d, i) => (
                <SalesCard
                  key={i}
                  email={d.email}
                  name={d.name}
                  joinDate={d.joined_at}
                  hasAccess={hasAccess("/admin/manage-orders")}
                />
              ))
          ) : (
            <div className="flex w-full h-32 items-center justify-center">
              <p className="text-gray-400 text-sm">
                No recent sales available.
              </p>
            </div>
          )}
        </CardContent>
      </section>
    </div>
  );
}
