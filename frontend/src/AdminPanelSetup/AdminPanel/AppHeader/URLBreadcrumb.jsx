import { Link, useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../components/ui/breadcrumb.tsx";

function URLBreadcrumb({ AdminInfo, adminPath }) {
  const location = useLocation();
  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment);

  return (
    <Breadcrumb>
      <BreadcrumbList className="flex items-center space-x-2 ">
        <BreadcrumbItem className="flex items-center text-[12px] md:text-[14px]">
          <Link to={adminPath}>{AdminInfo?.role?.name || pathSegments[0]}</Link>
        </BreadcrumbItem>

        {pathSegments.slice(1).map((segment, index) => {
          const isLast = index === pathSegments.length - 2;
          const formattedSegment =
            segment.charAt(0).toUpperCase() + segment.slice(1);

          const path = `/${pathSegments.slice(0, index + 2).join("/")}`;

          return (
            <BreadcrumbItem
              key={index}
              className="flex items-center text-[12px] md:text-[14px] "
            >
              <BreadcrumbSeparator></BreadcrumbSeparator>

              {isLast ? (
                <BreadcrumbPage className="text-gray-100">
                  {formattedSegment}
                </BreadcrumbPage>
              ) : (
                <Link to={path}>{formattedSegment}</Link>
              )}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default URLBreadcrumb;
