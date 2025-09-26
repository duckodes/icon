const app = (() => {
    const username = "duckodes";
    const repo = "icon";
    let currentPath = "";

    const listContainer = document.getElementById("file-list");
    const backButton = document.getElementById("back-button");

    function loadFolder(path) {
        const apiUrl = `https://api.github.com/repos/${username}/${repo}/contents/${path}`;
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                listContainer.innerHTML = "";
                currentPath = path;

                if (path !== "") {
                    backButton.style.display = "block";
                } else {
                    backButton.style.display = "none";
                }

                data.forEach(item => {
                    if (item.name === "index.html") return;
                    if (item.name === "res") return;
                    const div = document.createElement("div");
                    div.className = "item " + (item.type === "dir" ? "folder" : "file");
                    div.innerHTML = item.type === "dir" ?
                        '<svg aria-hidden="true" focusable="false" class="octicon octicon-file-directory-fill icon-directory" viewBox="0 0 16 16" width="16" height="16" fill="currentColor" display="inline-block" overflow="visible" style="vertical-align:text-bottom"><path d="M1.75 1A1.75 1.75 0 0 0 0 2.75v10.5C0 14.216.784 15 1.75 15h12.5A1.75 1.75 0 0 0 16 13.25v-8.5A1.75 1.75 0 0 0 14.25 3H7.5a.25.25 0 0 1-.2-.1l-.9-1.2C6.07 1.26 5.55 1 5 1H1.75Z"></path></svg> ' + item.name :
                        '<svg aria-hidden="true" focusable="false" class="octicon octicon-file color-fg-muted" viewBox="0 0 16 16" width="16" height="16" fill="currentColor" display="inline-block" overflow="visible" style="vertical-align:text-bottom"><path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688l-.011-.013-2.914-2.914-.013-.011Z"></path></svg> ' + item.name;
                    if (item.type === "dir") {
                        div.onclick = () => loadFolder(item.path);
                    } else {
                        div.onclick = () => window.open(item.download_url, "_blank");
                    }

                    listContainer.appendChild(div);
                });
            })
            .catch(error => {
                listContainer.innerHTML = "無法載入資料夾內容";
                console.error("錯誤：", error);
            });
    }

    backButton.onclick = () => {
        const parts = currentPath.split("/");
        parts.pop();
        loadFolder(parts.join("/"));
    };
    loadFolder("");
})();