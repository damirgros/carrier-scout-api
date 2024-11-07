"use client";

import { useState } from "react";
import SearchForm from "./components/SearchForm";
import JobList from "./components/JobList";
import styles from "./styles/Home.module.scss";
import axios from "axios";

const apiKey = process.env.NEXT_PUBLIC_API_KEY as string;
const searchEngineId = process.env.NEXT_PUBLIC_SEARCH_ENGINE_ID as string;
const url = process.env.NEXT_PUBLIC_URL as string;

const Home: React.FC = () => {
  const [jobs, setJobs] = useState([]);

  const handleSearch = (searchData: { query: string }) => {
    async function fetchJobPostings() {
      try {
        const response = await axios.get(url, {
          params: {
            key: apiKey,
            cx: searchEngineId,
            q: `${searchData.query}+posao`,
            dateRestrict: "m1",
            gl: "hr",
          },
        });

        const results = response.data.items;

        if (results) {
          // Map results to the structure expected by the JobList component
          const formattedResults = results.map(
            (item: { title: string; link: string; snippet: string }) => ({
              id: item.link,
              title: item.title,
              description: item.snippet,
              link: item.link,
            })
          );

          // Update the jobs state with the formatted results
          setJobs(formattedResults);
        }
      } catch (error) {
        console.error("Error fetching job postings:", error);
      }
    }

    fetchJobPostings(); // Invoke the function
  };

  return (
    <div className={styles.container}>
      <h1>Find Your Next Job</h1>
      <SearchForm onSearch={handleSearch} />
      <JobList jobs={jobs} />
    </div>
  );
};

export default Home;
