const button = document.getElementById('submit-btn');
const promiseResult = document.querySelector('.promise-result');

button.addEventListener('click', () => {

    let countdownTime = 5;

    // Create a paragraph element for displaying the countdown
    const countdownText = document.createElement('p');
    countdownText.classList.add("post-title");
    promiseResult.appendChild(countdownText);

    // Start countdown using setInterval
    const countdownInterval = setInterval(() => {
        countdownText.textContent = `Callback executed after ${countdownTime} seconds...`;
        countdownTime--;

        if (countdownTime < 0) {
            clearInterval(countdownInterval);
            executePostFetch();
        }
    }, 1000);

    function executePostFetch() {
        // Fetch data with a Promise
        fetchDataFromAPI()
            .then(data => {
                // Clear the loading message
                promiseResult.innerHTML = '';

                // Loop through all posts and create elements for each
                data.forEach(post => {
                    const postContainer = document.createElement('div');
                    postContainer.classList.add('post-container');

                    const postTitle = document.createElement('h2');
                    postTitle.classList.add('post-title');
                    postTitle.textContent = post.title;

                    const likeSection = document.createElement('div');
                    likeSection.classList.add('like-section');

                    const likeCount = document.createElement('span');
                    likeCount.classList.add('like-count');
                    likeCount.textContent = `Likes: ${post.reactions.likes}`;

                    const likeIcon = document.createElement('span');
                    likeIcon.classList.add('like-icon');
                    likeIcon.textContent = '❤️';

                    likeSection.appendChild(likeCount);
                    likeSection.appendChild(likeIcon);

                    postContainer.appendChild(postTitle);
                    postContainer.appendChild(likeSection);

                    promiseResult.appendChild(postContainer);
                });
            })
            .catch(error => {
                // Handle errors
                promiseResult.innerHTML = `<p>${error}</p>`;
            });
    }
});

function fetchDataFromAPI() {
    return fetch('https://dummyjson.com/posts') // fetch here return a promise
        .then(response => response.json())
        .then(data => data.posts)
        .catch(error => {
            throw error;
        });
}


