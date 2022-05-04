import CommitList from "../components/home/CommitList.js";
import UserCard from "../components/home/UserCard.js";

export default function Home() {
    return (
        <section className="home">
            <UserCard />
            <CommitList />
        </section>
    );
}