import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  TextField,
} from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import apiCall from "../../../api/apiCall";
import { IMessageResponse } from "../../../api/iApiResponse";
import RequestType from "../../../api/requestType";
import { COCKPIT_URL } from "../../../api/urls";
import { User } from "../../../mocks/common/mockUsers";
import RootState from "../../../redux/rootState";
import PostTaskData, { initialTaskData } from "./postTaskData";

interface AddNewTaskDialogProps {
  idApp: number;
  open: boolean;
  handleCloseDialog: () => void;
  showSnackbar: () => void;
}

const AddNewTaskDialog = (props: AddNewTaskDialogProps) => {
  const [taskName, setTaskName] = React.useState<string>("");
  const [taskNameErrorText, setTaskNameErrorText] = React.useState<string>("");
  const [creditsNumber, setCreditsNumber] = React.useState<number>(0);
  const [taskPriority, setTaskPriority] = React.useState<string>("1");
  const [creditsErrorText, setCreditsErrorText] = React.useState<string>("");
  const currentUser: User = useSelector(
    (state: RootState) => state.userReducer.user
  );

  const handleTaskNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const taskName = event.target.value;
    if (taskName === "") {
      setTaskNameErrorText("Task name is not given");
    } else {
      setTaskNameErrorText("");
    }
    setTaskName(taskName);
  };

  const handleCreditsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const credits = event.target.value;
    try {
      const value = parseInt(credits, 10);
      if (value <= 0) {
        setCreditsErrorText("Invalid credits value");
      } else {
        setCreditsErrorText("");
      }
      setCreditsNumber(value);
    } catch {}
  };

  const handleAdd = async () => {
    if (taskName === "") {
      setTaskNameErrorText("Task name is not given");
      return;
    }

    if (creditsNumber <= 0) {
      setCreditsErrorText("Invalid credits value");
      return;
    }

    const taskData: PostTaskData = initialTaskData;
    taskData.name = taskName;
    taskData.reservedCredits = creditsNumber;
    taskData.idApp = props.idApp;
    taskData.idUser = currentUser.id;
    taskData.priority = taskPriority;

    const response = await apiCall<PostTaskData | IMessageResponse>(
      `${COCKPIT_URL}/`,
      RequestType.POST,
      taskData
    );
    if (response.isError) {
      return;
    }

    cleanData();
    props.showSnackbar();
    props.handleCloseDialog();
  };

  const handleSelectChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    setTaskPriority(event.target.value as string);
  };

  const handleCancel = () => {
    cleanData();
    props.handleCloseDialog();
  };

  const cleanData = () => {
    setTaskName("");
    setTaskNameErrorText("");
    setCreditsErrorText("");
    setCreditsNumber(0);
  };

  return (
    <Dialog
      open={props.open}
      onClose={props.handleCloseDialog}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle>Add new task:</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          error={taskNameErrorText.length > 0}
          helperText={taskNameErrorText}
          variant="outlined"
          margin="dense"
          id="name"
          label="Task name"
          fullWidth
          value={taskName}
          required={true}
          onChange={handleTaskNameChange}
          style={{ marginBottom: "15px" }}
        />
        <FormControl
          fullWidth
          variant="outlined"
          style={{ marginBottom: "15px" }}
        >
          <InputLabel htmlFor="prioritySelect">Set task's priority:</InputLabel>
          <Select
            native
            label="Set task's priority:"
            id="prioritySelect"
            value={taskPriority}
            onChange={handleSelectChange}
          >
            <option value={"1"}>Highest</option>
            <option value={"2"}>Middle</option>
            <option value={"3"}>Low</option>
          </Select>
        </FormControl>
        <TextField
          autoFocus
          error={creditsErrorText.length > 0}
          helperText={creditsErrorText}
          variant="outlined"
          margin="dense"
          id="credits"
          label="Credits"
          fullWidth
          value={creditsNumber}
          type="number"
          required={true}
          onChange={handleCreditsChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAdd} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddNewTaskDialog;
