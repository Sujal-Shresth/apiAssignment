const popup = document.getElementById("popup");
const message = document.getElementById("message");
popup.addEventListener('click', () => {
    popup.style.display = 'none';
})

document.addEventListener('click', (e) => {
    if (e.target.tagName.toLowerCase() === 'a') {
        popup.style.display = "flex";
    }
})

const newsList = document.getElementById("newsList");

// Progression 1: create a function and fetch the api using axios

function getNews() {
    let news = axios.get("https://gnews.io/api/v4/search?q=example&apikey=84fac2122e83407e55e2b231f87fd869");
    news.then((response) => {
        console.log(response)
        addNews(response.data.articles);
    }).catch((error) => {
        handleError(error);
    })
}

function handleError(error) {
    console.log(error);
    popup.style.display = "flex";
    message.innerHTML = "<h2>An Error Occurred .... Max request reached .... :(</h2>"
}

function addNews(articles) {
    articles.forEach(element => {
        let article = document.createElement('article');
        let heading = document.createElement('h2');
        let content = document.createElement('p');
        let image = document.createElement('img');

        heading.innerText = element.title;
        image.setAttribute('src', element.image);
        content.innerText = element.content;

        article.appendChild(heading);
        article.appendChild(image);
        article.appendChild(content);
        newsList.appendChild(article);
    });
}

getNews();