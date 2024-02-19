const overview = document.querySelector(".overview");
const username = "ken-ellingsen";

const gitHubProfile = async function () {
    const res = await fetch(`https://api.github.com/users/${username}`);
    const profile = await res.json();
    console.log(profile);
    displayUserInfo(profile);
};
gitHubProfile();

const displayUserInfo = function (profile) {
    const userDiv = document.createElement("div");
    userDiv.classList.add("user-info");
    userDiv.innerHTML =
        `<figure>
            <img alt="user avatar" src=${profile.avatar_url} />
        </figure>
        <div>
            <p><strong>Name:</strong> ${profile.name}</p>
            <p><strong>Bio:</strong> ${profile.bio}</p>
            <p><strong>Location:</strong> ${profile.location}</p>
            <p><strong>Number of public repos:</strong> ${profile.public_repos}</p>
        </div>`
    overview.append(userDiv);
};