let postArray = [];
const postTitle = document.getElementById("post-title");
const postBody = document.getElementById("post-body");
let form = document.getElementById("form-post");

const renderPost = () => {
  let html = "";
  for (let post of postArray) {
    html += `
            <div class="single-post">
                <h2>${post.title}</h2>
                <p>${post.body}</p>
            </div>
        `;
  }

  document.getElementById("posts").innerHTML = html;
};

fetch("https://apis.scrimba.com/jsonplaceholder/posts")
  .then((ressponse) => ressponse.json())
  .then((data) => {
    // console.log(data.slice(0, 5));
    postArray = data.slice(0, 5);

    renderPost();
  });

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const newPost = {
    title: postTitle.value,
    body: postBody.value,
  };

  const options = {
    method: "POST",
    body: JSON.stringify(newPost),
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch("https://apis.scrimba.com/jsonplaceholder/posts", options)
    .then((response) => response.json())
    .then((post) => {
      postArray.unshift(post);

      renderPost(postArray);

      form.reset();
    });
});
