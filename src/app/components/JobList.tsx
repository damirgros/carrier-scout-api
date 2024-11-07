import styles from "../styles/Home.module.scss";
import Link from "next/link";

interface Job {
  id: number;
  title: string;
  link: string;
  location: string;
}

interface JobListProps {
  jobs: Job[];
}

const JobList: React.FC<JobListProps> = ({ jobs }) => (
  <div>
    {jobs.length > 0 ? (
      jobs.map((job) => (
        <div key={job.id} className={styles.jobCard}>
          <h3>{job.title}</h3>
          <Link href={job.link} target="_blank">
            {job.link}
          </Link>
          <p>{job.location}</p>
        </div>
      ))
    ) : (
      <p>No job listings found.</p>
    )}
  </div>
);

export default JobList;
