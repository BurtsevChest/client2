import Teams from "@/api/teams";

const commadList = [
   {
      name: 'Команда Дизайнеров',
      backgroundColor: '#0e92b7',
      color: 'white',
      creator_id: 4
   },
   {
      name: 'Команда Маркетологов',
      backgroundColor: '#334155',
      color: 'white',
      creator_id: 4
   },
   {
      name: 'Команда Тестировщиков',
      backgroundColor: '#b29aff',
      color: 'white',
      creator_id: 4
   },
   {
      name: 'Руководство',
      backgroundColor: '',
      color: '',
      creator_id: 4
   },
   {
      name: 'Персонал',
      backgroundColor: '',
      color: '',
      creator_id: 4
   },
   {
      name: 'WEB-разработка',
      backgroundColor: '',
      color: '',
      creator_id: 5
   },
   {
      name: 'Мобильная разработка',
      backgroundColor: '',
      color: '',
      creator_id: 5
   },
   {
      name: 'Сборка',
      backgroundColor: '',
      color: '',
      creator_id: 5
   },
   {
      name: 'Системные администраторы',
      backgroundColor: '',
      color: '',
      creator_id: 5
   },
   {
      name: 'Команда Маркетологов',
      backgroundColor: '#334155',
      color: 'white',
      creator_id: 4
   },
   {
      name: 'Команда Тестировщиков',
      backgroundColor: '#b29aff',
      color: 'white',
      creator_id: 4
   },
   {
      name: 'Руководство',
      backgroundColor: '',
      color: '',
      creator_id: 4
   },
   {
      name: 'Персонал',
      backgroundColor: '',
      color: '',
      creator_id: 4
   },
   {
      name: 'WEB-разработка',
      backgroundColor: '',
      color: '',
      creator_id: 5
   },
   {
      name: 'Мобильная разработка',
      backgroundColor: '',
      color: '',
      creator_id: 5
   },
   {
      name: 'Сборка',
      backgroundColor: '',
      color: '',
      creator_id: 5
   },
   {
      name: 'Системные администраторы',
      backgroundColor: '',
      color: '',
      creator_id: 5
   },
   {
      name: 'Команда Маркетологов',
      backgroundColor: '#334155',
      color: 'white',
      creator_id: 4
   },
   {
      name: 'Команда Тестировщиков',
      backgroundColor: '#b29aff',
      color: 'white',
      creator_id: 4
   },
   {
      name: 'Руководство',
      backgroundColor: '',
      color: '',
      creator_id: 4
   },
   {
      name: 'Персонал',
      backgroundColor: '',
      color: '',
      creator_id: 4
   },
   {
      name: 'WEB-разработка',
      backgroundColor: '',
      color: '',
      creator_id: 5
   },
   {
      name: 'Мобильная разработка',
      backgroundColor: '',
      color: '',
      creator_id: 5
   },
   {
      name: 'Сборка',
      backgroundColor: '',
      color: '',
      creator_id: 5
   },
   {
      name: 'Системные администраторы',
      backgroundColor: '',
      color: '',
      creator_id: 5
   },
   {
      name: 'Команда Маркетологов',
      backgroundColor: '#334155',
      color: 'white',
      creator_id: 4
   },
   {
      name: 'Команда Тестировщиков',
      backgroundColor: '#b29aff',
      color: 'white',
      creator_id: 4
   },
   {
      name: 'Руководство',
      backgroundColor: '',
      color: '',
      creator_id: 4
   },
   {
      name: 'Персонал',
      backgroundColor: '',
      color: '',
      creator_id: 4
   },
   {
      name: 'WEB-разработка',
      backgroundColor: '',
      color: '',
      creator_id: 5
   },
   {
      name: 'Мобильная разработка',
      backgroundColor: '',
      color: '',
      creator_id: 5
   },
   {
      name: 'Сборка',
      backgroundColor: '',
      color: '',
      creator_id: 5
   },
   {
      name: 'Системные администраторы',
      backgroundColor: '',
      color: '',
      creator_id: 5
   }
]

export default {
   actions: {
      getTeams(state, user_id) {
         return new Promise((resolve, reject) => {
            Teams.getTeams(user_id)
               .then((res) => {
                  if(res.data) {
                     resolve(res.data);
                  } else {
                     reject(null)
                  }
               })
               .catch(() => {
                  reject(null);
               })
         })
      },
      getTeamsVremenno() {
         return commadList;
      },
      createTeam(state, team) {
         return new Promise((resolve, reject) => {
            Teams.createTeam(team)
               .then((res) => {
                  resolve(state.commit('setTeam', res.data));
               })
               .catch(() => {
                  reject(null);
               })
         })
      },
      createTeamNew(state, team) {
         commadList.push(team);
      }
   },
   mutations: {
      setTeamsList(state, teams) {
         state.teamsList = teams;
      },
      setTeam(state, team) {
         state.teamsList.push(team);
      },
      filterTeamList(state, user_id) {
         state.filteredTeamList = commadList.filter((team) => {
            for(let key in state.filterRules) {
               // Фильтр если я админ
               if(key != undefined && state.filterRules.acessory === 'admin' && team.creator_id != user_id) {
                  return false;
               }

               // Фильтр если я участник
               if(key != undefined && state.filterRules.acessory === 'participant' && team.creator_id === user_id) {
                  return false;
               }
            }
            return true;
         })
      },
      filterTeamListOnName(state, name) {
         state.filteredTeamList = commadList.filter((team) => {
            if(team.name.toLowerCase().includes(name.toLowerCase())) {
               return true;
            }
            return false;
         })
      },
      setFilter(state, rule) {
         state.filterRules.acessory = rule;
      }
   },
   state: {
      teamsList: [],
      filteredTeamList: [],
      // Фильтры команды: Я админ, я только участник, все
      // admin, participant, all
      filterRules: {
         acessory: 'all'
      }
   },
   getters: {
      teamsList(state) {
         return state.teamsList;
      },
      filteredTeamList(state) {
         return state.filteredTeamList; 
      },
      activeTeamsFilterRule(state) {
         return state.filterRules.acessory;
      }
   }
}
