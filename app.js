async function loadRepos() {
    try {
        const result = await fetch(
            "https://api.github.com/users/testnakov/repos"
        );
        if (result.status === 200) {
            const data = await result.json();
            data.forEach((repo) => {
                console.log(
                    `Repo name: ${repo.name} - Owner: ${repo.owner.login}`
                );
            });
        } else {
            throw new Error(`${result.status} - ${result.statusText}`);
        }
    } catch (err) {
        console.error("Error: " + err.message);
    }
}
loadRepos();
