import { createStore, createSubscriber, createHook } from "react-sweet-state";
import { AsyncStorage } from "react-native";
import { generateUUID } from "../Util/misc";

const persist = () => async ({ getState }) => {
  await AsyncStorage.setItem("@Store:reminders", JSON.stringify(getState()));
};

export const getPersistedState = async () => {
  const dataStr = await AsyncStorage.getItem("@Store:reminders");
  if (dataStr) return JSON.parse(dataStr);
  return {};
};

export const RemidersStore = createStore({
  // value of the store on initialisation
  initialState: {
    reminders: [],
  },
  // actions that trigger store mutation
  actions: {
    initState: (initialState = {}) => ({ setState }) => setState(initialState),
    addReminder: (reminder) => ({ setState, getState, dispatch }) => {
      // mutate state syncronously
      reminder.id = reminder.id || generateUUID();
      setState({
        reminders: [...getState().reminders, reminder],
      });
      dispatch(persist());
    },
    removeReminder: (id) => ({ setState, getState, dispatch }) => {
      let reminders = getState()
        .reminders.slice()
        .filter((r) => {
          return r.id != id;
        });
      setState({
        reminders,
      });
      dispatch(persist());
    },
  },
  // optional, mostly used for easy debugging
  name: "reminders",
});

export const RemindersSubscriber = createSubscriber(RemidersStore);

export const useReminders = createHook(RemidersStore);
