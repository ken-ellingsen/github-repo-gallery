const overview = document.querySelector(".overview");
const repoList = document.querySelector(".repo-list");
const username = "ken-ellingsen";

const getUserInfo = async function () {
    const res = await fetch(`https://api.github.com/users/${username}`);
    const userInfo = await res.json();
    //console.log(userInfo);
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
    console.log(repos);
    displayRepos(repos);
};

const displayRepos = function(repos) {
    for (const repo of repos){
        const li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${repo.name}</h3>`
        repoList.append(li);
    }
};