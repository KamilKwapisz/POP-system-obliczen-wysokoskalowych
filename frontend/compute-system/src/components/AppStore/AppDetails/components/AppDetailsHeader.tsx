import * as React from "react";
import {
  Avatar,
  Button,
  Grid,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { DeleteForever } from "@material-ui/icons";
import headerStyles from "./HeaderStyles";
import apiCall from "../../../../api/apiCall";
import { APPSTORE_URL } from "../../../../api/urls";
import RequestType from "../../../../api/requestType";
import { useHistory } from "react-router-dom";
import AppForm from "../../AppForm/AppForm";
import { User, UserType } from "../../../../mocks/common/mockUsers";
import { useSelector } from "react-redux";
import RootState from "../../../../redux/rootState";

interface AppDetailsHeaderProps {
  id: number;
  idUser: number;
  title: string;
  description: string;
  imageUrl?: string;
  makeReload: () => void;
}

const AppDetailsHeader = (props: AppDetailsHeaderProps) => {
  const [isOwner, setOwner] = React.useState<boolean>(false);
  const currentUser: User = useSelector(
    (state: RootState) => state.userReducer.user
  );
  const classes = headerStyles();
  const matches = useMediaQuery("(min-width:800px)");
  const history = useHistory();

  const handleDeleteClick = async () => {
    const response = await apiCall(
      `${APPSTORE_URL}${props.id}`,
      RequestType.DELETE
    );

    if (response.isError) {
      return;
    }

    history.push("/");
  };

  React.useEffect(() => {
    if (
      currentUser.role === UserType.Admin ||
      (currentUser.role === UserType.Developer &&
        currentUser.id === props.idUser)
    ) {
      setOwner(true);
    } else {
      setOwner(false);
    }
  }, [currentUser, props.idUser, props.id]);

  return (
    <Grid
      item
      container
      alignItems="center"
      direction="column"
      className={classes.header}
    >
      <Grid item xs={12}>
        <Typography variant="h4">{props.title}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Avatar
          alt={props.title}
          variant="square"
          src={props.imageUrl}
          className={matches ? classes.icon : classes.iconSmall}
        />
      </Grid>
      <Grid item xs={10}>
        <Typography variant="body1">{props.description}</Typography>
      </Grid>
      <Grid item container xs={12} justify="center">
        {isOwner && (
          <>
            <AppForm
              isEdit={true}
              idApp={props.id}
              nameApp={props.title}
              descriptionApp={props.description}
              makeReload={props.makeReload}
            />
            <Button
              variant="contained"
              startIcon={<DeleteForever />}
              className={classes.deleteButton}
              onClick={handleDeleteClick}
            >
              Delete
            </Button>
          </>
        )}
      </Grid>
      <Grid item container xs={12} justify="center">
        <Button variant="contained" className={classes.addButton}>
          Add to cockpit
        </Button>
      </Grid>
    </Grid>
  );
};

export default AppDetailsHeader;
