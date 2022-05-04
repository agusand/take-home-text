import { createContext, useContext, useState } from "react";

const CommitPageContext = createContext({});

export const useCommitPageContext = () => {
    return useContext(CommitPageContext);
};

export const CommitPageContextProvider = ({ children }) => {
    const [commitPage, setCommitPage] = useState(1)
    const [isLastPage, setIsLastPage] = useState(false)

    return (
        <CommitPageContext.Provider value={{ commitPage, setCommitPage, isLastPage, setIsLastPage }}>
            {children}
        </CommitPageContext.Provider>
    );
};
