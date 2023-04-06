import React, { useEffect, useState } from 'react'
import { GoGitBranch, GoRepo, GoStar } from 'react-icons/go'

export const GithubRepo = ({ repoName }) => {
    const [repoInfo, setRepoInfo] = useState(null)

    useEffect(() => {
        const fetchRepoInfo = async () => {
            try {
                const response = await fetch(
                    `https://api.github.com/repos/${repoName}`
                )
                const data = await response.json()
                setRepoInfo(data)
            } catch (error) {
                console.error(error)
                // handle the error here, for example by setting an error state
                setRepoInfo('403 err')
            }
        }
        fetchRepoInfo()
    }, [repoName])

    if (repoInfo === '403 err') {
        return <div>Unauthorized (403 Error)</div>
    }

    if (!repoInfo) {
        return <div>Loading...</div>
    }

    const {
        name,
        description,
        language,
        forks_count,
        stargazers_count,
        html_url,
    } = repoInfo

    return (
        <div className="github-repo">
            <div className="repo-header">
                <a href={html_url} className="repo-name">
                    <GoRepo /> {name}
                </a>
            </div>
            <div className="repo-body">
                <p className="repo-description">{description}</p>
            </div>
            <div className="repo-footer">
                <p className="repo-language">{language}</p>
                <p className="repo-forks">
                    <GoGitBranch /> {forks_count}
                </p>
                <p className="repo-stars">
                    <GoStar /> {stargazers_count}
                </p>
            </div>
        </div>
    )
}
