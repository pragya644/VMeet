import React from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { connect } from "react-redux";
import { getActions } from "../../store/actions/alertActions";

// Snackbar responsible for position of alert.
// connect shows us correct time to manage in the store.

const AlertNotification = ({
  showAlertMessage,
  closeAlertMessage,
  alertMessageContent,
}) => {
  return (
    <Snackbar
    // so we get alert at bottom center and it gets open when showalert starts and on close execute closeAlertMessage method
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={showAlertMessage}
      onClose={closeAlertMessage}
      autoHideDuration={6000} //6000ms
    > 
      <Alert severity="info">{alertMessageContent}</Alert>
    </Snackbar>
  );
};

// here get alert from the state which comes from props
const mapStoreStateToProps = ({ alert }) => {
  return {
    ...alert,
  };
};
// Map the actions to the props
const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(
  mapStoreStateToProps,
  mapActionsToProps
)(AlertNotification);
