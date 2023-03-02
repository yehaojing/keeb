import { Breadcrumbs, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const StyledBreadcrumbs = ({ crumbs }) => {
  const preCrumbs = crumbs.slice(0, -1);
  const currCrumb = crumbs.slice(-1)[0];

  return (
    crumbs && (
      <Breadcrumbs>
        {preCrumbs.map((crumb) => {
          return (
            <Link
              key={crumb.link}
              underline="hover"
              color="inherit"
              component={RouterLink}
              to={crumb.link}
            >
              {crumb.name}
            </Link>
          );
        })}
        <Link
          key={currCrumb.link}
          underline="hover"
          color="text.primary"
          component={RouterLink}
          to={currCrumb.link}
        >
          {currCrumb.name}
        </Link>
      </Breadcrumbs>
    )
  );
};

export default StyledBreadcrumbs;
