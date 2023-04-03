import store from "@/store";
import { getUser } from "@/components/Common/helpers/user";

export const filterObjects = {
   'Я админ': 'admin',
   'Я участник': 'participant',
   'Все': 'all'
};

export const filterObjects2 = {
   'admin': 'Я админ',
   'participant': 'Я участник',
   'all': 'Все'
};

export function getTeams() {
   store.dispatch('getTeams', getUser().user_id)
      .then((res) => {
         store.commit('setTeamsList', res.data);
      })
}

export function getTeamsAny() {
   store.commit('setTeamsList', store.dispatch('getTeamsVremenno'));
   filterTeamList();
}

export function createTeam(team) {
   store.dispatch('createTeamNew', team);
   filterTeamList();
}

function filterTeamList() {
   store.commit('filterTeamList', getUser().user_id)
}

export function setFilterText(filterText) {
   store.commit('setFilter', filterObjects[filterText]);
   filterTeamList();
}

export function filterOnName(name) {
   setFilterText('Все');
   store.commit('filterTeamListOnName', name);
}
