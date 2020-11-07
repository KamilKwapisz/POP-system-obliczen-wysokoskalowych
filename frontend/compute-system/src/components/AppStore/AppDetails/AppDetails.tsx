import * as React from "react";
import { Typography, Grid, Container, useMediaQuery } from "@material-ui/core";
import AppRating from "../AppRating/AppRating";
import mockRatings from "../../../mocks/AppStore/Rating/mockRatings";
import appDetailsStyles from "./appDetailsStyles";
import AppDetailsHeader from "./components/AppDetailsHeader";
import mockAppCard from "../../../mocks/AppStore/AppCard/mockAppCards";
import { RouteComponentProps } from "react-router-dom";

interface AppDetailsContextProps {
  absoluteUrl: string;
}

interface AppDetailsRouteParams {
  id: string;
}

interface AppDetailsRouteProps
  extends RouteComponentProps<AppDetailsRouteParams> {}

type AppDetailsProps = AppDetailsContextProps & AppDetailsRouteProps;

const AppDetails = (props: AppDetailsProps) => {
  const classes = appDetailsStyles();
  const matches = useMediaQuery("(min-width:800px)");
  const { id } = props.match.params;

  return (
    <Container>
      <Grid container alignItems="center" spacing={2}>
        <AppDetailsHeader
          title={mockAppCard.title}
          description={mockAppCard.description}
        />
        <Grid item container className={classes.body}>
          <Grid item xs={matches ? 3 : 12}>
            <Typography variant="h6">Rate: {mockAppCard.rate}/10</Typography>
            <Typography variant="h6">
              Times used: {mockAppCard.timesUsed}
            </Typography>
            <Typography variant="subtitle2">
              Last update: {mockAppCard.updatedDate}
            </Typography>
          </Grid>
          <Grid item xs={matches ? 9 : 12}>
            <Typography variant="h6">Comments:</Typography>
            <Container>
              {Array(10)
                .fill(mockRatings)
                .map((ratings, index) => (
                  <AppRating key={index} {...ratings} />
                ))}
            </Container>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AppDetails;
