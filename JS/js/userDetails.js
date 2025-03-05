// В index.html
// 1 отримати масив об'єктів з endpoint`а https://jsonplaceholder.typicode.com/users
// 2 Вивести id,name всіх user в index.html. Окремий блок для кожного user.
// 3 Додати кожному блоку кнопку/посилання, при кліку на яку відбувається перехід  на сторінку user-details.html,
// котра має детальну інфорацію про об'єкт на який клікнули
//
//
// На странице user-details.html:
// 4 Вивести всю, без виключення, інформацію про об'єкт user на який клікнули
// 5 Додати кнопку "post of current user", при кліку на яку, з'являються title всіх постів поточного юзера
// (для получения постов используйте эндпоинт https://jsonplaceholder.typicode.com/users/USER_ID/posts)
// 6 Каждому посту додати кнопку/посилання, при кліку на яку відбувається перехід на сторінку post-details.html, котра має детальну інфу про поточний пост.
//
// На странице post-details.html:
// 7 Вивести всю, без виключення, інформацію про об'єкт post на який клікнули .
// 8 Нижчє інформаці про пост, вивести всі коментарі поточного поста (ендпоінт  - https://jsonplaceholder.typicode.com/posts/POST_ID/comments)
//
// Стилизація проєкта -
// index.html - всі блоки з user - по 2 в рядок. кнопки/аосилвння розташувати під інформацією про user.
// user-details.html - блок з інфою про user зверху сторінки. Кнопка нижчє, на 90% ширини сторінки, по центру.
// блоки з короткою іфною про post - в ряд по 5 .
// post-details.html - блок з інфою про пост зверху. Коментарі - по 4 в ряд.
// Всі елементи котрі характеризують users, posts, comments візуалізувати, так, щоб було видно що це блоки (дати фон. марджини і тд)

async function parseUsersInfo() {
    const url = new URL(location.href);
    const userId = url.searchParams.get('id');

    const sourceUrl = new URL(`https://jsonplaceholder.typicode.com/users/${userId}`);
    const postsOfUser = new URL(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);

    const wrapper = document.getElementsByClassName('user-info-wrapper')[0];

    await fetch(sourceUrl)
        .then(value => value.json())
        .then(user => {

            function createList(obj) {
                const ul = document.createElement("ul");
                for (const key in obj) {
                    const li = document.createElement("li");
                    if (typeof obj[key] === "object" && obj[key] !== null) {
                        li.innerHTML = `${key}`;
                        li.appendChild(createList(obj[key], li));
                    } else {
                        li.innerHTML = `${key}: ${obj[key]}`;
                    }
                    ul.appendChild(li);
                }
                return ul;
            }

            wrapper.appendChild(createList(user));
        })
    await fetch(postsOfUser)
        .then(value => value.json())
        .then(posts => {

            // console.log(posts);

            function showPostTitle() {
                const postsContainer = document.createElement('div');
                postsContainer.classList.add('posts-container');

                const button = document.createElement("button");
                button.innerText = 'Post of current user';
                button.addEventListener('click', () => {

                    for (const post of posts) {

                        const divTitle = document.createElement('div');
                        divTitle.innerHTML = `<h4>Post: ${post.title}</h4><a href="post-details.html?id=${post.id}"><button>Post Info</button></a>`;
                        postsContainer.appendChild(divTitle);
                        wrapper.appendChild(postsContainer);
                    }
                })

                const backButton = document.createElement('button');
                backButton.innerHTML = `
                    <a href="index.html">Go Back</a>
                  `;

                wrapper.appendChild(button);
                wrapper.appendChild(backButton);

            }

            showPostTitle();
        })
}

parseUsersInfo();