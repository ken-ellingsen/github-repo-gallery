const overview = document.querySelector(".overview");
const repoList = document.querySelector(".repo-list");
const allReposContainer = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");
const backButton = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");
const username = "ken-ellingsen";

const getUserInfo = async function () {
    const res = await fetch(`https://api.github.com/users/${username}`);
    const userInfo = await res.json();
    displayUserInfo(userInfo);
};

getUserInfo();

const displayUserInfo = function (userInfo) {
    const userDiv = document.createElement("div");
    userDiv.classList.add("user-info");
    userDiv.innerHTML =
        `<figure>
            <img alt="user avatar" src=${userInfo.avatar_url} />
        </figure>
        <div>
            <p><strong>Name:</strong> ${userInfo.name}</p>
            <p><strong>Bio:</strong> ${userInfo.bio}</p>
            <p><strong>Location:</strong> ${userInfo.location}</p>
            <p><strong>Number of public repos:</strong> ${userInfo.public_repos}</p>
        </div>`
    overview.append(userDiv);
    getRepos();
};

const getRepos = async function () {
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repos = await res.json();
    displayRepos(repos);
};

const displayRepos = function (repos) {
    filterInput.classList.remove("hide");
    for (const repo of repos) {
        const li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${repo.name}</h3>`
        repoList.append(li);
    }
};

repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        getRepoInfo(repoName);
    }
});

const getRepoInfo = async function (repoName) {
    const res = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await res.json();

    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();

    let languages = [];
    for (const language in languageData) {
        languages.push(language);
    }

    displayRepoInfo(repoInfo, languages);
};

const displayRepoInfo = function (repoInfo, languages) {
    repoData.innerHTML = "";
    const repoDiv = document.createElement("div");
    repoDiv.innerHTML =
        `<h3>Name: ${repoInfo.name}</h3>
            <p>Description: ${repoInfo.description}</p>
            <p>Default Branch: ${repoInfo.default_branch}</p>
            <p>Languages: ${languages.join(", ")}</p>
            <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`
    repoData.append(repoDiv);
    repoData.classList.remove("hide");
    allReposContainer.classList.add("hide");
    backButton.classList.remove("hide");
};

backButton.addEventListener("click", function () {
    allReposContainer.classList.remove("hide");
    repoData.classList.add("hide");
    backButton.classList.add("hide");
});

// Dynamic search
filterInput.addEventListener("input", function (e) {
    const search = e.target.value;
    const repos = document.querySelectorAll(".repo");
    const lowerSearch = search.toLowerCase();

    for (const each of repos) {
        const lowerText = each.innerText.toLowerCase();
        if (lowerText.includes(lowerSearch)) {
            each.classList.remove("hide");
        } else {
            each.classList.add("hide");
        }
    }
});