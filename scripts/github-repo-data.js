import { writeFile } from 'node:fs/promises'
import path from 'node:path'

/**
 * Mock url repos
 */
const GITHUB_STARGAZERS = 'https://api.github.com/repos/Germancitoz/notis-app/stargazers'
const GITHUB_CONTRIBUTORS = 'https://api.github.com/repos/duxianwei520/react/contributors'

export async function getGitHubRepoData() {
	return Promise.allSettled([
		fetch(GITHUB_STARGAZERS).then((res) => res.json()),
		fetch(GITHUB_CONTRIBUTORS).then((res) => res.json())
	]).then(([stargazers, contributors]) => {
		const repoStars = stargazers.value.length
		const contributorsData = contributors.value

		return {
			repoStars,
			contributors: contributorsData.map(
				({ id, login, html_url: htmlUrl, avatar_url: avatarUrl }) => ({
					id,
					login,
					htmlUrl,
					avatarUrl
				})
			)
		}
	})
}

export async function writeDBFile() {
	const githubData = await getGitHubRepoData()
	const filePath = path.join(process.cwd(), './src/data/github-repo-data.json')
	return await writeFile(filePath, JSON.stringify(githubData, null, 2), 'utf-8')
}

writeDBFile()
