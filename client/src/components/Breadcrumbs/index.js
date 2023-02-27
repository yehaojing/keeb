import { Breadcrumbs, Link } from "@mui/material";

const StyledBreadcrumbs = ( { crumbs } ) => {
  return (
    crumbs &&
    <Breadcrumbs>
      {
        crumbs.map((crumb) => {
          return (
            <Link key={crumb.link} underline="hover" color="inherit" href={crumb.link}>
              {crumb.name}
            </Link>
          );
        })
      }
    </Breadcrumbs>
  );
};

export default StyledBreadcrumbs;
