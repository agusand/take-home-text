import { useCommitPageContext } from './../../contexts/CommitPageContext.js';

export default function PageManager() {
    const { commitPage, setCommitPage, isLastPage } = useCommitPageContext();

    return (
        <div className="pageManager">
            <button className="pageManager__button pageManager__button--left" onClick={() => setCommitPage(commitPage === 1 ? commitPage : commitPage - 1)}>
                <svg className="pageManager__svg" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke='currentColor' strokeOpacity={commitPage === 1 ? 0.5 : 1} stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <p className="pageManager__">{commitPage}</p>
            <button className="pageManager__button pageManager__button--right" onClick={() => setCommitPage(isLastPage ? commitPage : commitPage + 1)}>
                <svg className="pageManager__svg" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke='currentColor' strokeOpacity={isLastPage ? 0.5 : 1} stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    )
}
