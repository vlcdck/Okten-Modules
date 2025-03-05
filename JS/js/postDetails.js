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

async function parsePostsInfo() {
    const url = new URL(location.href);
    const postId = url.searchParams.get('id');

    const postUrl = new URL(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    const postCommentUrl = new URL(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)

    const listDiv = document.getElementsByClassName('post-list')[0];

    await fetch(postUrl)
        .then(value => value.json())
        .then(post => {

            function createList(obj) {
                const ul = document.createElement('ul');
                for (const objKey in obj) {
                    const li = document.createElement('li');
                    li.innerText = `${objKey} - ${obj[objKey]}`;
                    ul.appendChild(li);
                }

                listDiv.appendChild(ul);

                const backButton = document.createElement('button');
                backButton.innerHTML = `
                    <a href="index.html">Return to Users</a>
                  `;
                listDiv.appendChild(backButton);

            }

            createList(post)
        })

    const commentsWrapper = document.createElement('div');
    commentsWrapper.classList.add('comments-wrapper');

    await fetch(postCommentUrl)
        .then(value => value.json())
        .then(postComments => {

            function createComments(obj) {
                for (const objElement of obj) {
                    const commentBlock = document.createElement('div');
                    commentBlock.innerHTML = `
                        <h3>${objElement.name}</h3>
                        <p>${objElement.email}</p>
                        <p>${objElement.body}</p>
                    `
                    commentsWrapper.appendChild(commentBlock);
                }
            }

            createComments(postComments);
        })
    listDiv.appendChild(commentsWrapper);
}
parsePostsInfo();