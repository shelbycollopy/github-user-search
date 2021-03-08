import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/App.module.css";

export default function App() {
  const [errorMessage, setErrorMessage] = useState();
  const [isFetching, setFetching] = useState(false);
  const [searchQuery, setSearchQuery] = useState();
  const [userRepos, setUserRepos] = useState();

  // Call the Github API to get user repos
  const getUserRepos = async (username) => {
    if (!username) {
      setFetching(false);
      setErrorMessage("Please enter a username.");
      return;
    }

    // Fetch user repos by most recently updated and get 100 of them
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?q=sort=updated&per_page=100`
    )
      .then((res) => res.json())
      .then((data) => {
        setFetching(false);
        console.log(data);
        return data;
      });

    // If the response has a length then we know their are repos
    if (response && response.length > 0) {
      return setUserRepos(response);
    }

    return setErrorMessage("No repos found. Try another username.");
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Github User Repo Search</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Github User Repo Search</h1>
        <div className={styles.grid}>
          <input
            className={styles.input}
            onChange={(e) => {
              setErrorMessage();
              setSearchQuery(e.target.value);
            }}
            placeholder="Enter username"
            tabIndex="1"
          />
          <button
            className={styles.button}
            onClick={() => {
              setUserRepos(null);
              setFetching(true);
              getUserRepos(searchQuery);
            }}
            tabIndex="2"
          >
            Search
          </button>
        </div>

        <div className={styles.grid}>
          {errorMessage && !isFetching && <p>{errorMessage}</p>}
          {isFetching && !errorMessage && (
            <Image
              src="/spinner.svg"
              height={40}
              width={40}
              className={styles.spinner}
            />
          )}

          {!isFetching && userRepos && (
            <ol className={styles.results}>
              {userRepos
                .sort((a, b) => b.stargazers_count - a.stargazers_count)
                .map((repo, i) => {
                  return (
                    <li key={i} className={styles.card}>
                      <div className={styles.details}>
                        <h3>{repo.name}</h3>
                        <p>{repo.description}</p>
                        <span>{repo.language}</span>
                      </div>
                      <div className={styles.stars}>
                        <span>
                          {new Intl.NumberFormat().format(
                            repo.stargazers_count
                          )}
                        </span>
                        <Image src="/star.svg" height="20" width="20" />
                      </div>
                    </li>
                  );
                })}
            </ol>
          )}
        </div>
      </main>
    </div>
  );
}
