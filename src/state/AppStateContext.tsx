import { createContext, useContext, Dispatch, FC } from "react";
import React from "react";
import { appStateReducer, AppState, List, Task } from "./appStateReducer";
import { Action } from "./actions";
import { useImmerReducer } from "use-immer";
import { DragItem } from "../DragItem";

const appData: AppState = {
  draggedItem: null,
  lists: [
    {
      id: "0",
      text: "Orders of the day",
      tasks: [],
    },
    {
      id: "1",
      text: "On-going",
      tasks: [],
    },
    {
      id: "2",
      text: "Completed",
      tasks: [],
    },
  ],
  // lists: [
  //   {
  //     id: "0",
  //     text: "To Do",
  //     tasks: [{ id: "c0", text: "Generate app scaffold" }],
  //   },
  //   {
  //     id: "1",
  //     text: "In Progress",
  //     tasks: [{ id: "c2", text: "Learn Typescript" }],
  //   },
  //   {
  //     id: "2",
  //     text: "Done",
  //     tasks: [{ id: "c3", text: "Finished work" }],
  //   },
  // ],
};

// define context

type AppStateContextProps = {
  draggedItem: DragItem | null;
  lists: List[];
  getTasksByListId(id: string): Task[];
  dispatch: Dispatch<Action>;
};

const AppStateContext = createContext<AppStateContextProps>(
  {} as AppStateContextProps
);

interface Props {
  children?: React.ReactNode;
  // any props that come into the component
}

// define context provider

export const AppStateProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useImmerReducer(appStateReducer, appData);

  const { draggedItem, lists } = state;

  const getTasksByListId = (id: string) => {
    return lists.find((list) => list.id === id)?.tasks || [];
  };

  return (
    <AppStateContext.Provider
      value={{ draggedItem, lists, getTasksByListId, dispatch }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  return useContext(AppStateContext);
};
