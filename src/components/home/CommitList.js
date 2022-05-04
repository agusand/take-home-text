import axios from "axios";
import { useEffect, useState } from "react";

import { useLoadingContext } from "../../contexts/LoadingContext.js";

import CommitItem from "./CommitItem.js";

export default function CommitList() {
    const { setIsLoading } = useLoadingContext();
    const [commits, setCommits] = useState([]);

    useEffect(() => {
        const getCommits = async () => {
            try {
                setIsLoading(true);
                const { data } = await axios.get("https://api.github.com/repos/agusand/take-home-text/commits?per_page=100");
                console.log(data.length);

                setCommits(data);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                console.log(error);
            }
        }

        getCommits();
    }, [setIsLoading]);


    return (
        <div className="commitList">
            <h2 className="commitList__title" >Commit List</h2>
            <table className="commitList__table">
                <thead className="commitList__tableHead">
                    <tr className="commitList__tableRow">
                        <th className="commitList__tableHeadCell">
                            <span className="commitList__tableHeadCellText">
                                Author
                            </span>
                        </th>
                        <th className="commitList__tableHeadCell">
                            <span className="commitList__tableHeadCellText">
                                Message
                            </span>
                        </th>
                        <th className="commitList__tableHeadCell">
                            <span className="commitList__tableHeadCellText">
                                Date
                            </span>
                        </th>
                    </tr>
                </thead>
                <tbody className="commitList__tableBody">
                    {commits.map((commit) => {
                        return (
                            <CommitItem commit={commit} key={commit.sha} />
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
