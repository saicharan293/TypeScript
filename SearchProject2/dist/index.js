"use strict";
const getUserName = document.querySelector("#user");
const submit = document.querySelector("#form");
const main_container = document.querySelector(".main_container");
//reusable fetcher to fetch the details present in the github url
async function myCustomFetcher(url, option) {
    const response = await fetch(url, option);
    if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
    }
    const data = await response.json();
    return data;
}
//function definition of ui part
function showResultUi(singleUser) {
    const { avatar_url, url, login } = singleUser;
    main_container.insertAdjacentHTML("beforeend", `<div class='card'> 
    <img src="${avatar_url}" alt="${login}"/>
    <div class='card-footer'>
    <img src="${avatar_url}" alt="${login}"/>
    <p style='color:white;font-size: 1.5rem;'>${login}</p>
    <a href='${url}'>Github</a>
    </div>
    </div>`);
}
//function definitoin for fetching user
function fetchUserData(url) {
    myCustomFetcher(url, {}).then((userInfo) => {
        for (const singleUser of userInfo) {
            showResultUi(singleUser);
            console.log("login " + singleUser.login);
        }
    });
}
//default function call
fetchUserData("https://api.github.com/users");
//search function definition
submit.addEventListener('submit', async (e) => {
    e.preventDefault();
    const searchTerm = getUserName.value.toLocaleLowerCase();
    try {
        const urlelem = 'https://api.github.com/users';
        const allUsers = await myCustomFetcher(urlelem, {});
        const matchingUsers = allUsers.filter((user) => {
            return user.login.toLocaleLowerCase().includes(searchTerm);
        });
        //to clear the previous data of the previous search
        main_container.innerHTML = '';
        if (matchingUsers.length === 0) {
            main_container?.insertAdjacentHTML('beforeend', `<p class='empty-msg'> No matching users found </p>`);
        }
        else {
            for (const singleUser of matchingUsers) {
                showResultUi(singleUser);
            }
        }
    }
    catch (error) {
        console.error();
    }
});
