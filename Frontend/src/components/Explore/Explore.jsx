import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import TextField from "@mui/material/TextField";

import NavBar from "../Commons/NavBar";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

import "./Explore.css";
import { useNavigate } from "react-router-dom";

function Explore() {
  const navigate = useNavigate();
  const [repositories, setRepositories] = useState([]);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get("https://code-chronical-latest-backend.onrender.com/api/explore");

      const responseData = response.data.response;

      setRepositories(responseData.repository);
      setUsers(responseData.users);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredRepositories = repositories.filter((repo) => {
    const query = search.toLowerCase();

    return (
      repo.name.toLowerCase().includes(query) ||
      repo.description.toLowerCase().includes(query)
    );
  });

  const filteredUsers = users.filter((user) => {
    const query = search.toLowerCase();

    return user.username.toLowerCase().includes(query);
  });

  const results =
    searchType === "repository" ? filteredRepositories : filteredUsers;

  return (
    <>
      <NavBar />

      <div className="explore-page">
        <div className="explore-header">
          <span className="explore-kicker">DISCOVER THE COMMUNITY</span>
          <h1>Explore</h1>

          <p>Discover repositories and users from Code Chronicle.</p>
        </div>

        <div className="explore-search-section">
          <TextField
            fullWidth
            label={
              searchType === "repository"
                ? "Search repositories"
                : "Search users"
            }
            placeholder={
              searchType === "repository"
                ? "Search by repository name..."
                : "Search by username..."
            }
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <FormControl className="search-type">
            <RadioGroup
              row
              value={searchType}
              onChange={(e) => {
                setSearchType(e.target.value);
                setSearch("");
              }}
            >
              <FormControlLabel
                value="repository"
                control={<Radio />}
                label="Repositories"
              />

              <FormControlLabel
                value="user"
                control={<Radio />}
                label="Users"
              />
            </RadioGroup>
          </FormControl>
        </div>

        <div className="explore-results">
          <div className="results-header">
            <div>
              <span className="results-kicker">BROWSE</span>
              <h2>{searchType === "repository" ? "Repositories" : "Users"}</h2>
            </div>

            <span>
              {results.length} result
              {results.length !== 1 ? "s" : ""}
            </span>
          </div>

          {results.length === 0 ? (
            <div className="no-results">
              <div className="no-results-icon">⌕</div>

              <h3>
                No {searchType === "repository" ? "repositories" : "users"}{" "}
                found
              </h3>

              <p>Try searching with a different keyword.</p>
            </div>
          ) : (
            <div className="results-list">
              {results.map((item) => (
                <div
                  className="explore-result-card"
                  key={item._id}
                  onClick={() =>
                    searchType === "repository"
                      ? navigate(`/repository/${item._id}`)
                      : navigate(`/user/${item._id}`)
                  }
                >
                  {searchType === "repository" ? (
                    <>
                      <div className="result-icon">📁</div>

                      <div className="result-content">
                        <h3>{item.name}</h3>

                        <p>{item.description || "No description provided."}</p>

                        <span className="result-meta">
                          🌐 {item.visibility}
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="result-icon">👤</div>

                      <div className="result-content">
                        <h3>{item.username}</h3>

                        <p>{item.bio || "No bio provided."}</p>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Explore;
