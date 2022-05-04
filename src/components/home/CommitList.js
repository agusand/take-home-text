import axios from "axios";
import { useEffect, useState } from "react";

import { useLoadingContext } from "../../contexts/LoadingContext.js";
import { useCommitPageContext } from "../../contexts/CommitPageContext.js";

import CommitItem from "./CommitItem.js";
import PageManager from "./PageManager.js";

export default function CommitList() {
    const { setIsLoading } = useLoadingContext();
    const { commitPage, setIsLastPage } = useCommitPageContext();

    const [commits, setCommits] = useState([]);

    useEffect(() => {
        const getCommits = async () => {
            try {
                setIsLoading(true);
                const { data } = await axios.get(`https://api.github.com/repos/agusand/take-home-text/commits?per_page=30&page=${commitPage}`);
                const { data: dataNextPage } = await axios.get(`https://api.github.com/repos/agusand/take-home-text/commits?per_page=30&page=${commitPage + 1}`);

                if (dataNextPage?.length) {
                    setIsLastPage(false);
                } else {
                    setIsLastPage(true);
                }

                setCommits(data);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                console.log(error);
            }
        }

        getCommits();
    }, [commitPage, setIsLastPage, setIsLoading]);


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
            <PageManager />
        </div>
    )
}
