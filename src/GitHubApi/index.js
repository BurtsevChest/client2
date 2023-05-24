import { getUser } from "@/components/Common/helpers/user";
import axios from "axios";

const USER = getUser();
// glpat-J43i_A8gMKRm6sgpENQc
const GitLabRequest = axios.create({
   baseURL: 'https://gitlab.com/api/v4/',
   headers: {
      "Authorization": `Bearer ${USER?.token_git_lab}`
   }
});

class GitLabApi {
   async getRepos() {
      return await GitLabRequest.get('projects/?owned=True');
   }

   async getOneRepos(reposId) {
      return await GitLabRequest.get(`projects/${reposId}`);
   }

   async getProjectRepos() {
      return await GitLabRequest.get('projects/?owned=True');
   }

   async getReposMergeRequestList(reposId, state='all') {
      return await GitLabRequest.get(`projects/${reposId}/merge_requests?state=${state}`);
   }

   async getMergeRequestDiffs(reposId, mergeId) {
      return await GitLabRequest.get(`projects/${reposId}/merge_requests/${mergeId}/diffs`);
   }
}

export default new GitLabApi()
