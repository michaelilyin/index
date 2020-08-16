import { ApiEvent } from "@/models/api/event.model";
import { axios } from "@/plugins/axios";
import { Actions, Commit, Ctx, Module, Mutations } from "@/store/types";

export interface CalendarState {
  events: ApiEvent[];
}

export interface CalendarMutations extends Mutations<CalendarState> {
  setEvents(state: CalendarState, events: ApiEvent[]): void;
}

export interface CalendarActions
  extends Actions<CalendarState, CalendarMutations> {
  loadEvents(
    ctx: Ctx<CalendarState, CalendarMutations>,
    params: { from: string; to: string }
  ): Promise<void>;
}

const module: Module<CalendarState, CalendarMutations, CalendarActions> = {
  namespaced: true,
  state: {
    events: []
  },
  mutations: {
    setEvents(state: CalendarState, events: ApiEvent[]) {
      state.events = events;
    }
  },
  actions: {
    loadEvents(
      { commit },
      params: { from: string; to: string }
    ): Promise<void> {
      return axios
        .get<{ items: ApiEvent[] }>("/events", {
          params: {
            timeMin: params.from,
            timeMax: params.to
          }
        })
        .then(result => {
          commit("setEvents", result.data.items);
        });
    }
  }
};

export default module;
