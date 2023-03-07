import Teams from "@/api/teams";

export default {
   actions: {
      getTeams(state, user_id) {
         return new Promise((resolve, reject) => {
            Teams.getTeams(user_id).then((res) => {
               if(res.data) {
                  resolve(res.data);
               } else {
                  reject(false)
               }
            })
         })
      }
   },
   mutations: {
      setTeamsList(state, teams) {
         state.teamsList = teams;
      }
   },
   state: {
      teamsList: []
   },
   getters: {
      teamsList(state) {
         return state.teamsList;
      }
   }
}