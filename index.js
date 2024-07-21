const cards = document.querySelector(".cards");
const category = document.querySelector(".category");
const categorySpan = document.querySelectorAll(".category span");

const baseURL = "https://newsapi.org/v2";
const apiKey = "XXXXXXXXXXXXXXXXXXXXX";

const backupImage = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
// const newsA = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=XXXXXXXXXXXXXXXXXXXXX";
// const newsB = "https://newsapi.org/v2/everything?q=tesla&from=2024-06-21&sortBy=publishedAt&apiKey=XXXXXXXXXXXXXXXXXXXXX";
// const newsC = "https://newsapi.org/v2/everything?q=crypto&sortBy=publishedAt&apiKey=XXXXXXXXXXXXXXXXXXXXX";
// const newsD = "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=XXXXXXXXXXXXXXXXXXXXX";

async function dataRequest(url) {
    try {
        const response = await fetch(baseURL + url + "&apiKey=" + apiKey);
        const json = response.json();
        return json;
    } catch (error) {
        console.log(error);
    }
}

function urlRequest(url) {
    //DISPLAYING DATA
    dataRequest(url).then(data => {
        data.articles.forEach(item => {
            cards.innerHTML += `<div class="card">
            <div class="image">
                <img src="${item.urlToImage ? item.urlToImage : backupImage}" alt="Default News Image">
            </div>
            <div class="information">
                <div>
                    <p class="title">${item.title}</p>
                    <p class="description">${item.description ? item.description : item.author}</p>
                    <p class="time">
                        <span>${item.publishedAt.replace("Z", "").split("T")[1]}</span>
                        <span>${item.publishedAt.replace("Z", "").split("T")[0]}</span>
                    </p>
                </div>
                <div class="other">
                    <span class="source">${item.source.name}</span>
                    <a class="url" href="${item.url}" target="_blank">Read Article <i class="bi bi-arrow-right"></i></a>
                </div>
            </div>
        </div>`;
        });
    });

}

category.addEventListener("click", event => {
    if (event.target.tagName === "SPAN");
    //clear articles
    cards.innerHTML = "";
    //data request from api
    urlRequest(event.target.dataset.url);
    //remove active class
    categorySpan.forEach(item => item.classList.remove("active"));
    //Add active class
    event.target.classList.add("active");
});

urlRequest("/top-headlines?country=us&category=business");
