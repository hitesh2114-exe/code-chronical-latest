const fs = require("fs");
const FormData = require("form-data");
const api = require("./api");

class RepositoryApi {
  //this function is used to create new repo
  async createRepository(token, repositoryData) {
    const response = await api.post(`/api/repositories`, repositoryData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  }

  //this function is used to push repo
  async pushRepository(repositoryId, zipPath, token) {
    try {
      const form = new FormData();

      // "snapshot" must match upload.single("snapshot")
      form.append("snapshot", fs.createReadStream(zipPath));

      const response = await api.post(
        `/api/repositories/${repositoryId}/push`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            ...form.getHeaders(),
          },
        }
      );

      return response.data;
    } finally {
      if (fs.existsSync(zipPath)) {
        fs.unlinkSync(zipPath);
      }
    }
  }

  async pullRepository(repositoryId, token) {
    const response = await api.get(`/api/repositories/${repositoryId}/pull`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "stream",
    });
    return response;
  }

  async getLatestCommit(repoId, token) {
    const response = await api.get(
      `/api/repositories/${repoId}/latest-commit`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  }
}

module.exports = new RepositoryApi();
